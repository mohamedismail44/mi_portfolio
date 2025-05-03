import Link from "next/link";

export default function AdminSidbar() {
  return (
    <div className=" md:block xl:flex-[2] md:flex-[3] border-r-2 hidden">
      <Link href={"/admin-dashboard"}>
        <h1 className="block text-2xl p-2 capitalize font-bold hover:text-green-700 text-green-500  duration-300 ">
          <i className="bi bi-clipboard-data-fill  text-green-600 "></i>
          Dashboard
        </h1>
      </Link>
      <ul className="flex flex-col">
        <Link
          href={"/admin-dashboard/create-post"}
          className=" capitalize font-semibold text-xl dark:text-white text-gray-600 p-3  cursor-pointer hover:text-green-600 duration-300"
        >
          <i className="bi bi-person"></i>
          <span className="hover:text-green-600 duration-300">
            create Post & Category
          </span>
        </Link>
        <Link
          href={"/admin-dashboard/posts"}
          className=" capitalize font-semibold text-xl dark:text-white text-gray-600 p-3  cursor-pointer hover:text-green-600 duration-300"
        >
          <i className="bi bi-person"></i>
          <span className="hover:text-green-600 duration-300">posts</span>
        </Link>
        <Link
          href={"/admin-dashboard/categories"}
          className=" capitalize font-semibold text-xl dark:text-white text-gray-600 p-3  cursor-pointer hover:text-green-600 duration-300"
        >
          <i className="bi bi-tag-fill"></i>
          <span className="hover:text-green-600 duration-300">categories</span>
        </Link>
        <Link
          href={"/admin-dashboard/hireMe"}
          className=" capitalize font-semibold text-xl dark:text-white text-gray-600 p-3  cursor-pointer hover:text-green-600 duration-300"
        >
          <i className="bi bi-chat-left-text"></i>
          <span className="hover:text-green-600 duration-300">hireMe</span>
        </Link>
        <Link
          href={"/admin-dashboard/Email_subscribe"}
          className=" capitalize font-semibold text-xl dark:text-white text-gray-600 p-3  cursor-pointer hover:text-green-600 duration-300"
        >
          <i className="bi bi-chat-left-text"></i>
          <span className="hover:text-green-600 duration-300">
            Email Subscribe
          </span>
        </Link>{" "}
        <Link
          href={"/admin-dashboard/contact"}
          className=" capitalize font-semibold text-xl dark:text-white text-gray-600 p-3  cursor-pointer hover:text-green-600 duration-300"
        >
          <i className="bi bi-chat-left-text"></i>
          <span className="hover:text-green-600 duration-300">contact</span>
        </Link>
      </ul>
    </div>
  );
}
