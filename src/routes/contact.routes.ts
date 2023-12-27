import { FastifyInstance } from "fastify";
import { ContactUseCase } from "../usecases/contact.usecases";
import { ContactCreate, ContactUpdate } from "../interfaces/contact.interface";
import { authMiddleware } from "../middlewares/auth.middleware";
import { UserUseCase } from "../usecases/user.usecases";

export async function contactRoutes(fastify: FastifyInstance){

    fastify.addHook('preHandler', authMiddleware);
    const contactUseCase = new ContactUseCase();
    const userUseCase = new UserUseCase();

    fastify.post<{Body: ContactCreate}>('/', async (req, reply) => {

        const {name, email, phone} = req.body;
        const userEmail = req.headers['email'];

        try {
            const data = await contactUseCase.create({
                name,
                email,
                phone, 
                userEmail
            })
            reply.send(data);
        } catch (error) {
            reply.send(error)
        }
    });

    fastify.get('/', async (req, reply)=>{
        const email = req.headers['email'];
        try {
            const data = await contactUseCase.findAllContacts(email);
            reply.send(data);
        } catch (error) {
            reply.send(error)
        }
    });

    fastify.put<{Body: ContactUpdate}>('/', async (req, reply)=>{
        const {id, name, email, phone} = req.body;
        try {
            const data = await contactUseCase.updateContact({
                id, 
                name, 
                email, 
                phone
            });
            reply.send(data);
        } catch (error) {
            reply.send(error)
        }
    })

    fastify.delete<{Body: {id: number}}>('/', async (req, reply)=>{
        const {id} = req.body;
        try {
            const data = await contactUseCase.deleteContact(id);
            reply.send(data);
        } catch (error) {
            reply.send(error)
        }
    })
}