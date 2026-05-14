import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

async function main() {
  const CDN = "https://res.cloudinary.com/dw2a5mbwh/image/upload/f_auto,q_auto/culture-closet";

  // Create categories
  const categories = [
    { name: "Women", slug: "women", imageUrl: `${CDN}/cat-women`, sortOrder: 1 },
    { name: "Men", slug: "men", imageUrl: `${CDN}/cat-men`, sortOrder: 2 },
    { name: "Kids", slug: "kids", imageUrl: `${CDN}/cat-kids`, sortOrder: 3 },
    { name: "Navaratri Collection", slug: "navaratri-collection", imageUrl: `${CDN}/cat-navaratri`, sortOrder: 4 },
    { name: "Sarees", slug: "sarees", imageUrl: `${CDN}/cat-sarees`, sortOrder: 5, parentId: "" },
    { name: "Blouses", slug: "blouses", imageUrl: `${CDN}/cat-blouses`, sortOrder: 6, parentId: "" },
    { name: "Kurtis", slug: "kurtis", imageUrl: `${CDN}/cat-kurtis`, sortOrder: 7, parentId: "" },
    { name: "Jewellery", slug: "jewellery", imageUrl: `${CDN}/cat-jewellery`, sortOrder: 8, parentId: "" },
    { name: "Footwear", slug: "footwear", imageUrl: `${CDN}/cat-footwear`, sortOrder: 9, parentId: "" },
    { name: "Accessories", slug: "accessories", imageUrl: `${CDN}/cat-accessories`, sortOrder: 10, parentId: "" },
    { name: "Lehenga", slug: "lehenga", imageUrl: `${CDN}/cat-lehenga`, sortOrder: 11, parentId: "" },
  ];

  const createdCategories: Record<string, string> = {};

  for (const cat of categories) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { imageUrl: cat.imageUrl, name: cat.name, sortOrder: cat.sortOrder },
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

  const CDN_RAW = "https://res.cloudinary.com/dw2a5mbwh/image/upload/f_auto,q_auto";

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
      images: JSON.stringify([`${CDN_RAW}/culture-closet/product-saree-2`]),
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
      images: JSON.stringify([`${CDN_RAW}/culture-closet/product-lehenga`]),
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
      images: JSON.stringify([`${CDN_RAW}/culture-closet/listing-1`]),
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
      images: JSON.stringify([`${CDN_RAW}/Pasted_image_6_jks3ub`]),
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
      images: JSON.stringify([`${CDN_RAW}/Pasted_image_15_uidre9`]),
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
      images: JSON.stringify([`${CDN_RAW}/Pasted_image_12_lecfpd`]),
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
      images: JSON.stringify([`${CDN_RAW}/culture-closet/cat-men`]),
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
      images: JSON.stringify([`${CDN_RAW}/culture-closet/cat-kids`]),
    },
  ];

  for (const listing of listings) {
    await prisma.listing.upsert({
      where: { slug: listing.slug },
      update: { images: listing.images, categoryId: listing.categoryId },
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
