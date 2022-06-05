import {FastifyPluginAsync} from 'fastify';

const statusPlugin: FastifyPluginAsync = async (server, options) => {
  // @ts-ignore
  server.get(`/`, () => {
    return {up: true};
  });
};

export default statusPlugin;
