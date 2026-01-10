"use client";
import { motion } from "framer-motion";
import { FiArrowDownCircle } from "react-icons/fi";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";
import { useState } from "react";
import HireMeModal from "../HireMeModal";
// import ParticlesContainer from "../ParticlesContainer";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

function AppBanner() {
  const [activeTheme] = useThemeSwitcher();
  const [showModal, setShowModal] = useState(false);
  const locale = useLocale();

  const t = useTranslations("banner");

  const showHireMeModal = () => {
    const html = document.getElementsByTagName("html")[0];
    if (!showModal) {
      html.classList.add("overflow-y-hidden");
    } else {
      html.classList.remove("overflow-y-hidden");
    }
    setShowModal((prev) => !prev);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
      className="relative w-full py-5 flex items-center justify-center overflow-hidden "
    >
      {/* خلفية Particles
      <div className="absolute inset-0 z-0">
        <ParticlesContainer />
      </div> */}

      {/* المحتوى فوق الخلفية */}
      <div className="relative z-10 flex flex-col sm:justify-between items-center sm:flex-row mt-5 md:mt-2 w-full px-4">
        <div className="w-full md:w-1/3 text-left">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.9, delay: 0.1 }}
            className="font-general-semibold text-2xl lg:text-3xl xl:text-4xl text-center sm:text-left text-ternary-dark dark:text-primary-light uppercase"
          >
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
            className={` capitalize font-general-medium mt-4 text-xl xl:text-2xl  leading-normal text-gray-600 dark:text-gray-200
              ${locale === "ar" ? "text-right" : "text-left"}
              `}
          >
            {t("discription")}
            <br />
            {t("point1")}
            <br />
            {t("point2")}
            <br />
            {t("point3")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.9, delay: 0.3 }}
            className="flex justify-center sm:block"
          >
            <button
              onClick={showHireMeModal}
              aria-label="Hire Me Button"
              className="bg-gradient-to-r flex justify-center items-center gap-2 from-purple-500 to-primaryColor-500 text-white font-semibold py-3 px-2 mt-5 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              <FiArrowDownCircle className="text-2xl" />
              <span className="text-lg"> {t("hireMe")}</span>
            </button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: -180 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
          className="w-full sm:w-2/3 text-right float-right mt-8 sm:mt-0 sm:block hidden"
        >
          <Image
            layout="responsive"
            src={
              activeTheme === "dark"
                ? "/images/developer.svg"
                : "/images/developer-dark.svg"
            }
            alt="Developer"
            width={500}
            height={500}
          />
        </motion.div>
        {showModal && <HireMeModal onClose={showHireMeModal} />}
      </div>
    </motion.section>
  );
}

export default AppBanner;
