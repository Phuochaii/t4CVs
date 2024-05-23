import * as React from "react";
import * as HRModule from "../../../../../../modules/hr-module";
import { DefaultPagination } from "../../../../../../shared/components/default-pagination";
import ReceivedCVTable from "../../../../../../shared/components/ReceivedCVTable";

function Tab1({ compaignId, hrId }: { compaignId: string; hrId: string }) {
  const [listCV, setListCV] = React.useState([]);
  const [statusMode, setStatusMode] = React.useState<boolean | undefined>(
    undefined
  );
  const [page, setPage] = React.useState<number>(1);
  const [totalPage, setTotalPage] = React.useState<number>(1);

  const fetchApplication = async () => {
    HRModule.getApplicationByCampaignIdHRId({
      campaignId: compaignId,
      hrId: hrId,
      status: statusMode,
      page: page,
    }).then((res) => {
      console.log(res);
      setListCV(res.applications || []);
      setTotalPage(res.totalPage);
    });
  };

  React.useEffect(() => {
    fetchApplication();
  }, []);
  React.useEffect(() => {
    fetchApplication();
  }, [statusMode, page]);
  return (
    <div>
      <div className="flex justify-end px-4">
        <label className="mr-3">
          <input
            className="mr-2 "
            type="radio"
            defaultChecked
            name="read-mode"
            style={{ transform: "translateY(2px)" }}
            onClick={() => setStatusMode(undefined)}
          />
          Hiển thị tất cả CV
        </label>
        <label>
          <input
            className="mr-2"
            type="radio"
            name="read-mode"
            style={{ transform: "translateY(2px)" }}
            onClick={() => setStatusMode(false)}
          />
          Chỉ hiện thị CV chưa xem
        </label>
      </div>
      {listCV.length == 0 ? (
        <div className="flex justify-center items-center flex-col p-5">
          <img src="https://tuyendung.topcv.vn/app/_nuxt/img/empty.73d75f4.png" />
          Bạn không có CV
        </div>
      ) : (
        <div className="p-5">
          <ReceivedCVTable data={listCV} hasCampaignColumn={false} />
          <div className="flex justify-center mt-5">
            <DefaultPagination
              totalPage={totalPage}
              active={page}
              setActive={setPage}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Tab1;
