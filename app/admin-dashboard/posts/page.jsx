"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import { toast } from "react-toastify";
import AdminSidbar from "../components/AdminSidbar";
import dynamic from "next/dynamic";
import { deleteDataById, getData } from "../../backend/controllers";
import { useAuthListener } from "../../backend/checkUser";
import { useRouter } from "next/navigation";
import parse from "html-react-parser";

// استيراد ديناميكي لمكوّن EditPost مع تعطيل SSR
const DynamicEditPost = dynamic(
  () => import("./EditPost"),
  { ssr: false }
);

export default function UsersDashboard() {
  const { user, loading } = useAuthListener();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [singlePost, setSinglePost] = useState(null);
  const [editPostToggle, setEditPostToggle] = useState(false);

  useEffect(() => {
    getData("posts", setData);
    getData("category", setCategory);
  }, []);

  const handleDeletePost = async (id) => {
    const isConfirmed = await swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });

    if (isConfirmed) {
      try {
        await deleteDataById("posts", id);
        setData((prev) => prev.filter((post) => post.id !== id));
        toast.success("Post deleted successfully");
      } catch (error) {
        toast.error("Failed to delete post: " + error.message);
      }
    }
  };

  const handleEditPost = (post) => {
    setSinglePost(post);
    setEditPostToggle(true);
  };

  if (loading) {
    return <p className="text-center">جاري التحقق...</p>;
  }

  return (
    <div className="flex justify-between mb-5 h-[calc(100vh-9rem)]">
      <AdminSidbar />
      <div className="flex-[10] px-2 overflow-y-scroll">
        <h1 className="inline-block m-5 capitalize border-b-2 border-black text-3xl font-bold dark:text-white">
          Users
        </h1>

        <table className="w-full lg:text-xl text-left border-collapse">
          <thead className="capitalize bg-slate-700 text-white">
            <tr>
              <th className="border border-gray-500 lg:p-3 text-center">#</th>
              <th className="border border-gray-500 lg:p-3 text-center">Title</th>
              <th className="border border-gray-500 lg:p-3 text-center">Description</th>
              <th className="border border-gray-500 lg:p-3 text-center">Category</th>
              <th className="border border-gray-500 lg:p-3 text-center">Links</th>
              <th className="border border-gray-500 lg:p-3 text-center">Action</th>
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
                    <Image
                      className="w-20 h-20 rounded-xl object-cover"
                      src={post?.coverImage[0]?.url || "/images/placeholder.png"}
                      alt={post?.title || "Post Image"}
                      width={80}
                      height={80}
                    />
                    <span>{post?.title}</span>
                  </div>
                </td>
                <td className="p-1 border border-gray-500 text-center">
                  <span className="line-clamp-2">{parse(post?.description)}</span>
                </td>
                <td className="p-1 border border-gray-500 text-center">
                  <span className="line-clamp-2">{post?.category}</span>
                </td>
                <td className="p-1 border border-gray-500 text-center">
                  <div className="flex gap-2 justify-center">
                    <a
                      className="text-xl cursor-pointer font-bold text-red-600 hover:text-green-600 duration-300"
                      href={post?.previewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Preview
                    </a>
                    <a
                      className="text-xl cursor-pointer font-bold text-red-600 hover:text-green-600 duration-300"
                      href={post?.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Github
                    </a>
                  </div>
                </td>
                <td className="p-1 border border-gray-500">
                  <div className="flex justify-around lg:flex-row flex-col gap-4">
                    <Link href={`/projects/${post?.id}`}>
                      <button className="bg-green-700 px-3 py-1 font-semibold text-white rounded hover:bg-green-800 duration-300">
                        View Profile
                      </button>
                    </Link>
                    <button
                      onClick={() => handleEditPost(post)}
                      className="bg-yellow-500 px-3 py-1 font-semibold text-white rounded hover:bg-yellow-600 duration-300"
                    >
                      Edit Post
                    </button>
                    <button
                      onClick={() => handleDeletePost(post?.id)}
                      className="bg-red-700 px-3 py-1 font-semibold text-white rounded hover:bg-red-800 duration-300"
                    >
                      Delete Post
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editPostToggle && (
        <DynamicEditPost
          singlePost={singlePost}
          setEditPostToggle={setEditPostToggle}
          category={category}
        />
      )}
    </div>
  );
}
