// src/hooks/useAddTransaction.js
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddTransaction = () => {
const transactionCollectionRef = collection(db, "transactions");
const { userID } = useGetUserInfo();

const addTransaction = async ({
    description,
    transactionAmount,
    transactionType,
    category,
}) => {
    // Construire l’objet à envoyer en excluant `category` s’il est undefined
    const docData = {
    userID,
    description,
    transactionAmount,
    transactionType,
    createdAt: serverTimestamp(),
    };

    if (category !== undefined) {
    docData.category = category;
    }

    await addDoc(transactionCollectionRef, docData);
};

return { addTransaction };
};
