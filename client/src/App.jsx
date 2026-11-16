import { Routes, Route } from "react-router";
import RootLayout from "./layouts/RootLayout.jsx";
import PeopleLayout from "./layouts/PeopleLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import PeopleIndexPage from "./pages/PeopleIndexPage.jsx";
import PersonDetailPage from "./pages/PersonDetailPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import { people } from "./data/people.js";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />

        <Route path="people" element={<PeopleLayout people={people} />}>
          <Route index element={<PeopleIndexPage />} />
          <Route path=":id" element={<PersonDetailPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
