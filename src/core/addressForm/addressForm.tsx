import React, { useState } from "react";
import Address from "../../models/address";
import "./addressForm.css";

interface AddressFormProps {
  saveData?(adress: Address): void;
}

const AddressForm: React.FC<AddressFormProps> = ({ saveData }) => {
  const [city, setCity] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [building, setBuilding] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  //TODO: field validation

  return (
    <div className="address-form">
      <span>New address...</span>
      <input
        type="text"
        placeholder="city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        type="text"
        placeholder="street..."
        value={street}
        onChange={(e) => setStreet(e.target.value)}
      />
      <input
        type="text"
        placeholder="building..."
        value={building}
        onChange={(e) => setBuilding(e.target.value)}
      />
      <input
        type="text"
        placeholder="postal code..."
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
      />
      <input
        type="text"
        placeholder="phone number..."
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      {saveData && (
        <button
          onClick={() =>
            saveData({
              city,
              street,
              building,
              postalCode,
              phoneNumber,
            })
          }
        >
          Save
        </button>
      )}
    </div>
  );
};

export default AddressForm;
