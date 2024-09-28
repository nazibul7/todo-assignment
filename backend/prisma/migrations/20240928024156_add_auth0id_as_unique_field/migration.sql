/*
  Warnings:

  - A unique constraint covering the columns `[auth0Id]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Users_auth0Id_key" ON "Users"("auth0Id");
