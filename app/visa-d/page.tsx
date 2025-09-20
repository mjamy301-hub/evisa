"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Step1Form from "@/components/forms/Step1Form";
import Step2Form from "@/components/forms/Step2Form";

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

export default function VisaD() {
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

  const goToStep = (stepNumber: number) => {
    if (stepNumber <= currentStep || stepNumber === currentStep + 1) {
      setCurrentStep(stepNumber);
    }
  };

  return (
    <div className="container mx-auto px-5 pt-10 pb-27.5">
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
              <div className="mt-4 h-30 hidden sm:block">
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

      <div className="px-20">
        {currentStep === 1 && <Step1Form />}{" "}
        {currentStep === 2 && <Step2Form />}
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
        >
          Next step
        </Button>
      </div>
    </div>
  );
}
