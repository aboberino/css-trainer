import { Link, useSubmit } from '@remix-run/react'
import { useMemo, useRef } from 'react'
import { MdOutlineLogout } from 'react-icons/md'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'
import { useSupabase } from '~/utils/supabase-client'
import Logo from '../assets/logo.svg'

export default function Header() {
  const supabase = useSupabase()

  return (
    <header>
      <img src={Logo} className="logo" />

      <div className="login">
        {supabase.auth.session() ? (
          <UserInfos />
        ) : (
          <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/auth">
            <button className="primary">Connexion</button>
          </Link>
        )}
      </div>
    </header>
  )
}

function UserInfos() {
  const submit = useSubmit()
  const supabase = useSupabase()

  function handleSignOut() {
    supabase.auth.signOut().then(() => {
      submit(null, { method: 'get', action: '/' })
    })
  }

  const userName = useMemo(() => {
    return supabase.auth.user()?.email ?? '?'
  }, [supabase])

  const ref = useRef<HTMLDivElement | null>(null)

  return (
    <div className="UserInfos" tabIndex={1} ref={ref}>
      <div className="avatar">{userName.charAt(0)?.toUpperCase() ?? '?'}</div>
      <button onClick={() => ref.current?.focus()}>
        <div className="text">
          <div>{userName}</div>
          <TiArrowSortedUp className="icon-up" />
          <TiArrowSortedDown className="icon-down" />
        </div>
      </button>

      <div className="content">
        <button onClick={handleSignOut} className="full">
          <MdOutlineLogout size={18} color="red" />
          Déconnexion
        </button>
      </div>
    </div>
  )
}
