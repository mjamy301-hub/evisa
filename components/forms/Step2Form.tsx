"use state";

import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";
import InfoIcon from "../icons/InfoIcon";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Checkbox } from "../ui/checkbox";
import { Application, Role } from "@prisma/client";
import { useMe } from "@/hooks/useMe";

const Step2Form = ({
  form,
  setForm,
  error
}: {
  form: Partial<Application>;
  setForm: Dispatch<SetStateAction<Partial<Application>>>;
  error: Partial<Application>;
}) => {
  const { me } = useMe();

  interface ChangeEvent {
    target: {
      name: string;
      value: string;
    };
  }

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="sm:max-w-4xl mx-auto">
      <h1 className="mt-35 text-[34px] text-default font-bold mb-14">Personal information</h1>
      <div className="grid sm:grid-cols-2 sm:gap-15 md:gap-0">
        <div className="w-7/8 md:w-4/7">
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">Users last name: *</h2>
            <Input
              name="LastName"
              value={form.LastName ?? ""}
              onChange={handleChange}
              disabled={me?.Role !== Role.ADMIN}
            />
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">Last name at birth:</h2>
            <div className="relative">
              <Input
                name="BirthName"
                value={form.BirthName ?? ""}
                onChange={handleChange}
                disabled={me?.Role !== Role.ADMIN}
              />
              <InfoIcon />
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">User first name: *</h2>
            <Input
              name="FirstName"
              value={form.FirstName ?? ""}
              onChange={handleChange}
              disabled={me?.Role !== Role.ADMIN}
            />
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">Gender: *</h2>
            <div className="relative">
              <Select
                name="Gender"
                defaultValue={form.Gender ?? ""}
                onValueChange={(value) => handleChange({ target: { name: "Gender", value } })}
                disabled={me?.Role !== Role.ADMIN}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Gender</SelectLabel>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <InfoIcon />
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">Date of birth: *</h2>
            <Input
              name="DOB"
              type="date"
              value={form.DOB ?? ""}
              onChange={handleChange}
              disabled={me?.Role !== Role.ADMIN}
            />
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">Country of birth: *</h2>
            <div className="relative">
              <Select name="Country" defaultValue={form.Country ?? ""} disabled>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Country</SelectLabel>
                    <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <InfoIcon />
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">Place of birth: *</h2>
            <div className="relative">
              <Input name="POB" value={form.POB ?? ""} onChange={handleChange} disabled={me?.Role !== Role.ADMIN} />
              <InfoIcon />
            </div>
          </div>
        </div>
        <div className="w-6/7 md:w-4/7">
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">Address: *</h2>
            <div className="relative">
              <Input
                name="Address"
                value={form.Address ?? ""}
                onChange={handleChange}
                disabled={me?.Role !== Role.ADMIN}
              />
              <InfoIcon />
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">Telephone: *</h2>
            <div className="relative">
              <Input name="Phone" value={form.Phone ?? ""} onChange={handleChange} disabled={me?.Role !== Role.ADMIN} />
              <InfoIcon />
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">Passport issuing country: *</h2>
            <div className="relative">
              <Select name="PassportIssueCountry" defaultValue={form.PassportIssueCountry ?? "Bangladesh"} disabled>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Country</SelectLabel>
                    <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <InfoIcon />
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">Original citizenship: *</h2>
            <div className="relative">
              <Select name="OriginalCitizenship" defaultValue={form.OriginalCitizenship ?? "Bangladesh"} disabled>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Country</SelectLabel>
                    <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <InfoIcon />
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">Marital status: *</h2>
            <div className="relative">
              <Select
                name="MaritalStatus"
                defaultValue={form.MaritalStatus ?? ""}
                onValueChange={(value) => handleChange({ target: { name: "MaritalStatus", value } })}
                disabled={me?.Role !== Role.ADMIN}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <InfoIcon />
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">Father&apos;s first name:</h2>
            <div className="relative">
              <Input
                name="FathersFirstName"
                value={form.FathersFirstName ?? ""}
                onChange={handleChange}
                disabled={me?.Role !== Role.ADMIN}
              />
              <InfoIcon />
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">Mother&apos;s first name:</h2>
            <div className="relative">
              <Input
                name="MothersFirstName"
                value={form.MothersFirstName ?? ""}
                onChange={handleChange}
                disabled={me?.Role !== Role.ADMIN}
              />
              <InfoIcon />
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">Email address: *</h2>
            <Input name="Email" value={form.Email ?? ""} disabled />
          </div>
        </div>
      </div>
      <h1 className="mt-25 text-[34px] text-default font-bold mb-14">Family data</h1>
      <div className="flex items-center gap-5 mb-6">
        <Checkbox className="h-6 w-6 border-default disabled:border-default disabled:cursor-pointer" disabled />
        <label htmlFor="vehicle1" className="font-semibold text-sm cursor-pointer">
          Do you have a family?
        </label>
      </div>
      <div className="flex items-center gap-5">
        <Checkbox className="h-6 w-6 border-default disabled:border-default disabled:cursor-pointer" disabled />
        <label htmlFor="vehicle2" className="font-semibold text-sm cursor-pointer">
          Do you have children?
        </label>
      </div>
      <h1 className="mt-25 text-[34px] text-default font-bold mb-14">Employment information</h1>
      <div className="grid sm:grid-cols-2 sm:gap-15 md:gap-0">
        <div className="w-7/8 md:w-4/7">
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">Current profession:</h2>
            <div className="relative">
              <Input name="currentProfession" disabled onChange={handleChange} />
              <InfoIcon />
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">Employer&apos;s company:</h2>
            <div className="relative">
              <Input name="company" disabled onChange={handleChange} />
              <InfoIcon />
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">Employer&apos;s address:</h2>
            <div className="relative">
              <Input name="employeeAddress" disabled onChange={handleChange} />
              <InfoIcon />
            </div>
          </div>
          <div>
            <h2 className="text-sm font-medium text-default mb-2">Employer&apos;s telephone number:</h2>
            <div className="relative">
              <Input name="employeePhone" disabled onChange={handleChange} />
              <InfoIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2Form;
