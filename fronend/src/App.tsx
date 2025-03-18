import React, { ComponentType } from "react";
import { LayoutRouteProps, Navigate, Route, Routes } from "react-router-dom";
import { adminConfig, userConfig, publicConfig } from "./routes/routes";
import NotFound from "./routes/NotFound";
import DefaultLayout from "./components/layouts/DefaultLayout";

// Định nghĩa interface RouteConfig
export interface RouteConfig {
  path: string;
  component: () => JSX.Element;
  layout?: ComponentType<LayoutRouteProps> | React.FC<any>;
  isPrivate?: boolean;
}

function App() {
  const role: string | null = localStorage.getItem("auth_role");

  const renderRoute = (route: RouteConfig) => {
    const Layout = route.layout || DefaultLayout;
    const Component = route.component;

    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.isPrivate ? (
            role === "SUPPER_ADMIN" || role === "ADMIN" ? (
              <Layout>
                <Component />
              </Layout>
            ) : (
              // Redirect hoặc render trang login
              <Navigate to="/dang-nhap" replace />
            )
          ) : (
            <Layout>
              <Component />
            </Layout>
          )
        }
      />
    );
  };

  return (
    <Routes>
      {publicConfig.map(renderRoute)}

      {role === "SUPPER_ADMIN" && userConfig.map(renderRoute)}

      {role === "ADMIN" && adminConfig.map(renderRoute)}

      {/* Handle 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
