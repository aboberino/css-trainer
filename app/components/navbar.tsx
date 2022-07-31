import { NavLink } from '@remix-run/react'

type MenuItem = {
  title: string
  path: string
}

const menuItems: Array<MenuItem> = [
  { title: 'Home', path: '/' },
  { title: 'Challenge', path: '/challenge' },
  { title: 'About', path: '/about' },
]

export default function Navbar() {
  return (
    <nav className="navbar">
      <main className="navItems">
        {menuItems.map((menuItem) => (
          <NavLink
            className={({ isActive }) =>
              isActive ? 'navItem active' : 'navItem'
            }
            key={menuItem.title}
            to={menuItem.path}
          >
            <button className="full">{menuItem.title}</button>
          </NavLink>
        ))}
      </main>
    </nav>
  )
}