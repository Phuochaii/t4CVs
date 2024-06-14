import JobSuggestionItem from './JobSuggestionItem';

const JobSuggestions = () => {
  return (
    <>
      <div className="w-full px-[170px] bg-white pb-6">
        <div className="pt-6 text-3xl font-bold text-[#00b14f]">
          Gợi ý việc làm phù hợp
        </div>
        <div className="mt-5 items-center justify-between grid grid-cols-2 gap-5">
          <JobSuggestionItem />
          <JobSuggestionItem />
          <JobSuggestionItem />
          <JobSuggestionItem />
        </div>
      </div>
    </>
  );
};

export default JobSuggestions;
