"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import imageBase64 from "@/lib/imageBase64";
import Image from "next/image";
import React, { useState } from "react";

type TSignatureData = {
  name: string;
  image: string;
};

export default function SettingsPage() {
  const [logo, setLogo] = useState<string>("");
  const [signature, setSignature] = useState<TSignatureData>({
    name: "",
    image: "",
  });

  // handle onchange signature: ex.g name
  const onchangeSignature = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignature((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // handle onchange signature image
  const handleSignatureImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length < 0) return;
    const file = files[0];

    // image to base64
    const image = await imageBase64(file);
    setSignature((prev) => ({ ...prev, image: image }));
  };

  return (
    <div className="p-4">
      <div>
        <h1 className="font-semibold text-xl">Settings</h1>
      </div>
      <Accordion type="multiple">
        {/* invoice logo */}
        <AccordionItem value="invoice-logo">
          <AccordionTrigger className="font-semibold text-base cursor-pointer">
            Invoice Logo
          </AccordionTrigger>
          <AccordionContent>
            <form className="w-full grid gap-2">
              <Input type="file" className="max-w-sm w-full" />
              <div className="w-full max-w-sm">
                {signature.image ? (
                  <Image
                    className="aspect-square h-20 border-2 border-dotted max-h-20 object-scale-down"
                    src={signature.image}
                    alt="signature sign"
                    width={205}
                    height={96}
                  />
                ) : (
                  <div className="aspect-video h-20 border-2 border-dotted flex justify-center items-center rounded-lg">
                    <p className="text-center text-muted-foreground">
                      No logo selected
                    </p>
                  </div>
                )}
              </div>
              <Button variant={"outline"} className="w-fit cursor-pointer">
                Save
              </Button>
            </form>
          </AccordionContent>
        </AccordionItem>
        {/* signature in invoice */}
        <AccordionItem value="Signature Invoice">
          <AccordionTrigger className="font-semibold text-base cursor-pointer">
            Signature Invoice
          </AccordionTrigger>
          <AccordionContent>
            <form className="w-full grid gap-2">
              <Input
                type="text"
                placeholder="Enter your signature name"
                value={signature.name}
                onChange={onchangeSignature}
                name="name"
              />
              {/* <Input type="file" className="max-w-sm w-full" /> */}
              <div className="w-full max-w-sm">
                {logo ? (
                  <Image
                    className="aspect-square h-20 border-2 border-dotted max-h-20 object-scale-down"
                    src={logo}
                    alt="invoice logo"
                    width={205}
                    height={96}
                  />
                ) : (
                  <div className="aspect-video h-20 border-2 border-dotted flex justify-center items-center rounded-lg">
                    <p className="text-center text-muted-foreground">
                      No logo selected
                    </p>
                  </div>
                )}
              </div>
              <Button variant={"outline"} className="w-fit cursor-pointer">
                Save
              </Button>
            </form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
