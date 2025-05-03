"use client";

import { useState } from "react";

function AddContent({
  title,
  emptySection,
  discription,
  postData,
  form,
  posts,
  setFiles,
  isUploading,
  handleUpload,
}) {
  const [password, setPassword] = useState();

  return (
    <div>
      <form ref={form}>
        <div className="w-full bg-neutral-300 py-2 rounded flex justify-between">
          <div className="w-[80%] text-center text-2xl font-semibold">
            <span>ADD POST</span>
          </div>
          <div className="w-[18%] mx-3 text-center font-semibold">
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="text"
              placeholder="Password"
              className="border border-slate-400 rounded-lg px-2 py-2 mx-2 w-[98%] "
            />
          </div>
        </div>
        {/* .............................. title ............................... */}

        <div className="w-full bg-neutral-300 my-1 py-2 rounded flex justify-between max-md:flex-col max-md:items-center ">
          <div className="w-[20%] max-md:w-[98%] text-center text-lg font-semibold">
            <span>Title</span>
          </div>
          <div className="w-[80%] max-md:w-[98%] font-semibold">
            <input
              type="text"
              placeholder="Enter a title"
              ref={title}
              className="border border-slate-400 rounded-lg px-2 py-2 mx-2 w-[98%] "
            />
          </div>
        </div>
        {/* ............................................................. */}

        <div className="w-full bg-neutral-300 my-1 py-2 rounded flex justify-between max-md:flex-col max-md:items-center ">
          <div className="w-[20%] max-md:w-[98%] text-center text-lg font-semibold">
            <span>Empty</span>
          </div>
          <div className="w-[80%] max-md:w-[98%] font-semibold">
            <input
              type="text"
              placeholder="Empty"
              ref={emptySection}
              className="border border-slate-400 rounded-lg px-2 py-2 mx-2 w-[98%] "
            />
          </div>
        </div>
        {/* ............................................................. */}

        <div className="w-full bg-neutral-300 my-1 py-2 rounded flex justify-between max-md:flex-col max-md:items-center ">
          <div className="w-[20%] max-md:w-[98%] text-center text-lg font-semibold">
            <span>Description</span>
          </div>
          <div className="w-[80%] max-md:w-[98%] font-semibold">
            <textarea
              className="border border-slate-400 rounded-lg px-2 py-2 mx-2 w-[98%] h-auto"
              placeholder="Enter your description"
              ref={discription}
            ></textarea>
          </div>
        </div>
      </form>
      {/* ............................................................. */}
      <div className="w-full bg-neutral-300 my-1 py-2 rounded flex justify-between max-md:flex-col max-md:items-center ">
        <div className="w-[20%] max-md:w-[98%] text-center text-lg font-semibold">
          <span>Upload Images</span>
        </div>
        <div className="w-[80%] max-md:w-[98%] font-semibold">
          <input
            type="file"
            multiple
            placeholder="Upload Images"
            className="border border-slate-400 rounded-lg px-2 py-2 mx-2 w-[98%] "
            onChange={(event) => setFiles(event.target.files)}
            disabled={isUploading}
          />
        </div>
      </div>
      {/* ............................................................. */}
      <div className="flex justify-center mt-3  ">
        <button
          onClick={() => {
            if (password === "123") {
              postData();
              handleUpload();
            }
          }}
          className=" w-1/2 bg-rose-600 p-3 rounded-lg duration-500 text-xl  font-semibold hover:bg-rose-800"
        >
          Pubish Post
        </button>
      </div>
      {/* ............................................... */}
      {/* ............................................... */}
      {/* ............................................... */}
      {isUploading && <p>Uploading...</p>}
      {posts.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Uploaded preview ${index}`}
          style={{ width: "150px", margin: "10px" }}
        />
      ))}
      {/* ............................................... */}
      {/* ............................................... */}
      {/* ............................................... */}
    </div>
  );
}

export default AddContent;
