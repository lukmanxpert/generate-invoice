"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export default function OnboardingPage() {
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
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div className="flex justify-center items-center flex-col min-h-dvh h-dvh overflow-auto relative p-4">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(140,0,255,0.13)_0,rgba(140,0,255,0)_50%,rgba(140,0,255,0)_100%)]"></div>
      <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      <Card className="min-w-xs z-10 lg:min-w-sm w-full max-w-sm">
        <CardHeader>
          <CardTitle>You&apos;re almost finished</CardTitle>
          <CardDescription>
            Enter your information to create an account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className=" grid gap-2">
              <Label>First Name</Label>
              <input
                type="text"
                placeholder="Joe"
                {...register("firstName", { required: true })}
              />
              {errors.firstName && (
                <p className="text-xs text-red-500">{errors.firstName.message}</p>
              )}
            </div>
            <div className=" grid gap-2">
              <Label>Last Name</Label>
              <input type="text" name="" id="" placeholder="Due" />
            </div>
            <div className="grid gap-2">
              <Label>Select Currency</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(currencyOptions).map(
                    (item: string, idx: number) => {
                      return (
                        <SelectItem key={idx} value={item}>
                          {item}
                        </SelectItem>
                      );
                    }
                  )}
                </SelectContent>
              </Select>
            </div>
            <Button>Finish Onboarding</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
