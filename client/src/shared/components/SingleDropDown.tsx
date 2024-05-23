import Select from 'react-select';

const SingleDropdown = ({ placeholder, options, onChange }:{ placeholder:string, options: any, onChange: any }) => {
  return (
    <Select
      styles={{
        control: (base) => ({
          ...base,
          boxShadow: "none",
          borderColor: "#6B728064",
          "&:hover": {
            borderColor: "green",
          },
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isSelected ? "lightgrey" : "white",
          color: "black",
          "&:hover": {
            backgroundColor: "lightgrey",
            fontWeight: "bold",
            color: "black",
          },
        }),
        singleValue: (base) => ({
          ...base,
          color: "black",
        }),
        placeholder: (base) => ({
          ...base,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }),
        menu: (base) => ({
          ...base,
          maxHeight: "200px",
          overflowY: "auto",
        }),
      }}
      isClearable
      placeholder={placeholder}
      options={options}
      onChange={onChange}
      required
    />
  );
};

export default SingleDropdown;