import { z } from "zod";
import { isObjectId } from "@/lib/utils";

export const extraFieldIdSchema = z.object({
  extraFieldId: z.union([z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/), z.string().refine(value => isObjectId(value))])
})