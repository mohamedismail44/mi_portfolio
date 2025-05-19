"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiSun, FiMoon, FiX, FiMenu } from "react-icons/fi";
import HireMeModal from "../HireMeModal";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";

function AppHeader() {
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeTheme, setTheme] = useThemeSwitcher();

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

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      id="nav"
      className="sm:container sm:mx-auto"
    >
      <div className="z-10 max-w-screen-lg xl:max-w-screen-xl block sm:flex sm:justify-between sm:items-center py-6">
        {/* Logo and Hamburger Menu */}
        <div className="flex justify-between items-center px-4 sm:px-0">
          <Link href="/">
            <div className="">
              <span className="uppercase font-bold md:text-5xl text-3xl text-indigo-500">
                𝒨𝒾
              </span>
              <span className="ml-1 font-bold md:text-3xl text-xl text-indigo-800 dark:text-indigo-300">
                Portfolio
              </span>
            </div>
          </Link>
          <div
            onClick={() => setTheme(activeTheme)}
            aria-label="Theme Switcher"
            className="block sm:hidden ml-0 bg-primary-light dark:bg-ternary-dark p-3 shadow-sm rounded-xl cursor-pointer"
          >
            {activeTheme === "dark" ? (
              <FiMoon className="text-ternary-dark hover:text-gray-400 dark:text-ternary-light dark:hover:text-primary-light text-xl" />
            ) : (
              <FiSun className="text-gray-200 hover:text-gray-50 text-xl" />
            )}
          </div>

          <button
            onClick={showHireMeModal}
            className="sm:hidden font-general-medium block text-md bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm  px-4 py-2 rounded-md duration-300 w-24"
            aria-label="Hire Me Button"
          >
            Hire Me
          </button>
          <button
            onClick={toggleMenu}
            type="button"
            className="sm:hidden focus:outline-none"
            aria-label="Hamburger Menu"
          >
            {showMenu ? (
              <FiX className="text-3xl dark:text-gray-200" />
            ) : (
              <FiMenu className="text-3xl  dark:text-gray-200" />
            )}
          </button>
        </div>

        {/* Small Screen Menu */}
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

        {/* Large Screen Menu */}
        <div className="hidden sm:flex justify-between items-center">
          <NavLinks />
          <button
            onClick={showHireMeModal}
            className="text-md font-general-medium bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm rounded-md px-5 py-2.5 duration-300"
            aria-label="Hire Me Button"
          >
            Hire Me
          </button>

          <div>
            <label className="flex gap-1 mx-3 " htmlFor="language">
              <span className="text-sm font-medium text-gray-700">
                language
              </span>
              <select
                name="language"
                id="language"
                className="mt-0.5 text-center w-full rounded border border-indigo-500 shadow-sm sm:text-sm"
              >
                <option value="" disabled>
                  language
                </option>
                <option value="en">English</option>
                <option value="ar">عربي</option>
              </select>
            </label>
          </div>

          <div
            onClick={() => setTheme(activeTheme)}
            aria-label="Theme Switcher"
            className="ml-8 bg-primary-light dark:bg-ternary-dark p-3 shadow-sm rounded-xl cursor-pointer"
          >
            {activeTheme === "dark" ? (
              <FiMoon className="text-ternary-dark hover:text-gray-400 dark:text-ternary-light dark:hover:text-primary-light text-xl" />
            ) : (
              <FiSun className="text-gray-200 hover:text-gray-50 text-xl" />
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && <HireMeModal onClose={showHireMeModal} />}
    </motion.nav>
  );
}

const NavLinks = () => (
  <>
    <LinkItem href="/projects" label="Projects" />
    <LinkItem href="/about" label="About Me" />
    <LinkItem href="/contact" label="Contact" />
    {/* <LinkItem href="/admin-dashboard" label="Dashboard" /> */}
  </>
);

const LinkItem = ({ href, label }) => (
  <div className="block text-lg  dark:text-ternary-light dark:hover:text-indigo-400 hover:text-indigo-400  sm:mx-4 mb-2 sm:py-2 font-medium text-indigo-800 duration-200">
    <Link href={href} aria-label={label}>
      {label}
    </Link>
  </div>
);

export default AppHeader;
