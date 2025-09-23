"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import UploadField from "./FileUpload";
import Link from "next/link";
import { FileIdentifier } from "@/utils/enum";
import clsx from "clsx";
import { useMe } from "@/hooks/useMe";
import { Role } from "@prisma/client";
import { useParams } from "next/navigation";

type UploadedMap = Partial<
  Record<FileIdentifier, { Url: string; FileName: string }>
>;

const Step5Form = () => {
  const { me } = useMe();
  const params = useParams();
  const [uploaded, setUploaded] = useState<UploadedMap>({});

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/applications/${params.id}/files`, {
        method: "GET",
      });
      const json = await res.json();
      if (!res.ok) alert(json?.error?.message);

      const mapped = json.data.reduce(
        (
          acc: UploadedMap,
          curr: { Identifier: FileIdentifier; Url: string; FileName: string }
        ) => {
          if (!acc[curr.Identifier]) {
            return {
              ...acc,
              [curr.Identifier]: { Url: curr.Url, FileName: curr.FileName },
            };
          }
          return acc;
        },
        {}
      );

      setUploaded(mapped);
    })();
  }, [params.id]);

  function handleUploaded(id: FileIdentifier, res: object) {
    setUploaded((prev) => ({ ...prev, [id]: res }));
  }

  return (
    <div>
      <h1 className="mt-35 text-[34px] text-default font-bold mb-6">
        Documents
      </h1>
      <p className="mb-14">
        Maximum 1 file per document. The total size of all uploaded documents
        must not exceed 5MB.
      </p>
      <div className="w-50 h-50 mb-8">
        <Link
          href={uploaded[FileIdentifier.FACE_PHOTO]?.Url || ""}
          download={uploaded[FileIdentifier.FACE_PHOTO]?.FileName}
          className="text-blue-500 hover:underline font-medium mb-6 block"
        >
          <img
            src={uploaded[FileIdentifier.FACE_PHOTO]?.Url}
            alt="profile"
            width={155}
            height={155}
            className="w-full h-full"
          />
        </Link>
      </div>
      <UploadField
        label="Face photo"
        placeholder={uploaded[FileIdentifier.FACE_PHOTO]?.FileName ?? "Select"}
        accept=".jpg, .jpeg, .png, .tiff"
        required
        disabled={me?.Role === Role.USER}
        className="mb-6"
        identifier={FileIdentifier.FACE_PHOTO}
        onUploaded={handleUploaded}
      />
      <UploadField
        label="The first page of the travel document/passport"
        placeholder={uploaded[FileIdentifier.PASSPORT]?.FileName ?? "Select"}
        accept=".pdf, .jpg, .jpeg, .png, .tiff"
        required
        disabled={me?.Role === Role.USER}
        className="mb-3"
        identifier={FileIdentifier.PASSPORT}
        onUploaded={handleUploaded}
      />
      <Link
        href={uploaded[FileIdentifier.PASSPORT]?.Url || "#!"}
        download={uploaded[FileIdentifier.PASSPORT]?.FileName}
        className={clsx(
          "text-blue-500 hover:underline font-medium mb-6 block",
          {
            "text-gray-500": !uploaded[FileIdentifier.PASSPORT],
          }
        )}
      >
        Download document
      </Link>
      <UploadField
        label="Invitation letter"
        placeholder={
          uploaded[FileIdentifier.INVITATION_LETTER]?.FileName ?? "Select"
        }
        accept=".pdf"
        required
        disabled={me?.Role === Role.USER}
        className="mb-3"
        identifier={FileIdentifier.INVITATION_LETTER}
        onUploaded={handleUploaded}
      />
      <Link
        href={uploaded[FileIdentifier.INVITATION_LETTER]?.Url || "#!"}
        download={uploaded[FileIdentifier.INVITATION_LETTER]?.FileName}
        className={clsx(
          "text-blue-500 hover:underline font-medium mb-6 block",
          {
            "text-gray-500": !uploaded[FileIdentifier.INVITATION_LETTER],
          }
        )}
      >
        Download document
      </Link>
      <UploadField
        label="Certificate of registration of a legal entity, business association, sports association or entrepreneur"
        placeholder={uploaded[FileIdentifier.LEGAL_ENTRY]?.FileName ?? "Select"}
        accept=".pdf, .jpg, .jpeg, .png, .tiff"
        required
        disabled={me?.Role === Role.USER}
        className="mb-3"
        identifier={FileIdentifier.LEGAL_ENTRY}
        onUploaded={handleUploaded}
      />
      <Link
        href={uploaded[FileIdentifier.LEGAL_ENTRY]?.Url || "#!"}
        download={uploaded[FileIdentifier.LEGAL_ENTRY]?.FileName}
        className={clsx(
          "text-blue-500 hover:underline font-medium mb-6 block",
          {
            "text-gray-500": !uploaded[FileIdentifier.LEGAL_ENTRY],
          }
        )}
      >
        Download document
      </Link>
      <UploadField
        label="A proposal for an employment contract or other contract by which a right based on work is realized"
        placeholder={
          uploaded[FileIdentifier.EMPLOYMENT_CONTRACT]?.FileName ?? "Select"
        }
        accept=".pdf, .jpg, .jpeg, .png, .tiff"
        required
        disabled={me?.Role === Role.USER}
        className="mb-3"
        identifier={FileIdentifier.EMPLOYMENT_CONTRACT}
        onUploaded={handleUploaded}
      />
      <Link
        href={uploaded[FileIdentifier.EMPLOYMENT_CONTRACT]?.Url || "#!"}
        download={uploaded[FileIdentifier.EMPLOYMENT_CONTRACT]?.FileName}
        className={clsx(
          "text-blue-500 hover:underline font-medium mb-6 block",
          {
            "text-gray-500": !uploaded[FileIdentifier.EMPLOYMENT_CONTRACT],
          }
        )}
      >
        Download document
      </Link>
      <UploadField
        label="Extract from the rulebook on the organization and systematization of jobs, or if the employer has less than 10 employees, the employer's statement containing the name and description of the jobs, the type and degree of the required professional qualification, i.e. education and other special conditions for working on the jobs for the position"
        placeholder={
          uploaded[FileIdentifier.JOB_DOCUMENTS]?.FileName ?? "Select"
        }
        accept=".pdf, .jpg, .jpeg, .png, .tiff"
        required
        disabled={me?.Role === Role.USER}
        className="mb-3"
        identifier={FileIdentifier.JOB_DOCUMENTS}
        onUploaded={handleUploaded}
      />
      <Link
        href={uploaded[FileIdentifier.JOB_DOCUMENTS]?.Url || "#!"}
        download={uploaded[FileIdentifier.JOB_DOCUMENTS]?.FileName}
        className={clsx(
          "text-blue-500 hover:underline font-medium mb-6 block",
          {
            "text-gray-500": !uploaded[FileIdentifier.JOB_DOCUMENTS],
          }
        )}
      >
        Download document
      </Link>
      <UploadField
        label="Diploma, certificate, i.e. other public document on the acquired appropriate type and level of the required professional qualification, i.e. education and a certified translation of the same"
        placeholder={
          uploaded[FileIdentifier.DIPLOMA_CERTIFICATE]?.FileName ?? "Select"
        }
        accept=".pdf, .jpg, .jpeg, .png, .tiff"
        required
        disabled={me?.Role === Role.USER}
        className="mb-3"
        identifier={FileIdentifier.DIPLOMA_CERTIFICATE}
        onUploaded={handleUploaded}
      />
      <Link
        href={uploaded[FileIdentifier.DIPLOMA_CERTIFICATE]?.Url || "#!"}
        download={uploaded[FileIdentifier.DIPLOMA_CERTIFICATE]?.FileName}
        className={clsx(
          "text-blue-500 hover:underline font-medium mb-6 block",
          {
            "text-gray-500": !uploaded[FileIdentifier.DIPLOMA_CERTIFICATE],
          }
        )}
      >
        Download document
      </Link>
      <UploadField
        label="Additional document 1"
        placeholder={
          uploaded[FileIdentifier.ADDITIONAL_1]?.FileName ?? "Select"
        }
        accept=".jpg, .jpeg, .png, .tiff"
        required
        disabled={me?.Role === Role.USER}
        className="mb-6"
        identifier={FileIdentifier.ADDITIONAL_1}
        onUploaded={handleUploaded}
      />
      <UploadField
        label="Additional document 2"
        placeholder={
          uploaded[FileIdentifier.ADDITIONAL_2]?.FileName ?? "Select"
        }
        accept=".jpg, .jpeg, .png, .tiff"
        required
        disabled={me?.Role === Role.USER}
        className="mb-6"
        identifier={FileIdentifier.ADDITIONAL_2}
        onUploaded={handleUploaded}
      />
      <p className="mt-20 sm:max-w-xl">
        Diplomatic and consular representation office may additionally request
        the supplementation of documents that have not been attached.
      </p>
    </div>
  );
};

export default Step5Form;
