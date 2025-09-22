-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "public"."ApplicationStatus" AS ENUM ('REQUEST_SUBMITTED', 'DRAFT_REQUEST', 'PROCESSING', 'APPROVED');

-- CreateEnum
CREATE TYPE "public"."FileStatus" AS ENUM ('INACTIVE', 'ACTIVE');

-- CreateTable
CREATE TABLE "public"."User" (
    "Id" SERIAL NOT NULL,
    "Email" TEXT NOT NULL,
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
    "Status" "public"."ApplicationStatus" NOT NULL DEFAULT 'REQUEST_SUBMITTED',
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

-- CreateTable
CREATE TABLE "public"."File" (
    "Id" SERIAL NOT NULL,
    "UserId" INTEGER,
    "Status" "public"."FileStatus" NOT NULL DEFAULT 'INACTIVE',
    "FileableId" INTEGER,
    "FileableType" TEXT,
    "Collection" TEXT,
    "Identifier" TEXT,
    "Path" TEXT NOT NULL,
    "Extension" TEXT NOT NULL,
    "FileName" TEXT,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "File_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "public"."User"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Application_UserId_key" ON "public"."Application"("UserId");

-- CreateIndex
CREATE INDEX "IDX_files_fileable" ON "public"."File"("FileableType", "FileableId", "Identifier");

-- CreateIndex
CREATE INDEX "IDX_files_coll_ident" ON "public"."File"("FileableType", "FileableId", "Collection");

-- CreateIndex
CREATE INDEX "File_FileableType_FileableId_Status_idx" ON "public"."File"("FileableType", "FileableId", "Status");

-- AddForeignKey
ALTER TABLE "public"."Application" ADD CONSTRAINT "Application_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "public"."User"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
