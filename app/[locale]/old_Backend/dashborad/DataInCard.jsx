"use client";
import { useState } from "react";

export default function DataInCard({
  dataName,
  data,
  updateDataById,
  deleteFeildById,
  id,
}) {
  const [showEditBox, setShowEditBox] = useState(false);
  const [showDeleteBox, setShowDeleteBox] = useState(false);
  const [dataFromInput, setDataFromInput] = useState(null);
  const [checkPassword, setCheckPassword] = useState(null);

  const ShowEditBoxFalse = () => {
    setShowEditBox(false);
    setShowDeleteBox(true);
  };
  const ShowEditBoxTrue = () => {
    setShowEditBox(true);
    setShowDeleteBox(false);
  };
  return (
    <div>
      {data && (
        <div className="h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
          <li className="flex justify-between items-center  ">
            <button>
              <strong className="font-medium text-white">{dataName}</strong>
              <p className="mt-1 text-xs font-medium text-gray-300">{data}</p>
            </button>
            <button
              onClick={ShowEditBoxFalse}
              className="text-pink-600 text-l transition border border-pink-600 rounded-full p-1 hover:bg-pink-600 hover:text-white"
            >
              X
            </button>
          </li>
          {/* ...............................Edit Box................................ */}
          {showDeleteBox && (
            <div className="bg-white mt-3 shadow w-full rounded-lg divide-y divide-gray-200">
              <div className="px-3 py-2">
                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                  Password
                </label>
                <input
                  onChange={(e) => setCheckPassword(e.target.value)}
                  type="password"
                  className="border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full"
                />
                <div className="flex justify-between">
                  <button
                    onClick={() =>
                      checkPassword === 123 && deleteFeildById(dataName, id)
                    }
                    type="button"
                    className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-[48%] py-1 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                  >
                    <span className="inline-block mr-2">Apply Delete</span>
                  </button>

                  <button
                    onClick={() => setShowDeleteBox(false)}
                    type="button"
                    className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-[48%] py-1 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                  >
                    <span className="inline-block mr-2">Hide</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {showEditBox ? (
            <div className="bg-white mt-3 shadow w-full rounded-lg divide-y divide-gray-200">
              <div className="px-3 py-2">
                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                  Edit
                </label>
                <textarea
                  onChange={(e) => setDataFromInput(e.target.value)}
                  type="text"
                  className="border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full"
                ></textarea>
                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                  Password
                </label>
                <input
                  onChange={(e) => setCheckPassword(e.target.value)}
                  type="password"
                  className="border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full"
                />
                <div className="flex justify-between">
                  <button
                    onClick={() =>
                      checkPassword === 123 &&
                      dataFromInput &&
                      updateDataById({ [dataName]: dataFromInput }, id)
                    }
                    type="button"
                    className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-[48%] py-1  rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                  >
                    <span className="inline-block mr-2">Apply Edit</span>
                  </button>
                  <button
                    onClick={() => setShowEditBox(false)}
                    type="button"
                    className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-[48%] py-1 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                  >
                    <span className="inline-block mr-2">Hide</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                onClick={ShowEditBoxTrue}
                className="inline-block rounded border mt-3 border-indigo-600 bg-indigo-600 px-6  text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
              >
                Edit Data
              </button>
            </div>
          )}
          {/* ................................/ Edit Box............................... */}
        </div>
      )}
    </div>
  );
}
