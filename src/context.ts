import {FastifyReply, FastifyRequest} from 'fastify';

import {PrismaClient} from '@prisma/client';
import {PubSub} from 'graphql-subscriptions';

export interface Context {
  prisma: PrismaClient;
  request: FastifyRequest;
  reply: FastifyReply;
  pubsub: PubSub;
  appSecret: string | undefined;
  userId: string | null;
}
