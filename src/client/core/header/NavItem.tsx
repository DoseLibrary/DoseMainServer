import { useLocation, useNavigate } from "react-router-dom";

interface NavItemProps {
  name: string;
  url: string;
}

export const NavItem = ({ name, url }: NavItemProps) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(url);
  }
  const activeClass = "font-bold ml-4 hover:cursor-pointer";
  const location = useLocation();
  const isActive = location.pathname === url;
  const className = isActive ? activeClass : "ml-4 hover:cursor-pointer";

  return (
    <li className={className} onClick={onClick}>{name}</li>
  );
};
