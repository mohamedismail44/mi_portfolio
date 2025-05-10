"use client";
import { use, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import parse from "html-react-parser";
import { getDataById } from "../../backend/controllers";
import { ThreeCircles } from "react-loader-spinner";
import Image from "next/image"; // استيراد مكون Image

export default function CustomSwiper({ params }) {
  const [singlePost, setSinglePost] = useState(null);
  const postID = use(params).id;

  useEffect(() => {
    getDataById("posts", postID, setSinglePost);
  }, [postID]);

  if (!singlePost) {
    return (
      <div className="flex flex-col justify-center items-center ">
        <ThreeCircles
          visible={true}
          height="200"
          width="200"
          color="#6366f1"
          ariaLabel="three-circles-loading"
        />
        <span className="text-4xl my-3 font-semibold text-[#6366f1]">
          loading ...
        </span>
      </div>
    );
  }

  return (
    <div className="md:mx-20 ">
      <div className="flex items-center md:justify-between flex-col md:flex-row gap-5 ">
        <div className="md:w-[50%] w-full">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            pagination={true}
            navigation={true}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="w-full shadow-xl border rounded-lg"
          >
            {singlePost.postImages.map((slide) => (
              <SwiperSlide key={slide.public_id}>
                <Image
                  src={slide.url}
                  alt="Post Image"
                  className="w-full"
                  layout="responsive" // استخدام layout مناسب
                  width={500} // عرض الصورة
                  height={300} // ارتفاع الصورة
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex md:flex-col md:justify-center md:gap-5 justify-around md:w-[35%] w-full">
          <a
            href={singlePost?.previewLink}
            target="_blank"
            className="text-center capitalize md:text-2xl font-medium bg-sky-500 hover:bg-sky-600 text-white shadow-sm px-2 md:py-4 py-2 rounded-md duration-300 md:w-[90%] w-[45%]"
          >
            live preview
          </a>
          <a
            href={singlePost?.githubLink}
            target="_blank"
            className="text-center capitalize md:text-2xl font-medium bg-lime-500 hover:bg-lime-600 text-white shadow-sm px-2 md:py-4 py-2 rounded-md duration-300 md:w-[90%] w-[45%]"
          >
            Project in GitHub
          </a>
        </div>
      </div>
      <div className="flex justify-center items-center w-full">
        <span className="md:w-[70%] text-center dark:text-white">
          {parse(singlePost.description)}
        </span>
      </div>
    </div>
  );
}