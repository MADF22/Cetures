"use client";

import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Clock8, File } from "lucide-react";
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";

export default function DocumentPage() {
  const { user } = useUser();
  const router = useRouter();
  const create = useMutation(api.documents.create);
  const documents = useQuery(api.documents.getAll);
  const swiperRef = useRef<SwiperCore | null>(null);
  const navigationPrevRef = useRef<HTMLDivElement>(null);
  const navigationNextRef = useRef<HTMLDivElement>(null);

  const getGreetingMessage = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 15) return "Good Afternoon";
    if (hour >= 15 && hour < 18) return "Good Evening";
    return "Good Night";
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

        <div className="relative group">
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-white via-white/70 to-transparent z-10 pointer-events-none hidden md:block" />

          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              // Workaround untuk navigation elements yang belum ter-render
              setTimeout(() => {
                swiper.navigation.init();
                swiper.navigation.update();
              });
            }}
            spaceBetween={16}
            slidesPerView={"auto"}
            breakpoints={{
              640: { slidesPerGroup: 2 },
              768: { slidesPerGroup: 3 },
              1024: { slidesPerGroup: 4 },
            }}
            className="!overflow-visible">
            {documents?.map((doc) => (
              <SwiperSlide
                key={doc._id}
                className="!w-[calc(100%-16px)] sm:!w-[calc(50%-16px)] md:!w-[calc(33.333%-16px)] lg:!w-[calc(25%-16px)]">
                <div
                  className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
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
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <div
            ref={navigationPrevRef}
            className="swiper-button-prev !-left-4 !text-gray-600 hover:!text-gray-900 dark:!text-gray-400 dark:hover:!text-gray-100 !transition-colors"
          />
          <div
            ref={navigationNextRef}
            className="swiper-button-next !-right-4 !text-gray-600 hover:!text-gray-900 dark:!text-gray-400 dark:hover:!text-gray-100 !transition-colors"
          />

          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white via-white/70 to-transparent z-10 pointer-events-none hidden md:block" />
        </div>
      </div>
    </div>
  );
}
