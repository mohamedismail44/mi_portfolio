"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function HeroSection() {
  const t = useTranslations("HeroSection");

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="grid max-w-screen-xl px-4 pt-10 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 ">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-2xl font-bold leading-none tracking-tight md:text-3xl xl:text-4xl dark:text-white">
            {t("title")}
          </h1>

          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            {t("description1")}
          </p>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            {t("description2")}
          </p>
        </div>

        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <Image
            src="https://demo.themesberg.com/landwind/images/hero.png"
            alt="hero image"
            width={600}
            height={500}
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
