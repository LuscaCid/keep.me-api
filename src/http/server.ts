import "dotenv/config"
import { fastify } from "fastify"
import { fastifyCors } from "@fastify/cors";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { expenseRoutes } from "../infraestructure/routes/expense";
import { receiptRoutes } from "../infraestructure/routes/receipt";
const app = fastify().withTypeProvider<ZodTypeProvider>();

const port = Number(process.env["PORT"]) || 5000
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors, { origin : "*" });

app.register(fastifySwagger, { 
    transform : jsonSchemaTransform,
    openapi : {
    info : {
        version : "1.0.0",
        title : "Keep.me-api"
    },
}});
app.register(fastifySwaggerUi, { routePrefix : "/docs", });
const appRoutes = () => {
    app.get("/test", (req, response) => {
        return { message : "hello world", status : 200 }
    })
}

app.register(appRoutes);
app.register(expenseRoutes);
app.register(receiptRoutes);

app.listen({ port }).then(() => console.log(`the server is running on port ${port}`)) 