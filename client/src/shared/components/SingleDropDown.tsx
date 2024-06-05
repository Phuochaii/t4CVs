import React, { useEffect } from 'react';
import Select from 'react-select';
import Option from '../types/Option.type';

interface SingleDropdownProps {
  placeholder: string;
  options: Option[];
  onChange: (selectedOption: Option | null) => void;
  defaultValue?: Option; // Optional defaultValue prop
}
const SingleDropdown: React.FC<SingleDropdownProps> = ({
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
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isSelected ? 'lightgrey' : 'white',
          color: 'black',
          '&:hover': {
            backgroundColor: 'lightgrey',
            fontWeight: 'bold',
            color: 'black',
          },
        }),
        singleValue: (base) => ({
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
      placeholder={placeholder}
      options={options}
      onChange={onChange}
      defaultValue={defaultValue}
      required
    />
  );
};

export default SingleDropdown;
