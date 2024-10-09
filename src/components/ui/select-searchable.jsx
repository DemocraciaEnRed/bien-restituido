import React, { useState } from "react";

const SearchableSelect = ({ options, onChange, ...props }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // Filtra y limita las opciones a las primeras 20
  const filteredOptions = options
    .filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 20);

  const handleOptionClick = (option) => {
    setSelectedOption(option.value);
    const event = { target: { ...option } };
    onChange(event);
    setIsOpen(false);
  };

  return (
    <>
      <input
        type="text"
        value={selectedOption || searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsOpen(true)}
        placeholder="Selecciona una opción"
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />
      <div className=" relative">
        {isOpen && (
          <ul className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded shadow-md max-h-80 overflow-y-auto z-10">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={index}
                  onClick={(e) =>
                    handleOptionClick({ name: props.name, value: option })
                  }
                  className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white"
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No hay opciones</li>
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default SearchableSelect;
