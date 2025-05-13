import { z } from "zod";
import { FastifyInstanceZod } from "../../@types/FastifyInstanceZod";

export async function expenseRoutes (app : FastifyInstanceZod) {
    app.register(
        (instance, options, done) => {
            instance.get(
                "/all", 
                { 
                    schema : {
                        tags : ["receipts"],
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
            done();
        }, 
        {
            prefix : "/expense"
        }
    )
}