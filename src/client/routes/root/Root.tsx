import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ToastRenderer } from "../../features/toast/ToastRenderer";
import { useAppSelector } from "../../app/hooks";
import { selectIsLoggedIn } from "../../features/auth/authSlice";
import { useEffect } from "react";

const Root = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isLoggedIn, location.pathname);
    if (!isLoggedIn && location.pathname !== '/login' && location.pathname !== '/register') {
      navigate('/login');
    }
  });

  return (
    <div data-mode="dark">
      <div className={`
      bg-gray-100
      dark:bg-gray-900
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
