/*
  Warnings:

  - You are about to drop the column `currency` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `timezone` on the `User` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "userConfigs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "currency" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "userConfigs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("clerkId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL
);
INSERT INTO "new_User" ("clerkId", "email", "firstName", "fullName", "id", "imageUrl", "lastName") SELECT "clerkId", "email", "firstName", "fullName", "id", "imageUrl", "lastName" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "userConfigs_userId_key" ON "userConfigs"("userId");
