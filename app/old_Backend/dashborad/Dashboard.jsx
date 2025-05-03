"use client";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase/Firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { AiOutlineHome, AiOutlineUser, AiOutlineTable } from "react-icons/ai";
import { FaBars, FaTimes } from "react-icons/fa";

import AddContent from "./AddContent";
import EditContent from "./EditContent";
import ShowContent from "./ShowContent";

function Dashboard() {
  const [activeSection, setActiveSection] = useState("Add Content");
  // --------------------------- Resize Sidebar --------------------------------------

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  // ---------------------------/ Resize Sidebar --------------------------------------

  const category = [
    { name: "Add Content", icon: AiOutlineHome },
    { name: "Edit Content", icon: AiOutlineUser },
    { name: "Show Content", icon: AiOutlineTable },
  ];
  // --------------------------------------------------------------
  // --------------------------------------------------------------
  // .......................... Firebase ...........................
  // .......................... Firebase ...........................
  // .......................... Firebase ...........................
  // .......................... Firebase ...........................
  // .......................... Firebase ...........................

  const colRef = collection(db, "posts");
  const title = useRef();
  const emptySection = useRef();
  const discription = useRef();
  const form = useRef(null);

  const [data, setData] = useState([]);
  // const [oneTodoData, setOneTodoData] = useState(false);

  // --------------------------- get all Data --------------------------------------
  useEffect(() => {
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("documents", documents);
      setData(documents);
    });

    return unsubscribe;
  }, [colRef]);

  // --------------------------- post Data --------------------------------------
  const postData = async () => {
    try {
      await addDoc(colRef, {
        title: title.current.value,
        emptySection: emptySection.current.value,
        discription: discription.current.value,
        date: serverTimestamp(),
      });
      form.current.reset();
    } catch (error) {
      console.log(error.message);
    }
  };
  // --------------------------- Delete Data --------------------------------------
  const deleteDataById = async (id) => {
    const docRef = doc(db, "todos", id);
    try {
      await deleteDoc(docRef);
      console.log("todo deleted successfuly");
    } catch (error) {
      console.log(error.message);
    }
  };
  // --------------------------------------
  const deleteFeildById = async (dataDelete, id) => {
    const docRef = doc(db, "todos", id);
    try {
      await updateDoc(docRef, { [dataDelete]: deleteField() });
      alert("todo Updated successfuly");
    } catch (error) {
      console.log(error.message);
    }
  };
  // --------------------------- Update Data --------------------------------------
  const updateDataById = async (newData, id) => {
    const docRef = doc(db, "todos", id);
    try {
      await updateDoc(docRef, newData);
      alert("todo Updated successfuly");
    } catch (error) {
      console.log(error.message);
    }
  };
  // --------------------------- get Data for one todo --------------------------------------
  // const getDataById = async (id) => {
  //   const docRef = doc(db, "todos", id);
  //   const data = await getDoc(docRef);
  //   setOneTodoData(data.data());
  // };
  // .......................... /Firebase ...........................
  // ........................../ Firebase ...........................
  // .......................... /Firebase ...........................
  // .......................... /Firebase ...........................
  // ........................../ Firebase ...........................
  // ........................../ Firebase ...........................
  
  // .......................... ...........................
  // .......................... ...........................
  // .......................... ...........................

  // .......................... cloudinary ...........................
  // .......................... cloudinary ...........................
  // .......................... cloudinary ...........................
  // .......................... cloudinary ...........................
  // .......................... cloudinary ...........................
  const presetKey = "dwvad4cmy";
  const cloudName = "first_project";

  const [posts, setPosts] = useState([]);
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!files.length) return;
    setIsUploading(true);

    const promises = Array.from(files).map(async (file) => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", cloudName);
      data.append("folder", `images/${title.current.value}`); // إضافة اسم المجلد

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${presetKey}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const uploadImage = await res.json();
      console.log("uploadImage", uploadImage.url);

      return uploadImage.url;
    });

    try {
      const urls = await Promise.all(promises);
      setPosts((oldPosts) => [...oldPosts, ...urls]);
      setFiles([]);
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setIsUploading(false);
    }
  };
  // .......................... / cloudinary ...........................
  // .......................... / cloudinary ...........................
  // .......................... / cloudinary ...........................
  // .......................... / cloudinary ...........................
  // .......................... / cloudinary ...........................
 
  return (
    <div className="px-5">
      <button
        className="text-3xl text-orange-600 hover:bg-slate-700 rounded-md p-2 md:hidden "
        type="button"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>
      <div className="min-h-screen bg-gray-50/50 flex justify-between">
        {/* ------------------------------ sidebar -------------------- */}
        {isSidebarOpen && (
          <div className="bg-slate-800 sticky max-md:mx-2 inset-0 z-50 my-2 w-[20%] rounded-xl transition-transform duration-300 ">
            <div className="px-4  py-4 flex items-center justify-between border-b border-white/20">
              <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
                PORTFOLIO Dashboard
              </h6>
            </div>
            <div className="m-4">
              <ul className="mb-4 flex flex-col gap-1">
                {category.map((ele) => (
                  <li key={ele.name}>
                    <button
                      className="font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white bg-gray-700 hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                      type="button"
                      onClick={() => setActiveSection(ele.name)}
                    >
                      <ele.icon className="w-5 h-5 text-inherit" />
                      <span className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                        {ele.name}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {/* ------------------------------ sidebar -------------------- */}
        {/* ------------------------------ Body -------------------- */}
        <div className="p-4  bg-slate-500 max-md:w-full w-[79%] my-4 rounded-xl h-screen">
          {activeSection === "Add Content" && (
            <AddContent
              title={title}
              emptySection={emptySection}
              discription={discription}
              form={form}
              postData={postData}
              posts={posts}
              setFiles={setFiles}
              isUploading={isUploading}
              handleUpload={handleUpload}
            />
          )}
          {activeSection === "Edit Content" && (
            <EditContent
              updateDataById={updateDataById}
              deleteFeildById={deleteFeildById}
              deleteDataById={deleteDataById}
              data={data}
            />
          )}
          {activeSection === "Show Content" && <ShowContent />}
        </div>
        {/* ------------------------------ /Body -------------------- */}
      </div>
    </div>
  );
}

export default Dashboard;
