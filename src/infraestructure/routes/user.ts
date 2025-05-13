import { FastifyInstance } from "fastify";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { FastifyInstanceZod } from "../../@types/FastifyInstanceZod";
interface User {
    name : string;
    email : string;
    id : string;
}
const users : User[] = [
    {
        email : "jhonDoe@example.com",
        id : "123213",
        name : "Jon doe"
    }
];
export async function userRoutes (app : FastifyInstanceZod) {
    app.get("/user", { schema : {
        tags : ["users"],
        description : "Returns all users ",
        response : {
            200 : z.array(z.object({
                id : z.string(),
                name : z.string(),
                email : z.string()
            }))
        }
    }}, async (request, reply) => {
        return reply.status(200).send(users);
    });

    app.post(
        "/user", { 
            schema : {
                tags : ["users"],
                description : "Creates a new user",
                body : z.object({
                    name : z.string().min(4),
                    email : z.string().email()
                }),
                response : {
                    201 : z.object({
                        name : z.string().min(4),
                        email : z.string().email(),
                        id : z.string()
                    })
                }
            }
        },
        async (request, reply) => {
            const { body : { email, name } } = request;

            const newUser : User = {
                name, 
                email, 
                id : randomUUID()
            }
            users.push(newUser);
            return reply.status(201).send(newUser);
        }
    );
}