import { Button } from '@material-tailwind/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';

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
    <div className="flex items-center gap-4 text-black">
      <Button
        className="flex items-center bg-slate-200 px-3"
        onClick={prev}
        disabled={active === 1}
      >
        <ChevronLeftIcon strokeWidth={2} className="w-4 h-4 text-slate-900" />
      </Button>
      <div className="flex items-center gap-2">
        {[...Array(totalPage).keys()].map((i) => {
          return (
            <button
              key={i}
              onClick={() => setActive(i + 1)}
              className={`py-1 px-3 bg-green-500 ${
                i + 1 == active
                  ? 'bg-[#22C55E] text-white'
                  : 'bg-white border border-[#22C55E]'
              }  rounded-md`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
      <Button
        className="flex items-center bg-slate-200 px-3"
        onClick={next}
        disabled={active === 5}
      >
        <ChevronRightIcon strokeWidth={2} className="w-4 h-4 text-slate-900" />
      </Button>
    </div>
  );
}
