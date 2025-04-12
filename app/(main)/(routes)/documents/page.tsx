"use client";

import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Clock8, File } from "lucide-react";
import Flickity from "flickity";
import "flickity/css/flickity.css";
import { useEffect, useRef } from "react";

// Hapus deklarasi module di sini dan pindahkan ke file terpisah

export default function DocumentPage() {
  const { user } = useUser();
  const router = useRouter();
  const create = useMutation(api.documents.create);
  const documents = useQuery(api.documents.getAll);
  const carouselRef = useRef<HTMLDivElement>(null);
  const flickityRef = useRef<Flickity | null>(null);

  useEffect(() => {
    if (!carouselRef.current || !documents?.length) return;

    let carousel: Flickity | null = null;
    const handleHover = (opacity: string) => {
      const buttons = carouselRef.current?.querySelectorAll(".flickity-button");
      buttons?.forEach((button) => {
        (button as HTMLElement).style.opacity = opacity;
      });
    };

    const initializeCarousel = () => {
      if (!flickityRef.current) {
        carousel = new Flickity(carouselRef.current, {
          cellAlign: "left",
          contain: true,
          groupCells: 4,
          pageDots: false,
          prevNextButtons: true,
          wrapAround: true,
          autoPlay: false,
          arrowShape: {
            x0: 10,
            x1: 60,
            y1: 50,
            x2: 65,
            y2: 45,
            x3: 20,
          },
        });

        carouselRef.current.addEventListener("mouseenter", () =>
          handleHover("1"),
        );
        carouselRef.current.addEventListener("mouseleave", () =>
          handleHover("0"),
        );
        flickityRef.current = carousel;
      }
    };

    initializeCarousel();

    return () => {
      if (flickityRef.current) {
        carouselRef.current?.removeEventListener("mouseenter", () =>
          handleHover("1"),
        );
        carouselRef.current?.removeEventListener("mouseleave", () =>
          handleHover("0"),
        );
        flickityRef.current.destroy();
        flickityRef.current = null;
      }
    };
  }, [documents]);

  const getGreetingMessage = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 15) {
      return "Good Afternoon";
    } else if (hour >= 15 && hour < 18) {
      return "Good Evening";
    } else {
      return "Good Night";
    }
  };

  const onCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentId) =>
      router.push(`/documents/${documentId}`),
    );

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created",
      error: "Failed to create new note",
    });
  };

  return (
    <div className="h-full flex flex-col items-center space-y-6 py-12 px-4 md:px-8 lg:px-16">
      <h2 className="font-bold text-3xl md:text-4xl text-center">
        {getGreetingMessage()}, {user?.firstName}
      </h2>
      <div className="mt-6 w-full max-w-4xl relative">
        <div className="text-sm font-medium mb-4 flex items-center space-x-2">
          <Clock8 className="w-5" />
          <h5>Recently visited</h5>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/70 to-transparent z-10 pointer-events-none hidden md:block" />
          <div ref={carouselRef} className="element-items flickity-carousel">
            {documents?.map((doc) => (
              <div
                key={doc._id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flickity-slide"
                onClick={() => router.push(`/documents/${doc._id}`)}>
                <File />
                <h4 className="font-bold text-lg truncate">{doc.title}</h4>
                <div className="flex items-center gap-x-2 mt-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user?.imageUrl} />
                  </Avatar>
                  <p className="text-sm font-normal truncate">
                    {user?.fullName}&apos;s
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/70 to-transparent z-10 pointer-events-none hidden md:block" />
        </div>
      </div>
    </div>
  );
}
