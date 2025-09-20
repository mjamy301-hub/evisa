import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const Step6Form = () => {
  return (
    <div>
      <h2 className="text-sm font-medium text-default mb-4">Content: *</h2>
      <div className="flex items-start gap-3">
        <Checkbox
          id="terms"
          disabled
          checked
          className="w-6 h-6 data-[state=checked]:bg-[#4a90e2] rounded disabled:cursor-default"
        />
        <label htmlFor="terms" className="text-sm font-semibold">
          Under full responsible publication that the stated data are true and
          entered correctly, as well as that the attached documentation is
          valid. I agree that my personal data may be processed and that field
          checks and checks of all data being of importance in procedure of
          temporary residence approval may be performed. I confirm that stated
          email address is correct and give my consent to the superior authority
          for delivery of notification and decision attached to my e-mail
          address. I agree to actively trace email and status under submitted
          request and promptly download the sent documentation and procedures
          according to the same. Date of document delivery is considered the
          date when the competent authority sent the notification by name. I am
          aware that due to incomplete and inaccurate data the request may be
          denied / rejected. This statement is irrevocable and the beginning of
          giving this consent entered data may not be changed.
        </label>
      </div>
    </div>
  );
};

export default Step6Form;
