"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/features/auth/auth.schema";
import z from "zod";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SignUpPage() {
  const [serverError, setServerError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    setServerError("");

    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/confirm`,
        data: {
          name: values.name,
        },
      },
    });

    if (error) {
      setServerError(error.message);
      return;
    }

    setEmailSent(true);
  };

  return (
    <Card className="w-full rounded-xl border border-border bg-white py-6 text-[#171717] shadow-none ring-0 sm:py-7">
      <CardHeader>
        <p className="text-xs font-medium tracking-[0.12em] text-muted-foreground">
          GET STARTED
        </p>
        <CardTitle className="mt-2 text-2xl tracking-tight">
          Create an account
        </CardTitle>
        <CardDescription>
          Enter your details to get started with Skills Vault.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {emailSent ? (
          <div
            role="status"
            className="rounded-md border border-[#dfdfdf] bg-[#fafafa] p-4 text-sm leading-6 text-[#212121]"
          >
            Check your inbox for a confirmation link to finish creating your
            account.
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Ada Lovelace"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="ada@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>
          {serverError && (
            <p role="alert" className="text-sm text-destructive">
              {serverError}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Sign up"}
          </Button>
          </form>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
