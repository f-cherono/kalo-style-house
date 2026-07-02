import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";
import { StatusBadge } from "@/components/admin/StatusBadge";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [productCount, orderCount, paidOrders, recentOrders] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.findMany({ where: { status: "paid" } }),
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { items: true },
    }),
  ]);

  const revenue = paidOrders.reduce((sum, o) => sum + o.total, 0);

  const stats = [
    { label: "Total Revenue", value: formatPrice(revenue) },
    { label: "Paid Orders", value: paidOrders.length },
    { label: "Total Orders", value: orderCount },
    { label: "Products", value: productCount },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl tracking-wide">DASHBOARD</h1>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-border p-5">
            <p className="text-xs uppercase tracking-widest text-foreground/50">
              {stat.label}
            </p>
            <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl tracking-wide">RECENT ORDERS</h2>
          <Link href="/admin/orders" className="text-sm text-foreground/60 hover:text-accent">
            View all →
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="text-sm text-foreground/50">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-widest text-foreground/50">
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="font-medium hover:text-accent"
                      >
                        #{order.id.slice(-8).toUpperCase()}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-foreground/70">{order.email}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-4 py-3 text-right">{formatPrice(order.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
