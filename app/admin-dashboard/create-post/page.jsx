"use client";

import AdminMain from "../components/AdminMain";
import AdminSidbar from "../components/AdminSidbar";
import { useAuthListener } from "../../backend/checkUser";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { user, loading } = useAuthListener();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return <p className="text-center">جاري التحقق...</p>;
  }

  return (


      <div className="flex justify-between mb-5 min-h-[calc(100vh-9rem)]">
        <AdminSidbar />
        <AdminMain />
      </div>
  );
}
