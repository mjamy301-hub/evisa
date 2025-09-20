import { Info } from "lucide-react";
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
}: {
  label?: string;
  placeholder?: string;
  accept: string;
  required?: boolean;
  className?: string;
}) {
  const inputId = useId();
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <div className={`sm:max-w-[398px] ${className}`}>
      <label
        htmlFor={inputId}
        className="text-sm font-medium text-default mb-2 block"
      >
        {label} {required && <span className="text-[#0a66c2]">*</span>}
      </label>

      <div className="relative">
        <div className="flex items-center justify-between rounded-sm border border-default h-[42px] px-4">
          <span className="truncate text-sm text-gray-400 font-semibold">
            {fileName || placeholder}
          </span>

          <label
            htmlFor={inputId}
            className="cursor-pointer text-sm font-semibold text-default pr-15 hover:opacity-80"
          >
            Select file
          </label>
        </div>

        <input
          id={inputId}
          type="file"
          accept={accept}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          onChange={(e) => {
            const f = e.target.files?.[0];
            setFileName(f ? f.name : null);
          }}
        />
      </div>

      <InfoLine text={`Allowed extensions: ${accept.replaceAll(",", ", ")}`} />
    </div>
  );
}
