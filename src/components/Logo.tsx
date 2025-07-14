import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <div>
      <Image src={"/logo.png"} width={180} height={50} alt="generate invoice" />
    </div>
  );
}
