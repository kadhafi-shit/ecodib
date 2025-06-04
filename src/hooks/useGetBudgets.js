// src/hooks/useGetBudgets.js
import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetBudgets = () => {
const { userID } = useGetUserInfo();
const [budgets, setBudgets] = useState({}); 
  // on fournira un objet { [categorie]: montant, … }

useEffect(() => {
    if (!userID) return;

    const q = query(
    collection(db, "budgets"),
    where("userID", "==", userID)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
    const tmp = {};
    snapshot.forEach((doc) => {
        const data = doc.data();
        // on stocke chaque doc sous forme tmp[category] = amount
        tmp[data.category] = data.amount;
    });
    setBudgets(tmp);
    });

    return () => unsubscribe();
}, [userID]);

  return budgets; // e.g. { "Alimentation": 50000, "Loisirs": 20000, … }
};
