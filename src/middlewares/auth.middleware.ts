import { FastifyRequest, FastifyReply } from "fastify";

export async function authMiddleware (req: FastifyRequest, reply: FastifyReply){
    const apiEmail = req.headers['email'];

    if(!apiEmail){
        reply.status(401).send('Email necessario')
    }
}