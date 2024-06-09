import React from 'react';
import Select, { MultiValue, ActionMeta } from 'react-select';
import Option from '../types/Option.type';


interface MultiDropdownProps {
  placeholder: string;
  options: Option[];
  onChange: (newValue: MultiValue<Option>, actionMeta: ActionMeta<Option>) => void;
  defaultValue?: Option[]; // Optional defaultValue prop
}

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  placeholder,
  options,
  onChange,
  defaultValue, // Optional prop
}) => {
  return (
    <Select
      styles={{
        control: (base) => ({
          ...base,
          boxShadow: 'none',
          borderColor: '#6B728064',
          '&:hover': {
            borderColor: 'green',
          },
        }),
        option: (base) => ({
          ...base,
          backgroundColor: 'white',
          '&:hover': {
            backgroundColor: 'lightgrey',
            fontWeight: 'bold',
          },
        }),
        multiValue: (base) => ({
          ...base,
          backgroundColor: '#C4F0D5',
        }),
        multiValueLabel: (base) => ({
          ...base,
          color: 'black',
        }),
        placeholder: (base) => ({
          ...base,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }),
        menu: (base) => ({
          ...base,
          maxHeight: '200px',
          overflowY: 'auto',
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
      defaultValue={defaultValue ? defaultValue : undefined} // Only set defaultValue if provided
      required
    />
  );
};

export default MultiDropdown;
