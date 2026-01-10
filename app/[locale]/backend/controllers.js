import { db } from "./Firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
// add try and catch in components when use
// add try and catch in components when use
// add try and catch in components when use

// --------------------------- Add Data with createdAt ------------------------
export const postData = async (collectionName, data) => {
  const docRef = collection(db, collectionName);
  await addDoc(docRef, {
    ...data,
    createdAt: serverTimestamp(),
  });
};

// --------------------------- Delete Document by id--------------------------------
export const deleteDataById = async (collectionName, id) => {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
};

// --------------------------- Delete Field -----------------------------------
export const deleteFieldById = async (collectionName, fieldName, id) => {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, { [fieldName]: deleteField() });
};

// --------------------------- Update Document with updatedAt -----------------
export const updateDataById = async (collectionName, newData, id) => {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, {
    ...newData,
    updatedAt: serverTimestamp(),
  });
};

// --------------------------- Get All Documents ------------------------------

// // .......get data sort by time .......
export const getData2 = (collectionName, setData) => {
  const colRef = collection(db, collectionName);
  const unsubscribe = onSnapshot(colRef, (snapshot) => {
    const fetchedData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // console.log("documents", fetchedData);
    setData(fetchedData);
  });
  return unsubscribe;
};

// .......get data sort by order number .......
export const getData = (collectionName, setData) => {
  const colRef = collection(db, collectionName);
  const q = query(colRef, orderBy("order")); // ترتيب حسب order

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const fetchedData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setData(fetchedData);
  });

  return unsubscribe;
};

// --------------------------- Get Document By ID -----------------------------
export const getDataById = async (collectionName, id, setOneData) => {
  const docRef = doc(db, collectionName, id);
  const data = await getDoc(docRef);
  if (data.exists()) {
    setOneData(data.data());
  } else {
    setOneData(null);
  }
};
