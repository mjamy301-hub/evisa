"use state";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { cn } from "@/lib/utils";

const purposes = [
  {
    id: "employment",
    label:
      "Employment on the grounds of an employment contract or another contract exercising workplace rights",
    defaultSelected: true,
  },
  {
    id: "self-employment",
    label: "Enrolled in the registration decision (self-employment)",
    defaultSelected: false,
  },
  {
    id: "cooperation",
    label: "Agreement on business and technical cooperation (informed persons)",
    defaultSelected: false,
  },
];

const Step1Form = () => {
  const [selectedPurpose, setSelectedPurpose] = useState("employment");
  return (
    <div>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select</SelectLabel>
            <SelectItem value="Employment">Employment</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <h1 className="mt-35 text-[34px] text-default font-bold mb-14">
        More specific travel purpose:
      </h1>
      <div className="space-y-4">
        <h2 className="text-sm font-medium text-foreground mb-6">
          Select specific purpose *
        </h2>

        <div className="space-y-8">
          {purposes.map((purpose) => (
            <label
              key={purpose.id}
              className={cn(
                "flex items-start gap-4 p-6 rounded-lg cursor-pointer transition-colors border",
                selectedPurpose === purpose.id
                  ? "bg-[#4a90e2] text-white"
                  : "bg-[#cdd7e7] text-gray-700 hover:bg-[#bac8dd]"
              )}
            >
              <div className="relative">
                <input
                  type="radio"
                  name="purpose"
                  value={purpose.id}
                  checked={selectedPurpose === purpose.id}
                  onChange={(e) => setSelectedPurpose(e.target.value)}
                  className="sr-only"
                />
                <div
                  className={cn(
                    "w-[25px] h-[25px] rounded-full border-2 flex items-center justify-center",
                    selectedPurpose === purpose.id
                      ? "border-default bg-white"
                      : "border-default bg-white"
                  )}
                >
                  {selectedPurpose === purpose.id && (
                    <div className="w-2 h-2 rounded-full bg-default" />
                  )}
                </div>
              </div>
              <span className="text-default leading-relaxed text-xl font-semibold min-h-16">
                {purpose.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step1Form;
