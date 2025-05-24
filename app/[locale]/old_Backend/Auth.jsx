"use client";
import { useEffect, useRef, useState } from "react";
import { firebaseApp } from "./firebase/Firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import Dashboard from "./dashborad/Dashboard";

export default function Auth() {
  const [UserLogin, setUserLogin] = useState({});
  const auth = getAuth(firebaseApp);
  const form = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserLogin(user);
    });
  }, [auth]);

  /* ---------------------------------handle SignUp------------------------------ */

  console.log("UserLogout", UserLogin);

  const handleSignUp = async () => {
    try {
      const credintials = await createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      );
      console.log("credintials", credintials);
    } catch (error) {
      console.log("error", error);
    }
    form.current.reset();
  };

  /* ---------------------------------handle Login------------------------------ */

  const handleLogin = async () => {
    try {
      const credintials = await signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      );
      console.log("credintials", credintials);
    } catch (error) {
      console.log("error", error);
    }
    form.current.reset();
  };

  /* ---------------------------------handle Logout------------------------------ */

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("user logout");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      {/* ---------------------------------Logout------------------------------ */}
      {UserLogin ? (
        <section className="mt-7">
          <div className="text-xl flex flex-col justify-center items-center">
            <p>{UserLogin.email}</p>
            <button
              onClick={handleLogout}
              className="middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
            >
              Logout
            </button>
          </div>
          <div>
            <Dashboard />
          </div>
        </section>
      ) : (
        <section className="text-xl mt-7 flex flex-col gap-3 justify-center items-center">
          {/* ---------------------------------Login / signup------------------------------ */}
          <h2> Login / signup</h2>
          <form className="flex flex-col gap-3" ref={form}>
            <input
              className="rounded border border-indigo-600"
              ref={email}
              type="email"
              name="email"
              placeholder="email"
            />
            <input
              className="rounded border border-indigo-600"
              ref={password}
              type="text"
              name="password"
              placeholder="password"
            />
          </form>
          <div className="gap-8 flex">
            <button
              className="inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              className="inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
              onClick={handleSignUp}
            >
              Signup
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
