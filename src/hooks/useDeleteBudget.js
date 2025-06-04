// src/hooks/useDeleteBudget.js
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useDeleteBudget = () => {
  const { userID } = useGetUserInfo();

  const deleteBudget = async (category) => {
    if (!userID) return;
    try {
      await deleteDoc(doc(db, "budgets", `${userID}_${category}`));
    } catch (err) {
      console.error("Erreur deleteBudget :", err);
    }
  };

  return { deleteBudget };
};
