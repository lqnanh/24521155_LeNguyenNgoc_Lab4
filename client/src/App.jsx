import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router";
import RootLayout from "./layouts/RootLayout.jsx";
import PeopleLayout from "./layouts/PeopleLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import PeopleIndexPage from "./pages/PeopleIndexPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import FormPage from "./pages/FormPage.jsx";
import ForumPage from "./pages/ForumPage.jsx";
import { DEFAULT_FORUM_ID } from "./forums.js";
import PersonDetailSkeleton from "./components/PersonDetailSkeleton.jsx";
import { people } from "./data/people.js";

const PersonDetailPage = lazy(() => import("./pages/PersonDetailPage.jsx"));

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />

        <Route path="people" element={<PeopleLayout people={people} />}>
          <Route index element={<PeopleIndexPage />} />
          <Route
            path=":id"
            element={
              <Suspense fallback={<PersonDetailSkeleton />}>
                <PersonDetailPage people={people} />
              </Suspense>
            }
          />
        </Route>

        <Route path="form" element={<FormPage />} />

        <Route path="forum">
          <Route index element={<Navigate to={DEFAULT_FORUM_ID} replace />} />
          <Route path=":forum" element={<ForumPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
