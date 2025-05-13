import { z } from "zod";
import { FastifyInstanceZod } from "../../@types/FastifyInstanceZod";

export async function expenseRoutes (app : FastifyInstanceZod) {
    app.register(
        (instance, options, done) => {
            instance.get(
                "/all", 
                { 
                    schema : {
                        tags : ["expenses"],
                        response : {
                            200 : z.array(
                                z.object({
                                    value : z.number(),
                                    id : z.string()
                                })
                            )
                        } 
                    } 
                }, 
                async (req, reply) => {

                }
            );
            instance.post(
                "/create",
                { 
                    schema : {
                        tags : ["expenses"],
                        body : z.object({
                            value : z.number().min(0.1,  "At least 0.1 cents to add an expense"),
                            category : z.string(),
                        })
                    }
                },
                async (req, reply) => {
                    const { body : { category, value } } = req; 
                }
            );
            done();
        }, 
        {
            prefix : "/expense"
        }
    )
}