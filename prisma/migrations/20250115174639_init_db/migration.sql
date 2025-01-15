-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "stripeCustomerId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userConfigs" (
    "id" TEXT NOT NULL,
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "currency" TEXT NOT NULL DEFAULT 'EGP',
    "userId" TEXT NOT NULL,

    CONSTRAINT "userConfigs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'income',
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "type" TEXT NOT NULL DEFAULT 'income',
    "date" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "categoryId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dailyStats" (
    "day" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "income" DOUBLE PRECISION NOT NULL,
    "expense" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "dailyStats_pkey" PRIMARY KEY ("userId","day","month","year")
);

-- CreateTable
CREATE TABLE "monthlyStats" (
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "income" DOUBLE PRECISION NOT NULL,
    "expense" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "monthlyStats_pkey" PRIMARY KEY ("userId","month","year")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "stripeSubscriptionId" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "periodStart" INTEGER NOT NULL,
    "periodEnd" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("stripeSubscriptionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_stripeCustomerId_key" ON "User"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "userConfigs_userId_key" ON "userConfigs"("userId");

-- CreateIndex
CREATE INDEX "categories_userId_idx" ON "categories"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_type_userId_key" ON "categories"("name", "type", "userId");

-- CreateIndex
CREATE INDEX "transactions_categoryId_idx" ON "transactions"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_stripeSubscriptionId_key" ON "subscriptions"("stripeSubscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_userId_key" ON "subscriptions"("userId");

-- AddForeignKey
ALTER TABLE "userConfigs" ADD CONSTRAINT "userConfigs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dailyStats" ADD CONSTRAINT "dailyStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monthlyStats" ADD CONSTRAINT "monthlyStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
