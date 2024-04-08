import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder: string;
}

function SearchBar({ placeholder }: SearchBarProps) {
  return (
    <div className="relative bg-gradient-to-r flex-1 from-pink-500 to-purple-500 p-4 rounded-[1.5rem] px-[2px] py-[2px] flex items-center">
      <Search className="absolute text-slate-400 left-2" />
      <textarea
        rows={1}
        placeholder={placeholder}
        className="w-full h-full border-none resize-none active:border-none focus:border-none active:outline-none focus:outline-none rounded-[1.5rem] px-12 py-2"
      ></textarea>
    </div>
  );
}

export default SearchBar;
