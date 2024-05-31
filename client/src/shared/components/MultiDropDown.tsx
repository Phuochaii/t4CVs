import Select from 'react-select';

const MultiDropdown = ({ placeholder, options, onChange }: { placeholder: string, options: any, onChange: any }) => {
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
                option: (base) => ({
                    ...base,
                    backgroundColor: "white",
                    "&:hover": {
                        backgroundColor: "lightgrey",
                        fontWeight: "bold",
                    },
                }),
                multiValue: (base) => ({
                    ...base,
                    backgroundColor: "#C4F0D5",
                }),
                multiValueLabel: (base) => ({
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
                    maxHeight: "200px", // Set maximum height for the dropdown menu
                    overflowY: "auto",
                }),
            }}
            isClearable
            isMulti
            placeholder={placeholder}
            name="cities"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={onChange}
            required
        />
    );
};

export default MultiDropdown;