-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "public"."ApplicationStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'SUBMITTED', 'APPROVED', 'REJECTED', 'ON_HOLD');

-- CreateTable
CREATE TABLE "public"."User" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT,
    "Username" TEXT NOT NULL,
    "PasswordHash" TEXT NOT NULL,
    "Role" "public"."Role" NOT NULL DEFAULT 'USER',
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "public"."Application" (
    "Id" SERIAL NOT NULL,
    "UserId" INTEGER NOT NULL,
    "Status" "public"."ApplicationStatus" NOT NULL DEFAULT 'NEW',
    "TravelPurpose" TEXT,
    "SpecificPurpose" TEXT,
    "LastName" TEXT,
    "BirthName" TEXT,
    "FirstName" TEXT,
    "Gender" TEXT,
    "DOB" TEXT,
    "POB" TEXT,
    "Country" TEXT DEFAULT 'Bangladesh',
    "Address" TEXT,
    "Phone" INTEGER,
    "PassportIssueCountry" TEXT DEFAULT 'Bangladesh',
    "OriginalCitizenship" TEXT DEFAULT 'Bangladesh',
    "MaritalStatus" TEXT,
    "FathersFirstName" TEXT,
    "MothersFirstName" TEXT,
    "Email" TEXT,
    "TravelDocumentType" TEXT,
    "DocumentNumber" TEXT,
    "POITD" TEXT,
    "IssueDate" TEXT,
    "ExpiryDate" TEXT,
    "ArrivalDate" TEXT,
    "DepartureDate" TEXT,
    "HostName" TEXT,
    "HostPhone" INTEGER,
    "HostAddress" TEXT,
    "HostEmail" TEXT,
    "Municipality" TEXT,
    "Settlement" TEXT,
    "Street" TEXT,
    "houseNumber" TEXT,
    "FacePhoto" TEXT,
    "DocumentFirstPage" TEXT,
    "InvitationLetter" TEXT,
    "CertificateOfRegistration" TEXT,
    "EmploymentContract" TEXT,
    "ExtractFrom" TEXT,
    "Diploma" TEXT,
    "Additional1" TEXT,
    "Additional2" TEXT,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Username_key" ON "public"."User"("Username");

-- CreateIndex
CREATE UNIQUE INDEX "Application_UserId_key" ON "public"."Application"("UserId");

-- AddForeignKey
ALTER TABLE "public"."Application" ADD CONSTRAINT "Application_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "public"."User"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
