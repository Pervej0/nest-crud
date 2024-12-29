/*
  Warnings:

  - You are about to alter the column `fullName` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `country` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `fullName` VARCHAR(100) NOT NULL,
    MODIFY `email` VARCHAR(255) NOT NULL,
    MODIFY `phone` VARCHAR(191) NOT NULL,
    MODIFY `address` VARCHAR(255) NOT NULL,
    MODIFY `country` VARCHAR(100) NOT NULL;
