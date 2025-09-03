import Logo from "@/components/Logo";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <main className="relative min-h-dvh pb-10">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
        <header className="h-14 flex items-center backdrop-blur-2xl px-4">
          <div className="container mx-auto flex justify-between items-center gap-4">
            <Logo />
            <Link href={"/login"} className={buttonVariants()}>Get Started</Link>
          </div>
        </header>
        <div>
          <div className="flex items-center justify-center mt-14 lg:mt-28 flex-col gap-4">
            <div className="text-2xl font-bold lg:text-5xl">
              Easy Invoicing, Happy Business
            </div>
            <p>We make if effortless so your business stays happy</p>
          </div>
        </div>
        <div className="flex w-full items-center justify-center mt-14">
          <Image
            src={"/dashboard.png"}
            alt="dashboard"
            width={1000}
            height={700}
            className="rounded shadow-2xl drop-shadow-2xl"
          />
        </div>
      </main>

      <footer className="bg-primary text-white flex justify-center items-center py-8">
        <p className="font-semibold text-lg flex items-center gap-2">
          Developed with <FaHeart color="red" /> <Link href={"https://www.linkedin.com/in/lukmanxpert/"} target="_blank" className="italic hover:underline cursor-pointer">Sheikh Lukman</Link>
        </p>
      </footer>
    </>
  );
}
