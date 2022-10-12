import type {FastifyPluginAsync} from 'fastify';
import apis from '../apis';
import ejs from 'ejs';
import fastifyView from '@fastify/view';
import path from 'path';

const restPlugin: FastifyPluginAsync = async (server) => {
  server.register(fastifyView, {
    engine: {ejs},
    root: path.join(__dirname, '../../html'),
  });

  server.register(apis);
};

export default restPlugin;
