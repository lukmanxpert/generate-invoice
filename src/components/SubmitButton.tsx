"use client"
import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

export default function SubmitButton({ title }: { title: string }) {
  const { pending } = useFormStatus();
  return <Button className="cursor-pointer">{pending ? "Please wait..." : title}</Button>;
}
