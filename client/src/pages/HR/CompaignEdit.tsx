import { useParams } from "react-router-dom";

function CompaignEdit() {
  const { id } = useParams();
  return <>Chỉnh sửa tin tuyển dụng # {id}</>;
}

export default CompaignEdit;
