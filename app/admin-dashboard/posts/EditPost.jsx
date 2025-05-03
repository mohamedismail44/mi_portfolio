"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaWindowClose } from "react-icons/fa";
import { FaUpload } from "react-icons/fa6";
import { IoCloudUploadOutline } from "react-icons/io5";
import { uploadImagesToCloudinary } from "../../utils/cloudinary";
import { ThreeCircles } from "react-loader-spinner";
import { updateDataById } from "../../backend/controllers";
import swal from "sweetalert";
import JoditEditor from "jodit-react";

export default function EditPost({ setEditPostToggle, singlePost, category }) {
  const [title, setTitle] = useState(singlePost.title);
  const [newCategory, setNewCategory] = useState(singlePost.category);
  const [previewLink, setPreviewLink] = useState(singlePost.previewLink);
  const [githubLink, setGithubLink] = useState(singlePost.githubLink);
  const [description, setDescription] = useState(singlePost.description);
  const [postImages, setPostImages] = useState([]);
  const [coverImage, setCoverImage] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const updateHandler = async () => {
    if (!title.trim()) return toast.error("Post Title is required");
    if (!newCategory.trim()) return toast.error("Post category is required");
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

    if (!description.trim()) return toast.error("Post description is required");

    setIsUploading(true);

    try {
      const coverUrls =
        coverImage.length > 0 ? await uploadImagesToCloudinary(coverImage) : [];
      const postUrls =
        postImages.length > 0 ? await uploadImagesToCloudinary(postImages) : [];

      const data = {
        title,
        category: newCategory,
        previewLink,
        githubLink,
        description,
        ...(coverUrls.length > 0 && { coverImage: coverUrls }),
        ...(postUrls.length > 0 && { postImages: postUrls }),
      };

      await updateDataById("posts", data, singlePost.id);
      toast.success("Post updated successfully");
      setEditPostToggle(false);
    } catch (error) {
      toast.error("Failed to update post");
      console.error("Update error:", error);
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
      if (isOk) updateHandler();
    });
  };

  return (
    <section className="fixed overflow-scroll z-[999] top-0 left-0 flex justify-center items-center w-full h-full bg-opacity-70 bg-black">
      <div className="m-auto md:w-1/2 w-11/12 border-2 border-gray-300 rounded-lg bg-white p-4">
        <div className="flex justify-between items-center capitalize font-bold text-xl pb-2">
          <span></span>
          <h1 className="text-green-600">Update Post</h1>
          <span
            onClick={() => setEditPostToggle(false)}
            className="cursor-pointer text-red-600 text-4xl"
          >
            <FaWindowClose />
          </span>
        </div>
        <form onSubmit={submitHandler} className="flex flex-col gap-3">
          <input
            className="border-2 px-3 rounded-lg border-gray-300 p-2 placeholder:p-2"
            placeholder="Post Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            className="cursor-pointer border-2 rounded-lg border-gray-300 p-3"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          >
            <option disabled value="">
              Categories
            </option>
            {category.map((cate) => (
              <option key={cate?.id} value={cate?.title}>
                {cate?.title}
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

          {/* Cover Image */}
          <label
            htmlFor="uploadOneImage"
            className="flex justify-center gap-3 items-center capitalize py-2 bg-lime-400 border-2 rounded-lg border-lime-600 hover:bg-lime-500 font-semibold text-lg text-gray-800 cursor-pointer duration-400"
          >
            One <IoCloudUploadOutline className="text-3xl" /> Choose image for
            cover
          </label>
          <input
            accept="image/*"
            className="hidden"
            type="file"
            id="uploadOneImage"
            onChange={(e) => setCoverImage(Array.from(e.target.files))}
          />

          {/* Post Detail Images */}
          <label
            htmlFor="uploadMultiImage"
            className="flex justify-center gap-3 items-center capitalize py-2 bg-yellow-400 border-2 rounded-lg border-yellow-600 hover:bg-yellow-500 font-semibold text-lg text-gray-800 cursor-pointer duration-400"
          >
            Multi <FaUpload className="text-3xl" /> Choose images for post
            details
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
            className="flex justify-center items-center gap-2 capitalize border-2 rounded-lg border-gray-300 bg-green-600 py-2 hover:bg-green-800 duration-300 text-white text-xl font-semibold"
          >
            {isUploading ? (
              <ThreeCircles
                visible={true}
                height="40"
                width="40"
                color="#fff"
                ariaLabel="three-circles-loading"
              />
            ) : (
              "Update Post"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
