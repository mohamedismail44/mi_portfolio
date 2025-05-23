"use client";
import { motion } from "framer-motion";
import { FiArrowDownCircle } from "react-icons/fi";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";
import { useState } from "react";
import HireMeModal from "../HireMeModal";
import Image from "next/image"; // استيراد مكون Image

function AppBanner() {
  const [activeTheme] = useThemeSwitcher();
  const [showModal, setShowModal] = useState(false);
  
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
      className="flex flex-col sm:justify-between items-center sm:flex-row mt-5 md:mt-2"
    >
      <div className="w-full md:w-1/3 text-left">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: "easeInOut",
            duration: 0.9,
            delay: 0.1,
          }}
          className="font-general-semibold text-2xl lg:text-3xl xl:text-4xl text-center sm:text-left text-ternary-dark dark:text-primary-light uppercase"
        >
          Hi, I&apos;m Mohamed Ismail
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: "easeInOut",
            duration: 0.9,
            delay: 0.2,
          }}
          className="capitalize font-general-medium mt-4 text-lg md:text-xl lg:text-2xl xl:text-3xl text-center sm:text-left leading-normal text-gray-500 dark:text-gray-200"
        >
          A Full-Stack Web Developer
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: "easeInOut",
            duration: 0.9,
            delay: 0.3,
          }}
          className="flex justify-center sm:block"
        >
          <button
            onClick={showHireMeModal}
            className="font-general-medium flex justify-center items-center w-36 sm:w-48 mt-12 mb-6 sm:mb-0 text-lg border border-indigo-200 dark:border-ternary-dark py-2.5 sm:py-3 shadow-lg rounded-lg bg-indigo-50 focus:ring-1 focus:ring-indigo-900 hover:bg-indigo-500 text-gray-500 hover:text-white duration-500"
            aria-label="Hire Me Button"
          >
            <FiArrowDownCircle className="ml-0 sm:ml-1 mr-2 sm:mr-3 h-5 w-5 sn:w-6 sm:h-6 duration-100" />
            <span className="text-sm sm:text-lg duration-100">Hire Me</span>
          </button>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: -180 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
        className="w-full sm:w-2/3 text-right float-right mt-8 sm:mt-0"
      >
        <Image
          layout="responsive"
          src={
            activeTheme === "dark"
              ? "/images/developer.svg"
              : "/images/developer-dark.svg"
          }
          alt="Developer"
          width={500} // عرض الصورة
          height={500} // ارتفاع الصورة
        />
      </motion.div>
      {showModal && <HireMeModal onClose={showHireMeModal} />}
    </motion.section>
  );
}

export default AppBanner;