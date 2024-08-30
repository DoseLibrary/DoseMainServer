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
    if (!isLoggedIn && location.pathname !== '/login' && location.pathname !== '/register') {
      navigate('/login');
    } else if (location.pathname === '/') {
      navigate('/dashboard');
    }
  });

  return (
    <div data-mode="dark">
      <div className={`
      bg-gray-100
      dark:bg-black
      text-white
      h-full
      w-full
    `}>
        <Outlet />
        <ToastRenderer />
      </div>
    </div>
  )
};

export default Root;
