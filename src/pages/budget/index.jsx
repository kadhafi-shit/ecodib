// src/pages/budget/index.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetBudgets } from "../../hooks/useGetBudgets";
import { useSetBudget } from "../../hooks/useSetBudget";
import { useDeleteBudget } from "../../hooks/useDeleteBudget";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import "./styles.css";

const CATEGORIES = [
  "Alimentation",
  "Immobilier",
  "Shopping",
  "Transports",
  "Fêtes",
  "Mariages",
  "Voyages",
  "Cadeaux",
  "Vacances",
  "Jeux et loisirs",
  "Autres",
];

const BudgetPage = () => {
  // 1. Récupérer tous les budgets et fonctions set/delete
  const budgets = useGetBudgets();
  const { setBudget } = useSetBudget();
  const { deleteBudget } = useDeleteBudget();

  // 2. Récupérer toutes les transactions
  const { transactions } = useGetTransactions();

  // 3. Hook pour créer une transaction
  const { addTransaction } = useAddTransaction();

  // État local pour la saisie du budget
  const [formBudgets, setFormBudgets] = useState(
    CATEGORIES.reduce((acc, cat) => {
      acc[cat] = budgets[cat] || "";
      return acc;
    }, {})
  );

  useEffect(() => {
    setFormBudgets(
      CATEGORIES.reduce((acc, cat) => {
        acc[cat] = budgets[cat] ?? "";
        return acc;
      }, {})
    );
  }, [budgets]);

  // 4. Total dépensé par catégorie
  const totalsParCategorie = CATEGORIES.reduce((acc, cat) => {
    const relevant = transactions.filter((t) => t.category === cat);
    const total = relevant.reduce(
      (sum, t) => sum + Number(t.transactionAmount),
      0
    );
    acc[cat] = total;
    return acc;
  }, {});

  // 5. État pour nouvelle transaction
  const [newTx, setNewTx] = useState({
    category: CATEGORIES[0],
    description: "",
    transactionAmount: "",
    transactionType: "expense",
  });

  const handleBudgetChange = (cat, value) => {
    setFormBudgets((prev) => ({ ...prev, [cat]: value }));
  };

  const handleSaveBudget = (e, cat) => {
    e.preventDefault();
    const amount = formBudgets[cat];
    if (amount === "" || isNaN(amount)) return;
    setBudget(cat, amount);
  };

  const handleNewTxChange = (e) => {
    const { name, value } = e.target;
    setNewTx((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (
      newTx.description === "" ||
      newTx.transactionAmount === "" ||
      isNaN(newTx.transactionAmount)
    )
      return;
    addTransaction({
      ...newTx,
      transactionAmount: Number(newTx.transactionAmount),
    });
    setNewTx((prev) => ({
      ...prev,
      description: "",
      transactionAmount: "",
    }));
  };

  // Fonction pour retourner l'icône SVG correspondant à chaque catégorie
  const getCategoryIcon = (cat) => {
    switch (cat) {
      case "Alimentation":
        return (
          <svg
            className="cat-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M19 2H5a2 2 0 0 0-2 2v2h18V4a2 2 0 0 0-2-2zM3 11h18v2H3v-2zm2 9h4v-2H5v2zm6 0h4v-2h-4v2zm6 0h4v-2h-4v2z" />
          </svg>
        );
      case "Immobilier":
        return (
          <svg
            className="cat-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 3l9 8h-3v7h-4v-5H10v5H6v-7H3l9-8z" />
          </svg>
        );
      case "Shopping":
        return (
          <svg
            className="cat-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M6 2l1.5 4h9L18 2H6zm0 6l-2 12h16L18 8H6zm5 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
          </svg>
        );
      case "Transports":
        return (
          <svg
            className="cat-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M3 12l2-4h14l2 4v5a1 1 0 0 1-1 1h-1a2 2 0 1 1-4 0H9a2 2 0 1 1-4 0H4a1 1 0 0 1-1-1v-5zm2 0h14v4H5v-4z" />
          </svg>
        );
      case "Fêtes":
        return (
          <svg
            className="cat-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l1.5 3 3 .5-2.5 2.5.5 3-2.5-1.5-2.5 1.5.5-3L7.5 5.5l3-.5L12 2zM5 18v2h14v-2H5z" />
          </svg>
        );
      case "Mariages":
        return (
          <svg
            className="cat-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 3l9 8h-3v7h-4v-5H10v5H6v-7H3l9-8z M12 12a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
          </svg>
        );
      case "Voyages":
        return (
          <svg
            className="cat-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M2 17l5-4 5 4 5-4 5 4 1-5-9-4-9 4 1 5z M7 13l5 4 5-4" />
          </svg>
        );
      case "Cadeaux":
        return (
          <svg
            className="cat-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7h16zM2 7h20v3H2V7zm6 0a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm8 0a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
          </svg>
        );
      case "Vacances":
        return (
          <svg
            className="cat-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l2 8H4l2-8h6zm0 10v10H6v-4H4l8-6zm6 0v10h-6v-4h-2l8-6z" />
          </svg>
        );
      case "Jeux et loisirs":
        return (
          <svg
            className="cat-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M7 2l10 0v7H7V2zm9 18v-2h4a2 2 0 0 0 2-2v-5H2v5a2 2 0 0 0 2 2h4v2h8zM9 14h6v2H9v-2z" />
          </svg>
        );
      case "Autres":
      default:
        return (
          <svg
            className="cat-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M17 3H7a2 2 0 0 0-2 2v4h2V5h10v4h2V5a2 2 0 0 0-2-2zM4 15v4a2 2 0 0 0 2 2h4v-2H6v-4H4zm10 0v4h4a2 2 0 0 0 2-2v-4h-2v4h-4v-4h-2zM7 11h10v2H7v-2z" />
          </svg>
        );
    }
  };

  return (
    <div className="budget-page">
      <div className="back-container">
        <Link to="/ecodib" className="back-button">
          ← Retour au Dashboard
        </Link>
      </div>

      <h2 className="budget-title">Gestion de Budget🪙</h2>

      <div className="budget-container">
        {/* Colonne Budgets par catégorie */}
        <div className="budgets-col">
          <h3>Budgets par catégorie</h3>
          {CATEGORIES.map((cat) => {
            const budgetActuel = budgets[cat] ?? 0;
            const depenseTotale = totalsParCategorie[cat] ?? 0;
            const reste = budgetActuel - depenseTotale;

            let message = "";
            if (reste <= 0) message = "0 fcfa restants !";
            else if (reste <= 100000)
              message = `${reste.toLocaleString()} fcfa restants 👍`;
            else message = `+${reste.toLocaleString()} fcfa restants`;

            return (
              <div
                key={cat}
                className="budget-card"
                data-category={cat}
              >
                <div className="budget-card-header">
                  {getCategoryIcon(cat)}
                  <h4>{cat}</h4>
                </div>
                <div className="budget-card-content">
                  <form onSubmit={(e) => handleSaveBudget(e, cat)}>
                    <label>
                      Budget :{" "}
                      <input
                        type="number"
                        value={formBudgets[cat]}
                        onChange={(e) =>
                          handleBudgetChange(cat, e.target.value)
                        }
                        placeholder="Montant en fcfa"
                      />
                    </label>
                    <button type="submit">Enregistrer</button>
                    {/* Bouton Réinitialiser */}
                    <button
                      type="button"
                      className="reset-button"
                      onClick={() => deleteBudget(cat)}
                    >
                      Réinitialiser
                    </button>
                  </form>
                  <p className="budget-info">
                    Dépensé(e) : {depenseTotale.toLocaleString()} fcfa
                  </p>
                  <p className="budget-info">
                    Budget : {budgetActuel.toLocaleString()} fcfa
                  </p>
                  <p className="budget-message">{message}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Colonne Ajout transaction + aperçu rapide */}
        <div className="tx-col">
          {/* Section « Ajouter une transaction » */}
          <div className="tx-section">
            <h3>Ajouter une transaction</h3>
            <form className="tx-form" onSubmit={handleAddTransaction}>
              <label>
                Catégorie :
                <select
                  name="category"
                  value={newTx.category}
                  onChange={handleNewTxChange}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Type :
                <select
                  name="transactionType"
                  value={newTx.transactionType}
                  onChange={handleNewTxChange}
                >
                  <option value="expense">Dépense</option>
                  <option value="income">Revenu</option>
                </select>
              </label>
              <label>
                Description :
                <input
                  type="text"
                  name="description"
                  value={newTx.description}
                  onChange={handleNewTxChange}
                  placeholder="Ex : Courses, Loyer..."
                  required
                />
              </label>
              <label>
                Montant (fcfa) :
                <input
                  type="number"
                  name="transactionAmount"
                  value={newTx.transactionAmount}
                  onChange={handleNewTxChange}
                  placeholder="0"
                  required
                />
              </label>
              <button type="submit">Ajouter</button>
            </form>
          </div>

          {/* Section « Résumé rapide » */}
          <div className="tx-section">
            <h3>Résumé rapide</h3>
            <div className="quick-section">
              {CATEGORIES.map((cat) => {
                const depenseTotale = totalsParCategorie[cat] ?? 0;
                const budgetActuel = budgets[cat] ?? 0;
                const reste = budgetActuel - depenseTotale;
                return (
                  <div key={cat} className="quick-card">
                    <strong>{cat}</strong>
                    <p>
                      Dépense : {depenseTotale.toLocaleString()} fcfa — Budget{" "}
                      : {budgetActuel.toLocaleString()} fcfa — Reste :{" "}
                      {reste.toLocaleString()} fcfa
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;
