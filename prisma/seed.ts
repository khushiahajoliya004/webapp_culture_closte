import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

async function main() {
  // Create categories
  const categories = [
    { name: "Women", slug: "women", imageUrl: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=600&h=800&fit=crop", sortOrder: 1 },
    { name: "Men", slug: "men", imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop", sortOrder: 2 },
    { name: "Kids", slug: "kids", imageUrl: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&h=800&fit=crop", sortOrder: 3 },
    { name: "Navaratri Collection", slug: "navaratri-collection", imageUrl: "https://images.unsplash.com/photo-1609234656388-0ff363383899?w=600&h=800&fit=crop", sortOrder: 4 },
    { name: "Sarees", slug: "sarees", imageUrl: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&h=800&fit=crop", sortOrder: 5, parentId: "" },
    { name: "Blouses", slug: "blouses", imageUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=800&fit=crop", sortOrder: 6, parentId: "" },
    { name: "Kurtis", slug: "kurtis", imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=800&fit=crop", sortOrder: 7, parentId: "" },
    { name: "Jewellery", slug: "jewellery", imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=800&fit=crop", sortOrder: 8, parentId: "" },
    { name: "Footwear", slug: "footwear", imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=800&fit=crop", sortOrder: 9, parentId: "" },
    { name: "Accessories", slug: "accessories", imageUrl: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=800&fit=crop", sortOrder: 10, parentId: "" },
    { name: "Lehenga", slug: "lehenga", imageUrl: "https://images.unsplash.com/photo-1599669454699-248893623440?w=600&h=800&fit=crop", sortOrder: 11, parentId: "" },
  ];

  const createdCategories: Record<string, string> = {};

  for (const cat of categories) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        name: cat.name,
        slug: cat.slug,
        imageUrl: cat.imageUrl,
        sortOrder: cat.sortOrder,
      },
    });
    createdCategories[cat.slug] = created.id;
  }

  // Create parent relationships
  const womenSubcategories = ["sarees", "blouses", "kurtis", "jewellery", "lehenga"];
  for (const subSlug of womenSubcategories) {
    await prisma.category.update({
      where: { slug: subSlug },
      data: { parentId: createdCategories["women"] },
    });
  }

  // Create demo users (one per role)
  const hashedPassword = await bcrypt.hash("password123", 10);

  const seller = await prisma.user.upsert({
    where: { email: "seller@culturecloset.com" },
    update: { password: hashedPassword, role: "SELLER" },
    create: {
      email: "seller@culturecloset.com",
      name: "Kavita V",
      password: hashedPassword,
      role: "SELLER",
      locationCountry: "New Zealand",
      locationCity: "Auckland",
    },
  });

  await prisma.user.upsert({
    where: { email: "buyer@culturecloset.com" },
    update: { password: hashedPassword, role: "BUYER" },
    create: {
      email: "buyer@culturecloset.com",
      name: "Priya B",
      password: hashedPassword,
      role: "BUYER",
      locationCountry: "United States",
      locationCity: "San Francisco",
    },
  });

  await prisma.user.upsert({
    where: { email: "admin@culturecloset.com" },
    update: { password: hashedPassword, role: "ADMIN" },
    create: {
      email: "admin@culturecloset.com",
      name: "Admin",
      password: hashedPassword,
      role: "ADMIN",
      locationCountry: "United States",
      locationCity: "New York",
    },
  });

  // Create sample listings
  const listings = [
    {
      title: "Black & Mustard Saree",
      slug: "black-mustard-saree",
      description: "Beautiful black and mustard silk saree with intricate gold zari work. Perfect for festive occasions and weddings. Worn once for a family function.",
      condition: "LIKE_NEW" as const,
      categoryId: createdCategories["sarees"],
      price: 45.0,
      originalPrice: 120.0,
      size: "Free Size",
      primaryColor: "Black & Mustard",
      occasion: JSON.stringify(["Festive", "Wedding Guest"]),
      countryOfOrigin: "India",
      countryLocation: "United States",
      images: JSON.stringify(["https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&h=1000&fit=crop"]),
    },
    {
      title: "Baby Pink Lehenga",
      slug: "baby-pink-lehenga",
      description: "Stunning baby pink lehenga with delicate embroidery and sequin work. Comes with matching dupatta and blouse. Ideal for engagement or sangeet.",
      condition: "NEW_WITHOUT_TAGS" as const,
      categoryId: createdCategories["lehenga"],
      price: 225.0,
      originalPrice: 450.0,
      size: "M (US 6-8)",
      primaryColor: "Pink",
      occasion: JSON.stringify(["Bridal", "Pre-wedding"]),
      countryOfOrigin: "India",
      countryLocation: "Canada",
      images: JSON.stringify(["https://images.unsplash.com/photo-1599669454699-248893623440?w=800&h=1000&fit=crop"]),
    },
    {
      title: "Pink Satin Bridesmaid Skirt Set",
      slug: "pink-satin-bridesmaid-skirt-set",
      description: "Elegant pink satin skirt set perfect for bridesmaids. Comfortable fit with beautiful drape. Worn for one wedding.",
      condition: "GOOD" as const,
      categoryId: createdCategories["blouses"],
      price: 95.0,
      originalPrice: 180.0,
      size: "S (US 4-6)",
      primaryColor: "Pink",
      occasion: JSON.stringify(["Wedding Party"]),
      countryOfOrigin: "India",
      countryLocation: "United Kingdom",
      images: JSON.stringify(["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&h=1000&fit=crop"]),
    },
    {
      title: "Black Embroidered Top Kurta",
      slug: "black-embroidered-top-kurta",
      description: "Classic black kurta with intricate thread embroidery. Versatile piece that can be dressed up or down. Great condition.",
      condition: "LIKE_NEW" as const,
      categoryId: createdCategories["kurtis"],
      price: 100.0,
      originalPrice: 200.0,
      size: "L (US 10-12)",
      primaryColor: "Black",
      occasion: JSON.stringify(["Casual", "Festive"]),
      countryOfOrigin: "Pakistan",
      countryLocation: "Australia",
      images: JSON.stringify(["https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=1000&fit=crop"]),
    },
    {
      title: "Mehendi Lehenga with Kurta",
      slug: "mehendi-lehenga-with-kurta",
      description: "Vibrant green lehenga perfect for mehendi ceremonies. Lightweight and comfortable for dancing. Worn once.",
      condition: "LIKE_NEW" as const,
      categoryId: createdCategories["lehenga"],
      price: 40.0,
      originalPrice: 85.0,
      size: "M (US 6-8)",
      primaryColor: "Green",
      occasion: JSON.stringify(["Pre-wedding", "Festive"]),
      countryOfOrigin: "India",
      countryLocation: "New Zealand",
      images: JSON.stringify(["https://images.unsplash.com/photo-1609234656388-0ff363383899?w=800&h=1000&fit=crop"]),
    },
    {
      title: "Gold Temple Jewellery Set",
      slug: "gold-temple-jewellery-set",
      description: "Traditional South Indian temple jewellery set including necklace, earrings, and headpiece. Intricate goddess motifs.",
      condition: "NEW_WITH_TAGS" as const,
      categoryId: createdCategories["jewellery"],
      price: 150.0,
      originalPrice: 280.0,
      size: "One Size",
      primaryColor: "Gold",
      occasion: JSON.stringify(["Bridal", "Festive", "Temple"]),
      countryOfOrigin: "India",
      countryLocation: "United States",
      images: JSON.stringify(["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=1000&fit=crop"]),
    },
    {
      title: "Men's Cream Sherwani",
      slug: "mens-cream-sherwani",
      description: "Elegant cream sherwani with gold button detailing. Perfect for groom or wedding guest. Worn once for a reception.",
      condition: "LIKE_NEW" as const,
      categoryId: createdCategories["men"],
      price: 180.0,
      originalPrice: 350.0,
      size: "L (42R)",
      primaryColor: "Cream",
      occasion: JSON.stringify(["Wedding", "Reception"]),
      countryOfOrigin: "India",
      countryLocation: "Canada",
      images: JSON.stringify(["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1000&fit=crop"]),
    },
    {
      title: "Kids Traditional Lehenga Choli",
      slug: "kids-traditional-lehenga-choli",
      description: "Adorable red and gold lehenga choli for girls age 6-8. Perfect for Diwali or weddings. Excellent condition.",
      condition: "GOOD" as const,
      categoryId: createdCategories["kids"],
      price: 35.0,
      originalPrice: 70.0,
      size: "Age 6-8",
      primaryColor: "Red & Gold",
      occasion: JSON.stringify(["Festive", "Wedding"]),
      countryOfOrigin: "India",
      countryLocation: "Australia",
      images: JSON.stringify(["https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&h=1000&fit=crop"]),
    },
  ];

  for (const listing of listings) {
    await prisma.listing.upsert({
      where: { slug: listing.slug },
      update: {},
      create: {
        ...listing,
        sellerId: seller.id,
      },
    });
  }

  console.log("✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
