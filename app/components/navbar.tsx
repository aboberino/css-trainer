import { NavLink } from "@remix-run/react"

type MenuItem = {
    title: string
    path: string
}

const menuItems: Array<MenuItem> = [
    {
        title: "Home",
        path: "/"
    },
    {
        title: "Challenge",
        path: "/challenge"
    },
    {
        title: "About",
        path: "/about"
    }
]

const activeStyle = {
    textDecoration: "underline",
}

export default function Navbar() {
    return (
        <nav>
            <ul>
                {menuItems.map(menuItem => (<li key={menuItem.title}>
                    <NavLink to={menuItem.path} >
                        {menuItem.title}
                    </NavLink>
                </li>))
                }
            </ul>
        </nav>
    )
}

//style={({ isActive }) => isActive ? activeStyle : undefined}