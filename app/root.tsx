import type {
  LinksFunction,
  MetaFunction,
} from "@remix-run/node";

import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useSubmit
} from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@supabase/ui";

import Navbar from "./components/navbar";
import globalStylesheetUrl from "./styles/global-styles.css";
import { SupabaseProvider, useSupabase } from "./utils/supabase-client";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: globalStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export const loader = () => {
  return {
    supabaseKey: process.env.SUPABASE_ANON_KEY,
    supabaseUrl: process.env.SUPABASE_URL,
  }
}

export default function App() {

  const loader = useLoaderData()
  const supabase = createClient(loader.supabaseUrl, loader.supabaseKey)

  return (
    <Document>
      <SupabaseProvider supabase={supabase}>
          <Navbar />
          <Outlet />
      </SupabaseProvider>
    </Document>
  )
}
