import { json } from "@remix-run/node"
import type { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"


export const loader: LoaderFunction = async () => {
  return json({ ok: false })
};

export default function Index() {

  const { ok } = useLoaderData()

  return (
    <div>
      <h1>Home {ok ? 'oui' : 'non'}</h1>
    </div>
  )
}
