// thuc

import SearchBar from "../../layouts/AdminLayout/components/SearchBar";

function Compaign() {
  return (
    <div className="w-full p-4">
      <div className="flex justify-between w-full gap-12">
        <h1 className="text-2xl font-bold text-slate-500">
          Compaign
        </h1>
        <div className="w-[24%]">
          <SearchBar placeholder="Search Compaign" />
        </div>
      </div>
    </div>
  );
}

export default Compaign;
