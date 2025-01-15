-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_userConfigs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "currency" TEXT NOT NULL DEFAULT 'EGP',
    "userId" TEXT NOT NULL,
    CONSTRAINT "userConfigs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("clerkId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_userConfigs" ("currency", "id", "timezone", "userId") SELECT coalesce("currency", 'EGP') AS "currency", "id", "timezone", "userId" FROM "userConfigs";
DROP TABLE "userConfigs";
ALTER TABLE "new_userConfigs" RENAME TO "userConfigs";
CREATE UNIQUE INDEX "userConfigs_userId_key" ON "userConfigs"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
