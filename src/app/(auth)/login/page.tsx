import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth";
import React from "react";

export default function LoginPage() {
  return (
    <Card className="max-w-sm min-w-xs lg:min-w-sm">
      <CardHeader>
        <CardTitle className="text-xl w-full">Login</CardTitle>
        <CardDescription>
          Enter your email bellow to login in your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          action={async (formData) => {
            "use server";
            await signIn("resend", formData);
          }}
          className="grid gap-6"
        >
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input
              placeholder="hello@example.com"
              required
              type="email"
              name="email"
            ></Input>
          </div>
          <Button className="w-full">Login</Button>
        </form>
      </CardContent>
    </Card>
  );
}
