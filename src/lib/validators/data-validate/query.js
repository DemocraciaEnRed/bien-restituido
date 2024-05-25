import { z } from "zod";
import { messages } from "../../utils/messages";


export const queryUserListSchema = z.object({
    page: z.number().gte(1, { message: messages.validationError.page }),
    limit: z.number().gte(10, { message: messages.validationError.limit }).lte(25, { message: messages.validationError.limit }),
    query: z.string({ message: messages.validationError.query }),
    includeDeleted: z.boolean({ message: messages.validationError.boolean }),
}).partial()