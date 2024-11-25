import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AboutPage from "./pages/AboutPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import UserPage from "./pages/UserPages/UserPage";
import UserTripsPostsPage from "./pages/UserPages/UserTripsPostsPage";
import HeroSection from "./components/HeroSection";
import { AuthProvider } from "./context/AuthContext";
import AllPosts from "./pages/UserPages/FriendsPage";
import TripPage from "./pages/UserPages/TripPage";
import GroupsPage from "./pages/Groups/GroupsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Group from "./pages/Groups/Group";

import PlanGroupTripPage from "./pages/Groups/PlanGroupTripPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HeroSection />,
    },
    {
      path: "/about",
      element: <AboutPage />,
    },
    {
      path: "/signup",
      element: <SignUpPage />,
    },
    {
      path: "/signin",
      element: <SignInPage />,
    },

    {
      path: "/user",
      element: (
        <ProtectedRoute>
          <UserPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/user/mytrips",
      element: (
        <ProtectedRoute>
          <UserTripsPostsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/user/members",
      element: (
        <ProtectedRoute>
          <AllPosts />
        </ProtectedRoute>
      ),
    },
    {
      path: "/user/trip/:id",
      element: (
        <ProtectedRoute>
          <TripPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/user/group",
      element: (
        <ProtectedRoute>
          <GroupsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/user/group/:groupId",
      element: (
        <ProtectedRoute>
          <Group />
        </ProtectedRoute>
      ),
    },
    {
      path: "/user/group/:groupId/plan",
      element: (
        <ProtectedRoute>
          <PlanGroupTripPage />
        </ProtectedRoute>
      ),
    },
  ],
  {
    future: {
      v7_skipActionErrorRevalidation: true,
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
    },
  }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
