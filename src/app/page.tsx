import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  const isRed = true;
  return (
    <div>
      <h1 className={cn("text-red-500", isRed === true && "bg-yellow-500")}>
        Generate Invoice
      </h1>
      <Button>Click Me!</Button>
    </div>
  );
}
