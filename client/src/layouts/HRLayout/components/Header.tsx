import RoundedButton from "./RoundedButton";

function Header() {
  const list_btn = [
    {
      name: "HR Insider",
      link: "",
      icon: "fa-solid fa-bookmark",
    },
    {
      name: "Đăng tin",
      link: "",
      icon: "fa-solid fa-pencil",
    },
    {
      name: "Tìm CV",
      link: "",
      icon: "fa-solid fa-pencil",
    },
    {
      name: "Connect",
      link: "",
      icon: "fa-solid fa-message",
    },

    {
      name: "",
      link: "",
      icon: "fa-solid fa-bell",
      iconSize: "16px",
    },
    {
      name: "Giỏ hàng",
      link: "",
      icon: "fa-solid fa-cart-shopping",
      iconSize: "16px",
      numberNoti: 1,
    },
    {
      name: "",
      link: "",
      icon: "fa-solid fa-caret-down",
      iconSize: "16px",
      image:
        "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg",
    },
  ];
  return (
    <div
      className=" text-white"
      style={{ padding: "16px 20px", backgroundColor: "#212F3F" }}
    >
      <div className="flex items-center">
        <div className="flex items-center flex-grow">
          <i className="fa-solid fa-bars"></i>
          <div
            style={{
              marginLeft: "27px",
              marginRight: "20px",
              marginTop: "4px",
            }}
          >
            <img
              src="https://tuyendung.topcv.vn/app/_nuxt/img/logo_topcv_dark.ee0b56e.png"
              style={{ width: "56px" }}
              alt="logo"
            />
          </div>
        </div>
        <div className="flex items-center">
          {list_btn.map((btn, index) => (
            <RoundedButton
              key={index}
              text={btn.name}
              icon={btn.icon}
              image={btn.image}
              iconSize={btn.iconSize}
              numberNoti={btn.numberNoti}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Header;
