/*
  Warnings:

  - You are about to drop the column `email` on the `Customer` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "paymentInfo" TEXT NOT NULL
);
INSERT INTO "new_Customer" ("address", "createdAt", "id", "name", "paymentInfo", "phoneNumber", "updatedAt") SELECT "address", "createdAt", "id", "name", "paymentInfo", "phoneNumber", "updatedAt" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
