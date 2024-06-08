import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function PositionedMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [value, setValue] = React.useState('7 days');

  return (
    <div>
      <FormControl fullWidth>
        <Select
          id="Position"
          value={value}
          sx={{ backgroundColor: '#DADADA', maxWidth: '100px' }}
          onChange={(e) => {
            setValue(e.target.value);
            setAnchorEl(null);
          }}
          className="mt-2 h-9"
        >
          <MenuItem value={'7 days'}>7 days</MenuItem>
          <MenuItem value={'1 month'}>1 month</MenuItem>
          <MenuItem value={'1 year'}>1 year</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
