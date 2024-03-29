import type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  FastifyServerOptions,
} from 'fastify';
import fastify from 'fastify';

import AltairFastify from 'altair-fastify-plugin';
import type {Context} from './context';
import {getUserId} from './utils/auth';
import mercurius from 'mercurius';
import prismaPlugin from './plugins/prisma';
import restPlugin from './plugins/rest';
import {schema} from './schema';
import shutdownPlugin from './plugins/shutdown';

const {JWT_SECRET} = process.env;

export function createServer(opts: FastifyServerOptions = {}): FastifyInstance {
  const server = fastify(opts);

  server.register(shutdownPlugin);
  server.register(restPlugin);
  server.register(prismaPlugin);

  server.register(mercurius, {
    schema,
    path: '/graphql',
    graphiql: false,
    context: (request: FastifyRequest, reply: FastifyReply): Context => {
      return {
        request,
        reply,
        pubsub: server.websocketServer,
        prisma: server.prisma,
        appSecret: JWT_SECRET,
        userId: getUserId(reply.request.headers.authorization as string),
      };
    },
    subscription: {
      onConnect: (param) => {
        process.stdout.write('Connected to websocket\n');

        return param;
      },
      context: async (_, req) => {
        return {
          prisma: server.prisma,
          pubsub: server.websocketServer,
          appSecret: JWT_SECRET,
          userId: getUserId(req.headers.authorization as string),
        };
      },
    },
  });

  server.register(AltairFastify, {
    path: '/altair',
    baseURL: '/altair/',
    endpointURL: '/graphql',
    initialSettings: {
      theme: 'dark',
      'plugin.list': ['altair-graphql-plugin-graphql-explorer'],
    },
  });

  return server;
}

export async function startServer(): Promise<void> {
  const server = createServer({
    logger: {
      level: 'info',
    },
    disableRequestLogging: process.env.ENABLE_REQUEST_LOGGING !== 'true',
  });

  try {
    const port: number = (parseInt(process.env.PORT || '0', 10), 10) ?? 3000;
    await server.listen({
      host: '0,0,0,0',
      port,
    });

    return;
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}
