import { useNavigate } from "react-router-dom";
function HRInit() {
  const navigation = useNavigate();

  return (
    <>
      <div className="list-none flex items-center">
        <li>
          <button
            onClick={() => {
              navigation("/hr-login");
            }}
            className="py-2 px-4 rounded-md mx-2 border border-[#00A74B] hover:border-green-800 bg-white"
          >
            Đăng nhập
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              navigation("/hr-signup");
            }}
            className="py-2 px-4 rounded-md mx-2 bg-[#00A74B] hover:bg-green-800 text-white"
          >
            Đăng kí
          </button>
        </li>
      </div>
    </>
  );
}

export default HRInit;
