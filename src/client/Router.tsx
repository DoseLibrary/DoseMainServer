import { createBrowserRouter } from "react-router-dom"
import { Root } from './routes/root'
import ErrorPage from "./ErrorPage";
import { LoginView } from "./routes/auth/LoginView";
import { RegisterView } from "./routes/auth/RegisterView";

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
        element: <div>Server Selector</div>
      }
    ]
  },
]);

export default router;
