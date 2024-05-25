import { z } from "zod";
import { messages } from "../../utils/messages";
import { UserSchema } from "@/lib/models/User";
import constants from "@/lib/services/constants";



export const updateUserSchema = z.object({
    name: z.string().min(1, { message: messages.validationError.name }),
    bio: z.string({ message: messages.validationError.string })
});




export const changePasswordSchema = z.object({
    currentPassword: z.string().min(6, {
        message: messages.validationError.password,
    }),
    newPassword: z.string().min(6, {
        message: messages.validationError.password,
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
});;




export const userIdSchema = z.object({
    userId: z.union([z.any(), UserSchema])
})

export const roleSchema = z.object({
    role: z.string().refine(value => constants.ROLES.ALL.includes(value), {
        message: messages.validationError.role,
    })
})

export const singlePasswordSchema = z.object({
    password: z.string().min(6, {
        message: messages.validationError.password,
    }),
});

export const forceVerifiedSchema = z.object({
    forceVerified: z.boolean({ message: messages.validationError.boolean }).optional(),

})