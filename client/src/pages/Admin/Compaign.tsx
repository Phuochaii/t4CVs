// thuc

import { useState } from "react";
import SearchBar from "../../layouts/AdminLayout/components/SearchBar";
import { MoreHorizontal } from "lucide-react";

const columns = [
  "Status",
  "Company Name",
  "Experience Level",
  "Job",
  "Action",
];

function Compaign() {
  const [openDialog, setOpenDialog] = useState(-1);
  const [mockUsers, setMockUsers] = useState([
    {
      status: "accepted",
      imageUrl:
        "https://images.unsplash.com/photo-1711580377289-eecd23d00370",
      companyName: "Meta",
      experienceLevel: "Junior",
      job: "Quality Assurance",
    },
    {
      status: "declined",
      imageUrl:
        "https://images.unsplash.com/photo-1711580377289-eecd23d00370",
      companyName: "Apple",
      experienceLevel: "Senior",
      job: "Software Engineer",
    },
    {
      status: "pending",
      imageUrl:
        "https://images.unsplash.com/photo-1711580377289-eecd23d00370",
      companyName: "Netflix",
      experienceLevel: "Mid-level",
      job: "Software Tester",
    },
  ]);

  return (
    <div
      className="z-0 w-[88%] px-10 py-4 bg-slate-100"
      onClick={(event) => {
        event.preventDefault();
        setOpenDialog(-1);
      }}
    >
      <div className="flex justify-between w-full gap-12 my-4">
        <h1 className="text-2xl font-bold text-slate-500">
          Compaign
        </h1>
        <div className="">
          <SearchBar placeholder="Search Compaign" />
        </div>
      </div>

      {/* Table */}
      <table className="flex flex-col w-full gap-10 px-10 py-12 bg-white border-slate-500 rounded-2xl">
        <thead className="w-full">
          <tr className="flex text-center justify-evenly">
            {columns.map((item, index) => {
              return (
                <td
                  key={"header-" + index}
                  className="flex items-center justify-center w-1/5 p-12 font-bold text-slate-500"
                >
                  {item}
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody className="flex flex-col w-full gap-10 bg-white border-slate-500 rounded-2xl">
          {mockUsers.map((user, index) => {
            return (
              <tr
                className="flex items-center py-4 justify-evenly text-slate-500 border-slate-300 rounded-[24rem] border"
                key={"row-" + index}
              >
                <td
                  className={`flex justify-center  capitalize font-bold text-white w-1/5`}
                >
                  <span
                    className={`rounded-[24rem] px-4 py-2 ${
                      user.status === "accepted"
                        ? "bg-green-500"
                        : user.status === "pending"
                        ? "bg-gradient-to-b from-green-500 to-blue-500"
                        : "bg-red-500"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="flex items-center justify-center w-1/5 gap-6">
                  <img
                    src={user.imageUrl}
                    alt="User image"
                    className="object-cover object-left-top w-16 h-16 rounded-[24rem]"
                  />
                  {user.companyName}
                </td>
                <td className="flex justify-center w-1/5">
                  {user.experienceLevel}
                </td>
                <td className="flex justify-center w-1/5">
                  {user.job}
                </td>
                <td className="relative flex justify-center w-1/5">
                  <MoreHorizontal
                    className="hover:bg-slate-400 rounded-[24rem] hover:text-white hover:cursor-pointer"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      setOpenDialog(index);
                    }}
                  />
                  {openDialog === index && (
                    <div className="absolute flex flex-col translate-x-16 translate-y-2 bg-white">
                      <div
                        className="flex items-center justify-center px-4 py-2 border-t border-l border-r rounded-t-lg hover:bg-gradient-to-r from-blue-500 to-green-500 hover:text-white"
                        onClick={() => {
                          const newUser = {
                            ...user,
                            status: "accepted",
                          };
                          const newMockUsers = [...mockUsers];
                          newMockUsers[index] = newUser;
                          setMockUsers(newMockUsers);
                        }}
                      >
                        Accept
                      </div>
                      <div
                        className="flex items-center justify-center px-4 py-2 border-b border-l border-r rounded-b-lg hover:bg-gradient-to-r from-blue-500 to-green-500 hover:text-white"
                        onClick={() => {
                          const newUser = {
                            ...user,
                            status: "declined",
                          };
                          const newMockUsers = [...mockUsers];
                          newMockUsers[index] = newUser;
                          setMockUsers(newMockUsers);
                        }}
                      >
                        Decline
                      </div>
                      <div className="flex flex-col items-center justify-center py-2 border rounded-xl border-slate-200 hover:bg-gradient-to-r from-blue-500 to-green-500 hover:text-white">
                        Details
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Compaign;
