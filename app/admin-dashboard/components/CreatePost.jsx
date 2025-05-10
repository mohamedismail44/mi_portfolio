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
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState(10);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
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
    if (title.trim() === "") return toast.error("Post Title is required");
    if (category.trim() === "") return toast.error("Post Category is required");
    // ........validate links .........
    if (!previewLink.trim()) {
      return toast.error("preview Link is required");
    }
    const previewUrlPattern = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/i;
    if (!previewUrlPattern.test(previewLink.trim())) {
      return toast.error("Please enter a valid preview link URL");
    }
    // ....................
    if (!githubLink.trim()) {
      return toast.error("github Link is required");
    }
    const githubUrlPattern = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/i;
    if (!githubUrlPattern.test(githubLink.trim())) {
      return toast.error("Please enter a valid github link URL");
    }
    // ........validate links .........

    if (description.trim() === "")
      return toast.error("Post description is required");
    if (previewLink.trim() === "")
      return toast.error("preview Link is required");
    if (githubLink.trim() === "") return toast.error("github Link is required");
    if (!coverImage.length) return toast.error("Cover Image is required");
    if (!postImages.length) return toast.error("Post Images are required");

    try {
      setIsUploading(true);

      const coverUrls = await uploadImagesToCloudinary(coverImage);
      const postUrls = await uploadImagesToCloudinary(postImages);

      const data = {
        title,
        order,
        category,
        description,
        previewLink,
        githubLink,
        coverImage: coverUrls,
        postImages: postUrls,
      };

      await postData("posts", data);

      setTitle("");
      setCategory("");
      setPreviewLink("");
      setGithubLink("");
      setDescription("");
      setCoverImage([]);
      setPostImages([]);
      toast.success("Data uploaded successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUploading(false);
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
      if (isOk) createPostHandler();
    });
  };
  return (
    <section className="flex flex-col m-auto md:w-1/2 w-11/12 ">
      <div className="font-bold text-center text-3xl my-5 dark:text-white">
        <h1>Create new post</h1>
      </div>
      <form onSubmit={submitHandler} className="flex flex-col gap-3">
        <div className="w-full flex justify-between">
          <input
            className="border-2 px-3 rounded-lg border-gray-300 p-2 placeholder:p-2 w-[89%]"
            placeholder="Post Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option disabled value="">
            Categories
          </option>
          {categoriesFromDB.map((cate) => (
            <option key={cate?.id} value={cate.title}>
              {cate.title}
            </option>
          ))}
        </select>
        <input
          className="border-2 px-3 rounded-lg border-gray-300 p-2 placeholder:p-2"
          placeholder="preview Link"
          type="text"
          value={previewLink}
          onChange={(e) => setPreviewLink(e.target.value)}
        />
        <input
          className="border-2 px-3 rounded-lg border-gray-300 p-2 placeholder:p-2"
          placeholder="github Link"
          type="text"
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
        />

        <JoditEditor
          value={description}
          onChange={(newContent) => setDescription(newContent)}
        />
        <label
          htmlFor="uploadOneImage"
          className="flex justify-center gap-3 items-center capitalize py-2 bg-lime-400 border-2  rounded-lg border-lime-600 hover:bg-lime-500 font-semibold text-lg  text-gray-800 cursor-pointer duration-400"
        >
          One <IoCloudUploadOutline className="text-3xl" /> choose image for
          cover
        </label>
        <input
          accept="image/*"
          className="hidden"
          type="file"
          id="uploadOneImage"
          name="uploadOneImage"
          onChange={(e) => setCoverImage(Array.from(e.target.files))}
        />
        <label
          htmlFor="uploadMultiImage"
          className="flex justify-center gap-3 items-center capitalize py-2 bg-yellow-400 border-2  rounded-lg border-yellow-600 hover:bg-yellow-500 font-semibold text-lg  text-gray-800 cursor-pointer duration-400"
        >
          Multi <FaUpload className="text-3xl" /> choose images for post details
        </label>
        <input
          multiple
          accept="image/*"
          className="hidden"
          type="file"
          id="uploadMultiImage"
          name="uploadMultiImage"
          onChange={(e) => setPostImages(Array.from(e.target.files))}
        />
        <button
          type="submit"
          className="flex justify-center cursor-pointer border-2 rounded-lg border-gray-300 bg-slate-700 pl-3 py-2 hover:bg-slate-800 duration-300 text-white text-xl font-semibold "
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
