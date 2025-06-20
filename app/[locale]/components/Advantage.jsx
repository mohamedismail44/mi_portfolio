import { CiMobile1 } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { GrTechnology } from "react-icons/gr";
import { BiSupport } from "react-icons/bi";
import { IoPlayCircleOutline } from "react-icons/io5";
import { FaNode } from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function Advantage() {
  const t = useTranslations("advantage");
  const icons = [
    <CiMobile1 />,
    <IoIosSearch />,
    <GrTechnology />,
    <BiSupport />,
    <IoPlayCircleOutline />,
    <FaNode />,
  ];

  return (
    <div className=" mt-8 py-14 bg-gray-50">
      <h2 className="text-6xl text-center mb-8 text-gray-800">{t("title")}</h2>
      <div className="mx-20 flex flex-wrap items-center justify-between gap-8">
        {icons.map((ele, index) => (
          <div key={index} className="sm:w-[30%] w-full">
            <div className="flex mx-auto  justify-center items-center flex-col text-center w-60 ">
              <div className="text-6xl text-primaryColor-500">{ele}</div>
              <h3 className="text-xl font-bold">{t("title" + (index + 1))}</h3>
              <p className="text-gray-600">{t("description" + (index + 1))}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
