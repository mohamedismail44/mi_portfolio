"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiSun, FiMoon, FiX, FiMenu } from "react-icons/fi";
import { MdLanguage } from "react-icons/md";
import HireMeModal from "../HireMeModal";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

function AppHeader() {
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
  const showHireMeModal = () => {
    const html = document.getElementsByTagName("html")[0];
    if (!showModal) {
      html.classList.add("overflow-y-hidden");
    } else {
      html.classList.remove("overflow-y-hidden");
    }
    setShowModal((prev) => !prev);
  };

  // ........................NavLinks.................
  const NavLinks = () => (
    <>
      <LinkItem href="/projects" label={t("Projects")} />
      <LinkItem href="/contact" label={t("Contact")} />
      <LinkItem href="/about" label={t("About Me")} />
    </>
  );

  const LinkItem = ({ href, label }) => (
    <div className="block text-xl font-semibold m-6 mb-3 group relative w-max dark:text-ternary-light dark:hover:text-indigo-400 hover:text-indigo-400 text-indigo-800 duration-200">
      <Link href={href} aria-label={label}>
        {label}
      </Link>
      <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-full"></span>
    </div>
  );

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      id="nav"
      className="sm:container sm:mx-auto"
    >
      <div className="z-10 max-w-screen-lg xl:max-w-screen-xl block sm:flex sm:justify-between sm:items-center py-6">
        <div className="flex justify-between items-center px-4 sm:px-0">
          <Link href="/">
            <div>
              <span className="uppercase font-bold md:text-5xl text-3xl text-indigo-500">
                𝒨𝒾
              </span>
              <span className="ml-1 font-bold md:text-3xl text-xl text-indigo-800 dark:text-indigo-300">
                Portfolio
              </span>
            </div>
          </Link>

          <button
            onClick={showHireMeModal}
            className="sm:hidden font-general-medium block text-md bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm px-4 py-2 rounded-md duration-300 w-24"
            aria-label="Hire Me Button"
          >
            Hire Me
          </button>

          <div className="sm:hidden flex gap-1">
            <div
              onClick={() => setTheme(activeTheme)}
              aria-label="Theme Switcher"
              className="block ml-0 bg-primary-light dark:bg-ternary-dark p-3 shadow-sm rounded-xl cursor-pointer"
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
              className="sm:hidden focus:outline-none"
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

        <div
          className={`${
            showMenu ? "block" : "hidden"
          } sm:hidden px-5 py-3 justify-between items-center shadow-lg`}
        >
          <NavLinks />
          <button
            onClick={showHireMeModal}
            className="font-general-medium block text-md bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm rounded-sm px-4 py-2 mt-2 duration-300 w-24"
            aria-label="Hire Me Button"
          >
            Hire Me
          </button>
        </div>

        <div className="hidden sm:flex">
          <NavLinks />
        </div>
        <div className="hidden sm:flex justify-between items-center gap-2">
          <button
            onClick={showHireMeModal}
            className="text-md font-general-medium bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm rounded-md px-5 py-2.5 duration-300"
            aria-label="Hire Me Button"
          >
            Hire Me
          </button>

          <div className="flex items-center ">
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

      {showModal && <HireMeModal onClose={showHireMeModal} />}
    </motion.nav>
  );
}

export default AppHeader;
