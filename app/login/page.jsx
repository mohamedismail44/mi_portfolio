"use client";
import { useState, useEffect } from "react";
// import { handleSignUp } from "../backend/auth";
import { handleLogin } from "../backend/auth";
import { toast } from "react-toastify";
import Link from "next/link";
import { useAuthListener } from "../backend/checkUser";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, loading } = useAuthListener();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/admin-dashboard");
    }
  }, [loading, user, router]);

  const login = async (e) => {
    e.preventDefault();
    if (!email.trim()) return toast.error("Email is required");
    if (!password.trim()) return toast.error("Password is required");

    await handleLogin(email, password);
  };
  if (loading) {
    return <p className="text-center">جاري التحقق...</p>;
  }
  return (
    <section className="fixed z-[999] top-0 left-0 flex justify-center items-center w-full h-full bg-opacity-70 bg-black">
      <form
        className="text-xl flex flex-col gap-3 justify-center items-center absolute bg-slate-100 rounded-xl w-[90%] md:w-1/2 p-10"
        onSubmit={login}
      >
        <h2>Login</h2>
        <input
          className="w-[90%] border-2 px-3 rounded-lg p-2"
          value={email}
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-[90%] border-2 px-3 rounded-lg p-2"
          value={password}
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-1/2 rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white"
        >
          Login
        </button>
        {/* SignUp code */}
        {/* <button
          type="button"
          className="inline-block rounded border border-green-600 px-12 py-3 text-sm font-medium text-green-600 hover:bg-green-600 hover:text-white focus:outline-none focus:ring active:bg-green-500"
          onClick={() => handleSignUp(email, password)}
        >
          Signup
        </button> */}
        <div className="flex justify-end w-full">
          <Link
            href="/"
            className="bg-red-600 rounded px-7 py-1 text-sm font-medium text-white hover:bg-red-200 hover:text-red-600"
          >
            Go to Home
          </Link>
        </div>
      </form>
    </section>
  );
}
