import { createBrowserRouter } from "react-router-dom"
import { Root } from './routes/root'
import ErrorPage from "./ErrorPage";
import { LoginView } from "./routes/auth/LoginView";
import { RegisterView } from "./routes/auth/RegisterView";
import { DashboardView } from "./routes/dashboard/DashboardView";
import { ServerSelectorView } from "./routes/server-selector/ServerSelectorView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <LoginView />
      },
      {
        path: "/register",
        element: <RegisterView />
      },
      {
        path: "/server-selector",
        element: <ServerSelectorView />
      },
      {
        path: "/dashboard",
        element: <DashboardView />
      }
    ]
  },
]);

export default router;
