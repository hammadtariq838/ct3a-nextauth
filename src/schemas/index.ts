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
  role: z.string(),
  group: z.string(),
  termsAndConditions: z.number(),
});

export const TutorRegisterSchema = RegisterSchema.extend({
  university: z.string(),
});

export const UserRoleGroupCombinationSchema = z.union([
  z.object({
    role: z.literal("tutor"),
    group: z
      .union([z.literal("enrolled"), z.literal("graduate")])
      .default("enrolled"),
  }),
  z.object({
    role: z.literal("student"),
    group: z
      .union([z.literal("student"), z.literal("parent")])
      .default("student"),
  }),
  z.object({
    role: z.literal("admin"),
    group: z.literal("admin"),
  }),
]);

export type TUserRoleGroupCombination = z.infer<
  typeof UserRoleGroupCombinationSchema
>;
