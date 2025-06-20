import {
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiGlobe,
  FiYoutube,
} from "react-icons/fi";
import AppFooterCopyright from "./AppFooterCopyright";
import NewsletterSignUp from "../NewsletterSignUp";
import { useTranslations } from "next-intl";

const socialLinks = [
  {
    id: 1,
    icon: <FiGlobe />,
    url: "/",
  },
  {
    id: 2,
    icon: <FiGithub />,
    url: "/",
  },
  {
    id: 3,
    icon: <FiTwitter />,
    url: "/",
  },
  {
    id: 4,
    icon: <FiLinkedin />,
    url: "/",
  },
  {
    id: 5,
    icon: <FiYoutube />,
    url: "/",
  },
];

function AppFooter() {
  const t = useTranslations("footer");

  return (
    <div className=" dark:bg-ternary-dark bg-gray-50">
      <div className="container mx-auto">
        <NewsletterSignUp />
        <div className="pt-5 sm:pt-30 pb-8 border-t-2 border-gray-300 dark:border-secondary-dark">
          {/* Footer social links */}
          <div className="font-general-regular flex flex-col justify-center items-center mb-10 sm:mb-7">
            <p className="text-3xl sm:text-4xl text-primary-dark dark:text-primary-light mb-2">
              {t("followMe")}
            </p>
            <ul className="flex gap-4 sm:gap-8">
              {socialLinks.map((link) => (
                <a
                  href={link.url}
                  // target="__blank"
                  key={link.id}
                  className="text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 cursor-pointer rounded-lg bg-gray-50 dark:bg-ternary-dark hover:bg-gray-100 shadow-sm p-4 duration-300"
                >
                  <i className="text-xl sm:text-2xl md:text-3xl">{link.icon}</i>
                </a>
              ))}
            </ul>
          </div>

          <AppFooterCopyright />
        </div>
      </div>
    </div>
  );
}

export default AppFooter;
