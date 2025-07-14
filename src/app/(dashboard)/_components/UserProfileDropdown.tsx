import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/auth";
import getAvatarName from "@/lib/getAvatarName";
import { ChevronDown } from "lucide-react";
import React from "react";

export default async function UserProfileDropdown() {
  const session = await auth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-3 cursor-pointer">
          <Avatar className="border size-9 bg-neutral-300">
            <AvatarImage src={session?.user.image as string} />
            <AvatarFallback>
              {getAvatarName(
                session?.user.firstName as string,
                session?.user.lastName as string
              )}
            </AvatarFallback>
          </Avatar>
          <div>
            <p>
              <span>{session?.user.firstName}</span>{" "}
              <span>{session?.user.lastName}</span>
            </p>
          </div>
          <ChevronDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>Pop Over</DropdownMenuContent>
    </DropdownMenu>
  );
}
