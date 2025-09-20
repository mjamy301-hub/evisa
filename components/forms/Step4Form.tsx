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
import { Application, Role } from "@prisma/client";
import { useMe } from "@/hooks/useMe";

const Step4Form = ({
  form,
  setForm,
  error
}: {
  form: Partial<Application>;
  setForm: Dispatch<SetStateAction<Partial<Application>>>;
  error: object;
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
      <h1 className="mt-35 text-[34px] text-default font-bold mb-14 sm:w-lg">
        Information about the visa for which you apply
      </h1>
      <div className="grid sm:grid-cols-2 sm:gap-15 md:gap-0">
        <div className="w-7/8 md:w-4/7">
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">
              Diplomatic and Consular Representation Office of the Republic of Serbia in: *
            </h2>
            <div className="relative">
              <Select name="diplomatic" defaultValue="NEW DELHI" disabled>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Gender</SelectLabel>
                    <SelectItem value="NEW DELHI">NEW DELHI</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <InfoIcon />
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">Visa type:</h2>
            <Input name="birthName" defaultValue="Visa D - long stay" disabled />
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">Travel purpose:</h2>
            <Input
              name="travelPurpose"
              defaultValue="Employment  - Employment on the grounds of an employment contract or another contract exercising workplace rights"
              disabled
            />
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">Number of days of stay: *</h2>
            <div className="relative">
              <Input name="stayDay" defaultValue="180" disabled />
              <InfoIcon />
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">Other visas issued in the previous three years: *</h2>
            <div className="relative">
              <Select name="cob" defaultValue="No" disabled>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Country</SelectLabel>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <InfoIcon />
            </div>
          </div>
        </div>
        <div className="w-6/7 md:w-4/7">
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">Date of arrival in the Republic of Serbia: *</h2>
            <div className="relative">
              <Input
                name="ArrivalDate"
                type="date"
                value={form.ArrivalDate ?? ""}
                onChange={handleChange}
                disabled={me?.Role !== Role.ADMIN}
              />
              <InfoIcon />
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">Date of departure from the Republic of Serbia: *</h2>
            <div className="relative">
              <Input
                name="DepartureDate"
                type="date"
                value={form.DepartureDate ?? ""}
                onChange={handleChange}
                disabled={me?.Role !== Role.ADMIN}
              />
              <InfoIcon />
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">Border crossing: *</h2>
            <div className="relative">
              <Select name="borderCrossing" defaultValue="BEOGRAD - REČNI" disabled>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Country</SelectLabel>
                    <SelectItem value="BEOGRAD - REČNI">BEOGRAD - REČNI</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <InfoIcon />
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">Means of transport:</h2>
            <div className="relative">
              <Input name="email" defaultValue="AIRPLANE" disabled />
              <InfoIcon />
            </div>
          </div>
        </div>
      </div>
      <h1 className="mt-25 text-[34px] text-default font-bold mb-14 sm:w-xl">
        Information on previous stay in the Republic of Serbia
      </h1>
      <div className="mb-6">
        <h2 className="text-sm font-medium text-default mb-2">Other visas issued in the previous three years: *</h2>
        <div className="relative max-w-[250px]">
          <Select name="cob" defaultValue="No" disabled>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Country</SelectLabel>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <InfoIcon />
        </div>
      </div>
      <h1 className="mt-25 text-[34px] text-default font-bold mb-14 sm:w-2xl">
        Data on intended (future) residence in the Republic of Serbia
      </h1>
      <div className="grid sm:grid-cols-2 sm:gap-15 md:gap-0">
        <div className="w-7/8 md:w-4/7">
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">Name of your host: *</h2>
            <div className="relative">
              <Input
                name="HostName"
                value={form.HostName ?? ""}
                onChange={handleChange}
                disabled={me?.Role !== Role.ADMIN}
              />
              <InfoIcon />
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">Host&apos;s telephone number:</h2>
            <div className="relative">
              <Input
                name="HostPhone"
                type="number"
                value={form.HostPhone ?? ""}
                onChange={handleChange}
                disabled={me?.Role !== Role.ADMIN}
              />
              <InfoIcon />
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">Host&apos;s address:</h2>
            <div className="relative">
              <Input
                name="HostAddress"
                value={form.HostAddress ?? ""}
                onChange={handleChange}
                disabled={me?.Role !== Role.ADMIN}
              />
              <InfoIcon />
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">Host&apos;s e-mail address:</h2>
            <div className="relative">
              <Input
                name="HostEmail"
                value={form.HostName ?? ""}
                onChange={handleChange}
                disabled={me?.Role !== Role.ADMIN}
              />
              <InfoIcon />
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">Municipality:</h2>
            <div className="relative">
              <Select
                name="Municipality"
                defaultValue={form.Municipality ?? ""}
                onValueChange={(value) => handleChange({ target: { name: "Municipality", value } })}
                disabled={me?.Role !== Role.ADMIN}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select</SelectLabel>
                    <SelectItem value="FUTOG">FUTOG</SelectItem>
                    <SelectItem value="LEDINCI">LEDINCI</SelectItem>
                    <SelectItem value="NOVI SAD">NOVI SAD</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <InfoIcon />
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">Settlement:</h2>
            <div className="relative">
              <Select
                name="Settlement"
                defaultValue={form.Settlement ?? ""}
                onValueChange={(value) => handleChange({ target: { name: "Settlement", value } })}
                disabled={me?.Role !== Role.ADMIN}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select</SelectLabel>
                    <SelectItem value="FUTOG">FUTOG</SelectItem>
                    <SelectItem value="LEDINCI">LEDINCI</SelectItem>
                    <SelectItem value="NOVI SAD">NOVI SAD</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <InfoIcon />
            </div>
          </div>
        </div>
        <div className="w-7/8 md:w-4/7">
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">Street:</h2>
            <div className="relative">
              <Select
                name="Street"
                defaultValue={form.Street ?? ""}
                onValueChange={(value) => handleChange({ target: { name: "Street", value } })}
                disabled={me?.Role !== Role.ADMIN}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select</SelectLabel>
                    <SelectItem value="1300 KAPLARA">1300 KAPLARA</SelectItem>
                    <SelectItem value="9. MAJA">9. MAJA</SelectItem>
                    <SelectItem value="9.MAJA">9.MAJA</SelectItem>
                    <SelectItem value="HILANDARSKA">HILANDARSKA</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <InfoIcon />
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">House number:</h2>
            <div className="relative">
              <Select
                name="HouseNumber"
                defaultValue={form.houseNumber ?? ""}
                onValueChange={(value) => handleChange({ target: { name: "HouseNumber", value } })}
                disabled={me?.Role !== Role.ADMIN}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select</SelectLabel>
                    <SelectItem value="001">001</SelectItem>
                    <SelectItem value="001A">001A</SelectItem>
                    <SelectItem value="002">002</SelectItem>
                    <SelectItem value="002A">002A</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <InfoIcon />
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">Entrance:</h2>
            <div className="relative">
              <Input name="entrance" disabled />
              <InfoIcon />
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">Floor:</h2>
            <div className="relative">
              <Input name="floor" disabled />
              <InfoIcon />
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">Apartment:</h2>
            <div className="relative">
              <Input name="apartment" disabled />
              <InfoIcon />
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">Who is covering your travel costs? *</h2>
            <div className="relative">
              <Select name="houseNumber" defaultValue="Host company" disabled>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select</SelectLabel>
                    <SelectItem value="Host company">Host company</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <InfoIcon />
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-default mb-2">Financial resources for living expenses: *</h2>
            <div className="relative">
              <Select name="houseNumber" defaultValue="Accommodation" disabled>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select</SelectLabel>
                    <SelectItem value="Accommodation">Accommodation</SelectItem>
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

export default Step4Form;
