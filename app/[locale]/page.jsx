import Link from "next/link";
import ProjectsGrid from "./components/projects/ProjectsGrid";
import Button from "./components/reusable/Button";
import AppBanner from "./components/shared/AppBanner";
import Advantage from "./components/Advantage";
import HeroSection from "./components/HeroSection";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("projects");

  return (
    <div className="">
      <div className="container mx-auto">
        <AppBanner />

        <ProjectsGrid />

        <div className="flex justify-center">
          <div className="font-general-medium flex items-center px-6 py-3 rounded-lg shadow-lg hover:shadow-xl bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 text-white text-lg sm:text-xl duration-300">
            <Link href="/projects" aria-label="More Projects" passHref>
              <Button title={t("moreProjects")} />
            </Link>
          </div>
        </div>
      </div>
      <Advantage />
      <HeroSection />
    </div>
  );
}
