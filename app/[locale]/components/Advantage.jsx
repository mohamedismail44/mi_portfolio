import { CiMobile1 } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { GrTechnology } from "react-icons/gr";
import { BiSupport } from "react-icons/bi";
import { IoPlayCircleOutline } from "react-icons/io5";
import { FaNode } from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function Advantage() {
  const t = useTranslations("advantage");
  const iconData = [
    { icon: <CiMobile1 />, titleKey: "title1", descriptionKey: "description1" },
    { icon: <FaNode />, titleKey: "title2", descriptionKey: "description2" },
    { icon: <IoPlayCircleOutline />, titleKey: "title3", descriptionKey: "description3" },
    { icon: <IoIosSearch />, titleKey: "title4", descriptionKey: "description4" },
    { icon: <GrTechnology />, titleKey: "title5", descriptionKey: "description5" },
    { icon: <BiSupport />, titleKey: "title6", descriptionKey: "description6" },
  ];

  return (
    <div className="mt-8 py-14 bg-gray-50">
      <h2 className="text-6xl text-center mb-8 text-gray-800">{t("title")}</h2>
      <div className="mx-20 flex flex-wrap items-center justify-between gap-8">
        {iconData.map((data) => (
          <div key={data.titleKey} className="sm:w-[30%] w-full">
            <div className="flex mx-auto justify-center items-center flex-col text-center w-60">
              <div className="text-6xl text-primaryColor-500">{data.icon}</div>
              <h3 className="text-xl font-bold">{t(data.titleKey)}</h3>
              <p className="text-gray-600">{t(data.descriptionKey)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}