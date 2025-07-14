import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/auth";
import React from "react";

export default async function UserProfileDropdown() {
  const session = await auth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div>
          <Avatar>
            <AvatarImage src={session?.user.image as string} />
            <AvatarFallback>
                SL
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
