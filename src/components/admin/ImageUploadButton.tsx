"use client";

import { useRef, useState } from "react";

type Props = {
  multiple?: boolean;
  onUploaded: (urls: string[]) => void;
};

export function ImageUploadButton({ multiple = false, onUploaded }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError(null);
    setUploading(true);

    const uploaded: string[] = [];
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error ?? `Failed to upload ${file.name}.`);
        }
        uploaded.push(data.url);
      }
      onUploaded(uploaded);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="mt-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
        id={multiple ? "multi-upload-input" : "single-upload-input"}
      />
      <button
        type="button"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition hover:border-accent hover:text-accent disabled:opacity-50"
      >
        {uploading
          ? "Uploading…"
          : multiple
          ? "Upload Photos from Device"
          : "Upload Photo from Device"}
      </button>
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}
