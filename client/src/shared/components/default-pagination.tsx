import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function DefaultPagination({
  active,
  setActive,
  totalPage,
}: {
  active: number;
  setActive: any;
  totalPage: number;
}) {
  const next = () => {
    if (active === totalPage) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {[...Array(totalPage).keys()].map((i) => {
          return (
            <button
              key={i}
              onClick={() => setActive(i + 1)}
              className={`py-1 px-3 bg-slate-400 ${i + 1 == active ? "bg-[#22C55E] text-white" : "bg-white border border-[#22C55E]"}  rounded-md`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={active === 5}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
