"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check } from "lucide-react";

const steps = [
  { id: 1, title: "Travel purpose" },
  {
    id: 2,
    title: "Personal data",
  },
  { id: 3, title: "Travel documents" },
  { id: 4, title: "Visa information" },
  { id: 5, title: "Add documents" },
  { id: 6, title: "Fees" },
];

const VisaC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-5 pt-10 pb-27.5">
      <h1 className="text-default text-5xl text-center font-bold mb-20">
        Application for visa type D
      </h1>
      <div>
        <div className="flex items-center justify-between mb-10 max-w-2xl mx-auto relative sm:left-10">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col flex-1">
              <p className="text-sm font-medium text-gray-600 mb-2.5 ml-2 sm:-ml-2 flex gap-2">
                <span className="hidden sm:block">Step</span>
                {`${step.id}`}
              </p>
              <div className="flex items-center w-full h-12">
                <div
                  className={`w-[28px] h-[28px] rounded-full flex items-center justify-center transition-all duration-200 ${
                    step.id === currentStep
                      ? "bg-[#4a90e2] text-white w-[36px] h-[36px]"
                      : step.id < currentStep
                      ? "bg-[#253956] text-white"
                      : "bg-white border-4 border-[#4a90e2]"
                  }`}
                >
                  {step.id < currentStep && (
                    <Check className="w-4 text-blue-500" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 transition-all duration-200 bg-[#4a90e2]`}
                  />
                )}
              </div>
              {/* Step Label */}
              <div className="mt-4 h-20 hidden sm:block">
                <p
                  className={`text-sm text-center -ms-10 w-25 mt-1 font-semibold ${
                    step.id === currentStep ? "text-default" : "text-gray-500"
                  }`}
                >
                  {step.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="md:px-20">
        <div>
          <h1 className="mt-35 text-[34px] text-default font-bold mb-14">
            Travel purpose
          </h1>
          <div>
            <h2 className="text-sm font-medium text-foreground mb-2">
              Travel purpose *
            </h2>
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
          </div>
        </div>
        <p className="mt-25 mb-15 text-sm text-default">
          All fields marked with * are mandatory
        </p>
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          {currentStep > 1 && (
            <Button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="h-[44px] font-bold"
            >
              Previous step
            </Button>
          )}

          <Button
            onClick={nextStep}
            // disabled={currentStep === steps.length}
            className="h-[44px] ms-auto font-bold"
            disabled
          >
            Next step
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VisaC;
