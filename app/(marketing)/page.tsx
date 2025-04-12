import { Heading } from "@/components/marketing/heading";
import { Heroes } from "@/components/marketing/heroes";
import { Footer } from "@/components/marketing/footer";
import Cta from "@/components/marketing/cta";

export default function MarketingPage() {
  return (
    <div className="relative flex flex-col items-center dark:bg-[#1F1F1F] min-h-screen overflow-hidden">
      <div className="absolute -left-20 top-1/3 w-72 h-72 bg-blue-500 opacity-30 blur-3xl rounded-full animate-pulse"></div>{" "}
      <div className="absolute -right-32 -top-40 w-96 h-96 bg-purple-500 opacity-30 blur-3xl rounded-full animate-bounce"></div>{" "}
      <main className="flex flex-col items-center text-center max-w-5xl mx-auto w-full relative">
        <div className="flex flex-col items-center gap-y-20 w-full py-28">
          <Heading />
          <Heroes />
          <Cta />
        </div>
      </main>
      <Footer />
    </div>
  );
}
