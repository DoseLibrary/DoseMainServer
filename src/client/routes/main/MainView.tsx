import { Outlet } from "react-router-dom";
import { Header } from "../../core/header/Header";

export const MainView = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}