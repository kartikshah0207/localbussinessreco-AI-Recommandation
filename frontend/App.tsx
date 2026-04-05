import { Navigate, Route, Routes } from "react-router-dom";

import { MainLayout } from "./components/layout/MainLayout";
import { BusinessDetails } from "./pages/BusinessDetails";
import { Dashboard } from "./pages/Dashboard";
import { Discover } from "./pages/Discover";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Onboarding } from "./pages/Onboarding";
import { Profile } from "./pages/Profile";
import { Signup } from "./pages/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route
        path="/app/*"
        element={
          <MainLayout>
            <Routes>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="discover" element={<Discover />} />
              <Route path="discover/:id" element={<BusinessDetails />} />
              <Route path="profile" element={<Profile />} />
            </Routes>
          </MainLayout>
        }
      />
    </Routes>
  );
}

export default App;

