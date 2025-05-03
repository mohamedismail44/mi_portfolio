// FirebaseAuth.js
import { firebaseApp } from "./Firebase";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { toast } from "react-toastify";

const auth = getAuth(firebaseApp);

// ------------------------ Sign Up (email/password) ------------------------
export const handleSignUp = async (email, password) => {
  try {
    const credentials = await createUserWithEmailAndPassword(auth, email, password);
    toast.success("تم إنشاء الحساب بنجاح");
    return credentials.user;
  } catch (error) {
    toast.error(`خطأ في إنشاء الحساب: ${error.message}`);
  }
};

// ------------------------ Login (email/password) ------------------------
export const handleLogin = async (email, password) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    toast.success("تم تسجيل الدخول بنجاح");
    return credentials.user;
  } catch (error) {
    toast.error(`فشل تسجيل الدخول: ${error.message}`);
  }
};

// ------------------------ Logout ------------------------
export const handleLogout = async () => {
  try {
    await signOut(auth);
    toast.success("تم تسجيل الخروج بنجاح");
  } catch (error) {
    toast.error(`خطأ في تسجيل الخروج: ${error.message}`);
  }
};

// ------------------------ Login with Google ------------------------
export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    toast.success("تم تسجيل الدخول باستخدام Google");
    return result.user;
  } catch (error) {
    toast.error(`فشل تسجيل الدخول بـ Google: ${error.message}`);
  }
};
