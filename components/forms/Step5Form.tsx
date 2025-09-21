import React from "react";
import UploadField from "./FileUpload";
import Image from "next/image";
import profile from "@/assets/profile.png";
import Link from "next/link";

const Step5Form = () => {
  return (
    <div>
      <h1 className="mt-35 text-[34px] text-default font-bold mb-6">Documents</h1>
      <p className="mb-14">
        Maximum 1 file per document. The total size of all uploaded documents must not exceed 5MB.
      </p>
      <div className="w-50 h-50 mb-8">
        <Image src={profile} alt="profile" className="w-full h-full" />
      </div>
      <UploadField
        label="Face photo"
        placeholder="Select"
        accept=".jpg, .jpeg, .png, .tiff"
        required
        className="mb-6"
      />
      <UploadField
        label="The first page of the travel document/passport"
        placeholder="Select"
        accept=".pdf, .jpg, .jpeg, .png, .tiff"
        required
        className="mb-3"
      />
      <Link href="#!" className="text-blue-500 hover:underline font-medium mb-6 block">
        Download document
      </Link>
      <UploadField label="Invitation letter" placeholder="Select" accept=".pdf" required className="mb-3" />
      <Link href="#!" className="text-blue-500 hover:underline font-medium block mb-6">
        Download document
      </Link>
      <UploadField
        label="Certificate of registration of a legal entity, business association, sports association or entrepreneur"
        placeholder="Select"
        accept=".pdf, .jpg, .jpeg, .png, .tiff"
        required
        className="mb-3"
      />
      <Link href="#!" className="text-blue-500 hover:underline font-medium block mb-6">
        Download document
      </Link>
      <UploadField
        label="A proposal for an employment contract or other contract by which a right based on work is realized"
        placeholder="Select"
        accept=".pdf, .jpg, .jpeg, .png, .tiff"
        required
        className="mb-3"
      />
      <Link href="#!" className="text-blue-500 hover:underline font-medium block mb-6">
        Download document
      </Link>
      <UploadField
        label="Extract from the rulebook on the organization and systematization of jobs, or if the employer has less than 10 employees, the employer's statement containing the name and description of the jobs, the type and degree of the required professional qualification, i.e. education and other special conditions for working on the jobs for the position"
        placeholder="Select"
        accept=".pdf, .jpg, .jpeg, .png, .tiff"
        required
        className="mb-3"
      />
      <Link href="#!" className="text-blue-500 hover:underline font-medium block mb-6">
        Download document
      </Link>
      <UploadField
        label="Diploma, certificate, i.e. other public document on the acquired appropriate type and level of the required professional qualification, i.e. education and a certified translation of the same"
        placeholder="Select"
        accept=".pdf, .jpg, .jpeg, .png, .tiff"
        required
        className="mb-3"
      />
      <Link href="#!" className="text-blue-500 hover:underline font-medium block mb-6">
        Download document
      </Link>
      <UploadField
        label="Additional document 1"
        placeholder="Select"
        accept=".jpg, .jpeg, .png, .tiff"
        required
        className="mb-6"
      />
      <UploadField
        label="Additional document 2"
        placeholder="Select"
        accept=".jpg, .jpeg, .png, .tiff"
        required
        className="mb-6"
      />
      <p className="mt-20 sm:max-w-xl">
        Diplomatic and consular representation office may additionally request the supplementation of documents that
        have not been attached.
      </p>
    </div>
  );
};

export default Step5Form;
