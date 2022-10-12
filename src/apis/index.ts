import type {FastifyPluginAsync} from 'fastify';
import thirdParty from './third-party';

const apiRoute: FastifyPluginAsync = async (server) => {
  server.register(thirdParty);

  server.get(`/`, (): any => {
    return {version: '1.0.0'};
  });
};

export default apiRoute;
