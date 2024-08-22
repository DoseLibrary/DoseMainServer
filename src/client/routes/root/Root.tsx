import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ToastRenderer } from "../../features/toast/ToastRenderer";
import { useAppSelector } from "../../app/hooks";
import { selectIsLoggedIn } from "../../features/auth/authSlice";
import { useEffect } from "react";
import { selectHasContentServer } from "../../features/session/sessionSlice";

const Root = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const hasContentServer = useAppSelector(selectHasContentServer);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && location.pathname !== '/login' && location.pathname !== '/register') {
      navigate('/login');
    } else if (isLoggedIn) {
      if (!hasContentServer && location.pathname !== '/server-selector') {
        navigate('/server-selector');
      }
    }
  });

  return (
    <div data-mode="dark">
      <div className={`
      bg-gray-100
      dark:bg-black
      text-white
      h-screen
      w-screen
    `}>
        <Outlet />
        <ToastRenderer />
      </div>
    </div>
  )
};

export default Root;
