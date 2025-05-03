"use client";
import { useEffect, useState } from "react";
import { getData } from "../../backend/controllers";

function ProjectsFilter({ setSelectProject }) {
  const [category, setCategory] = useState([]);

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
        All Projects
      </option>

      {category.map((option) => (
        <option
          className="text-normal sm:text-md"
          key={option.id}
          value={option.title}
        >
          {option.title}
        </option>
      ))}
    </select>
  );
}

export default ProjectsFilter;
