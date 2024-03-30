import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { Upload } from "lucide-react";
import "tailwindcss/tailwind.css";

function FileUpload() {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    console.log(acceptedFiles.map((file) => file.name));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Box
        {...getRootProps()}
        sx={{
          height: 300,
          width: 300,
          bgcolor: "background.paper",
          borderRadius: 1,
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <input {...getInputProps()} />
        <Upload size={48} />
        {isDragActive ? (
          <p>Kéo và thả tệp vào đây ...</p>
        ) : (
          <p>Thả tệp của bạn vào đây, hoặc nhấp để chọn tệp</p>
        )}
        <Button variant="contained">Tải lên</Button>
        {files.map((file, index) => (
          <p key={index}>{file.name}</p>
        ))}
      </Box>
    </div>
  );
}

export default FileUpload;
