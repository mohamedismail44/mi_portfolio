"use client";
import { useState } from "react";
import { postData } from "../../backend/controllers";
import { ThreeCircles } from "react-loader-spinner";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const t = useTranslations("contact");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (email.trim() === "") return toast.error("email is required");
    if (message.trim() === "") return toast.error("message is required");
    try {
      setIsUploading(true);
      const data = {
        name,
        email,
        subject,
        message,
      };

      await postData("contact", data);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      toast.success("Your request has been sent successfully");
    } catch (error) {
      toast.error(
        "An error occurred while submitting your request.",
        error.message
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full lg:w-1/2">
      <div className="leading-loose">
        <form
          onSubmit={submitHandler}
          className=" m-4 p-6 sm:p-10 bg-secondary-light dark:bg-secondary-dark rounded-xl shadow-xl text-left"
        >
          <p className="font-general-medium text-primary-dark dark:text-primary-light text-2xl mb-8">
            {t("contactForm")}
          </p>

          <div className="font-general-regular mb-4">
            <label className="block text-lg text-primary-dark dark:text-primary-light mb-1">
              {t("fullName")}
            </label>
            <input
              className="w-full px-5 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm text-md"
              type="text"
              placeholder={t("fullName")}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="font-general-regular mb-4">
            <label className="block text-lg text-primary-dark dark:text-primary-light mb-1">
              {t("email")}
            </label>
            <input
              className="w-full px-5 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm text-md"
              type="text"
              placeholder={t("email")}
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="font-general-regular mb-4">
            <label className="block text-lg text-primary-dark dark:text-primary-light mb-1">
              {t("subject")}
            </label>
            <input
              className="w-full px-5 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm text-md"
              type="text"
              placeholder={t("subject")}
              onChange={(e) => setSubject(e.target.value)}
              value={subject}
            />
          </div>

          <div className="mt-6">
            <label
              className="block text-lg text-primary-dark dark:text-primary-light mb-2"
              htmlFor="message"
            >
              {t("message")}
            </label>
            <textarea
              className="w-full px-5 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm text-md"
              id="message"
              name={t("message")}
              cols="14"
              rows="6"
              aria-label="Message"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            ></textarea>
          </div>

          <div className="font-general-medium w-40 px-4 py-2.5 text-white text-center font-medium tracking-wider bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 rounded-lg mt-6 duration-500">
            <button type="submit" aria-label="Send Message">
              {isUploading ? (
                <ThreeCircles
                  visible={true}
                  height="40"
                  width="40"
                  color="#fff"
                  ariaLabel="three-circles-loading"
                />
              ) : (
                t("button")
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
