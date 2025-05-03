"use client";
import { useEffect, useState } from "react";
import AdminSidbar from "../components/AdminSidbar";
import swal from "sweetalert";
import { deleteDataById, getData } from "../../backend/controllers";
import { toast } from "react-toastify";
import { useAuthListener } from "../../backend/checkUser";
import { useRouter } from "next/navigation";

export default function CategoriesDashboard() {
  const { user, loading } = useAuthListener();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);
  const [categoriesFromDB, setCategoriesFromDB] = useState([]);

  useEffect(() => {
    getData("category", setCategoriesFromDB);
  }, []);

  const DeleteCategoryHandler = async (id) => {
    const isOk = await swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });

    if (isOk) {
      try {
        await deleteDataById("category", id);
        toast.success("Category deleted successfully");
        // Refresh the list
        getData("category", setCategoriesFromDB);
      } catch (error) {
        toast.error("Failed to delete category: " + error.message);
      }
    }
  };
  if (loading) {
    return <p className="text-center">جاري التحقق...</p>;
  }
  return (
    <div className="flex justify-between mb-5 h-[calc(100vh-9rem)]">
      <AdminSidbar />
      <div className="flex-[10] px-2 overflow-y-scroll">
        <h1 className="inline-block m-5 capitalize border-b-2 dark:text-white border-black text-3xl font-bold">
          Categories
        </h1>
        <table className="w-full lg:text-xl text-left border-collapse">
          <thead className="capitalize bg-slate-700 text-white">
            <tr>
              <th className="border border-gray-500 lg:p-3">Count</th>
              <th className="border border-gray-500 lg:p-3">Category</th>
              <th className="border border-gray-500 lg:p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {categoriesFromDB.map((categ, index) => (
              <tr
                key={categ.id}
                className="even:bg-slate-200 odd:bg-white hover:bg-slate-300"
              >
                <td className="border border-gray-500 p-2">{index + 1}</td>
                <td className="border p-1 border-gray-500">
                  <div className="flex items-center lg:flex-row lg:justify-start justify-center flex-col gap-2">
                    <span>{categ.title}</span>
                  </div>
                </td>
                <td className="p-1 border border-gray-500">
                  <div className="capitalize flex justify-around lg:flex-row flex-col gap-4">
                    <button
                      className="bg-red-700 px-3 py-1 font-semibold text-white rounded hover:bg-red-800 duration-300"
                      onClick={() => DeleteCategoryHandler(categ.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
