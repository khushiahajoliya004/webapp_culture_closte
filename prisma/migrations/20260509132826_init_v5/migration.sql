-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_listings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "condition" TEXT NOT NULL DEFAULT 'LIKE_NEW',
    "category_id" TEXT NOT NULL,
    "seller_id" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "original_price" REAL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "is_negotiable" BOOLEAN NOT NULL DEFAULT false,
    "size" TEXT,
    "primary_color" TEXT,
    "occasion" TEXT,
    "material" TEXT,
    "country_of_origin" TEXT,
    "country_location" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "images" TEXT NOT NULL,
    "featured_image_index" INTEGER NOT NULL DEFAULT 0,
    "delivery_method" TEXT NOT NULL DEFAULT 'SHIPPING',
    "shipping_cost" REAL,
    "views_count" INTEGER NOT NULL DEFAULT 0,
    "likes_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "listings_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "listings_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_listings" ("category_id", "condition", "country_location", "country_of_origin", "created_at", "currency", "delivery_method", "description", "featured_image_index", "id", "images", "is_negotiable", "likes_count", "material", "occasion", "original_price", "price", "primary_color", "seller_id", "shipping_cost", "size", "slug", "status", "title", "updated_at", "views_count") SELECT "category_id", "condition", "country_location", "country_of_origin", "created_at", "currency", "delivery_method", "description", "featured_image_index", "id", "images", "is_negotiable", "likes_count", "material", "occasion", "original_price", "price", "primary_color", "seller_id", "shipping_cost", "size", "slug", "status", "title", "updated_at", "views_count" FROM "listings";
DROP TABLE "listings";
ALTER TABLE "new_listings" RENAME TO "listings";
CREATE UNIQUE INDEX "listings_slug_key" ON "listings"("slug");
CREATE TABLE "new_notifications" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'SYSTEM',
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "data" TEXT,
    "read_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_notifications" ("body", "created_at", "data", "id", "read_at", "title", "type", "user_id") SELECT "body", "created_at", "data", "id", "read_at", "title", "type", "user_id" FROM "notifications";
DROP TABLE "notifications";
ALTER TABLE "new_notifications" RENAME TO "notifications";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
