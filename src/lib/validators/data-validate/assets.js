import { z } from "zod";
import { messages } from "@/lib/utils/messages";
import { isObjectId } from "@/lib/utils";


export const queryAssetListSchema = z.object({
  page: z.number({ required_error: messages.validationError.page }).gte(1, { message: messages.validationError.page }),
  limit: z.number({ required_error: messages.validationError.limit }).gte(10, { message: messages.validationError.limit }).lte(25, { message: messages.validationError.limit }),
  destination: z.string({ message: messages.validationError.destination }).optional(),
  search: z.string({ message: messages.validationError.search }).optional(),
  archivedAt: z.boolean().optional()
})

export const queryAssetDownloadSchema = z.object({
  page: z.number({ required_error: messages.validationError.page }).optional(),
  limit: z.number({ required_error: messages.validationError.limit }).optional(),
  destination: z.string({ message: messages.validationError.destination }).optional(),
  search: z.string({ message: messages.validationError.search }).optional(),
  archivedAt: z.boolean().optional()
})

export const assetIdSchema = z.object({
  assetId: z.string().refine(value => isObjectId(value))
})