-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_subscriptions" (
    "stripeSubscriptionId" TEXT NOT NULL PRIMARY KEY,
    "period" TEXT NOT NULL,
    "periodStart" INTEGER NOT NULL,
    "periodEnd" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_subscriptions" ("createdAt", "period", "periodEnd", "periodStart", "planId", "status", "stripeSubscriptionId", "updatedAt", "userId") SELECT "createdAt", "period", "periodEnd", "periodStart", "planId", "status", "stripeSubscriptionId", "updatedAt", "userId" FROM "subscriptions";
DROP TABLE "subscriptions";
ALTER TABLE "new_subscriptions" RENAME TO "subscriptions";
CREATE UNIQUE INDEX "subscriptions_stripeSubscriptionId_key" ON "subscriptions"("stripeSubscriptionId");
CREATE UNIQUE INDEX "subscriptions_userId_key" ON "subscriptions"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
