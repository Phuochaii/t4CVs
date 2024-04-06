import '../../../App.css';

function Header() {
  return (
    <header className="top-menu">
      <div className="container">
        <div className="logo">
          logo
        </div>
        <nav className="nav-menu">
          <ul>
            <li><a href="#">Tìm Việc</a></li>
            <li><a href="#">Ứng Viên</a></li>
            <li><a href="#">Doanh Nghiệp</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Giới Thiệu</a></li>
            <li><a href="#">Liên Hệ</a></li>
          </ul>
        </nav>
        <div className="user-actions">
          <a href="#">Đăng Nhập</a>
          <a href="#">Đăng Ký</a>
        </div>
      </div>
    </header>
  )
}

export default Header;
