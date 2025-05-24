"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import AdminSidbar from "./components/AdminSidbar";
import { useAuthListener } from "../backend/checkUser";
import { useRouter } from "next/navigation";
import { getData } from "../backend/controllers";
import { handleLogout } from "../backend/auth";

export default function AdminMain() {
  const { user, loading } = useAuthListener();
  const router = useRouter();
  const [emailSubscribe, setEmailSubscribe] = useState([]);
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState([]);
  const [hireMe, setHireMe] = useState([]);
  const [contact, setContact] = useState([]);

  const allData = [
    { link: "Email_subscribe", name: "email subscribe", data: emailSubscribe },
    { link: "posts", name: "posts", data: posts },
    { link: "categories", name: "category", data: category },
    { link: "hireMe", name: "hireMe ", data: hireMe },
    { link: "contact", name: "contact", data: contact },
  ];
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  const logout = async () => {
    await handleLogout();
  };

  useEffect(() => {
    getData("emailSubscribe", setEmailSubscribe);
    getData("posts", setPosts);
    getData("category", setCategory);
    getData("hireMe", setHireMe);
    getData("contact", setContact);
  }, []);

  if (loading) {
    return <p className="text-center">جاري التحقق...</p>;
  }

  return (
    <div className="">
      <div>
        <div className="text-xl flex flex-col justify-center items-center my-5 dark:text-white">
          <p>{user?.email}</p>
          <button
            onClick={logout}
            className="mt-2 rounded-lg bg-pink-500 py-3 px-6 text-xs font-bold uppercase text-white shadow-md hover:shadow-lg"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex justify-between mb-5 min-h-[calc(100vh-9rem)]">
        <AdminSidbar />
        <div className="flex-[10]">
          <div className="flex xl:flex-nowrap flex-wrap">
            {allData.map((ele) => (
              <div
                key={ele.link}
                className="p-4 border-2 border-gray-600 rounded-xl flex flex-col justify-center gap-2 xl:w-[24%] md:w-[45%] w-full m-2"
              >
                <span className="block capitalize font-medium text-gray-600 text-2xl">
                  {ele.name}
                </span>
                <span className="block capitalize font-medium text-red-600 text-2xl">
                  number : {ele.data.length}
                </span>
                <div className="flex justify-between items-center">
                  <Link
                    href={`/admin-dashboard/${ele.link}`}
                    className="capitalize bg-green-600 hover:bg-gray-600 duration-300 p-1 rounded-lg text-white font-semibold"
                  >
                    see all {ele.name}
                  </Link>
                  <i className="bi bi-person bg-slate-600 text-white rounded-md px-1 text-2xl"></i>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center my-3 ">
            <Link
              href={"/admin-dashboard/create-post"}
              className="capitalize bg-yellow-500 text-2xl hover:bg-gray-600 duration-300 py-3 px-20 rounded-lg text-white font-semibold"
            >
              create new post
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
