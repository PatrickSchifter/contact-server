import { FastifyInstance } from "fastify";
import { UserUseCase } from "../usecases/user.usecases";
import { UserCreate } from "../interfaces/user.interface";

export async function userRoutes(fastify: FastifyInstance){
    fastify.post<{Body: UserCreate}>('/', async (req, reply) => {
        const {name, email} = req.body;
        try {
            const userUserCase = new UserUseCase();
            const data = await userUserCase.create({
                name,
                email
            })
            reply.send(data);
        } catch (error) {
            reply.send(error)
        }
    })

    fastify.get('/', (req, reply)=>{
        reply.send({status: "Ok"})
    })
}