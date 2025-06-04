import React from 'react';
import { Link } from 'react-router-dom';
import { useGetTransactions } from "../../hooks/useGetTransactions";
import "./styles.css";

// Icônes SVG (dérivées de Feather Icons) :

const WalletIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="card-icon-svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 1L3 5v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5l-9-4z" />
    <line x1="3" y1="5" x2="21" y2="5" />
    <path d="M16 11a2 2 0 1 1 0 4h.01" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="card-icon-svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const TrendingDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="card-icon-svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="1 6 10.5 15.5 15.5 10.5 23 18" />
    <polyline points="7 6 1 6 1 12" />
  </svg>
);

const Reports = () => {
  const { transactions, transactionTotals } = useGetTransactions();
  const { balance, income, expenses } = transactionTotals;

  // 1) Total transité (depuis le début)

  const totalTransitedAll = transactions.reduce(
    (sum, t) => sum + Number(t.transactionAmount),
    0
  );

  // 2) Total transité ce mois-ci

  const now = new Date();
  const currentKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const totalTransitedThisMonth = transactions
    .filter((t) => {
      const d = t.createdAt.toDate
        ? t.createdAt.toDate()
        : new Date(t.createdAt.seconds * 1000);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      return key === currentKey;
    })
    .reduce((sum, t) => sum + Number(t.transactionAmount), 0);

  // 3) Regroupement mensuel

  const groupByMonth = (txs) => {
    return txs.reduce((acc, t) => {
      const d = t.createdAt.toDate
        ? t.createdAt.toDate()
        : new Date(t.createdAt.seconds * 1000);
      const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;

      if (!acc[monthKey]) acc[monthKey] = { income: 0, expense: 0 };
      if (t.transactionType === "income") acc[monthKey].income += Number(t.transactionAmount);
      else acc[monthKey].expense += Number(t.transactionAmount);
      return acc;
    }, {});
  };

  const monthlyData = groupByMonth(transactions);
  const monthlyList = Object.entries(monthlyData)
    .map(([month, vals]) => ({
      month,
      income: vals.income,
      expense: vals.expense,
      net: vals.income - vals.expense,
    }))
    .sort((a, b) => a.month.localeCompare(b.month));

  // 4) Section Statistique
  
  const numTransactions = transactions.length;
  const avgTransaction =
    numTransactions > 0
      ? transactions.reduce((sum, t) => sum + Number(t.transactionAmount), 0) /
        numTransactions
      : 0;
  const ratioIncomeExpense = expenses > 0 ? (income / expenses).toFixed(2) : "∞";

  return (
    <div className="reports-page">

      {/* Bouton Retour */}
      <div className="back-container">
        <Link to="/ecodib" className="back-button">
          ← Retour
        </Link>
      </div>

      {/* Titre principal */}
      <h2 className="reports-title">Rapports</h2>

      {/* Résumé global */}
      <div className="summary">
        <div className="card balance-card">
          <WalletIcon />
          <strong>Solde actuel</strong>
          <p className="value">{balance} fcfa</p>
        </div>
        <div className="card income-card">
          <TrendingUpIcon />
          <strong>Total revenus</strong>
          <p className="value">{income} fcfa</p>
        </div>
        <div className="card expense-card">
          <TrendingDownIcon />
          <strong>Total dépensé</strong>
          <p className="value">{expenses} fcfa</p>
        </div>
        <div className="card month-card">
          <WalletIcon />
          <strong>Total transité (ce mois)</strong>
          <p className="value">{totalTransitedThisMonth} fcfa</p>
        </div>
        <div className="card all-card">
          <WalletIcon />
          <strong>Total d'Argent transité</strong>
          <p className="value">{totalTransitedAll} fcfa</p>
        </div>
      </div>

      {/* Section inférieure */}
      <div className="bottom-section">

        {/* Tableau Évolution mensuelle  */}
        <div className="table-container">
          <h3 className="section-title">Évolution mensuelle</h3>
          <div className="table-wrapper">
            <table className="monthly-table">
              <thead>
                <tr>
                  <th>Mois</th>
                  <th>
                    <TrendingUpIcon />
                    Revenus
                  </th>
                  <th>
                    <TrendingDownIcon />
                    Dépenses
                  </th>
                  <th>Net</th>
                </tr>
              </thead>
              <tbody>
                {monthlyList.map(({ month, income, expense, net }) => (
                  <tr key={month}>
                    <td>{month}</td>
                    <td>{income}</td>
                    <td>{expense}</td>
                    <td className={net >= 0 ? "net-positive" : "net-negative"}>{net}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ---- Statistiques ---- */}
        <div className="stats-container">
          <h3 className="section-title">Statistiques :</h3>
          <div className="stats">
            <div className="card stat-card">
              <strong>Nombre de transactions</strong>
              <p className="value">{numTransactions}</p>
            </div>
            <div className="card stat-card">
              <strong>Montant moyen</strong>
              <p className="value">{avgTransaction.toFixed(2)} fcfa</p>
            </div>
            <div className="card stat-card">
              <strong>Ratio revenus / dépenses</strong>
              <p className="value">{ratioIncomeExpense}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
