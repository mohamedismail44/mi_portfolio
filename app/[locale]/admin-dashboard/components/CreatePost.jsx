"use client";
import { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { FaUpload } from "react-icons/fa6";
import { IoCloudUploadOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { uploadImagesToCloudinary } from "../../utils/cloudinary";
import { getData, postData } from "../../backend/controllers";
import swal from "sweetalert";
import JoditEditor from "jodit-react";

export default function CreatePost() {
  const [enTitle, setEnTitle] = useState("");
  const [arTitle, setArTitle] = useState("");
  const [order, setOrder] = useState(10);
  const [category, setCategory] = useState(null);
  const [enDescription, setEnDescription] = useState("");
  const [arDescription, setArDescription] = useState("");
  const [previewLink, setPreviewLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [categoriesFromDB, setCategoriesFromDB] = useState([]);
  const [postImages, setPostImages] = useState([]);
  const [coverImage, setCoverImage] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    getData("category", setCategoriesFromDB);
  }, []);

  const createPostHandler = async () => {
    if (!enTitle.trim()) return toast.error("Post EN Title is required");
    if (!arTitle.trim()) return toast.error("Post AR Title is required");
    if (!category) return toast.error("Post Category is required");

    const previewUrlPattern = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/i;
    if (!previewLink.trim() || !previewUrlPattern.test(previewLink.trim())) {
      return toast.error("Please enter a valid preview link URL");
    }

    const githubUrlPattern = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/i;
    if (!githubLink.trim() || !githubUrlPattern.test(githubLink.trim())) {
      return toast.error("Please enter a valid GitHub link URL");
    }

    if (!enDescription.trim())
      return toast.error("Post EN description is required");
    if (!arDescription.trim())
      return toast.error("Post AR description is required");
    if (!coverImage.length) return toast.error("Cover Image is required");
    if (!postImages.length) return toast.error("Post Images are required");

    try {
      setIsUploading(true);
      const coverUrls = await uploadImagesToCloudinary(coverImage);
      const postUrls = await uploadImagesToCloudinary(postImages);

      const data = {
        title: { en: enTitle, ar: arTitle },
        order,
        category: { en: category.en, ar: category.ar },
        description: { en: enDescription, ar: arDescription },
        previewLink,
        githubLink,
        coverImage: coverUrls,
        postImages: postUrls,
      };

      await postData("posts", data);
      resetForm();
      toast.success("Data uploaded successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setEnTitle("");
    setArTitle("");
    setCategory("");
    setPreviewLink("");
    setGithubLink("");
    setEnDescription("");
    setArDescription("");
    setCoverImage([]);
    setPostImages([]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "You are about to update this post.",
      icon: "warning",
      buttons: true,
    }).then((isOk) => {
      if (isOk) createPostHandler();
    });
  };

  return (
    <section className="flex flex-col m-auto md:w-1/2 w-11/12">
      <div className="font-bold text-center text-3xl my-5 dark:text-white">
        <h1>Create new post</h1>
      </div>
      <form onSubmit={submitHandler} className="flex flex-col gap-3">
        <div className="w-full flex justify-between">
          <input
            className="border-2 px-3 rounded-lg border-gray-300 p-2 placeholder:p-2 w-[44%]"
            placeholder="English Title"
            type="text"
            value={enTitle}
            onChange={(e) => setEnTitle(e.target.value)}
          />
          <input
            className="border-2 px-3 rounded-lg border-gray-300 p-2 placeholder:p-2 w-[44%]"
            placeholder="Arabic Title"
            type="text"
            value={arTitle}
            onChange={(e) => setArTitle(e.target.value)}
          />
          <input
            className="border-2 px-3 rounded-lg border-gray-300 p-2 placeholder:text-xs w-[10%]"
            placeholder="Order Number"
            type="number"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          />
        </div>

        <select
          className="border-2 rounded-lg border-gray-300 p-3"
          value={JSON.stringify(category)}
          onChange={(e) => setCategory(JSON.parse(e.target.value))}
        >
          <option disabled value="">
            Select Category
          </option>
          {categoriesFromDB.map((cate) => (
            <option
              key={cate?.id}
              value={JSON.stringify({ en: cate?.title.en, ar: cate?.title.ar })}
            >
              {cate?.title.en} / {cate?.title.ar}
            </option>
          ))}
        </select>

        <input
          className="border-2 px-3 rounded-lg border-gray-300 p-2 placeholder:p-2"
          placeholder="Preview Link"
          type="text"
          value={previewLink}
          onChange={(e) => setPreviewLink(e.target.value)}
        />
        <input
          className="border-2 px-3 rounded-lg border-gray-300 p-2 placeholder:p-2"
          placeholder="GitHub Link"
          type="text"
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
        />

        <div className="space-y-4">
          <details className="cursor-pointer group" >
            <summary className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
              <h2 className="text-lg font-medium">English Description</h2>
              <svg
                className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            <JoditEditor
              value={enDescription}
              onChange={(newContent) => setEnDescription(newContent)}
            />
          </details>

          <details className="cursor-pointer group" >
            <summary className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
              <h2 className="text-lg font-medium">Arabic Description</h2>
              <svg
                className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            <JoditEditor
              value={arDescription}
              onChange={(newContent) => setArDescription(newContent)}
            />
          </details>
        </div>

        <label
          htmlFor="uploadOneImage"
          className="flex justify-center gap-3 items-center capitalize py-2 bg-lime-400 border-2 rounded-lg border-lime-600 hover:bg-lime-500 font-semibold text-lg text-gray-800 cursor-pointer duration-400"
        >
          One <IoCloudUploadOutline className="text-3xl" /> choose image for
          cover
        </label>
        <input
          accept="image/*"
          className="hidden"
          type="file"
          id="uploadOneImage"
          onChange={(e) => setCoverImage(Array.from(e.target.files))}
        />

        <label
          htmlFor="uploadMultiImage"
          className="flex justify-center gap-3 items-center capitalize py-2 bg-yellow-400 border-2 rounded-lg border-yellow-600 hover:bg-yellow-500 font-semibold text-lg text-gray-800 cursor-pointer duration-400"
        >
          Multi <FaUpload className="text-3xl" /> choose images for post details
        </label>
        <input
          multiple
          accept="image/*"
          className="hidden"
          type="file"
          id="uploadMultiImage"
          onChange={(e) => setPostImages(Array.from(e.target.files))}
        />

        <button
          type="submit"
          className="flex justify-center cursor-pointer border-2 rounded-lg border-gray-300 bg-slate-700 pl-3 py-2 hover:bg-slate-800 duration-300 text-white text-xl font-semibold"
        >
          {isUploading ? (
            <ThreeCircles
              visible={true}
              height="40"
              width="40"
              color="#bbf7d0"
              ariaLabel="three-circles-loading"
            />
          ) : (
            "Create Post"
          )}
        </button>
      </form>
    </section>
  );
}
