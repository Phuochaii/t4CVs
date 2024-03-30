import { Box, Button, TextField } from "@mui/material";

import { useState } from "react";

interface InformationFormProps {
  onSubmit: (fullname: string, email: string) => void;
}

const InformationForm = ({ onSubmit }: InformationFormProps) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");

  return (
    <Box className="flex flex-col justify-center items-center">
      <h1>Information Form</h1>
      <div className="flex flex-col p-2 space-y-4">
        <TextField
          id="fullname"
          label="Full Name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        <TextField
          id="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <Button
        className="m max-w-sm content-center"
        id="submit"
        variant="contained"
        color="primary"
        onClick={() => onSubmit(fullname, email)}
      >
        Submit
      </Button>
    </Box>
  );
};

export default InformationForm;
