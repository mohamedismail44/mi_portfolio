"use client";
import { useEffect, useState } from "react";
import { getData } from "../../backend/controllers";
import AdminSidbar from "../components/AdminSidbar";
import { useAuthListener } from "../../backend/checkUser";
import { useRouter } from "next/navigation";

export default function EmailSubscribe() {
  const { user, loading } = useAuthListener();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    getData("emailSubscribe", setEmails);
  }, []);
  if (loading) {
    return <p className="text-center">جاري التحقق...</p>;
  }
  return (
    <div className="flex justify-between mb-5 h-[calc(100vh-9rem)]">
      <AdminSidbar />
      <div className=" flex-[10] px-2 overflow-y-scroll">
        <h1 className="inline-block m-5 capitalize border-b-2 dark:text-white border-black text-3xl font-bold">
          Comments
        </h1>
        <table className="w-full lg:text-xl text-left  border-collapse">
          <thead className="capitalize bg-slate-700 text-white">
            <tr className="">
              <th className=" border border-gray-500 lg:p-3">count</th>
              <th className=" border border-gray-500 lg:p-3">
                email subscribe
              </th>
            </tr>
          </thead>
          <tbody>
            {emails.map((e, index) => (
              <tr className="even:bg-slate-200 odd:bg-white hover:bg-slate-300" key={e.id}>
                <td className="border border-gray-500 p-2">{index + 1}</td>
                <td className="p-1 border border-gray-500">{e.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
