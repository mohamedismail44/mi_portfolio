"use client";
import { useState } from "react";
import DataInCard from "./DataInCard";

export default function EditContent({
  data,
  updateDataById,
  deleteFeildById,
  deleteDataById,
}) {
  const [checkPassword, setCheckPassword] = useState(null);

  return (
    <div className="py-3 px-5">
      <div className="flex gap-5 ">
        {data.map((ele) => (
          <div key={ele.id}>
            <article className="rounded-xl border border-gray-700 bg-gray-800 p-4">
              {/* <div className="flex items-center gap-4">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1614644147724-2d4785d69962?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
                  className="size-16 rounded-full object-cover"
                />

                <div>
                  <h3 className="text-lg font-medium text-white">Claire Mac</h3>

                  <div className="flow-root">
                    <ul className="-m-1 flex flex-wrap">
                      <li className="p-1 leading-none">
                        <button className="text-xs font-medium text-gray-300">
                          Twitter
                        </button>
                      </li>

                      <li className="p-1 leading-none">
                        <button className="text-xs font-medium text-gray-300">
                          GitHub
                        </button>
                      </li>

                      <li className="p-1 leading-none">
                        <button className="text-xs font-medium text-gray-300">
                          Website
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div> */}

              <div className="flex justify-between items-center  ">
                <input
                  onChange={(e) => setCheckPassword(e.target.value)}
                  type="password"
                  placeholder="Enter Password"
                  className="bg-transparent text-white border border-gray-700"
                />
                <button
                  onClick={() => checkPassword == 123 && deleteDataById(ele.id)}
                  className="text-pink-600 text-l transition border border-pink-600 rounded-full  px-8 hover:bg-pink-600 hover:text-white"
                >
                  Delete Post
                </button>
              </div>
              {/* ......................................................... */}
              <ul className="mt-4 space-y-2">
                <DataInCard
                  id={ele.id}
                  deleteFeildById={deleteFeildById}
                  updateDataById={updateDataById}
                  dataName={"title"}
                  data={ele.title}
                />
                <DataInCard
                  id={ele.id}
                  deleteFeildById={deleteFeildById}
                  updateDataById={updateDataById}
                  dataName={"pictureLink"}
                  data={ele.pictureLink}
                />
                <DataInCard
                  id={ele.id}
                  deleteFeildById={deleteFeildById}
                  updateDataById={updateDataById}
                  dataName={"videoLink"}
                  data={ele.videoLink}
                />
                <DataInCard
                  id={ele.id}
                  deleteFeildById={deleteFeildById}
                  updateDataById={updateDataById}
                  dataName={"discription"}
                  data={ele.discription}
                />
              </ul>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
