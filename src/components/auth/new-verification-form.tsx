"use client";

import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useRouter, useSearchParams } from "next/navigation";

import { newVerification } from "@/actions/new-verification";
import { toast } from "sonner";

export const NewVerificationForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        if (data.success) toast.success(data.success);
        setError(data.error);
        if (data.error) toast.error(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      })
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
    if (success) router.push("/auth/login");
    if (error) router.push("/auth/error");
  }, [error, onSubmit, router, success]);

  return (
    <div className="flex items-center w-full justify-center">
      {!success && !error && (
        <BeatLoader />
      )}
    </div>
  )
}