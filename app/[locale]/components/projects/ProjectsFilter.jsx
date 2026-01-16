"use client";
import { useEffect, useState } from "react";
import { getData } from "../../backend/controllers";
import { useLocale } from "next-intl";

function ProjectsFilter({ setSelectProject }) {
  const [category, setCategory] = useState([]);
  const locale = useLocale();

  useEffect(() => {
    getData("category", setCategory);
  }, []);
  return (
    <select
      onChange={(e) => {
        // إذا كانت القيمة "All Projects"، اجعل القيمة فارغة
        if (e.target.value === "all") {
          setSelectProject("");
        } else {
          setSelectProject(e.target.value);
        }
      }}
      className="
                px-4
                sm:px-6
                py-2
                border
                dark:border-secondary-dark
                rounded-lg
                text-sm
                sm:text-md
                dark:font-medium
                bg-secondary-light
                dark:bg-ternary-dark
                text-primary-dark
                dark:text-ternary-light
            "
    >
      {/* قيمة الخيار "All Projects" تتطلب قيمة معينة لتمييزها */}
      <option value="all" className="text-sm sm:text-md">
        {locale === "ar" ? "جميع المشروعات" : "All Projects"}
      </option>

      {category.map((option) => (
        <option
          className="text-normal sm:text-md"
          key={option.id}
          value={locale === "ar" ? option.title.ar : option.title.en}
        >
          {locale === "ar" ? option.title.ar : option.title.en}
        </option>
      ))}
    </select>
  );
}

export default ProjectsFilter;
