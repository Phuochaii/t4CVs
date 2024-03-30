import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
// import en from "./locales/en.json";
// import fr from "./locales/fr.json";

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        // resources: {
        //     en: {
        //         translation: {
        //             "Job Search": "Job Search",
        //             "Profile & CV": "Profile & CV",
        //             "Languages": "Languages",
        //             "Login": "Login",
        //             "Register": "Register",
        //             "Recruitment & Find Profiles": "Recruitment & Find Profiles",
        //         },
        //     },
        //     vi: {
        //         translation: {
        //             "Job Search": "Tìm việc",
        //             "Profile & CV": "Hồ sơ & CV",
        //             "Languages": "Ngôn ngữ",
        //             "Login": "Đăng nhập",
        //             "Register": "Đăng ký",
        //             "Recruitment & Find Profiles": "Tuyển dụng & Tìm hồ sơ",
        //         },
        //     },
        // },
        lng: "vi",
        fallbackLng: "vi",
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: "/locales/{{lng}}.json",
        },
    });

export default i18n;