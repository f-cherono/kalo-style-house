"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-border bg-muted/30 px-4 py-4 sm:w-56 sm:border-b-0 sm:border-r sm:px-4 sm:py-6">
      <Link href="/admin" className="font-display text-lg tracking-wide">
        KALO<span className="text-gold">_</span>ADMIN
      </Link>

      <nav className="mt-8 flex flex-row gap-1 sm:flex-col">
        {NAV_ITEMS.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded px-3 py-2 text-sm font-medium transition ${
                active
                  ? "bg-accent text-black"
                  : "text-foreground/70 hover:bg-muted hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto hidden pt-8 sm:block">
        <Link href="/" className="block text-xs text-foreground/40 hover:text-accent">
          ← Back to store
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-3 text-xs text-foreground/40 hover:text-accent"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
