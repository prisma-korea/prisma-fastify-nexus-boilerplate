import {FastifyPluginAsync} from 'fastify';
import POV from 'point-of-view';
import {PrismaClient} from '@prisma/client';
import ejs from 'ejs';
import fp from 'fastify-plugin';
import path from 'path';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

const restApi: FastifyPluginAsync = fp(async (server) => {
  server.register(POV, {
    engine: {
      ejs,
    },
    root: path.join(__dirname, '../../html'),
  });

  server.get('/daum_address', async (req, reply) => {
    reply.view('daum_address');
  });
});

export default restApi;
