import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth } from "./pages/auth/index";
import { Ecodib } from "./pages/ecodib/index";
import Aide from "./pages/aide/index";
import  Reports  from "./pages/reports/index";
import Budget from "./pages/budget/index";

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
      <Route path="/" exact element={<Auth />} />
      <Route path="/ecodib" element={<Ecodib />} />
      <Route path="/aide" element={<Aide />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/budget" element={<Budget />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
