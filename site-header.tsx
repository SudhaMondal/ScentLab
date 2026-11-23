"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search, Plus } from "lucide-react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Discover", "/"],
    ["Scent Codex", "/codex"],
    ["Community", "/community"],
    ["My Lab", "/my-lab"],
    ["My profile", "/account"]
  ];
  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link href="/" className="brand">scentlab<span>✳</span></Link>
        <nav className={open ? "nav-links nav-open" : "nav-links"}>
          {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
        </nav>
        <div className="nav-actions">
          <Link className="nav-search" href="/#discover" aria-label="Find a scent"><Search size={17} /></Link>
          <Link className="button button-dark nav-create" href="/create"><Plus size={16} /> Create recipe</Link>
          <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
        </div>
      </div>
    </header>
  );
}
