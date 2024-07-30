"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";

import { TutorRegisterSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { register } from "@/actions/register";
import { toast } from "sonner";
import { P } from "@/components/Typography";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export const TutorRegisterForm = ({ group }: { group: 'ENROLLED' | 'GRADUATED' }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof TutorRegisterSchema>>({
    resolver: zodResolver(TutorRegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: 'TUTOR',
      group,
      termsAndConditions: 0,
    },
  });

  const onSubmit = (values: z.infer<typeof TutorRegisterSchema>) => {
    startTransition(() => {
      register(values)
        .then((data) => {
          if (data.error) toast.error(data.error);
          if (data.success) toast.success(data.success);
        })
        .finally(() => {
          form.reset();
        });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="group"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  {...field}
                  className="flex flex-col gap-4"
                  onValueChange={(value: 'ENROLLED' | 'GRADUATED') => form.setValue('group', value)}
                >
                  <div className="inline-flex gap-2">
                    <RadioGroupItem value="ENROLLED" />
                    <Label>Enrolled</Label>
                  </div>
                  <div className="inline-flex gap-2">
                    <RadioGroupItem value="GRADUATED" />
                    <Label>Graduate</Label>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isPending}
                  placeholder="John Doe"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="university"
          render={({ field }) => (
            <FormItem>
              <FormLabel>University</FormLabel>
              <FormControl>
                <Select {...field}>
                  <SelectTrigger
                    className="w-full"
                  >
                    <SelectValue>Select University</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="university1">University 1</SelectItem>
                    <SelectItem value="university2">University 2</SelectItem>
                    <SelectItem value="university3">University 3</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="w-full inline-flex justify-between">
                <P>Password</P>
                <Link href="/auth/reset"><P>Forgot Password</P></Link>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input type={passwordVisible == true ? 'text' : 'password'} className="pe-10" placeholder="Password" {...field} />
                  <button className="material-symbols-outlined scale-75 m-1 absolute top-0 -right-0"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible == true ? 'visibility' : 'visibility_off'}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="hidden" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="termsAndConditions"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Checkbox {...field} onCheckedChange={(checked) => form.setValue('termsAndConditions', checked ? 1 : 0)} />
              </FormControl>
              <FormLabel>
                Remember Me
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isPending}
          type="submit"
          className="w-full"
        >
          Submit
        </Button>
      </form>
    </Form >
  );
};
