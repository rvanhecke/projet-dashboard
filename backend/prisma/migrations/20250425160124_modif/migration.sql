/*
  Warnings:

  - Made the column `firstName` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL DEFAULT 'changeme123*',
ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL,
ALTER COLUMN "username" SET NOT NULL;
