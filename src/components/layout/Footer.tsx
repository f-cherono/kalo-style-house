import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div>
          <p className="font-display text-lg tracking-wide">
            KALO<span className="text-gold">_</span>STYLE HOUSE
          </p>
          <p className="mt-3 max-w-xs text-sm text-foreground/60">
            Hoodies, fragrance, wigs &amp; hair extensions, wig serum, and
            modest fashion — everyday essentials, all under one roof.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground/50">
            Shop
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/shop" className="text-foreground/70 hover:text-accent">All Products</Link></li>
            <li><Link href="/shop?category=Hoodies" className="text-foreground/70 hover:text-accent">Hoodies</Link></li>
            <li><Link href="/shop?category=Perfumes" className="text-foreground/70 hover:text-accent">Perfumes</Link></li>
            <li><Link href={`/shop?category=${encodeURIComponent("Wigs & Hair Extensions")}`} className="text-foreground/70 hover:text-accent">Wigs &amp; Hair Extensions</Link></li>
            <li><Link href={`/shop?category=${encodeURIComponent("Wig Serum")}`} className="text-foreground/70 hover:text-accent">Wig Serum</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground/50">
            Modest Wear
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href={`/shop?category=${encodeURIComponent("Women's Wear")}`} className="text-foreground/70 hover:text-accent">Women&apos;s Wear</Link></li>
            <li><Link href={`/shop?category=${encodeURIComponent("Men's Wear")}`} className="text-foreground/70 hover:text-accent">Men&apos;s Wear</Link></li>
            <li><Link href={`/shop?category=${encodeURIComponent("Kids' Wear")}`} className="text-foreground/70 hover:text-accent">Kids&apos; Wear</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground/50">
            Help
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/cart" className="text-foreground/70 hover:text-accent">Cart</Link></li>
            <li><Link href="/checkout" className="text-foreground/70 hover:text-accent">Checkout</Link></li>
            <li><a href="mailto:support@kalostyle.house" className="text-foreground/70 hover:text-accent">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground/50">
            KALO_STYLE
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/admin/login" className="text-foreground/40 hover:text-accent">Admin</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-4 py-6 text-center text-xs text-foreground/40 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} KALO_STYLE HOUSE. All rights reserved.
      </div>
    </footer>
  );
}
