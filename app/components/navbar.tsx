import { Link, NavLink, useSubmit } from '@remix-run/react'
import { useSupabase } from '~/utils/supabase-client'
import Logo from '../assets/logo.svg'
import { MdOutlineLogout } from 'react-icons/md'
import { useMemo, useRef } from 'react'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'

import { Button } from '@supabase/ui'

type MenuItem = {
  title: string
  path: string
}

const menuItems: Array<MenuItem> = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Challenge',
    path: '/challenge',
  },
  {
    title: 'About',
    path: '/about',
  },
]

export default function Navbar() {
  const supabase = useSupabase()

  return (
    <nav className="navbar">
      <img src={Logo} className="logo" />

      <div className="navItems">
        {menuItems.map((menuItem) => (
          <NavLink
            className="navItem"
            style={({ isActive }) => ({
              backgroundColor: isActive ? 'rgba(128, 128, 128, .3)' : undefined,
            })}
            key={menuItem.title}
            to={menuItem.path}
          >
            {menuItem.title}
          </NavLink>
        ))}
      </div>

      {supabase.auth.session() ? (
        <UserInfos />
      ) : (
        <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/auth">
          <Button style={{ background: '#0078e1', borderRadius: 99 }}>
            Connexion
          </Button>
        </Link>
      )}
    </nav>
  )
}

function UserInfos() {
  const submit = useSubmit()
  const supabase = useSupabase()

  function handleSignOut() {
    supabase.auth.signOut().then(() => {
      submit(null, { method: 'post', action: '/' })
    })
  }

  const userName = useMemo(() => {
    return supabase.auth.user()?.email ?? '?'
  }, [supabase])

  const ref = useRef<HTMLDivElement | null>(null)

  return (
    <div className="UserInfos" data-open={open} tabIndex={1} ref={ref}>
      <div className="avatar">{userName.charAt(0)?.toUpperCase() ?? '?'}</div>
      <button onClick={() => ref.current?.focus()}>
        <div className="text">
          <div>{userName}</div>
          <TiArrowSortedUp className="icon-up" />
          <TiArrowSortedDown className="icon-down" />
        </div>
      </button>

      <div className="content">
        <Button
          type="text"
          block
          icon={<MdOutlineLogout size={18} color="red" />}
          onClick={handleSignOut}
        >
          Deconnexion
        </Button>
      </div>
    </div>
  )
}
