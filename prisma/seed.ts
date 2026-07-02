import { PrismaClient } from "../src/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const products = [
  // Hoodies
  {
    slug: "obsidian-oversized-hoodie",
    name: "Obsidian Oversized Hoodie",
    description:
      "A heavyweight 450gsm cotton fleece hoodie in deep matte black, cut oversized with dropped shoulders. Finished with the KALO_STYLE embroidered wordmark across the chest.",
    price: 1150000,
    category: "Hoodies",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200&q=80",
      "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=1200&q=80",
    ]),
    sizes: JSON.stringify(["S", "M", "L", "XL", "XXL"]),
    stock: 60,
    featured: true,
  },
  {
    slug: "stealth-crewneck",
    name: "Stealth Crewneck Hoodie",
    description:
      "Mid-weight fleece hoodie with dropped shoulder seams and a ribbed hem. The everyday layer, done right.",
    price: 900000,
    category: "Hoodies",
    image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=1200&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=1200&q=80",
    ]),
    sizes: JSON.stringify(["S", "M", "L", "XL", "XXL"]),
    stock: 70,
    featured: true,
  },
  {
    slug: "fog-zip-up-hoodie",
    name: "Fog Zip-Up Hoodie",
    description:
      "Brushed-back fleece zip-up hoodie in fog grey with a stand collar and raglan sleeves. A quiet, elevated layering piece for cooler days.",
    price: 1020000,
    category: "Hoodies",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1200&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1200&q=80",
    ]),
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    stock: 55,
    featured: false,
  },

  // Perfumes
  {
    slug: "asad-fragrance-mist",
    name: "Asad Fragrance Mist",
    description:
      "A bold, long-lasting fragrance mist with a warm, woody signature scent. Generously sized at 250ml for everyday layering.",
    price: 350000,
    category: "Perfumes",
    image: "/products/asad-fragrance-mist.jpg",
    images: JSON.stringify(["/products/asad-fragrance-mist.jpg"]),
    sizes: JSON.stringify(["250ml"]),
    stock: 90,
    featured: true,
  },
  {
    slug: "invictus-fragrance-mist",
    name: "Invictus Fragrance Mist",
    description:
      "A sharp, confident fragrance mist for him, with a crisp, energizing finish. Compact 48ml size, perfect for on-the-go freshening up.",
    price: 280000,
    category: "Perfumes",
    image: "/products/invictus-fragrance-mist.jpg",
    images: JSON.stringify(["/products/invictus-fragrance-mist.jpg"]),
    sizes: JSON.stringify(["48ml"]),
    stock: 100,
    featured: true,
  },
  {
    slug: "vanilla-bloom-edp",
    name: "Vanilla Bloom EDP",
    description:
      "A sweet, comforting eau de parfum built around Madagascar vanilla, jasmine, and warm sandalwood.",
    price: 550000,
    category: "Perfumes",
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=1200&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=1200&q=80",
    ]),
    sizes: JSON.stringify(["30ml", "50ml", "100ml"]),
    stock: 75,
    featured: false,
  },
  {
    slug: "noir-intense-parfum",
    name: "Noir Intense Parfum",
    description:
      "A bold evening scent with notes of black pepper, leather, and dark chocolate. Intense sillage that lasts all night.",
    price: 680000,
    category: "Perfumes",
    image: "https://images.unsplash.com/photo-1630344360804-acaab8f80b99?w=1200&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1630344360804-acaab8f80b99?w=1200&q=80",
    ]),
    sizes: JSON.stringify(["50ml", "100ml"]),
    stock: 40,
    featured: false,
  },

  // Wigs & Hair Extensions
  {
    slug: "premium-straight-lace-front-wig",
    name: "Premium Straight Lace Front Wig",
    description:
      "A sleek, bone-straight lace front wig with a natural hairline and glossy, silky finish. Ready to wear straight out of the box.",
    price: 2050000,
    category: "Wigs & Hair Extensions",
    image: "/products/premium-straight-lace-front-wig.jpg",
    images: JSON.stringify(["/products/premium-straight-lace-front-wig.jpg"]),
    sizes: JSON.stringify(["14in", "18in", "22in", "26in"]),
    stock: 25,
    featured: true,
  },
  {
    slug: "premium-black-bob-wig",
    name: "Premium Black Bob Wig",
    description:
      "A chic, blunt-cut bob wig in rich natural black, with a closure that blends seamlessly for an effortless everyday look.",
    price: 1150000,
    category: "Wigs & Hair Extensions",
    image: "/products/premium-black-bob-wig.jpg",
    images: JSON.stringify(["/products/premium-black-bob-wig.jpg"]),
    sizes: JSON.stringify(["10in", "12in", "14in"]),
    stock: 50,
    featured: true,
  },
  {
    slug: "premium-curly-half-up-wig",
    name: "Premium Curly Half-Up Wig",
    description:
      "A voluminous curly wig styled half-up for a playful, festive look. Holds its curl pattern wash after wash.",
    price: 1280000,
    category: "Wigs & Hair Extensions",
    image: "/products/premium-curly-half-up-wig.jpg",
    images: JSON.stringify(["/products/premium-curly-half-up-wig.jpg"]),
    sizes: JSON.stringify(["14in", "16in", "18in", "20in"]),
    stock: 35,
    featured: false,
  },
  {
    slug: "colored-fashion-wig",
    name: "Colored Fashion Wig",
    description:
      "A vibrant, ready-to-wear synthetic fashion wig with a breathable cap and natural-looking part. Low maintenance, high impact.",
    price: 850000,
    category: "Wigs & Hair Extensions",
    image: "https://images.unsplash.com/photo-1559564071-dfa53d83b513?w=1200&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1559564071-dfa53d83b513?w=1200&q=80",
    ]),
    sizes: JSON.stringify(["One Size"]),
    stock: 45,
    featured: false,
  },

  // Wig Serum
  {
    slug: "wig-scalp-growth-serum",
    name: "Wig & Scalp Growth Serum",
    description:
      "A lightweight, fast-absorbing serum formulated to nourish your natural hairline under wigs and extensions while promoting healthy growth.",
    price: 360000,
    category: "Wig Serum",
    image: "https://images.unsplash.com/photo-1747303969063-3b90bcb3942e?w=1200&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1747303969063-3b90bcb3942e?w=1200&q=80",
    ]),
    sizes: JSON.stringify(["30ml", "60ml"]),
    stock: 80,
    featured: true,
  },
  {
    slug: "edge-control-shine-serum",
    name: "Edge Control & Shine Serum",
    description:
      "Tames flyaways and lays edges flat while adding a glossy, non-greasy shine to wigs, extensions, and natural hair alike.",
    price: 290000,
    category: "Wig Serum",
    image: "https://images.unsplash.com/photo-1747303969063-3b90bcb3942e?w=1200&q=80&sat=-20",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1747303969063-3b90bcb3942e?w=1200&q=80&sat=-20",
    ]),
    sizes: JSON.stringify(["30ml"]),
    stock: 95,
    featured: false,
  },

  // Men's Wear
  {
    slug: "skin-tight-khanzu",
    name: "Skin Tight Khanzu",
    description:
      "A tailored, fitted khanzu cut close to the body for a sharp, modern silhouette. Soft breathable cotton blend, finished with a stand collar.",
    price: 770000,
    category: "Men's Wear",
    image: "https://images.unsplash.com/photo-1561756432-95ae6e06515e?w=1200&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1561756432-95ae6e06515e?w=1200&q=80",
    ]),
    sizes: JSON.stringify(["S", "M", "L", "XL", "XXL"]),
    stock: 45,
    featured: true,
  },
  {
    slug: "classic-khanzu",
    name: "Classic Khanzu",
    description:
      "A relaxed, traditional-fit khanzu in crisp cotton, perfect for Friday prayers, Eid, or everyday wear. Available in classic off-white.",
    price: 680000,
    category: "Men's Wear",
    image: "https://images.unsplash.com/photo-1625134673337-519d4d10b313?w=1200&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1625134673337-519d4d10b313?w=1200&q=80",
    ]),
    sizes: JSON.stringify(["S", "M", "L", "XL", "XXL"]),
    stock: 50,
    featured: false,
  },
  {
    slug: "arafat-scarf",
    name: "Arafat Scarf",
    description:
      "A classic checkered Arafat scarf in soft cotton, worn draped over the shoulders or as a headscarf. A timeless everyday accessory.",
    price: 200000,
    category: "Men's Wear",
    image: "https://images.unsplash.com/photo-1764405829145-4d44fb56ce4f?w=1200&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1764405829145-4d44fb56ce4f?w=1200&q=80",
    ]),
    sizes: JSON.stringify(["One Size"]),
    stock: 90,
    featured: false,
  },

  // Women's Wear
  {
    slug: "classic-black-abaya",
    name: "Classic Black Abaya",
    description:
      "An effortless everyday abaya in flowing black crepe with a relaxed silhouette and subtle sleeve detailing. Fully lined and opaque.",
    price: 980000,
    category: "Women's Wear",
    image: "https://images.unsplash.com/photo-1544059529-9a9a0a4ef94f?w=1200&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1544059529-9a9a0a4ef94f?w=1200&q=80",
    ]),
    sizes: JSON.stringify(["S", "M", "L", "XL", "One Size"]),
    stock: 40,
    featured: true,
  },
  {
    slug: "embellished-occasion-abaya",
    name: "Embellished Occasion Abaya",
    description:
      "A special-occasion abaya finished with delicate embroidery and beadwork along the sleeves and hem. Elegant enough for Eid and weddings.",
    price: 1800000,
    category: "Women's Wear",
    image: "https://images.unsplash.com/photo-1549474864-049a3b475a46?w=1200&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1549474864-049a3b475a46?w=1200&q=80",
    ]),
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    stock: 20,
    featured: false,
  },
  {
    slug: "floral-dera-dress",
    name: "Floral Dera Dress",
    description:
      "A lightweight, flowing dera in a bold floral print, made from breathable chiffon. Worn over a matching underskirt for everyday elegance.",
    price: 850000,
    category: "Women's Wear",
    image: "https://images.unsplash.com/photo-1611258692399-87e8a1206ecd?w=1200&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1611258692399-87e8a1206ecd?w=1200&q=80",
    ]),
    sizes: JSON.stringify(["S", "M", "L", "XL", "One Size"]),
    stock: 35,
    featured: true,
  },
  {
    slug: "embroidered-dera-dress",
    name: "Embroidered Dera Dress",
    description:
      "A vibrant dera with hand-finished embroidery along the neckline, cut wide and flowing. A festive staple for celebrations and everyday wear alike.",
    price: 940000,
    category: "Women's Wear",
    image: "https://images.unsplash.com/photo-1681545290284-679e6291c440?w=1200&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1681545290284-679e6291c440?w=1200&q=80",
    ]),
    sizes: JSON.stringify(["S", "M", "L", "XL", "One Size"]),
    stock: 30,
    featured: false,
  },
  {
    slug: "chiffon-hijab-scarf",
    name: "Chiffon Hijab Scarf",
    description:
      "A breathable, lightweight chiffon hijab with a soft matte finish that drapes beautifully and holds its shape all day.",
    price: 230000,
    category: "Women's Wear",
    image: "https://images.unsplash.com/photo-1542380841-5eef57349ca1?w=1200&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1542380841-5eef57349ca1?w=1200&q=80",
    ]),
    sizes: JSON.stringify(["One Size"]),
    stock: 150,
    featured: true,
  },
  {
    slug: "modest-maxi-kaftan-dress",
    name: "Modest Maxi Kaftan Dress",
    description:
      "A relaxed, wide-cut kaftan in soft crepe with wide sleeves and side pockets. Loose enough for all-day comfort, elegant enough to wear out.",
    price: 800000,
    category: "Women's Wear",
    image: "https://images.unsplash.com/photo-1544059529-9a9a0a4ef94f?w=1200&q=80&sat=-20",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1544059529-9a9a0a4ef94f?w=1200&q=80&sat=-20",
    ]),
    sizes: JSON.stringify(["S", "M", "L", "XL", "One Size"]),
    stock: 30,
    featured: false,
  },

  // Kids' Wear
  {
    slug: "kids-everyday-hijab-scarf",
    name: "Kids Everyday Hijab Scarf",
    description:
      "A soft, easy-to-tie hijab scarf sized for children, made from breathable cotton-jersey that stays comfortable through a full school day.",
    price: 150000,
    category: "Kids' Wear",
    image: "https://images.unsplash.com/photo-1776127839720-c0ab710d9d37?w=1200&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1776127839720-c0ab710d9d37?w=1200&q=80",
    ]),
    sizes: JSON.stringify(["3-6 yrs", "7-10 yrs", "11-14 yrs"]),
    stock: 100,
    featured: false,
  },
  {
    slug: "kids-printed-hijab-scarf",
    name: "Kids Printed Hijab Scarf",
    description:
      "A fun, printed hijab scarf for kids in playful colors and patterns. Lightweight chiffon-cotton blend that's gentle on delicate skin.",
    price: 180000,
    category: "Kids' Wear",
    image: "https://images.unsplash.com/photo-1776127839720-c0ab710d9d37?w=1200&q=80&sat=-15",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1776127839720-c0ab710d9d37?w=1200&q=80&sat=-15",
    ]),
    sizes: JSON.stringify(["3-6 yrs", "7-10 yrs", "11-14 yrs"]),
    stock: 90,
    featured: false,
  },
];

async function main() {
  const slugs = products.map((p) => p.slug);
  await prisma.orderItem.deleteMany({ where: { product: { slug: { notIn: slugs } } } });
  await prisma.product.deleteMany({ where: { slug: { notIn: slugs } } });

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  const adminEmail = "admin@kalostyle.house";
  const adminPassword = "kalo-admin-2026";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.admin.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: { email: adminEmail, passwordHash },
  });

  console.log(`Seeded ${products.length} products.`);
  console.log(`Admin login -> email: ${adminEmail} / password: ${adminPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
