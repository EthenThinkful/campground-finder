"use client";
import { useState } from "react";
import campgroundInfo from "../app/assets/campgroundInfo.json";
const BASEURL = `https://www.reserveamerica.com/camping`;

type SimpleFormProps = {
  onSubmit: (inputValue: string) => void;
};

interface Campground {
  FacilityName: string;
  // Add other properties if applicable
}

// Retrieve campground names from campgroundInfo.json
let names: string[] = (campgroundInfo as Campground[]).map((c) => c.FacilityName);
(campgroundInfo as Campground[]).map((c) => c.FacilityName.toLowerCase() === "old cedar campground" ? console.log(c) : null)


const SimpleForm: React.FC<SimpleFormProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setError("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputValue.trim() === "") {
      setError("Input cannot be empty.");
      return;
    }

    onSubmit(inputValue);
    setInputValue("");
  };

  return (
    <div className="bg-gray-100 p-8 rounded-md shadow-md">
      <form onSubmit={handleSubmit}>
        <label className="block mb-4 text-lg font-medium text-gray-800">
          Input:
          <input
            type="text"
            className="w-full px-4 py-2 mt-1 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={inputValue}
            onChange={handleInputChange}
          />
        </label>
        <div className="drop__down text-xs mb-2 mt-3 text-zinc-700">
          {names
            .filter((item) => {
              const searchTerm = inputValue.toLocaleLowerCase();
              const fullName = item.toLocaleLowerCase();
              return (
                searchTerm &&
                fullName.startsWith(searchTerm) &&
                fullName !== searchTerm
              );
            })
            .slice(0, 10)
            .map((item) => (
              <div
                onClick={() => setInputValue(item.toLocaleLowerCase())}
                key={item}
                className="cursor-pointer p-2"
              >
                {item}
              </div>
            ))}
        </div>
        <button
          type="submit"
          className="px-6 py-2 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Submit
        </button>
      </form>
      {error && <p className="mt-2 text-red-600">{error}</p>}
    </div>
  );
};

export default SimpleForm;
