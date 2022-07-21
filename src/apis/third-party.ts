import {FastifyPluginAsync} from 'fastify';

const thirdPartyRoute: FastifyPluginAsync = async (server) => {
  server.get('/daum_address', async (req, reply) => {
    // @ts-ignore
    reply.view('daum_address');
  });
};

export default thirdPartyRoute;
