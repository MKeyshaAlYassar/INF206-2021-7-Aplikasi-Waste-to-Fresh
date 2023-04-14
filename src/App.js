import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import LoginUser from "./pages/login-user/LoginUser";
import LoginPetugas from "./pages/login-petugas/LoginPetugas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginUser />} />
        <Route path="/petugas" element={<LoginPetugas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
