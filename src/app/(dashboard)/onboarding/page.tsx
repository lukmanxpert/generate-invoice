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
import React from "react";

export default function OnboardingPage() {
  return (
    <div className="flex justify-center items-center flex-col min-h-dvh h-dvh overflow-auto relative p-4">
      <Card className="min-w-xs lg:min-w-sm w-full max-w-sm">
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
              <input type="text" name="" id="" placeholder="Joe" />
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
                      return <SelectItem key={idx} value={item}>{item}</SelectItem>;
                    }
                  )}
                </SelectContent>
              </Select>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
