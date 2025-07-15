"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { currencyOptions } from "@/lib/utils";
import { onboardingSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

interface UserEditProfile {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined | null;
  currency: string | undefined;
}

export default function UserProfileEdit({
  firstName,
  lastName,
  email,
  currency,
}: UserEditProfile) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      currency: "USD",
    },
  });
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const onSubmit = async (data: z.infer<typeof onboardingSchema>) => {
    try {
      setLoading(true);
      const response = await fetch("/api/users", {
        method: "put",
        body: JSON.stringify(data),
      });
      // const responseData = await response.json();
      if (response.status === 200) {
        return router.push("/dashboard");
      }
    } catch (error) {
      console.log("error :>> ", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className=" grid gap-2">
        <Label>First Name</Label>
        <Input
          type="text"
          placeholder="Joe"
          disabled={loading}
          {...register("firstName", { required: true })}
        />
        {errors.firstName && (
          <p className="text-xs text-red-500">{errors.firstName.message}</p>
        )}
      </div>
      <div className=" grid gap-2">
        <Label>Last Name</Label>
        <Input
          type="text"
          placeholder="Due"
          disabled={loading}
          {...register("lastName", { required: true })}
        />
        {errors.lastName && (
          <p className="text-xs text-red-500">{errors.lastName.message}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label>Select Currency</Label>
        <Select defaultValue="USD" {...register("currency")}>
          <SelectTrigger>
            <SelectValue placeholder="Select Currency" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(currencyOptions).map((item: string, idx: number) => {
              return (
                <SelectItem key={idx} value={item}>
                  {item}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <Button className="cursor-pointer" disabled={loading}>
        {loading ? "Please wait..." : "Finish Onboarding"}
      </Button>
    </form>
  );
}
