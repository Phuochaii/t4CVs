import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormControlLabel, Checkbox, Button, TextField, InputAdornment } from '@mui/material';
import { User, Mail, ShieldCheck } from 'lucide-react';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function UserSignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showGuide, setShowGuide] = useState(false);
    const [socialAgree, setSocialAgree] = useState(false);

    const handleSignUp = (e) => {
        e.preventDefault(); // Ngăn chặn việc tải lại trang khi nhấn nút submit
        // Kiểm tra các trường có dữ liệu đầy đủ không
        if (!formData.agreeToTerms || !formData.name || !formData.email || !formData.password || !formData.confirmPassword || (formData.password !== formData.confirmPassword)) {
            alert("Vui lòng điền đầy đủ thông tin và đồng ý với điều khoản dịch vụ và chính sách bảo mật.");
            return;
        }
        // Lưu thông tin tài khoản vào Local Storage hoặc gửi đến server
        localStorage.setItem('user', JSON.stringify(formData));
        console.log('Đăng ký thành công.');
        setShowSuccessMessage(true); // Hiển thị thông báo khi đăng ký thành công
    };

    const isEmailValid = (email) => {
        // Biểu thức chính quy để kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isPasswordValid = (password) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,25}$/;
        return passwordRegex.test(password);
    };

    return (
        <div className="grid grid-cols-3 gap-4 ">
            <div className="col-span-2 px-40 py-20">
                <h3 className="text-2xl font-semibold mb-1 mt-1 text-green-600">Chào mừng bạn đến với TopCV</h3>
                <div className='text-gray-500 mb-4'>Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng</div>
                <form onSubmit={handleSignUp} className="space-y-4 mb-4">
                    <h4 className='text-gray-700'>Họ và tên</h4>
                    <TextField
                        id="name"
                        name="name"
                        variant="outlined"
                        placeholder="Nhập họ tên"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required // Đánh dấu trường này là bắt buộc
                        margin='dense'
                        className="mt-1"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <User color='#00b14f' />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <h4 className='text-gray-700'>Email</h4>
                    <TextField
                        id="email"
                        name="email"
                        variant="outlined"
                        placeholder="Nhập email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        error={!!formData.email && !isEmailValid(formData.email)}
                        helperText={(!!formData.email && !isEmailValid(formData.email)) ? "Email không hợp lệ." : ""}
                        required // Đánh dấu trường này là bắt buộc
                        margin='dense'
                        className="mt-1"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Mail color='#00b14f' />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <h4 className='text-gray-700'>Mật khẩu</h4>
                    <TextField
                        id="password"
                        name="password"
                        variant="outlined"
                        type="password"
                        placeholder="Nhập mật khẩu"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        margin='dense'
                        className="mt-1"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <ShieldCheck color='#00b14f' />
                                </InputAdornment>
                            ),
                            onFocus: () => setShowGuide(true),
                            onBlur: () => setShowGuide(false)
                        }}
                        error={!!formData.password && !isPasswordValid(formData.password)}
                        helperText={formData.password && !isPasswordValid(formData.password) ? "Mật khẩu không hợp lệ." : ""}
                    />
                    {showGuide && (
                        <ul className="list-disc pl-6 text-xs text-gray-600">
                            <li>Mật khẩu từ 6 đến 25 ký tự</li>
                            <li>Bao gồm chữ hoa, chữ thường và ký tự số</li>
                        </ul>
                    )}
                    <h4 className='text-gray-700'>Xác nhận mật khẩu</h4>
                    <TextField
                        id="confirmPassword"
                        name="confirmPassword"
                        variant="outlined"
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        error={formData.confirmPassword !== formData.password}
                        helperText={formData.confirmPassword !== formData.password ? 'Mật khẩu và xác nhận mật khẩu không khớp.' : ''}
                        required // Đánh dấu trường này là bắt buộc
                        margin='dense'
                        className="mt-1"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <ShieldCheck color='#00b14f' />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formData.agreeToTerms}
                                onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                                name="agreeToTerms"
                                color="success" />}
                        label={
                            <span className='text-gray-700'>
                                Tôi đã đọc và đồng ý với {' '}
                                <Link to="/" className="text-green-500 hover:underline">
                                    Điều khoản dịch vụ
                                </Link>
                                {' và '}
                                <Link to="/" className="text-green-500 hover:underline">
                                    Chính sách bảo mật
                                </Link>
                                {' của TopCV.'}
                            </span>
                        }
                    />
                    <button
                        type="submit"
                        className={`py-2 px-4 w-full focus:outline-none text-white rounded-md ${!formData.agreeToTerms ? 'bg-green-400' : 'bg-green-600 hover:bg-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'}`}
                        disabled={!formData.agreeToTerms}>
                        Đăng ký
                    </button>
                    {showSuccessMessage && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mt-4">
                            Đăng ký thành công!
                        </div>
                    )}
                </form>

                <div>
                    <p className="text-center text-gray-600 mb-4">
                        Hoặc đăng nhập bằng
                    </p>
                    <div className="flex fullwidth">
                        <button 
                            disabled={!socialAgree}
                            className={`flex-grow rounded-md py-2 px-4 mr-2 mb-4 text-white ${!socialAgree ? 'bg-red-400' : 'bg-red-500 hover:bg-red-600'}`}>
                            <GoogleIcon></GoogleIcon>
                            {' '}Google
                        </button>
                        <button
                            disabled={!socialAgree}
                            className={`flex-grow rounded-md py-2 px-4 mx-2 mb-4 text-white ${!socialAgree ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-500' }`}>
                            <FacebookIcon></FacebookIcon>
                            {' '}Facebook
                        </button>
                        <button 
                            disabled={!socialAgree}
                            className={`flex-grow rounded-md py-2 px-4 ml-2 mb-4 text-white ${!socialAgree ? 'bg-blue-500' : 'bg-blue-800 hover:bg-blue-700'}`}>
                            <LinkedInIcon></LinkedInIcon>
                            {' '}Linkedin
                        </button>
                    </div>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={socialAgree}
                                onChange={(e) => setSocialAgree(e.target.checked)}
                                name="agreeToTerms"
                                color="success" />}
                        label={
                            <span className='text-gray-700'>
                                Bằng việc đăng nhập bằng tài khoản mạng xã hội, tôi đã đọc và đồng ý với {' '}
                                <Link to="/" className="text-green-500 hover:underline">
                                    Điều khoản dịch vụ
                                </Link>
                                {' và '}
                                <Link to="/" className="text-green-500 hover:underline">
                                    Chính sách bảo mật
                                </Link>
                                {' của TopCV.'}
                            </span>
                        }
                        className="mb-4"
                    />

                    <p className="text-center text-gray-600">
                        Bạn đã có tài khoản? {' '}
                        <Link to="/user-login" className="text-green-500 hover:underline">
                            Đăng nhập ngay
                        </Link>
                    </p>
                    <hr className="my-4 border-gray-200" />
                    <div className="flex flex-col items-center">
                        <b className="text-gray-700">Bạn gặp khó khăn khi tạo tài khoản?</b>
                        <div className="text-gray-700">
                            Vui lòng gọi tới số <span className="text-green-500 font-bold">(024) 6680 5588</span> (giờ hành chính).
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-1">
                {/* Hình ảnh */}
                <img src="../../shared/assets/images/Sign-up-user.png" className="w-full h-auto" />
            </div>
        </div>
    );
}

export default UserSignUp;
