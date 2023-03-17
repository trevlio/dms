/*
  Warnings:

  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "VerificationToken";

-- CreateTable
CREATE TABLE "Verification_Tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Verification_Tokens_token_key" ON "Verification_Tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Verification_Tokens_identifier_token_key" ON "Verification_Tokens"("identifier", "token");
