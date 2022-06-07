import {FastifyPluginAsync} from 'fastify';
import apis from '../apis';
import ejs from 'ejs';
import path from 'path';
import pointOfView from 'point-of-view';

const restPlugin: FastifyPluginAsync = async (server) => {
  server.register(pointOfView, {
    engine: {
      ejs,
    },
    root: path.join(__dirname, '../../html'),
  });

  server.register(apis);
};

export default restPlugin;
