import fastify, { FastifyInstance } from "fastify";
import {userRoutes} from './routes/user.routes';
import {contactRoutes} from './routes/contact.routes';

const app: FastifyInstance = fastify({logger: false});

const port = 3030;

app.register(userRoutes, {
    prefix: '/users'
})

app.register(contactRoutes, {
    prefix: '/contacts'
})

app.listen({
    port: port
}, () => console.log('Server is running on port', port))