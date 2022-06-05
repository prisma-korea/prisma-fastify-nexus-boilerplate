import {FastifyReply, FastifyRequest} from 'fastify';

import {PrismaClient} from '@prisma/client';
import {PubSub} from 'mercurius';

export interface Context {
  prisma: PrismaClient;
  request: FastifyRequest;
  pubsub: PubSub;
  reply: FastifyReply;
  appSecret: string | undefined;
  userId: string | null;
}
