-- DropForeignKey
ALTER TABLE "bank_accounts" DROP CONSTRAINT "bank_accounts_storeId_fkey";

-- DropForeignKey
ALTER TABLE "biteship_tracking_limits" DROP CONSTRAINT "biteship_tracking_limits_invoiceId_fkey";

-- DropForeignKey
ALTER TABLE "biteship_tracking_limits" DROP CONSTRAINT "biteship_tracking_limits_userId_fkey";

-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_cartId_fkey";

-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_productId_fkey";

-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_userId_fkey";

-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_variantOptionId_fkey";

-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_storeId_fkey";

-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_userId_fkey";

-- DropForeignKey
ALTER TABLE "confirmation_payments" DROP CONSTRAINT "confirmation_payments_invoiceId_fkey";

-- DropForeignKey
ALTER TABLE "invoice_histories" DROP CONSTRAINT "invoice_histories_invoiceId_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_cartId_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_courierId_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_paymentId_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_userId_fkey";

-- DropForeignKey
ALTER TABLE "locations" DROP CONSTRAINT "locations_profileId_fkey";

-- DropForeignKey
ALTER TABLE "locations" DROP CONSTRAINT "locations_storeId_fkey";

-- DropForeignKey
ALTER TABLE "message_templates" DROP CONSTRAINT "message_templates_storeId_fkey";

-- DropForeignKey
ALTER TABLE "operation_hours" DROP CONSTRAINT "operation_hours_storeId_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_userId_fkey";

-- DropForeignKey
ALTER TABLE "product_attachments" DROP CONSTRAINT "product_attachments_productId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_storeId_fkey";

-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_userId_fkey";

-- DropForeignKey
ALTER TABLE "stores_decorations" DROP CONSTRAINT "stores_decorations_decorationId_fkey";

-- DropForeignKey
ALTER TABLE "stores_decorations" DROP CONSTRAINT "stores_decorations_storeId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_roleId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_storeId_fkey";

-- DropForeignKey
ALTER TABLE "variant_option_values" DROP CONSTRAINT "variant_option_values_variantOptionId_fkey";

-- DropForeignKey
ALTER TABLE "variant_options" DROP CONSTRAINT "variant_options_variantId_fkey";

-- DropForeignKey
ALTER TABLE "variants" DROP CONSTRAINT "variants_productId_fkey";

-- DropForeignKey
ALTER TABLE "withdraws" DROP CONSTRAINT "withdraws_approvedById_fkey";

-- DropForeignKey
ALTER TABLE "withdraws" DROP CONSTRAINT "withdraws_bankId_fkey";

-- DropForeignKey
ALTER TABLE "withdraws" DROP CONSTRAINT "withdraws_storeId_fkey";

-- CreateTable
CREATE TABLE "attachments_admin" (
    "id" TEXT NOT NULL,
    "attachment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "withdrawId" TEXT NOT NULL,

    CONSTRAINT "attachments_admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_decline" (
    "id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "withdrawId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_decline_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "attachments_admin_id_key" ON "attachments_admin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "admin_decline_id_key" ON "admin_decline"("id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "attachments_admin" ADD CONSTRAINT "attachments_admin_withdrawId_fkey" FOREIGN KEY ("withdrawId") REFERENCES "withdraws"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "withdraws" ADD CONSTRAINT "withdraws_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "withdraws" ADD CONSTRAINT "withdraws_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "bank_accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "withdraws" ADD CONSTRAINT "withdraws_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stores_decorations" ADD CONSTRAINT "stores_decorations_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stores_decorations" ADD CONSTRAINT "stores_decorations_decorationId_fkey" FOREIGN KEY ("decorationId") REFERENCES "decorations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "operation_hours" ADD CONSTRAINT "operation_hours_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "message_templates" ADD CONSTRAINT "message_templates_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "variants" ADD CONSTRAINT "variants_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "variant_options" ADD CONSTRAINT "variant_options_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "variants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "variant_option_values" ADD CONSTRAINT "variant_option_values_variantOptionId_fkey" FOREIGN KEY ("variantOptionId") REFERENCES "variant_options"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_variantOptionId_fkey" FOREIGN KEY ("variantOptionId") REFERENCES "variant_options"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_courierId_fkey" FOREIGN KEY ("courierId") REFERENCES "couriers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "invoice_histories" ADD CONSTRAINT "invoice_histories_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bank_accounts" ADD CONSTRAINT "bank_accounts_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_attachments" ADD CONSTRAINT "product_attachments_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "confirmation_payments" ADD CONSTRAINT "confirmation_payments_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "biteship_tracking_limits" ADD CONSTRAINT "biteship_tracking_limits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "biteship_tracking_limits" ADD CONSTRAINT "biteship_tracking_limits_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "admin_decline" ADD CONSTRAINT "admin_decline_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "admin_decline" ADD CONSTRAINT "admin_decline_withdrawId_fkey" FOREIGN KEY ("withdrawId") REFERENCES "withdraws"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
