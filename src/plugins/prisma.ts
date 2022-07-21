import {FastifyPluginAsync} from 'fastify';
import {PrismaClient} from '@prisma/client';
import fp from 'fastify-plugin';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

const prismaPlugin: FastifyPluginAsync = fp(async (server, options) => {
  const prisma = new PrismaClient({
    log: ['error', 'warn'],
  });

  await prisma.$connect();

  server.decorate('prisma', prisma);

  server.addHook('onClose', async (app) => {
    app.log.info('disconnecting Prisma from DB');
    await app.prisma.$disconnect();
  });
});

export default prismaPlugin;
