import { Nav } from "./Nav";

export const Header = () => {
  return (
    <div className={`
    dark:text-white
      p-4
      pl-32
      flex
      align-middle
      items-center
      gap-5
      z-20
      bg-gradient-to-b from-black to-transparent
      absolute
      w-full
    `}>
      <h1 className="font-roboto text-4xl">dose</h1>
      <Nav />
    </div>
  )
}