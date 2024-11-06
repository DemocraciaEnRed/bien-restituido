import { z } from "zod";
import { messages } from "@/lib/utils/messages";
import { UserSchema } from "@/lib/models/User";
import { userRoles } from "@/lib/utils/constants";

export const updateUserSchema = z.object({
    username: z.string().min(1, { message: messages.validationError.name }),
    email: z.string({ message: messages.validationError.string }).email({ message: messages.validationError.email }),
    currentPassword: z.string().min(6, {
        message: messages.validationError.password,
    }).optional(),
    newPassword: z.string().min(6, {
        message: messages.validationError.password,
    }).optional(),
    confirmPassword: z.string().min(6, {
        message: messages.validationError.password,
    }).optional(),
}).refine((data) => {
    return !data.newPassword || !data.confirmPassword || data.newPassword === data.confirmPassword;
}, {
    message: "Passwords must match",
    path: ["confirmPassword"],
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
    path: ["confirmPassword"],
});;


export const userIdSchema = z.object({
    userId: z.union([z.any(), UserSchema])
})

export const roleSchema = z.object({
    role: z.string().refine(value => Object.values(userRoles).includes(value), {
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