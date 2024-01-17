/*
  Warnings:

  - Added the required column `colors` to the `pallets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pallets" ADD COLUMN     "colors" TEXT NOT NULL;
