import { FastifyInstanceZod } from "../../@types/FastifyInstanceZod";
import { z } from "zod";
const postReceiptSchema = z.object({
    value : z.number().min(0.1, "At least 0.1 cents to add an receipt"),
    category : z.string()
});
type PostReceiptSchema = z.infer<typeof postReceiptSchema>;

export async function receiptRoutes (app : FastifyInstanceZod) {
    app.register((instance, options, done) => {
        instance.get("/all", (request, reply) => {
            const params = request.query;
            //chamada ao service do application
        })
        instance.post(
            "/add", 
            { 
                schema : { 
                    tags : ["receipts"],
                    description : "Rota vai adicionar uma nova receita",
                    body : postReceiptSchema
                }
            },
            async (request, reply) => {
                const { category, value } = request.body as PostReceiptSchema;
                return reply.status(200).send({
                    value,
                    category
                })
            }
        )
        done()
        
    }, { prefix : "/receipt" });


} 