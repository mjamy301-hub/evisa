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
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Application, Role } from "@prisma/client";
import { useMe } from "@/hooks/useMe";

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
  {
    id: "movement",
    label: "Movement within the company",
    defaultSelected: false,
  },
  {
    id: "independent",
    label: "Independent professional",
    defaultSelected: false,
  },
  {
    id: "trainingAndDevelopment",
    label:
      "Training and development (professional practice, specialization, training, internship, work experience, professional training/development)",
    defaultSelected: false,
  },
];

const Step1Form = ({
  form,
  setForm,
  error,
}: {
  form: Partial<Application>;
  setForm: Dispatch<SetStateAction<Partial<Application>>>;
  error: object;
}) => {
  const [selectedPurpose, setSelectedPurpose] = useState("cooperation");
  const { me } = useMe();
  interface ChangeEvent {
    target: {
      name: string;
      value: string;
    };
  }

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      SpecificPurpose: selectedPurpose,
    }));
  }, [selectedPurpose, setForm]);

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div>
      <h1 className="mt-35 text-[34px] text-default font-bold mb-14">
        Travel purpose
      </h1>
      <div>
        <h2 className="text-sm font-medium text-foreground mb-2">
          Travel purpose *
        </h2>
        <Select
          name="TravelPurpose"
          value={form.TravelPurpose ?? ""}
          onValueChange={(value) =>
            handleChange({ target: { name: "TravelPurpose", value } })
          }
          disabled={me?.Role !== Role.ADMIN}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select</SelectLabel>
              <SelectItem value="Employment">Employment</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
              <SelectItem value="Tour">Tour</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
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
                form.SpecificPurpose === purpose.id
                  ? "bg-[#4a90e2] text-white"
                  : "bg-[#cdd7e7] text-gray-700 hover:bg-[#bac8dd]"
              )}
            >
              <div className="relative">
                <input
                  type="radio"
                  name="purpose"
                  disabled={me?.Role !== Role.ADMIN}
                  value={purpose.id}
                  checked={form.SpecificPurpose === purpose.id}
                  onChange={(e) => {
                    setSelectedPurpose(e.target.value);
                  }}
                  className="sr-only"
                />
                <div
                  className={cn(
                    "w-[25px] h-[25px] rounded-full border-2 flex items-center justify-center",
                    form.SpecificPurpose === purpose.id
                      ? "border-default bg-white"
                      : "border-default bg-white"
                  )}
                >
                  {form.SpecificPurpose === purpose.id && (
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
