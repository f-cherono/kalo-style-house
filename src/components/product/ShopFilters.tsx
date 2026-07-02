"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export function ShopFilters({ categories }: { categories: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category") ?? "";
  const activeSort = searchParams.get("sort") ?? "newest";

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => updateParam("category", "")}
          className={`rounded-full border px-4 py-1.5 text-sm transition ${
            activeCategory === ""
              ? "border-accent bg-accent text-black"
              : "border-border text-foreground/70 hover:border-accent hover:text-accent"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            type="button"
            key={category}
            onClick={() => updateParam("category", category)}
            className={`rounded-full border px-4 py-1.5 text-sm transition ${
              activeCategory === category
                ? "border-accent bg-accent text-black"
                : "border-border text-foreground/70 hover:border-accent hover:text-accent"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <select
        value={activeSort}
        onChange={(e) => updateParam("sort", e.target.value)}
        className="w-fit rounded-full border border-border bg-background px-4 py-1.5 text-sm text-foreground focus:border-accent focus:outline-none"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
