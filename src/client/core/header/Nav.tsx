import { NavItem } from "./NavItem";

export const Nav = () => {
  return (
    <nav>
      <ul className="flex">
        <NavItem name="Home" url="/dashboard" />
        <NavItem name="Movies" url="/dashboard/movies" />
        <NavItem name="TV Shows" url="/dashboard/tv-shows" />
      </ul>
    </nav>
  )
};
