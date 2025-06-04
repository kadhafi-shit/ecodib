// src/hooks/useSetBudget.js
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useSetBudget = () => {
const { userID } = useGetUserInfo();

const setBudget = async (category, amount) => {
    if (!userID) return;
    try {
      // On fixe le doc ID = `${userID}_${category}` pour qu’il n’y ait qu’un doc par user+category
await setDoc(doc(db, "budgets", `${userID}_${category}`), {
        userID,
        category,
        amount: Number(amount),
});
    } catch (err) {
    console.error("Erreur setBudget :", err);
    }
};

return { setBudget };
};
