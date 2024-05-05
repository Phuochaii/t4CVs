import React, { useState, ChangeEvent } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps {
    id: string;
    name: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    errorMessage?: string;
    icon?: React.ElementType;
}

const Input: React.FC<InputProps> = ({
    id,
    name,
    type,
    placeholder,
    value,
    onChange,
    errorMessage,
    icon: Icon,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                )}
                <input
                    id={id}
                    name={name}
                    type={
                        type === "password" ? (showPassword ? "text" : "password") : type
                    }
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={`text-black mt-1 bg-white pl-12 pr-3 py-2 border rounded-md w-full
          focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500
          ${isFocused ? "border-green-500" : ""}
          ${errorMessage ? "border-red-500" : ""}
          `}
                />
                {type === "password" && (
                    <div className="absolute right-3 top-7 transform -translate-y-1/2">
                        <button
                            type="button"
                            onClick={handlePasswordToggle}
                            className="focus:outline-none"
                        >
                            {showPassword ? (
                                <EyeOff className="w-5 h-5 text-gray-500" />
                            ) : (
                                <Eye className="w-5 h-5 text-gray-500" />
                            )}
                        </button>
                    </div>
                )}
            </div>
            {name === "email" && (
                <div className="text-red-500 text-sm">
                    Trường hợp bạn đăng ký tài khoản bằng email không phải email tên
                    miền công ty, một số dịch vụ trên tài khoản có thể sẽ bị giới hạn
                    quyền mua hoặc sử dụng.
                </div>
            )}
            {errorMessage && (
                <div className="text-red-500 font-semibold">{errorMessage}</div>
            )}
        </>
    );
};

export default Input;
