import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const ProjectSingle = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, delay: 1 }}
      transition={{
        ease: "easeInOut",
        duration: 0.7,
      }}
    >
      <Link href={`/projects/${props.id}`} aria-label="Single Project" passHref>
        <div className="rounded-xl shadow-lg hover:shadow-xl cursor-pointer px-3 mb-10 sm:mb-0 bg-secondary-light dark:bg-ternary-dark">
          <div>
            <Image
              src={props?.coverImage[0]?.url || "/images/placeholder.png"}
              alt={props?.title || "Post Image"}
              className="rounded-t-xl border-none w-auto h-auto object-cover"
              width={400}
              height={400}
            />
          </div>
          <div className="text-center px-4 py-6">
            <p className="font-general-medium text-xl md:text-2xl text-ternary-dark dark:text-ternary-light mb-2 line-clamp-1">
              {props.title.en}
            </p>
            <span className="text-lg text-red-600 font-medium ">
              {props.category.en}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectSingle;
