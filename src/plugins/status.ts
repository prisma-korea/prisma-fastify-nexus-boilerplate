import {FastifyPluginAsync} from 'fastify';

const statusPlugin: FastifyPluginAsync = async (server, options) => {
  // @ts-ignore
  server.get(`/`, () => {
    return {version: '1.0.0'};
  });
};

export default statusPlugin;
