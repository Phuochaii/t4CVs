import {
  RefreshCcw,
  PlusCircle,
  BookOpen,
  HelpCircle,
  Briefcase,
} from "lucide-react";

import { Resume } from "../../shared/components/ResumeBuilder/Resume";
import { ResumeForm } from "../../shared/components/ResumeBuilder/ResumeForm";
import { useAppSelector } from "../../utils/redux/hooks";
import { selectSettings } from "../../utils/redux/settingsSlice";

import {
  useRegisterReactPDFFont,
  useRegisterReactPDFHypenationCallback,
} from "../../shared/components/ResumeBuilder/fonts/hooks";

function CreateCV() {
  const settings = useAppSelector(selectSettings);

  useRegisterReactPDFFont();
  useRegisterReactPDFHypenationCallback(settings.fontFamily);

  return (
    <div className="flex flex-col w-full h-full">
      {/*Create CV header*/}

      <div className="bg-gray-200 flex flex-row justify-between">
        <div className="flex flex-col mt-2 p-4">
          <div className="flex flex-row justify-center items-start">
            <div className="flex flex-col mr-2">
              <button className="flex flex-col items-center justify-center border border-green-500 bg-white text-green-500 px-4 py-2 rounded-lg hover:bg-green-500 hover:text-white transition duration-300 w-24 mb-2 text-sm">
                <RefreshCcw size={24} className="mb-2" />
                Đổi mẫu CV
              </button>
              <button className="flex flex-col items-center justify-center border border-green-500 bg-white text-green-500 px-4 py-2 rounded-lg hover:bg-green-500 hover:text-white transition duration-300 w-24 mb-2 text-sm">
                <PlusCircle size={24} className="mb-2" />
                Thêm mục
              </button>
              <button className="flex flex-col items-center justify-center border border-green-500 bg-white text-green-500 px-4 py-2 rounded-lg hover:bg-green-500 hover:text-white transition duration-300 w-24 mb-2 text-sm">
                <BookOpen size={24} className="mb-2" />
                Thư viện CV theo ngành nghề
              </button>
              <button className="flex flex-col items-center justify-center border border-green-500 bg-white text-green-500 px-4 py-2 rounded-lg hover:bg-green-500 hover:text-white transition duration-300 w-24 mb-2 text-sm">
                <HelpCircle size={24} className="mb-2" />
                Hướng dẫn viết CV
              </button>
              <button className="flex flex-col items-center justify-center border border-green-500 bg-white text-green-500 px-4 py-2 rounded-lg hover:bg-green-500 hover:text-white transition duration-300 w-24 mb-2 text-sm">
                <Briefcase size={24} className="mb-2" />
                Việc làm phù hợp với CV
              </button>
            </div>

            <div className="flex flex-col">
              <ResumeForm />
            </div>
          </div>
        </div>
        <div className="fixed top-20 right-20">
          <Resume />
        </div>
      </div>
    </div>
  );
}

export default CreateCV;
