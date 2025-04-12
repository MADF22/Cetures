import { Poppins } from "next/font/google";
import Image from "next/image";
import { cn } from "@/lib/utils";

const font = Poppins({ subsets: ["latin"], weight: ["400", "600"] });

export const Logo = () => {
  return (
    <div className="flex items-center gap-x-2">
      <Image
        src="/Logo-01.svg"
        alt="Logo"
        height={30}
        width={30}
        className="dark:hidden"
      />
      <Image
        src="/logo-dark.svg"
        alt="Logo"
        height={30}
        width={30}
        className="hidden dark:block"
      />
      <p className={cn("font-semibold text-sm md:text-base", font)}>Fertilis</p>
    </div>
  );
};
