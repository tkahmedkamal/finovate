-- CreateTable
CREATE TABLE "subscriptions" (
    "stripeSubscriptionId" TEXT NOT NULL PRIMARY KEY,
    "period" TEXT NOT NULL,
    "periodStart" INTEGER NOT NULL,
    "periodEnd" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("clerkId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_stripeSubscriptionId_key" ON "subscriptions"("stripeSubscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_userId_key" ON "subscriptions"("userId");
