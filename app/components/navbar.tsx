import { Link, NavLink, useSubmit } from "@remix-run/react"
import { useSupabase } from "~/utils/supabase-client"
import Logo from '../assets/Logo.svg'

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

export default function Navbar() {
    const submit = useSubmit()
    const supabase = useSupabase()

    function handleSignOut() {
        supabase.auth.signOut().then(() => {
            submit(null, { method: "post", action: "/" })
        })
    }

    return (
        <nav className='navbar'>
            <img src={Logo} style={{ marginLeft: '20px' }} />

            <div className='navItems'>
                {menuItems.map(menuItem => (
                    <NavLink className='navItem' style={({ isActive }) => ({ backgroundColor: isActive ? 'rgba(128, 128, 128, .3)' : undefined })} key={menuItem.title} to={menuItem.path} >
                        {menuItem.title}
                    </NavLink>
                ))}
            </div>

            <div style={{ marginRight: '20px' }}>
                {supabase.auth.session()
                    ? <div className='button' onClick={handleSignOut}>Deconnexion</div>
                    : <div className='button'><Link style={{ color: 'inherit', textDecoration: 'none'}} to="/auth">Connexion</Link></div>
                }
            </div>
        </nav>
    )
}