const COLORS: Record<string, string> = {
  paid: "bg-accent/20 text-accent",
  pending: "bg-yellow-500/20 text-yellow-400",
  shipped: "bg-blue-500/20 text-blue-400",
  cancelled: "bg-red-500/20 text-red-400",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
        COLORS[status] ?? "bg-muted text-foreground/60"
      }`}
    >
      {status}
    </span>
  );
}
