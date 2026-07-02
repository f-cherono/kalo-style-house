"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUploadButton } from "./ImageUploadButton";

type ProductFormData = {
  id?: string;
  slug: string;
  name: string;
  description: string;
  price: number; // cents
  category: string;
  image: string;
  images: string[];
  sizes: string[];
  stock: number;
  featured: boolean;
};

export function ProductForm({ initial }: { initial?: ProductFormData }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);

  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [name, setName] = useState(initial?.name ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [price, setPrice] = useState(initial ? (initial.price / 100).toString() : "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [image, setImage] = useState(initial?.image ?? "");
  const [extraImages, setExtraImages] = useState(
    initial?.images.filter((i) => i !== initial.image).join("\n") ?? ""
  );
  const [sizes, setSizes] = useState(initial?.sizes.join(", ") ?? "");
  const [stock, setStock] = useState(initial?.stock?.toString() ?? "50");
  const [featured, setFeatured] = useState(initial?.featured ?? false);

  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function handleNameChange(value: string) {
    setName(value);
    if (!slugTouched) {
      setSlug(
        value
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      );
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const imagesList = [image, ...extraImages.split("\n").map((s) => s.trim()).filter(Boolean)];
    const sizesList = sizes.split(",").map((s) => s.trim()).filter(Boolean);

    const payload = {
      slug,
      name,
      description,
      price: Math.round(parseFloat(price || "0") * 100),
      category,
      image,
      images: imagesList,
      sizes: sizesList,
      stock: parseInt(stock || "0", 10),
      featured,
    };

    const url = isEdit ? `/api/admin/products/${initial!.id}` : "/api/admin/products";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Something went wrong.");
      setSaving(false);
      return;
    }

    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Name">
          <input
            required
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Slug">
          <input
            required
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Description">
        <textarea
          required
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={inputClass}
        />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Field label="Price (KSh)">
          <input
            required
            type="number"
            step="1"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Category">
          <input
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Stock">
          <input
            required
            type="number"
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Main Image URL">
        <input
          required
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className={inputClass}
        />
        <div className="mt-2 flex items-center gap-3">
          <ImageUploadButton onUploaded={(urls) => setImage(urls[0])} />
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt="Main image preview"
              className="h-14 w-14 rounded object-cover"
            />
          )}
        </div>
      </Field>

      <Field label="Extra Image URLs (one per line)">
        <textarea
          rows={3}
          value={extraImages}
          onChange={(e) => setExtraImages(e.target.value)}
          className={inputClass}
        />
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <ImageUploadButton
            multiple
            onUploaded={(urls) =>
              setExtraImages((prev) =>
                [prev.trim(), ...urls].filter(Boolean).join("\n")
              )
            }
          />
          {extraImages
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean)
            .map((url) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={url}
                src={url}
                alt="Extra image preview"
                className="h-14 w-14 rounded object-cover"
              />
            ))}
        </div>
      </Field>

      <Field label="Sizes (comma-separated)">
        <input
          required
          placeholder="S, M, L, XL"
          value={sizes}
          onChange={(e) => setSizes(e.target.value)}
          className={inputClass}
        />
      </Field>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          className="h-4 w-4 rounded border-border accent-[var(--accent)]"
        />
        Feature on homepage
      </label>

      {error && (
        <div className="rounded border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-black transition hover:opacity-90 disabled:opacity-60"
        >
          {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Product"}
        </button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-foreground/50">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded border border-border bg-background px-3 py-2.5 text-sm focus:border-accent focus:outline-none";
