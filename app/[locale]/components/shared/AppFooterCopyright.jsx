import { useTranslations } from "next-intl";

function AppFooterCopyright() {
  const t = useTranslations("footer");

  return (
    <div className="font-general-regular flex justify-center items-center text-center">
      <div className="text-lg text-ternary-dark dark:text-ternary-light">
        <span className="hover:underline hover:text-indigo-600 dark:hover:text-indigo-300 ml-1 duration-500">
          {t("title")}
        </span>
        <span className=" text-secondary-dark dark:text-secondary-light font-medium uppercase  hover:text-indigo-600 dark:hover:text-indigo-300 ml-1 duration-500">
          mohamed ismail &copy; {new Date().getFullYear()}
        </span>
      </div>
    </div>
  );
}

export default AppFooterCopyright;
