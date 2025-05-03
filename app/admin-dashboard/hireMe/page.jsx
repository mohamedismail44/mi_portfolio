"use client";
import AdminSidbar from "../components/AdminSidbar";
import { useEffect, useState } from "react";
import { getData } from "../../backend/controllers";
import { useAuthListener } from "../../backend/checkUser";
import { useRouter } from "next/navigation";

export default function UsersDashboard() {
  const { user, loading } = useAuthListener();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData("hireMe", setData);
  }, []);
  if (loading) {
    return <p className="text-center">جاري التحقق...</p>;
  }
  return (
    <div className="flex justify-between mb-5 h-[calc(100vh-9rem)]">
      <AdminSidbar />
      <div className="flex-[10] px-2 overflow-y-scroll">
        <h1 className="inline-block m-5 capitalize border-b-2 border-black dark:text-white text-3xl font-bold">
          hireMe
        </h1>

        <table className="w-full lg:text-xl text-left border-collapse">
          <thead className="capitalize bg-slate-700 text-white">
            <tr>
              <th className="border border-gray-500 lg:p-3 text-center">#</th>
              <th className="border border-gray-500 lg:p-3 text-center">
                Name
              </th>
              <th className="border border-gray-500 lg:p-3 text-center">
                Email
              </th>
              <th className="border border-gray-500 lg:p-3 text-center">
                Message
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((post, index) => (
              <tr
                key={post?.id}
                className="even:bg-slate-200 odd:bg-white hover:bg-slate-300"
              >
                <td className="text-center border border-gray-500 p-2">
                  {index + 1}
                </td>
                <td className="border py-1 px-5 border-gray-500">
                  <div className="line-clamp-2 flex items-center lg:flex-row lg:justify-start justify-center flex-col gap-2">
                    <span>{post?.name}</span>
                  </div>
                </td>
                <td className="p-1 border border-gray-500 text-center">
                  <span className="line-clamp-2">{post?.email}</span>
                </td>
                <td className="p-1 border border-gray-500 text-center">
                  <span className="line-clamp-2">{post?.message}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
