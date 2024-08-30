import { createBrowserRouter } from "react-router-dom"
import { Root } from './routes/root'
import ErrorPage from "./ErrorPage";
import { LoginView } from "./routes/auth/LoginView";
import { RegisterView } from "./routes/auth/RegisterView";
import { MainView } from "./routes/main/MainView";
import { DashboardView } from "./routes/dashboard/DashboardView";

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
        path: "/",
        element: <MainView />,
        children: [
          {
            path: '/dashboard',
            element: <DashboardView />
          }
        ]
      }
    ]
  },
]);

export default router;
