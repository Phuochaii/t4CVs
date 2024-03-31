import { useState } from "react";
import InformationForm from "./InfomationForm";
import UserInfor from "./UserInfor";

const Module = () => {
  const [userInfo, setUserInfo] = useState({ fullname: "", email: "" });
  return (
    <div className="flex flex-col items-center">
      <h1>Demo Module</h1>
      <InformationForm
        onSubmit={(fullname, email) => setUserInfo({ fullname, email })}
      />
      <UserInfor user={userInfo} />
    </div>
  );
};
export default Module;
