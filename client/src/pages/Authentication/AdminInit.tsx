import { useNavigate } from "react-router-dom";
function AdminInit() {
  const navigation = useNavigate();

  return (
    <>
      <div className="list-none flex items-center">
        <li>
          <button
            onClick={() => {
              navigation("/admin-login");
            }}
            className="py-2 px-4 rounded-md mx-2 border border-[#00A74B] hover:border-green-800 bg-white"
          >
            Đăng nhập
          </button>
        </li>
      </div>
    </>
  );
}

export default AdminInit;
