-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pallets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "favorite" TEXT NOT NULL,
    "foreignKey_userId" TEXT NOT NULL,

    CONSTRAINT "pallets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pallets_name_key" ON "pallets"("name");

-- AddForeignKey
ALTER TABLE "pallets" ADD CONSTRAINT "pallets_foreignKey_userId_fkey" FOREIGN KEY ("foreignKey_userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
