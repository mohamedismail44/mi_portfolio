"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import CreatePost from "./CreatePost";
import { ThreeCircles } from "react-loader-spinner";
import { postData } from "../../backend/controllers";
import swal from "sweetalert";

export default function AdminMain() {
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const categoryHandler = async () => {
    // Validate category input
    if (category.trim() === "") {
      return toast.error("Category is required");
    }
    // post data in firebase
    try {
      setLoading(true);
      postData("category", { title: category });
      // Reset state and show success message
      setCategory("");
      toast.success("Data uploaded successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "You are about to update this post.",
      icon: "warning",
      buttons: true,
    }).then((isOk) => {
      if (isOk) categoryHandler();
    });
  };

  return (
    <div className="flex-[10]">
      <CreatePost />

      <div className="border-b-2 border-gray-600 rounded-xl my-5 w-[90%] m-auto"></div>

      <form
        className="md:w-[50%] w-full m-auto p-4 border-2 border-gray-600 rounded-xl flex flex-col gap-2"
        onSubmit={submitHandler}
      >
        <h3 className="capitalize font-bold text-2xl mb-4 dark:text-white">
          Add New Category
        </h3>

        <label
          htmlFor="Title"
          className="capitalize font-bold text-lg text-gray-600 dark:text-gray-300"
        >
          Category Title
        </label>

        <input
          className="border-2 px-2 rounded-lg border-gray-300 py-2 placeholder:p-2 w-full"
          placeholder="Enter Category Title"
          type="text"
          id="Title"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button
          type="submit"
          className="capitalize flex justify-center cursor-pointer bg-green-600 hover:bg-gray-600 duration-300 py-2 rounded-lg text-xl text-white font-semibold w-full"
        >
          {loading ? (
            <ThreeCircles
              visible={true}
              height="40"
              width="40"
              color="#0284c7"
              ariaLabel="three-circles-loading"
            />
          ) : (
            "Add"
          )}
        </button>
      </form>
    </div>
  );
}
