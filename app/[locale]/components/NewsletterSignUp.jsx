"use client";
import { useState } from "react";
import { postData } from "../backend/controllers";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

const NewsletterSignUp = () => {
  const [email, setEmail] = useState("");
  const t = useTranslations("emailSubiscribe");
  const locale = useLocale();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      return toast.error(locale === "ar" ? "الحقل مطلوب" : "Email is required");
    }
    try {
      postData("emailSubscribe", { email });
      setEmail("");
      toast.success(
        locale === "ar" ? " تم ارسال ايميلك بنجاح" : "send email successfully"
      );
    } catch (error) {
      toast.error(
        locale === "ar" ? "حدث خطأ في ارسال الايميل" : "error send email",
        error.message
      );
    }
  };

  return (
    <section className="text-gray-200  mt-5">
      <div className="py-8 px-4 mx-auto max-w-screen-xl  lg:px-6">
        <div className="mx-auto max-w-screen-md sm:text-center">
          <h2 className="mb-2 text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl dark:text-white">
            {t("title")}
          </h2>
          <p className="mx-auto mb-3 max-w-2xl font-light text-gray-500 md:mb-4 sm:text-xl dark:text-ternary-light">
            {t("discription")}
          </p>
          <form onSubmit={handleSubmit}>
            <div className=" items-center mx-auto space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
              <div className="relative w-full">
                <label
                  htmlFor="email"
                  className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {t("email")}
                </label>
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </div>
                <input
                  className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder={t("email")}
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="py-2 px-5 w-full text-lg font-bold text-center text-white  border cursor-pointer  border-indigo-600 sm:rounded-none  hover:bg-primary-800 focus:ring-4 focus:ring-indigo-300 bg-indigo-500 hover:bg-indigo-600 shadow-sm duration-300"
                >
                  {t("button")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignUp;
