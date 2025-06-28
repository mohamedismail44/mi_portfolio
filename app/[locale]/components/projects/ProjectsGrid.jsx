"use client";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import ProjectSingle from "./ProjectSingle";
import ProjectsFilter from "./ProjectsFilter";
import { getData } from "../../backend/controllers";
import { ThreeCircles } from "react-loader-spinner";
import { useTranslations } from "next-intl";

function ProjectsGrid({ showPagination }) {
  const [searchProject, setSearchProject] = useState("");
  const [selectProject, setSelectProject] = useState("");
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const t = useTranslations("projects");

  useEffect(() => {
    getData("posts", setPosts);
  }, []);

  if (!posts.length) {
    return (
      <div className="flex flex-col justify-center items-center">
        <ThreeCircles
          visible={true}
          height="200"
          width="200"
          color="#6366f1"
          ariaLabel="three-circles-loading"
        />
        <span className="text-4xl my-3 font-semibold text-[#6366f1]">
          loading ...
        </span>
      </div>
    );
  }

  const filteredProjects = posts.filter((item) => {
    const titleMatch = item.title.en
      .toLowerCase()
      .includes(searchProject.toLowerCase());
    const categoryMatch = selectProject
      ? item.category.en.charAt(0).toUpperCase() + item.category.en.slice(1) ===
        selectProject
      : true;
    return titleMatch && categoryMatch;
  });

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="py-5 sm:py-10 mt-5 sm:mt-10">
      <div className="text-center">
        <p className="font-general-medium text-2xl sm:text-4xl mb-1 text-ternary-dark dark:text-ternary-light">
          {t("title")}
        </p>
      </div>

      <div>
        <h3 className="font-general-regular text-center text-secondary-dark dark:text-ternary-light text-md sm:text-xl mb-3">
          {t("discription")}
        </h3>
        <div className="flex justify-between border-b border-primary-light dark:border-secondary-dark pb-3 gap-3">
          <div className="flex justify-between gap-2">
            <span className="hidden sm:block bg-primary-light dark:bg-ternary-dark p-2.5 shadow-sm rounded-xl cursor-pointer">
              <FiSearch className="text-ternary-dark dark:text-ternary-light w-5 h-5" />
            </span>
            <input
              onChange={(e) => setSearchProject(e.target.value)}
              className="font-general-medium pl-3 pr-1 sm:px-4 py-2 border border-gray-200 dark:border-secondary-dark rounded-lg text-sm sm:text-md bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light"
              type="search"
              placeholder={`${t("search")}`}
              aria-label={`${t("search")}`}
            />
          </div>

          <ProjectsFilter setSelectProject={setSelectProject} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 sm:gap-5 justify-items-center">
        {currentProjects.map((project, index) => (
          <ProjectSingle key={index} {...project} />
        ))}
      </div>

      {showPagination && (
        <div className="flex justify-center items-center gap-5 mt-10">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 mx-1   ${
              currentPage === 1
                ? "bg-gray-500"
                : "bg-primaryColor-500 hover:bg-secondaryColor-600 duration-300 "
            }  text-white rounded`}
          >
            {t("perview")}
          </button>
          <span>{`صفحة ${currentPage} من ${totalPages}`}</span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 mx-1   ${
              currentPage === totalPages
                ? "bg-gray-500"
                : "bg-primaryColor-500 hover:bg-secondaryColor-600 duration-300 "
            }  text-white rounded`}
          >
            {t("next")}
          </button>
        </div>
      )}
    </section>
  );
}

export default ProjectsGrid;
