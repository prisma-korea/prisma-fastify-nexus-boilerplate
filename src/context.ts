import type {FastifyReply, FastifyRequest} from 'fastify';

import type {PrismaClient} from '@prisma/client';
import type {PubSub} from 'mercurius';

export interface Context {
  prisma: PrismaClient;
  request: FastifyRequest;
  pubsub: PubSub;
  reply: FastifyReply;
  appSecret: string | undefined;
  userId: string | null;
}
