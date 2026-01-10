"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon, FiX, FiMenu } from "react-icons/fi";
import { MdLanguage } from "react-icons/md";
import HireMeModal from "../HireMeModal";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Image from "next/image";

function AppHeader() {
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTheme, setTheme] = useThemeSwitcher();

  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("navbar");

  const handleLanguageChange = (e) => {
    const newLocale = e.target.value;
    const path = pathname.split("/").slice(2).join("/");
    router.push(`/${newLocale}/${path}`);
  };

  const toggleMenu = () => setShowMenu((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setShowMenu(false);
  }, [pathname]);

  const showHireMeModal = () => {
    const html = document.getElementsByTagName("html")[0];
    if (!showModal) {
      html.classList.add("overflow-y-hidden");
    } else {
      html.classList.remove("overflow-y-hidden");
    }
    setShowModal((prev) => !prev);
  };

  const NavLinks = () => (
    <>
      <LinkItem href="/" label={t("home")} />
      <LinkItem href="/projects" label={t("Projects")} />
      <LinkItem href="/contact" label={t("Contact")} />
      <LinkItem href="/about" label={t("About Me")} />
    </>
  );

  const LinkItem = ({ href, label }) => (
    <div className="block text-lg font-medium m-3 mb-3 group relative w-max dark:text-ternary-light dark:hover:text-secondaryColor-400 hover:text-secondaryColor-400 duration-300">
      <Link href={href} aria-label={label}>
        {label}
      </Link>
      <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-primaryColor-500 group-hover:w-full"></span>
    </div>
  );

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        id="nav"
        className={`w-full fixed z-50 px-4 transition-all duration-300 ${
          isScrolled
            ? "bg-primary-light dark:bg-primary-dark shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="z-10 block lg:flex lg:justify-between lg:items-center py-2 max-w-screen-xl mx-auto">
          {/* Logo + Mobile Controls */}
          <div className="flex justify-between items-center">
            <Link href="/">
              <div className="">
                <Image
                  src="/images/almubarmij-logo.png"
                  alt="Developer"
                  width={140}
                  height={140}
                  className="object-contain"
                />
              </div>
            </Link>

            <div className="lg:hidden flex items-center gap-1">
              <div
                onClick={() => setTheme(activeTheme)}
                aria-label="Theme Switcher"
                className="bg-primary-light dark:bg-ternary-dark p-3 shadow-sm rounded-xl cursor-pointer"
              >
                {activeTheme === "dark" ? (
                  <FiMoon className="text-ternary-dark text-xl" />
                ) : (
                  <FiSun className="text-gray-200 text-xl" />
                )}
              </div>
              <div className="flex items-center">
                <MdLanguage className="text-2xl dark:text-gray-200 text-gray-900" />
                <select
                  name="language"
                  id="language"
                  className="text-center bg-transparent dark:bg-primary-dark dark:text-gray-200 text-gray-900"
                  value={locale}
                  onChange={handleLanguageChange}
                >
                  <option value="en">English</option>
                  <option value="ar">عربي</option>
                </select>
              </div>
              <button
                onClick={toggleMenu}
                type="button"
                className="lg:hidden focus:outline-none p-3"
                aria-label="Hamburger Menu"
              >
                {showMenu ? (
                  <FiX className="text-3xl dark:text-gray-200" />
                ) : (
                  <FiMenu className="text-3xl dark:text-gray-200" />
                )}
              </button>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex">
            <NavLinks />
          </div>

          <div className="hidden lg:flex justify-between items-center gap-2">
            <button
              onClick={showHireMeModal}
              className="text-md font-general-medium bg-primaryColor-500 hover:bg-secondaryColor-600 text-white shadow-sm rounded-md px-5 py-2.5 duration-300"
              aria-label="Hire Me Button"
            >
              {t("hireMe")}
            </button>

            <div className="flex items-center">
              <MdLanguage className="text-2xl dark:text-primary-light text-primary-dark" />
              <select
                name="language"
                id="language"
                className="text-center cursor-pointer bg-transparent dark:bg-primary-dark dark:text-gray-200 text-gray-900"
                value={locale}
                onChange={handleLanguageChange}
              >
                <option value="en">English</option>
                <option value="ar">عربي</option>
              </select>
            </div>

            <div
              onClick={() => setTheme(activeTheme)}
              aria-label="Theme Switcher"
              className="bg-primary-light dark:bg-ternary-dark p-3 shadow-sm rounded-xl cursor-pointer"
            >
              {activeTheme === "dark" ? (
                <FiMoon className="text-ternary-dark text-xl" />
              ) : (
                <FiSun className="text-gray-200 text-xl" />
              )}
            </div>
          </div>
        </div>

        {/* Mobile Sidebar Menu */}
        <AnimatePresence>
          {showMenu && (
            <>
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowMenu(false)}
              />

              <motion.div
                initial={{ x: locale === "ar" ? "-100%" : "100%" }}
                animate={{ x: 0 }}
                exit={{ x: locale === "ar" ? "-100%" : "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`fixed top-0 ${
                  locale === "ar" ? "left-0" : "right-0"
                } h-full w-3/4 max-w-xs z-50 bg-primary-light dark:bg-primary-dark shadow-lg px-5 py-8 flex flex-col`}
              >
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setShowMenu(false)}
                    aria-label="Close Menu"
                  >
                    <FiX className="text-3xl dark:text-gray-200" />
                  </button>
                </div>

                <div className="flex flex-col justify-between h-full">
                  <div>
                    <NavLinks />
                    <button
                      onClick={showHireMeModal}
                      className="font-general-medium block text-md bg-primaryColor-500 hover:bg-secondaryColor-600 text-white shadow-sm rounded-sm px-4 py-2 mt-2 duration-300 w-full"
                      aria-label="Hire Me Button"
                    >
                      {t("hireMe")}
                    </button>
                  </div>

                  <div className="mt-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <MdLanguage className="text-2xl dark:text-gray-200 text-gray-900" />
                      <select
                        name="language"
                        id="language"
                        className="text-center bg-transparent dark:bg-primary-dark dark:text-gray-200 text-gray-900"
                        value={locale}
                        onChange={handleLanguageChange}
                      >
                        <option value="en">English</option>
                        <option value="ar">عربي</option>
                      </select>
                    </div>
                    <div
                      onClick={() => setTheme(activeTheme)}
                      aria-label="Theme Switcher"
                      className="bg-primary-light dark:bg-ternary-dark p-3 shadow-sm rounded-xl cursor-pointer"
                    >
                      {activeTheme === "dark" ? (
                        <FiMoon className="text-ternary-dark text-xl" />
                      ) : (
                        <FiSun className="text-gray-200 text-xl" />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {showModal && <HireMeModal onClose={showHireMeModal} />}
      </motion.nav>

      {/* Spacer below fixed navbar */}
      <div className="h-[72px] lg:h-[80px]" />
    </>
  );
}

export default AppHeader;
