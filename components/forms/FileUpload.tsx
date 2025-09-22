import { FileIdentifier } from "@/utils/enum";
import { Info } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useId, useState } from "react";

function InfoLine({ text }: { text: string }) {
  return (
    <div className="mt-2 flex items-center gap-3 text-xs text-gray-700">
      <Info className="w-3.5" />
      <span>{text}</span>
    </div>
  );
}

export default function UploadField({
  label,
  placeholder,
  accept,
  required = false,
  className,
  disabled = false,
  identifier,
  onUploaded
}: {
  label?: string;
  placeholder?: string;
  accept: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  identifier: FileIdentifier;
  onUploaded: (id: FileIdentifier, res: object) => void;
}) {
  const inputId = useId();
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState("");
  const params = useParams();

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;

    setError("");
    setFileName(f.name);

    const fd = new FormData();
    fd.append("file", f);
    fd.append("Identifier", identifier);
    fd.append("FileableId", params.id as string);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: fd
    });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error.file);
    }

    onUploaded(identifier, json.data);
  }

  return (
    <div className={`sm:max-w-[398px] ${className}`}>
      <label htmlFor={inputId} className="text-sm font-medium text-default mb-2 block">
        {label} {required && <span className="text-[#0a66c2]">*</span>}
      </label>

      <div className="relative">
        <div className="flex items-center justify-between rounded-sm border border-default h-[42px] px-4">
          <span className="truncate text-sm text-gray-400 font-semibold">{fileName || placeholder}</span>

          <label htmlFor={inputId} className="cursor-pointer text-sm font-semibold text-default pr-15 hover:opacity-80">
            Select file
          </label>
        </div>

        <input
          id={inputId}
          type="file"
          accept={accept}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          onChange={handleChange}
          disabled={disabled}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      <InfoLine text={`Allowed extensions: ${accept.replaceAll(",", ", ")}`} />
    </div>
  );
}
