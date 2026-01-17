"use client";
import { useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { toast } from "react-toastify";
import { postData } from "../backend/controllers";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useTranslations } from "next-intl";

const HireMeModal = ({ onClose }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const t = useTranslations("hireMe");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (name.trim() === "") return toast.error("name is required");
    if (phoneNumber.trim() === "") return toast.error("email is required");
    if (email.trim() === "") return toast.error("email is required");
    if (message.trim() === "") return toast.error("message is required");
    try {
      setIsUploading(true);
      const data = {
        name,
        phoneNumber,
        email,
        message,
      };

      await postData("hireMe", data);
      setName("");
      setPhoneNumber("");
      setEmail("");
      setMessage("");
      toast.success(t("submitMessage"));
    } catch (error) {
      toast.error(t("submitMessageError"), error.message);
    } finally {
      setIsUploading(false);
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="font-general-medium fixed inset-0 z-[9999] transition-all duration-500"
    >
      {/* Modal Backdrop */}
      <div className="bg-filter bg-black bg-opacity-50 fixed inset-0 w-full h-full z-20"></div>

      {/* Modal Content */}
      <main className="flex flex-col items-center justify-center h-full w-full">
        <div className="modal-wrapper flex items-center z-50">
          <div className="modal max-w-md mx-5 xl:max-w-xl lg:max-w-xl md:max-w-xl bg-secondary-light dark:bg-primary-dark max-h-screen shadow-lg flex-row rounded-lg relative">
            <div className="modal-header flex justify-between gap-10 p-5 border-b border-ternary-light dark:border-ternary-dark">
              <h5 className=" text-primary-dark dark:text-primary-light text-xl">
                {t("title")}
              </h5>
              <button
                onClick={onClose}
                className="px-4 font-bold text-primary-dark dark:text-primary-light"
              >
                <FiX className="text-3xl text-red-600" />
              </button>
            </div>
            <div className="modal-body p-5 w-full h-full">
              <form onSubmit={submitHandler} className="max-w-xl m-4 text-left">
                <div className="">
                  <input
                    className="w-full px-5 py-2 border dark:border-secondary-dark rounded-md text-md bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light"
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder={t("name")}
                    aria-label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mt-6">
                  <input
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                    w-full px-5 py-2 border dark:border-secondary-dark rounded-md text-md bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light"
                    id="phoneNumber"
                    name="PhoneNumber"
                    type="number"
                    required
                    placeholder={t("phoneNumber")}
                    aria-label="PhoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className="mt-6">
                  <input
                    className="w-full px-5 py-2 border dark:border-secondary-dark rounded-md text-md bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light"
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder={t("email")}
                    aria-label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mt-6">
                  <textarea
                    className="w-full px-5 py-2 border dark:border-secondary-dark rounded-md text-md bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light"
                    id="message"
                    name="message"
                    cols="14"
                    rows="6"
                    aria-label="Details"
                    placeholder={t("discription")}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
                <div className="mt-6 pb-4 sm:pb-1">
                  <button
                    type="submit"
                    className="px-4
											sm:px-6
											py-2
											sm:py-2.5
											text-white
											bg-indigo-500
											hover:bg-indigo-600
											rounded-md
											focus:ring-1 focus:ring-indigo-900 duration-500 flex justify-center items-center"
                    aria-label="Submit Request"
                  >
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
            <div className="modal-footer sm:mt-0 py-5 px-8 border0-t text-right">
              <button
                onClick={onClose}
                className="px-4
									sm:px-6
									py-2 bg-gray-600 text-primary-light hover:bg-ternary-dark dark:bg-gray-200 dark:text-secondary-dark dark:hover:bg-primary-light
									rounded-md
									focus:ring-1 focus:ring-indigo-900 duration-500"
                aria-label="Close Modal"
              >
                {t("close")}
              </button>
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default HireMeModal;
