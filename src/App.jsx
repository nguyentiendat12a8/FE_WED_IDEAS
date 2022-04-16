import { BrowserRouter, Routes, Route } from "react-router-dom";
import ToastContainer from "./components/common/ToastContainer";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import QaLayout from "./layout/QaLayout";
import QacLayout from "./layout/QacLayout";
import PublicLayout from "./layout/PublicLayout";
import QaHomePage from "./pages/qaHomePage";
import QaDashboard from "./pages/qaDashboard";
import ChangePassword from "./pages/ChangePassword";
import AuthLayout from "./layout/AuthLayout";
import Category from "./pages/Category";
import StaffLayout from "./layout/StaffLayout";
import StaffHomePage from "./pages/StaffHomePage";
import MyIdea from "./pages/MyIdea";
import IdeaDetail from "./pages/IdeaDetail";
import IdeaForm from "./pages/IdeaForm";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";
import AdminHomePage from "./pages/admin/adminHomePage";
import AdminLayout from "./layout/AdminLayout";
import NotFound from "./components/common/NotFound";
import UserList from "./pages/admin/userList";
import ProfileForm from "./pages/ProfileForm";
import UserDetail from "./pages/admin/userDetail";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoleListAction } from "./store/actions";
import NewAccount from "./pages/admin/userCreate";
import ClosureDateList from "./pages/admin/closureDateList";
import NewClosureDate from "./pages/admin/NewClosureDate";
import QacHomePage from "./pages/qac/HomePage";

function App() {
  const { token: isAuth, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function renderRoute(path, layout, Component, exact) {
    if (layout === "public") {
      return (
        <Route
          path={path}
          element={
            <PublicLayout>
              <Component />
            </PublicLayout>
          }
        />
      );
    }

    if (layout === "qa") {
      return (
        <Route
          path={path}
          index={exact}
          element={
            <QaLayout>
              <Component />
            </QaLayout>
          }
        />
      );
    }

    if (layout === "qac") {
      return (
        <Route
          path={path}
          index={exact}
          element={
            <QacLayout>
              <Component />
            </QacLayout>
          }
        />
      );
    }

    if (layout === "staff") {
      return (
        <Route
          path={path}
          element={
            <StaffLayout>
              <Component />
            </StaffLayout>
          }
        />
      );
    }

    if (layout === "admin") {
      return (
        <Route
          path={path}
          element={
            <AdminLayout>
              <Component />
            </AdminLayout>
          }
        />
      );
    }

    if (layout === "auth") {
      return (
        <Route
          path={path}
          element={
            <AuthLayout>
              <Component />
            </AuthLayout>
          }
        />
      );
    }

    return null;
  }

  useEffect(() => {
    if (isAuth && role === "admin") {
      dispatch(getRoleListAction());
    }
  }, [isAuth, dispatch, role]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {renderRoute("/", "public", HomePage)}
          {renderRoute("/login", "public", Login)}
          {renderRoute("/forgot", "public", ForgotPassword)}
          {renderRoute(
            "/user/confirmLink/:userId/:token",
            "public",
            NewPassword
          )}
          {renderRoute("/qa/dashboard", "qa", QaDashboard)}
          {renderRoute("/qa/category", "qa", Category)}
          {renderRoute("/qa/home", "qa", QaHomePage, true)}
          {renderRoute("/qa/idea/:ideaId", "qa", IdeaDetail)}
          {renderRoute("/qa/info", "qa", ProfileForm)}
          {renderRoute("/qa/password", "qa", ChangePassword)}
          {renderRoute("/password", "auth", ChangePassword)}
          {renderRoute("/staff/idea/:ideaId", "staff", IdeaDetail)}
          {renderRoute("/staff/idea/form", "staff", IdeaForm)}
          {renderRoute("/staff/idea", "staff", MyIdea)}
          {renderRoute("/staff/home", "staff", StaffHomePage)}
          {renderRoute("/staff/info", "staff", ProfileForm)}
          {renderRoute("/staff/password", "staff", ChangePassword)}
          {renderRoute("/admin/home", "admin", AdminHomePage)}
          {renderRoute("/admin/users/new", "admin", NewAccount)}
          {renderRoute("/admin/users", "admin", UserList)}
          {renderRoute("/admin/closure-dates/new", "admin", NewClosureDate)}
          {renderRoute("/admin/closure-dates/:id", "admin", NewClosureDate)}
          {renderRoute("/admin/closure-dates", "admin", ClosureDateList)}
          {renderRoute("/admin/info", "admin", ProfileForm)}
          {renderRoute("/admin/password", "admin", ChangePassword)}
          {renderRoute("/admin/idea/:ideaId", "admin", IdeaDetail)}
          {renderRoute("/admin/users/:userId", "admin", UserDetail)}
          {renderRoute("/qac/home", "qac", QacHomePage, true)}
          {renderRoute("/qac/info", "qac", ProfileForm)}
          {renderRoute("/qac/password", "qac", ChangePassword)}
          {renderRoute("/qac/idea/:ideaId", "qac", IdeaDetail)}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
