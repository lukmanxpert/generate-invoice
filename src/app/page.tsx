import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  const isRed = true;
  return (
    <div>
      <h1 className={cn("text-red-500", isRed === true && "bg-yellow-500")}>
        Generate Invoice
      </h1>
      <Link href={"/dashboard"} className={cn(buttonVariants({variant: "outline"}))}>Dashboard</Link>
    </div>
  );
}
