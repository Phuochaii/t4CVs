import React, { useState, useRef, useEffect } from "react";

function CustomSelectOption({
  label,
  list = [],
  onClick = () => {},
}: {
  label: string;
  list?: { title: string; value: string }[];
  onClick?: (e: any) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        id="dropdownHoverButton"
        className="bg-white border border-gray-200  px-3 "
        type="button"
        style={{ color: "#BBBFC3", marginLeft: "16px", minWidth: "170px" }}
        onClick={handleToggle}
      >
        {label}
        <i className="fas fa-caret-down ml-4"></i>
      </button>
      {isOpen && (
        <ul className="absolute bg-white" style={{ width: "100%" }}>
          {list.map((item, index) => (
            <li key={index} className="px-2 py-0.5 font-normal">
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomSelectOption;
