import React from "react";
import "./addressForm.css";

interface AddressFormProps {
  getData?: Function;
}

const AddressForm: React.FC<AddressFormProps> = () => {
  return (
    <div className="address-form">
      <span>New address...</span>
      <input type="text" placeholder="city..." />
      <input type="text" placeholder="street..." />
      <input type="text" placeholder="building..." />
      <input type="text" placeholder="postal code..." />
      <input type="text" placeholder="phone number..." />
    </div>
  );
};

export default AddressForm;
