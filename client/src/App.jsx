import { Routes, Route } from "react-router";
import NavBar from "./components/NavBar.jsx";
import HomePage from "./pages/HomePage.jsx";
import PeoplePage from "./pages/PeoplePage.jsx";
import PersonDetailPage from "./pages/PersonDetailPage.jsx";

export default function App() {
  return (
    <>
      <header className="site-header">
        <NavBar />
      </header>

      <main className="site-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/people/:personId" element={<PersonDetailPage />} />
        </Routes>
      </main>
    </>
  );
}
