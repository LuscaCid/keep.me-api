import { FastifyBaseLogger, FastifyInstance, RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerDefault } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export type FastifyInstanceZod = FastifyInstance<
    RawServerDefault,
    RawRequestDefaultExpressionm,
    RawReplyDefaultExpression,
    FastifyBaseLogger,
    ZodTypeProvider
>