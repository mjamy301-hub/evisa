"use state";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import InfoIcon from "../icons/InfoIcon";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Info } from "lucide-react";

const Step3Form = () => {
  const [formData, setFormData] = useState({});
  interface FormData {
    [key: string]: string;
  }

  interface ChangeEvent {
    target: {
      name: string;
      value: string;
    };
  }

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log(formData);

  return (
    <div className="sm:max-w-4xl mx-auto">
      <h1 className="mt-35 text-[34px] text-default font-bold mb-14">
        Information about travel documents
      </h1>
      <div className="grid sm:grid-cols-2 sm:gap-15 md:gap-0">
        <div className="w-7/8 md:w-4/7">
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">
              Type of travel document: *
            </h2>
            <div className="relative">
              <Select name="TravelDocumentType">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select type</SelectLabel>
                    <SelectItem value="National passport">
                      National passport
                    </SelectItem>
                    <SelectItem value="NID card">NID card</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <InfoIcon />
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">
              Travel document number: *
            </h2>
            <div className="relative">
              <Input name="DocumentNumber" onChange={handleChange} />
              <InfoIcon />
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">
              Country of issue of travel document: *
            </h2>
            <div className="relative">
              <Input
                name="COTD"
                defaultValue="Bangladesh"
                disabled
                onChange={handleChange}
              />
              <InfoIcon />
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">
              Place of issue of travel document: *
            </h2>
            <div className="relative">
              <Input name="POITD" onChange={handleChange} />
              <InfoIcon />
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">
              Date of issue: *
            </h2>
            <div className="relative">
              <Input name="IssueDate" type="date" onChange={handleChange} />
              <InfoIcon />
              <div className="flex items-start gap-2 mt-2">
                <Info className="w-10 text-gray-500" />
                <span className="text-xs">
                  The travel document must have been issued in the last 10 years
                  and must have two consecutive blank pages
                </span>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">
              Valid until: *
            </h2>
            <div className="relative">
              <Input name="ExpiryDate" type="date" onChange={handleChange} />
              <InfoIcon />
              <div className="flex items-start gap-2 mt-2">
                <Info className="w-10 text-gray-500" />
                <span className="text-xs">
                  The travel document must be valid for at least three months
                  after the intended date of departure from the Republic of
                  Serbia
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-6/7 md:w-4/7">
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">
              Do you live in a country other than your country of origin? *
            </h2>
            <div className="relative">
              <Select name="pic" defaultValue="No" disabled>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select</SelectLabel>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <InfoIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3Form;
