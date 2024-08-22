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
    `}>
      <h1 className="font-roboto text-4xl">dose</h1>
      <Nav />
    </div>
  )
}