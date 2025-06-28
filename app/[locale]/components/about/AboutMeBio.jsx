import { useTranslations } from "next-intl";
import Image from "next/image";

function AboutMeBio() {
  const t = useTranslations("about");

  return (
    <div className="block sm:flex sm:gap-10 mt-10 sm:mt-20">
      <div className="w-full sm:w-1/4 mb-7 sm:mb-0">
        <Image
          src="/images/profile.png"
          width={200}
          height={200}
          className="rounded-lg w-auto h-auto"
          alt="Profile Image"
        />
      </div>

      <div className="font-general-regular w-full sm:w-3/4 ">
  <p className="mb-4 text-ternary-dark dark:text-ternary-light text-lg">
    {t("text1")}
  </p>
  <ul className="mb-4 text-ternary-dark dark:text-ternary-light text-lg list-disc list-inside">
    <li>{t("point1")}</li>
    <li>{t("point2")}</li>
    <li>{t("point3")}</li>
    <li>{t("point4")}</li>
    <li>{t("point5")}</li>
    <li>{t("point6")}</li>
    <li>{t("point7")}</li>
  </ul>
  <p className="mb-4 text-ternary-dark dark:text-ternary-light text-lg">
    {t("text2")}
    {t("text3")}
  </p>
</div>
    </div>
  );
}

export default AboutMeBio;
