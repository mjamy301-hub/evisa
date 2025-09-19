-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "public"."ApplicationStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'SUBMITTED', 'APPROVED', 'REJECTED', 'ON_HOLD');

-- CreateTable
CREATE TABLE "public"."User" (
    "Id" SERIAL NOT NULL,
    "Username" TEXT NOT NULL,
    "PasswordHash" TEXT NOT NULL,
    "Role" "public"."Role" NOT NULL DEFAULT 'USER',
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "public"."Application" (
    "Id" SERIAL NOT NULL,
    "UserId" INTEGER NOT NULL,
    "Status" "public"."ApplicationStatus" NOT NULL DEFAULT 'NEW',
    "PassportNo" TEXT,
    "VisaNo" TEXT,
    "IssueDate" TIMESTAMP(3),
    "ExpiryDate" TIMESTAMP(3),
    "ApplicantName" TEXT,
    "DOB" TIMESTAMP(3),
    "Nationality" TEXT,
    "ContactEmail" TEXT,
    "ContactPhone" TEXT,
    "AddressLine1" TEXT,
    "AddressLine2" TEXT,
    "City" TEXT,
    "State" TEXT,
    "PostalCode" TEXT,
    "Notes" TEXT,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Username_key" ON "public"."User"("Username");

-- CreateIndex
CREATE UNIQUE INDEX "Application_UserId_key" ON "public"."Application"("UserId");

-- AddForeignKey
ALTER TABLE "public"."Application" ADD CONSTRAINT "Application_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "public"."User"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
