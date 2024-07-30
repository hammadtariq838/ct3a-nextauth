import { UserGroup, UserRole } from "@prisma/client";
import * as z from "zod";

export const NewPasswordSchema = z.object({
  password: z.string().min(8, { message: "Minimum of 8 characters required" }),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  rememberMe: z.number(),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(8, { message: "Minimum 8 characters required" }),
  role: z.nativeEnum(UserRole),
  group: z.nativeEnum(UserGroup),
  termsAndConditions: z.number(),
});

export const TutorRegisterSchema = RegisterSchema.extend({
  university: z.string(),
});

export const UserRoleGroupCombinationSchema = z.union([
  z.object({
    role: z.literal("TUTOR"),
    group: z
      .union([z.literal("ENROLLED"), z.literal("GRADUATED")])
      .default("ENROLLED"),
  }),
  z.object({
    role: z.literal("STUDENT"),
    group: z.union([z.literal("SELF"), z.literal("PARENT")]).default("SELF"),
  }),
  z.object({
    role: z.literal("ADMIN"),
    group: z.literal("ADMIN"),
  }),
]);

export type TUserRoleGroupCombination = z.infer<
  typeof UserRoleGroupCombinationSchema
>;
