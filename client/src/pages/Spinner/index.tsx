import { Modal } from "@mui/material";

const Spinner = () => {
  console.log("Spinner")
  return (
    <Modal open={true}>
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    </Modal>
  )
};

export default Spinner;