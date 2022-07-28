import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useSupabase } from "~/utils/supabase-client";
import { getSession } from "~/utils/supabase.server";

const loader: LoaderFunction = async ({ request }) => {
    console.log("coucou")
    // const session = await getSession(request.headers.get("Cookie"))
    // console.log(request.headers.get("Cookie"))
    // console.log(session)
}

export default function About() {

    useLoaderData()

    const session = useSupabase().auth.session();
    // console.log(session)

    return (
        <div>
            <h1>About</h1>
            <div>{session ? 'OUAIS T CO MDR GO MCDO' : 'Va te connecter grosse mierda'}</div>
        </div>
    );
}
