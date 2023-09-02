-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role_id" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "locations" TEXT NOT NULL,
    "user_id" TEXT,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stores" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slogan" TEXT,
    "description" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "logo_attachment" TEXT,
    "banner_attachment" TEXT,

    CONSTRAINT "stores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_stores" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "store_id" TEXT,

    CONSTRAINT "users_stores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "decorations" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "store_id" TEXT,

    CONSTRAINT "decorations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stores_on_decorations" (
    "id" TEXT NOT NULL,
    "decoration_id" TEXT,
    "store_id" TEXT,

    CONSTRAINT "stores_on_decorations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "operation_hours" (
    "id" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "open_at" TIMESTAMP(3) NOT NULL,
    "close_at" TIMESTAMP(3) NOT NULL,
    "is_off" BOOLEAN,
    "store_id" TEXT,

    CONSTRAINT "operation_hours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message_templates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "store_id" TEXT,

    CONSTRAINT "message_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "city_district" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longtitude" TEXT NOT NULL,
    "is_main_location" BOOLEAN NOT NULL,
    "store_id" TEXT,
    "profile_id" TEXT,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "attachments" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "variants" TEXT NOT NULL,
    "size" TEXT[],
    "minumum_order" INTEGER NOT NULL,
    "store_id" TEXT,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "variants" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "product_id" TEXT,

    CONSTRAINT "variants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "variant_options" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "variant_id" TEXT,

    CONSTRAINT "variant_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "variant_option_values" (
    "id" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "variant_options_id" TEXT,

    CONSTRAINT "variant_option_values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "store_id" TEXT,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products_on_categories" (
    "id" TEXT NOT NULL,
    "product_id" TEXT,
    "category_id" TEXT,

    CONSTRAINT "products_on_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carts" (
    "id" TEXT NOT NULL,
    "prices" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "users_id" TEXT,
    "store_id" TEXT,

    CONSTRAINT "carts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart_items" (
    "id" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "product_id" TEXT,
    "cart_id" TEXT,
    "user_id" TEXT,
    "store_id" TEXT,

    CONSTRAINT "cart_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" TEXT NOT NULL,
    "prices" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "receiver_longtitude" TEXT NOT NULL,
    "receiver_latitude" TEXT NOT NULL,
    "receiver_district" TEXT NOT NULL,
    "receiver_phone" TEXT NOT NULL,
    "receiver_address" TEXT NOT NULL,
    "receiver_name" TEXT NOT NULL,
    "invoice_number" TEXT NOT NULL,
    "cart_id" TEXT,
    "payment_id" TEXT,
    "courier_id" TEXT,
    "user_id" TEXT,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "va_number" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "order_id" INTEGER,
    "status" TEXT NOT NULL,
    "usersId" TEXT,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "couriers" (
    "id" TEXT NOT NULL,
    "courier_code" TEXT NOT NULL,
    "courier_service_name" TEXT NOT NULL,
    "courier_service_code" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "couriers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "roles_id_key" ON "roles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_id_key" ON "profiles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_user_id_key" ON "profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "stores_id_key" ON "stores"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_stores_id_key" ON "users_stores"("id");

-- CreateIndex
CREATE UNIQUE INDEX "decorations_id_key" ON "decorations"("id");

-- CreateIndex
CREATE UNIQUE INDEX "decorations_store_id_key" ON "decorations"("store_id");

-- CreateIndex
CREATE UNIQUE INDEX "stores_on_decorations_id_key" ON "stores_on_decorations"("id");

-- CreateIndex
CREATE UNIQUE INDEX "operation_hours_id_key" ON "operation_hours"("id");

-- CreateIndex
CREATE UNIQUE INDEX "message_templates_id_key" ON "message_templates"("id");

-- CreateIndex
CREATE UNIQUE INDEX "locations_id_key" ON "locations"("id");

-- CreateIndex
CREATE UNIQUE INDEX "products_id_key" ON "products"("id");

-- CreateIndex
CREATE UNIQUE INDEX "variants_id_key" ON "variants"("id");

-- CreateIndex
CREATE UNIQUE INDEX "variant_options_id_key" ON "variant_options"("id");

-- CreateIndex
CREATE UNIQUE INDEX "variant_option_values_id_key" ON "variant_option_values"("id");

-- CreateIndex
CREATE UNIQUE INDEX "categories_id_key" ON "categories"("id");

-- CreateIndex
CREATE UNIQUE INDEX "products_on_categories_id_key" ON "products_on_categories"("id");

-- CreateIndex
CREATE UNIQUE INDEX "carts_id_key" ON "carts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "cart_items_id_key" ON "cart_items"("id");

-- CreateIndex
CREATE UNIQUE INDEX "invoices_id_key" ON "invoices"("id");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_cart_id_unique" ON "invoices"("cart_id");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_payment_id_unique" ON "invoices"("payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_courier_id_unique" ON "invoices"("courier_id");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_user_id_unique" ON "invoices"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_id_key" ON "payments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "couriers_id_key" ON "couriers"("id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_stores" ADD CONSTRAINT "users_stores_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_stores" ADD CONSTRAINT "users_stores_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "decorations" ADD CONSTRAINT "decorations_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stores_on_decorations" ADD CONSTRAINT "stores_on_decorations_decoration_id_fkey" FOREIGN KEY ("decoration_id") REFERENCES "decorations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stores_on_decorations" ADD CONSTRAINT "stores_on_decorations_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operation_hours" ADD CONSTRAINT "operation_hours_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_templates" ADD CONSTRAINT "message_templates_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variants" ADD CONSTRAINT "variants_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variant_options" ADD CONSTRAINT "variant_options_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "variants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variant_option_values" ADD CONSTRAINT "variant_option_values_variant_options_id_fkey" FOREIGN KEY ("variant_options_id") REFERENCES "variant_options"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_on_categories" ADD CONSTRAINT "products_on_categories_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_on_categories" ADD CONSTRAINT "products_on_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoice_cart_fk" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoice_payment_fk" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoice_courier_fk" FOREIGN KEY ("courier_id") REFERENCES "couriers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoice_user_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
