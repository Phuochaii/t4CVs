// khoa
import { useState, useRef, useEffect } from 'react';
import { TextField, InputLabel, Modal, Box } from '@mui/material';
import { HeartIcon } from '@heroicons/react/24/outline';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import JobService from '../../modules/job-module';
import SearchBoxComponent from '../../layouts/UserLayout/components/SearchBoxComponent';
import RelatedJobComponent from '../../layouts/UserLayout/components/RelatedJobComponent';
import InterestedJobComponent from '../../layouts/UserLayout/components/InterestedJobComponent';

const modalApplyStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  width: '40%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  color: 'black',
};

interface filterSearch {
  titleRecruitment: string;
  salaryMin: number;
  salaryMax: number;
  locationId: number;
  expId: number;
}

function ApplyCV() {
  const [jobId, setJobId] = useState('');
  const { id } = useParams();

  const userId =
    localStorage.getItem('user') == null
      ? ''
      : JSON.parse(localStorage.getItem('user') as string).id;
  // const jobId = '3';
  // const userId = '2';

  const [showModal, setShowModal] = useState(false);
  const handleBeforeApply = () => {
    if (localStorage.getItem('user') === null) {
      navigation('/user-login');
      return;
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const chooseUploadCV = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const navigation = useNavigate();

  const [jobData, setJobData] = useState<any>({});
  const [cities, setCities] = useState<any[]>([]);
  const [exp_year, setExpYear] = useState<any[]>([]);

  const [filter, setFilter] = useState<filterSearch>({
    titleRecruitment: '',
    salaryMin: 0,
    salaryMax: 0,
    locationId: 0,
    expId: 0,
  });

  const SelectLocation = (value: number) => {
    setFilter((prevState) => ({ ...prevState, locationId: value }));
  };

  const SelectExp = (value: number) => {
    setFilter((prevState) => ({ ...prevState, expId: value }));
  };

  const setTitleRecruitment = (value: string) => {
    setFilter((prevState) => ({ ...prevState, titleRecruitment: value }));
  };

  // const SelectSalary = (value: number) => {
  //   if (value !== 0) {
  //     const foundRange = salary_range.find(
  //       (range) => Number(range.value) === value
  //     );
  //     if (foundRange) {
  //       setFilter((prevFilter) => ({
  //         ...prevFilter,
  //         salaryMin: foundRange.minSalary,
  //         salaryMax: foundRange.maxSalary,
  //       }));
  //     }
  //   } else {
  //     setFilter((prevFilter) => ({
  //       ...prevFilter,
  //       salaryMin: 0,
  //       salaryMax: 0,
  //     }));
  //   }
  // };

  const fetchDataFilter = async () => {
    try {
      const locationResponse = await JobService.getAllLocation();
      setCities(locationResponse);

      const expResponse = await JobService.getAllExp();
      setExpYear(expResponse);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchJobData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/job/${jobId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log(data);
      setJobData(data);
    } catch (error) {
      console.log('Error fetching data. Please try again.');
    }
  };
  useEffect(() => {
    setJobId(id);
    window.scrollTo(0, 0);
    fetchJobData();
    fetchDataFilter();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchJobData();
  }, [jobId]);

  // Handle Modal
  const handleOpenModal = () => {
    handleBeforeApply();
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  const [selectedFile, setSelectedFile] = useState<any>();

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      file: file,
    });
    if (file && file.size <= 5 * 1024 * 1024) {
      // 5MB limit
      const fileType = file.type;
      if (
        fileType === 'application/msword' || // .doc
        fileType ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || // .docx
        fileType === 'application/pdf'
      ) {
        // pdf
        setSelectedFile(file);
      } else {
        alert('Only .doc, .docx, and pdf files are allowed.');
      }
    } else {
      alert('File size exceeds 5MB limit.');
    }
  };
  const handleDeleteFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      setFormData({
        ...formData,
        file: null,
      });
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    file: null,
    cover_letter: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    file: '',
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const inputValue = type === 'file' ? files[0] : value;
    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Custom validation logic
    const errors = {};

    if (!formData.name) {
      errors.name = 'Name is required';
    }
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)
    ) {
      errors.email = 'Invalid email address';
    }
    if (!formData.phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/i.test(formData.phone)) {
      errors.phone = 'Invalid phone number';
    }
    if (!formData.file) {
      errors.file = 'File is required';
    }

    if (Object.keys(errors).length === 0) {
      // Upload CV
      const postData = new FormData();
      postData.append('file', formData.file);
      postData.append('userId', userId);

      const response = await fetch('http://localhost:3000/cv', {
        method: 'POST',
        body: postData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload CV');
      }

      const newUploadCV = await response.json();
      // console.log(newUploadCV);

      // Create Application
      const appData = {
        fullname: formData.name,
        phone: formData.phone,
        email: formData.email,
        coverLetter: formData.cover_letter,
        campaignId: jobData.campaignId,
        userId: userId,
        cvId: newUploadCV.id,
      };

      const appRes = await fetch('http://localhost:3000/application', {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appData),
      });

      if (!appRes.ok) {
        throw new Error('Failed to create Application');
      }

      console.log(appRes);
      // Optionally, you can reset the form after successful submission
      handleDeleteFile();
      setFormData({
        name: '',
        email: '',
        phone: '',
        file: null,
        cover_letter: '',
      });
      handleCloseModal();

      alert('Create Application successfully');
    } else {
      setErrors(errors);
      console.log(errors);
    }
  };

  const handleSearch = () => {
    const queryParams = {
      titleRecruitment:
        filter.titleRecruitment !== ''
          ? `titleRecruitment=${filter.titleRecruitment}`
          : '',
      salaryMin: filter.salaryMin !== 0 ? `salaryMin=${filter.salaryMin}` : '',
      salaryMax: filter.salaryMax !== 0 ? `salaryMax=${filter.salaryMax}` : '',
      locationId:
        filter.locationId !== 0 ? `locationId=${filter.locationId}` : '',
      expId: filter.expId !== 0 ? `expId=${filter.expId}` : '',
    };

    const queryString = Object.values(queryParams)
      .filter((param) => param !== '')
      .join('&');

    navigation(`/results?${queryString}`);
  };

  return (
    <>
      <div className="apply-cv">
        <div className="search-job">
          <div className="header">
            <div className="container">
              <div className="max-w-screen-lg mx-auto">
                <SearchBoxComponent
                  cities={cities}
                  setCities={setCities}
                  exp_year={exp_year}
                  setExpYear={setExpYear}
                  locationId={filter.locationId}
                  setLocationId={SelectLocation}
                  expId={filter.expId}
                  setExpId={SelectExp}
                  titleRecruitment={filter.titleRecruitment}
                  setTitleRecruitment={setTitleRecruitment}
                  handleSearch={handleSearch}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container job-detail">
          <div className="max-w-screen-lg mx-auto">
            <div className="list-job">
              <div className="job-body grid grid-cols-3 gap-x-4">
                <div className="job-detail__body-left col-span-2 flex flex-col gap-4">
                  <div className="job-detail__info mt-4 bg-white text-black rounded-lg p-4 flex flex-col gap-4">
                    <h1 className="job-detail__info--title text-2xl font-bold">
                      {jobData?.titleRecruitment
                        ? jobData?.titleRecruitment
                        : ''}
                    </h1>
                    <div className="job-detail__info--sections grid grid-cols-3 gap-x-4 justify-center">
                      <div className="job-detail__info--section flex flex-row gap-x-4">
                        <div className="job-detail__info--section-icon w-10 h-10 p-2 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M21.92 16.75C21.59 19.41 19.41 21.59 16.75 21.92C15.14 22.12 13.64 21.68 12.47 20.82C11.8 20.33 11.96 19.29 12.76 19.05C15.77 18.14 18.14 15.76 19.06 12.75C19.3 11.96 20.34 11.8 20.83 12.46C21.68 13.64 22.12 15.14 21.92 16.75Z"
                              fill="white"
                            ></path>
                            <path
                              d="M9.99 2C5.58 2 2 5.58 2 9.99C2 14.4 5.58 17.98 9.99 17.98C14.4 17.98 17.98 14.4 17.98 9.99C17.97 5.58 14.4 2 9.99 2ZM9.05 8.87L11.46 9.71C12.33 10.02 12.75 10.63 12.75 11.57C12.75 12.65 11.89 13.54 10.84 13.54H10.75V13.59C10.75 14 10.41 14.34 10 14.34C9.59 14.34 9.25 14 9.25 13.59V13.53C8.14 13.48 7.25 12.55 7.25 11.39C7.25 10.98 7.59 10.64 8 10.64C8.41 10.64 8.75 10.98 8.75 11.39C8.75 11.75 9.01 12.04 9.33 12.04H10.83C11.06 12.04 11.24 11.83 11.24 11.57C11.24 11.22 11.18 11.2 10.95 11.12L8.54 10.28C7.68 9.98 7.25 9.37 7.25 8.42C7.25 7.34 8.11 6.45 9.16 6.45H9.25V6.41C9.25 6 9.59 5.66 10 5.66C10.41 5.66 10.75 6 10.75 6.41V6.47C11.86 6.52 12.75 7.45 12.75 8.61C12.75 9.02 12.41 9.36 12 9.36C11.59 9.36 11.25 9.02 11.25 8.61C11.25 8.25 10.99 7.96 10.67 7.96H9.17C8.94 7.96 8.76 8.17 8.76 8.43C8.75 8.77 8.81 8.79 9.05 8.87Z"
                              fill="white"
                            ></path>
                          </svg>
                        </div>
                        <div className="job-detail__info--section-content flex flex-col">
                          <span className="job-detail__info--section-content-title">
                            Mức lương
                          </span>
                          <strong className="job-detail__info--section-content-value">
                            {jobData?.salaryMin && jobData?.salaryMax
                              ? ` ${jobData?.salaryMin} - ${jobData?.salaryMax} ${jobData?.currency?.name}`
                              : 'Thỏa thuận'}
                          </strong>
                        </div>
                      </div>
                      <div className="job-detail__info--section flex flex-row gap-x-4">
                        <div className="job-detail__info--section-icon w-10 h-10 p-2 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 25 24"
                            fill="none"
                          >
                            <path
                              d="M21.2866 8.45C20.2366 3.83 16.2066 1.75 12.6666 1.75C12.6666 1.75 12.6666 1.75 12.6566 1.75C9.1266 1.75 5.0866 3.82 4.0366 8.44C2.8666 13.6 6.0266 17.97 8.8866 20.72C9.9466 21.74 11.3066 22.25 12.6666 22.25C14.0266 22.25 15.3866 21.74 16.4366 20.72C19.2966 17.97 22.4566 13.61 21.2866 8.45ZM12.6666 13.46C10.9266 13.46 9.5166 12.05 9.5166 10.31C9.5166 8.57 10.9266 7.16 12.6666 7.16C14.4066 7.16 15.8166 8.57 15.8166 10.31C15.8166 12.05 14.4066 13.46 12.6666 13.46Z"
                              fill="white"
                            ></path>
                          </svg>
                        </div>
                        <div className="job-detail__info--section-content flex flex-col">
                          <span className="job-detail__info--section-content-title">
                            Địa điểm
                          </span>
                          {jobData?.locations
                            ? jobData?.locations.map((location: any) => (
                                <strong
                                  className="job-detail__info--section-content-value"
                                  key={location.id}
                                >
                                  {location.name}
                                </strong>
                              ))
                            : ''}
                        </div>
                      </div>
                      <div className="job-detail__info--section flex flex-row gap-x-4">
                        <div className="job-detail__info--section-icon w-10 h-10 p-2 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M17.39 15.67L13.35 12H10.64L6.59998 15.67C5.46998 16.69 5.09998 18.26 5.64998 19.68C6.19998 21.09 7.53998 22 9.04998 22H14.94C16.46 22 17.79 21.09 18.34 19.68C18.89 18.26 18.52 16.69 17.39 15.67ZM13.82 18.14H10.18C9.79998 18.14 9.49998 17.83 9.49998 17.46C9.49998 17.09 9.80998 16.78 10.18 16.78H13.82C14.2 16.78 14.5 17.09 14.5 17.46C14.5 17.83 14.19 18.14 13.82 18.14Z"
                              fill="white"
                            ></path>
                            <path
                              d="M18.35 4.32C17.8 2.91 16.46 2 14.95 2H9.04998C7.53998 2 6.19998 2.91 5.64998 4.32C5.10998 5.74 5.47998 7.31 6.60998 8.33L10.65 12H13.36L17.4 8.33C18.52 7.31 18.89 5.74 18.35 4.32ZM13.82 7.23H10.18C9.79998 7.23 9.49998 6.92 9.49998 6.55C9.49998 6.18 9.80998 5.87 10.18 5.87H13.82C14.2 5.87 14.5 6.18 14.5 6.55C14.5 6.92 14.19 7.23 13.82 7.23Z"
                              fill="white"
                            ></path>
                          </svg>
                        </div>
                        <div className="job-detail__info--section-content flex flex-col">
                          <span className="job-detail__info--section-content-title">
                            Kinh nghiệm
                          </span>
                          <strong className="job-detail__info--section-content-value">
                            {jobData?.exp
                              ? jobData?.exp?.name
                                ? jobData?.exp?.name
                                : ''
                              : ''}
                          </strong>
                        </div>
                      </div>
                    </div>
                    <div className="job-detail__info--sub-details flex flex-rows gap-x-4">
                      <div className="job-detail__info--deadline max-h-8 col-span-2 flex flex-rows items-center text-sm text-slate-500 p-2 bg-slate-100 rounded-lg">
                        <div className="quantity-applied-user__icon mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        Hạn nộp hồ sơ:{' '}
                        {moment
                          .utc(jobData?.expiredDate ? jobData?.expiredDate : '')
                          .format('DD/MM/YYYY')}
                      </div>
                    </div>
                    <div className="job-detail__info--actions grid grid-cols-5 gap-x-3">
                      <span
                        className="col-span-4 btn-apply flex items-center justify-center font-bold p-2"
                        onClick={handleOpenModal}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5 mr-2 font-bold"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                          />
                        </svg>
                        Ứng tuyển ngay
                      </span>
                      <span className="btn-save flex items-center justify-center font-semibold p-2">
                        <HeartIcon className="w-5 mr-2" />
                        Lưu tin
                      </span>
                    </div>
                  </div>
                  <div className="job-detail__information-detail mb-4 bg-white text-black rounded-lg p-4 flex flex-col gap-y-6">
                    <h2 className="job-detail__information-detail--title border-l-5 border-green-500 pl-4 text-2xl font-bold">
                      Chi tiết tin tuyển dụng
                    </h2>
                    <div className="job-detail__information-detail--content">
                      <div className="job-description flex flex-col gap-y-6">
                        <div className="job-description__item">
                          <h3 className="text-base font-bold mb-2">
                            Yêu cầu ứng viên
                          </h3>
                          <div className="job-description__item--content flex flex-col gap-y-2">
                            <p>
                              {jobData?.jobDetail
                                ? jobData?.jobDetail?.requirement
                                  ? jobData?.jobDetail?.requirement
                                  : ''
                                : ''}
                            </p>
                          </div>
                        </div>
                        <div className="job-description__item">
                          <h3 className="text-base font-bold mb-2">
                            Kỹ năng cần thiết
                          </h3>
                          <div className="job-description__item--content flex flex-col gap-y-2">
                            {jobData?.jobDetail
                              ? jobData?.jobDetail?.skills
                                ? jobData?.jobDetail?.skills
                                    .split(', ')
                                    .map((skill: any, index: number) => (
                                      <p key={index}>- {skill}</p>
                                    ))
                                : ''
                              : ''}
                          </div>
                        </div>
                        <div className="job-description__item">
                          <h3 className="text-base font-bold mb-2">
                            Mô tả công việc
                          </h3>
                          <div className="job-description__item--content flex flex-col gap-y-2">
                            <p>
                              {jobData?.jobDetail
                                ? jobData?.jobDetail?.description
                                  ? jobData?.jobDetail?.description
                                  : ''
                                : ''}
                            </p>
                          </div>
                        </div>
                        <div className="job-description__item">
                          <h3 className="text-base font-bold mb-2">
                            Thời gian làm việc
                          </h3>
                          <div className="job-description__item--content flex flex-col gap-y-2">
                            <p>
                              {jobData?.jobDetail
                                ? jobData?.jobDetail?.djobSchedule
                                  ? jobData?.jobDetail?.description
                                  : ''
                                : ''}
                            </p>
                          </div>
                        </div>
                        <div className="job-description__item">
                          <h3 className="text-base font-bold mb-2">
                            Quyền lợi
                          </h3>
                          <div className="job-description__item--content flex flex-col gap-y-2">
                            <p>
                              {jobData?.jobDetail
                                ? jobData?.jobDetail?.benefit
                                  ? jobData?.jobDetail?.benefit
                                  : ''
                                : ''}
                            </p>
                          </div>
                        </div>
                        <div className="job-description__item">
                          <h3 className="text-base font-bold mb-2">
                            Địa điểm làm việc
                          </h3>
                          <div className="job-description__item--content">
                            <p>
                              {jobData.company?.address
                                ? jobData.company?.address
                                : ''}
                            </p>
                          </div>
                        </div>
                        <div className="job-description__item">
                          <h3 className="text-base font-bold mb-2">
                            Cách thức ứng tuyển
                          </h3>
                          <div className="job-description__item--content">
                            <p>
                              Ứng viên nộp hồ sơ trực tuyến bằng cách bấm Ứng
                              tuyển ngay dưới đây.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="job-detail__information-detail--actions flex flex-col gap-y-4">
                      <div className="job-detail__information-detail--actions-buttons flex flex-row items-center gap-x-3">
                        <span
                          className="btn-apply font-bold py-2 px-5"
                          onClick={handleOpenModal}
                        >
                          Ứng tuyển ngay
                        </span>
                        <span className="btn-save font-semibold py-2 px-6">
                          Lưu tin
                        </span>
                      </div>
                      <div className="job-detail__information-detail--actions-label">
                        Hạn nộp hồ sơ:{' '}
                        {moment
                          .utc(jobData?.expiredDate ? jobData?.expiredDate : '')
                          .format('DD/MM/YYYY')}
                      </div>
                      <div className="quantity-applied-user w-fit flex flex-rows items-center text-sm text-slate-600 p-2 bg-slate-100 rounded-lg">
                        <div className="quantity-applied-user__icon mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="quantity-applied-user__text">
                          TopCV chưa hỗ trợ xem số lượt ứng tuyển cho việc làm
                          này
                        </div>
                      </div>
                    </div>
                    <div className="job-detail__information-detail--report flex flex-row gap-x-3 text-slate-600 bg-slate-100 p-2 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 text-green-600"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>
                        Báo cáo tin tuyển dụng: Nếu bạn thấy rằng tin tuyển dụng
                        này không đúng hoặc có dấu hiệu lừa đảo,{' '}
                        <a href="#" className="text-green-600">
                          hãy phản ánh với chúng tôi.
                        </a>
                      </span>
                    </div>

                    <RelatedJobComponent setJobId={setJobId} />
                  </div>
                </div>
                <div className="job-detail__body-right col-span-1 text-black flex flex-col gap-4 my-4">
                  <div className="job-detail__box--right job-detail__company">
                    <div className="job-detail__company--information p-4 rounded-lg bg-white flex flex-col gap-4">
                      <div className="job-detail__company--information-item company-name grid grid-cols-3 gap-3">
                        <div className="job-detail__company--information-item__logo w-24 h-24 min-w-24 min-h-24 flex items-center bg-white rounded-lg border border-slate-300 overflow-hidden">
                          <img
                            src={
                              jobData.company?.image
                                ? jobData.company?.image
                                : ''
                            }
                          />
                        </div>
                        <span className="job-detail__company--information-item__name col-span-2 text-lg font-bold">
                          {jobData.company?.name ? jobData.company?.name : ''}
                        </span>
                      </div>
                      <div className="job-detail__company--information-item company-scale grid grid-cols-3 gap-3">
                        <div className="company-scale__label flex flex-row gap-2 items-center text-slate-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="rgb(100 116 139)"
                            className="w-5 h-5"
                          >
                            <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
                          </svg>
                          Quy mô:
                        </div>
                        <span className="company-scale__info col-span-2 font-semibold">
                          {jobData.company?.companySize
                            ? jobData.company?.companySize
                            : ''}{' '}
                          nhân viên
                        </span>
                      </div>
                      <div className="job-detail__company--information-item company-address grid grid-cols-3 gap-3">
                        <div className="company-scale__label flex flex-row gap-2 text-slate-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="rgb(100 116 139)"
                            className="w-5 h-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Địa điểm:
                        </div>
                        <span className="company-scale__info col-span-2 font-semibold">
                          {jobData.company?.address
                            ? jobData.company?.address
                            : ''}
                        </span>
                      </div>
                      <div
                        onClick={() =>
                          navigation(
                            `/companies/${jobData?.companyId ? jobData?.companyId : ''}`,
                          )
                        }
                        className="job-detail__company--action font-bold text-green-500 flex flex-row gap-2 items-center justify-center cursor-pointer hover:underline"
                      >
                        Xem trang công ty
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="rgb(22 163 74)"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M15.75 2.25H21a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V4.81L8.03 17.03a.75.75 0 0 1-1.06-1.06L19.19 3.75h-3.44a.75.75 0 0 1 0-1.5Zm-10.5 4.5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V10.5a.75.75 0 0 1 1.5 0v8.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V8.25a3 3 0 0 1 3-3h8.25a.75.75 0 0 1 0 1.5H5.25Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="job-detail__box--right job-detail__body-right--item job-detail__body-right--box-general bg-white p-4 rounded-lg">
                    <h2 className="box-title text-2xl font-bold mb-3">
                      Thông tin chung
                    </h2>
                    <div className="box-general-content flex flex-col gap-5">
                      <div className="box-general-group flex flex-row gap-4 items-center">
                        <div className="box-general-group-icon bg-green-600 rounded-full p-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-7 h-7"
                            viewBox="0 0 24 24"
                            fill="rgb(22 163 74)"
                          >
                            <path
                              d="M17.81 5.49V6.23L14.27 4.18C12.93 3.41 11.06 3.41 9.73 4.18L6.19 6.24V5.49C6.19 3.24 7.42 2 9.67 2H14.33C16.58 2 17.81 3.24 17.81 5.49Z"
                              fill="white"
                            ></path>
                            <path
                              d="M17.84 7.96999L17.7 7.89999L16.34 7.11999L13.52 5.48999C12.66 4.98999 11.34 4.98999 10.48 5.48999L7.66 7.10999L6.3 7.90999L6.12 7.99999C4.37 9.17999 4.25 9.39999 4.25 11.29V15.81C4.25 17.7 4.37 17.92 6.16 19.13L10.48 21.62C10.91 21.88 11.45 21.99 12 21.99C12.54 21.99 13.09 21.87 13.52 21.62L17.88 19.1C19.64 17.92 19.75 17.71 19.75 15.81V11.29C19.75 9.39999 19.63 9.17999 17.84 7.96999ZM14.79 13.5L14.18 14.25C14.08 14.36 14.01 14.57 14.02 14.72L14.08 15.68C14.12 16.27 13.7 16.57 13.15 16.36L12.26 16C12.12 15.95 11.89 15.95 11.75 16L10.86 16.35C10.31 16.57 9.89 16.26 9.93 15.67L9.99 14.71C10 14.56 9.93 14.35 9.83 14.24L9.21 13.5C8.83 13.05 9 12.55 9.57 12.4L10.5 12.16C10.65 12.12 10.82 11.98 10.9 11.86L11.42 11.06C11.74 10.56 12.25 10.56 12.58 11.06L13.1 11.86C13.18 11.99 13.36 12.12 13.5 12.16L14.43 12.4C15 12.55 15.17 13.05 14.79 13.5Z"
                              fill="white"
                            ></path>
                          </svg>
                        </div>
                        <div className="box-general-group-info flex flex-col gap-1">
                          <span className="box-general-group-info-title text-slate-500">
                            Cấp bậc
                          </span>
                          <span className="box-general-group-info-value font-bold">
                            Nhân viên
                          </span>
                        </div>
                      </div>
                      <div className="box-general-group flex flex-row gap-4 items-center">
                        <div className="box-general-group-icon bg-green-600 rounded-full p-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-7 h-7"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M17.39 15.67L13.35 12H10.64L6.59998 15.67C5.46998 16.69 5.09998 18.26 5.64998 19.68C6.19998 21.09 7.53998 22 9.04998 22H14.94C16.46 22 17.79 21.09 18.34 19.68C18.89 18.26 18.52 16.69 17.39 15.67ZM13.82 18.14H10.18C9.79998 18.14 9.49998 17.83 9.49998 17.46C9.49998 17.09 9.80998 16.78 10.18 16.78H13.82C14.2 16.78 14.5 17.09 14.5 17.46C14.5 17.83 14.19 18.14 13.82 18.14Z"
                              fill="white"
                            ></path>
                            <path
                              d="M18.35 4.32C17.8 2.91 16.46 2 14.95 2H9.04998C7.53998 2 6.19998 2.91 5.64998 4.32C5.10998 5.74 5.47998 7.31 6.60998 8.33L10.65 12H13.36L17.4 8.33C18.52 7.31 18.89 5.74 18.35 4.32ZM13.82 7.23H10.18C9.79998 7.23 9.49998 6.92 9.49998 6.55C9.49998 6.18 9.80998 5.87 10.18 5.87H13.82C14.2 5.87 14.5 6.18 14.5 6.55C14.5 6.92 14.19 7.23 13.82 7.23Z"
                              fill="white"
                            ></path>
                          </svg>
                        </div>
                        <div className="box-general-group-info flex flex-col gap-1">
                          <span className="box-general-group-info-title text-slate-500">
                            Kinh nghiệm
                          </span>
                          <span className="box-general-group-info-value font-bold">
                            {jobData?.exp
                              ? jobData?.exp?.name
                                ? jobData?.exp?.name
                                : ''
                              : ''}
                          </span>
                        </div>
                      </div>
                      <div className="box-general-group flex flex-row gap-4 items-center">
                        <div className="box-general-group-icon bg-green-600 rounded-full p-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-7 h-7"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M9 2C6.38 2 4.25 4.13 4.25 6.75C4.25 9.32 6.26 11.4 8.88 11.49C8.96 11.48 9.04 11.48 9.1 11.49C9.12 11.49 9.13 11.49 9.15 11.49C9.16 11.49 9.16 11.49 9.17 11.49C11.73 11.4 13.74 9.32 13.75 6.75C13.75 4.13 11.62 2 9 2Z"
                              fill="white"
                            ></path>
                            <path
                              d="M14.08 14.15C11.29 12.29 6.74002 12.29 3.93002 14.15C2.66002 15 1.96002 16.15 1.96002 17.38C1.96002 18.61 2.66002 19.75 3.92002 20.59C5.32002 21.53 7.16002 22 9.00002 22C10.84 22 12.68 21.53 14.08 20.59C15.34 19.74 16.04 18.6 16.04 17.36C16.03 16.13 15.34 14.99 14.08 14.15Z"
                              fill="white"
                            ></path>
                            <path
                              d="M19.99 7.34001C20.15 9.28001 18.77 10.98 16.86 11.21C16.85 11.21 16.85 11.21 16.84 11.21H16.81C16.75 11.21 16.69 11.21 16.64 11.23C15.67 11.28 14.78 10.97 14.11 10.4C15.14 9.48001 15.73 8.10001 15.61 6.60001C15.54 5.79001 15.26 5.05001 14.84 4.42001C15.22 4.23001 15.66 4.11001 16.11 4.07001C18.07 3.90001 19.82 5.36001 19.99 7.34001Z"
                              fill="white"
                            ></path>
                            <path
                              d="M21.99 16.59C21.91 17.56 21.29 18.4 20.25 18.97C19.25 19.52 17.99 19.78 16.74 19.75C17.46 19.1 17.88 18.29 17.96 17.43C18.06 16.19 17.47 15 16.29 14.05C15.62 13.52 14.84 13.1 13.99 12.79C16.2 12.15 18.98 12.58 20.69 13.96C21.61 14.7 22.08 15.63 21.99 16.59Z"
                              fill="white"
                            ></path>
                          </svg>
                        </div>
                        <div className="box-general-group-info flex flex-col gap-1">
                          <span className="box-general-group-info-title text-slate-500">
                            Số lượng tuyển
                          </span>
                          <span className="box-general-group-info-value font-bold">
                            {jobData?.jobDetail
                              ? jobData?.jobDetail?.quantity
                                ? jobData?.jobDetail?.quantity + ' người'
                                : ''
                              : ''}
                          </span>
                        </div>
                      </div>
                      <div className="box-general-group flex flex-row gap-4 items-center">
                        <div className="box-general-group-icon bg-green-600 rounded-full p-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-7 h-7"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M21.09 6.98002C20.24 6.04002 18.82 5.57002 16.76 5.57002H16.52V5.53002C16.52 3.85002 16.52 1.77002 12.76 1.77002H11.24C7.47998 1.77002 7.47998 3.86002 7.47998 5.53002V5.58002H7.23998C5.16998 5.58002 3.75998 6.05002 2.90998 6.99002C1.91998 8.09002 1.94998 9.57002 2.04998 10.58L2.05998 10.65L2.13743 11.4633C2.1517 11.6131 2.23236 11.7484 2.35825 11.8307C2.59806 11.9877 2.9994 12.2464 3.23998 12.38C3.37998 12.47 3.52998 12.55 3.67998 12.63C5.38998 13.57 7.26998 14.2 9.17998 14.51C9.26998 15.45 9.67998 16.55 11.87 16.55C14.06 16.55 14.49 15.46 14.56 14.49C16.6 14.16 18.57 13.45 20.35 12.41C20.41 12.38 20.45 12.35 20.5 12.32C20.8967 12.0958 21.3083 11.8195 21.6834 11.5489C21.7965 11.4673 21.8687 11.3413 21.8841 11.2028L21.9 11.06L21.95 10.59C21.96 10.53 21.96 10.48 21.97 10.41C22.05 9.40002 22.03 8.02002 21.09 6.98002ZM13.09 13.83C13.09 14.89 13.09 15.05 11.86 15.05C10.63 15.05 10.63 14.86 10.63 13.84V12.58H13.09V13.83ZM8.90998 5.57002V5.53002C8.90998 3.83002 8.90998 3.20002 11.24 3.20002H12.76C15.09 3.20002 15.09 3.84002 15.09 5.53002V5.58002H8.90998V5.57002Z"
                              fill="white"
                            ></path>
                            <path
                              d="M20.8735 13.7342C21.2271 13.5659 21.6344 13.8462 21.599 14.2362L21.24 18.19C21.03 20.19 20.21 22.23 15.81 22.23H8.19003C3.79003 22.23 2.97003 20.19 2.76003 18.2L2.41932 14.4522C2.38427 14.0667 2.78223 13.7868 3.13487 13.9463C4.27428 14.4618 6.37742 15.3764 7.6766 15.7167C7.8409 15.7597 7.9738 15.8773 8.04574 16.0312C8.65271 17.3293 9.96914 18.02 11.87 18.02C13.7521 18.02 15.0852 17.3027 15.6942 16.0014C15.7662 15.8474 15.8992 15.7299 16.0636 15.6866C17.4432 15.3236 19.6818 14.3013 20.8735 13.7342Z"
                              fill="white"
                            ></path>
                          </svg>
                        </div>
                        <div className="box-general-group-info flex flex-col gap-1">
                          <span className="box-general-group-info-title text-slate-500">
                            Hình thức làm việc
                          </span>
                          <span className="box-general-group-info-value font-bold">
                            {/* {jobData ? jobData?.type.name : ''} */}
                            {jobData?.type?.name ? jobData?.type?.name : ''}
                          </span>
                        </div>
                      </div>
                      <div className="box-general-group flex flex-row gap-4 items-center">
                        <div className="box-general-group-icon bg-green-600 rounded-full p-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-7 h-7"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z"
                              fill="white"
                            ></path>
                            <path
                              d="M17.08 14.15C14.29 12.29 9.74002 12.29 6.93002 14.15C5.66002 15 4.96002 16.15 4.96002 17.38C4.96002 18.61 5.66002 19.75 6.92002 20.59C8.32002 21.53 10.16 22 12 22C13.84 22 15.68 21.53 17.08 20.59C18.34 19.74 19.04 18.6 19.04 17.36C19.03 16.13 18.34 14.99 17.08 14.15Z"
                              fill="white"
                            ></path>
                          </svg>
                        </div>
                        <div className="box-general-group-info flex flex-col gap-1">
                          <span className="box-general-group-info-title text-slate-500">
                            Giới tính
                          </span>
                          <span className="box-general-group-info-value font-bold">
                            {(jobData?.jobDetail
                              ? jobData?.jobDetail?.gender
                                ? jobData?.jobDetail?.gender
                                : ''
                              : '') == 'Male'
                              ? 'Nam'
                              : 'Nữ'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="job-detail__box--right job-detail__body-right--item job-detail__body-right--box-category bg-white p-4 rounded-lg flex flex-col gap-5">
                    <div className="box-category">
                      <div className="box-category-title text-2xl font-bold mb-3">
                        Ngành nghề
                      </div>
                      <div className="box-category-tags flex flex-row flex-wrap gap-3">
                        {jobData?.fields
                          ? jobData?.fields.map((field: any, index: number) => (
                              <span
                                key={index}
                                id={field.id}
                                className="box-category-tag text-sm px-2 py-1 rounded bg-slate-100 text-slate-500"
                              >
                                {field.name}
                              </span>
                            ))
                          : ''}
                      </div>
                    </div>
                    <div className="box-category">
                      <div className="box-category-title text-2xl font-bold mb-3">
                        Khu vực
                      </div>
                      <div className="box-category-tags flex flex-row flex-wrap gap-3">
                        <span className="box-category-tag text-sm px-2 py-1 rounded bg-slate-100 text-slate-500">
                          {jobData?.locations
                            ? jobData?.locations[0]?.name
                              ? jobData?.locations[0]?.name
                              : ''
                            : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="job-detail__box--right job-detail__body-right--item job-detail__body-right--box-interested">
                    <InterestedJobComponent />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Apply CV */}
      <Modal
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-apply-cv" sx={modalApplyStyle}>
          <form onSubmit={handleSubmit}>
            <div className="modal-header py-5 px-8 flex flex-row items-center justify-between border-b-4 border-slate-100">
              <div className="form-header_title text-2xl font-bold">
                Ứng tuyển
                <span className="text-green-500">
                  {' '}
                  {jobData?.titleRecruitment}
                </span>
              </div>
              <div
                className="form-header_action btn-close w-10 p-2 rounded-full bg-slate-200 cursor-pointer hover:bg-slate-300"
                onClick={handleCloseModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>

            <div className="modal-body overflow-auto h-[36rem] py-5 px-8">
              <div className="apply-content flex flex-col gap-5">
                <div className="apply-content_tab">
                  <div className="apply-content_tab-title flex flex-row items-center gap-3 text-lg font-semibold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-7 h-7"
                      fill="rgb(34 197 94)"
                      viewBox="0 0 24 24"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M12.414 5H21a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2zM12 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm-4 5h8a4 4 0 1 0-8 0z" />
                    </svg>
                    Chọn CV để ứng tuyển
                  </div>
                </div>
                <div className="apply-content_tab p-5 text-center border-2 border-dashed border-green-400 rounded-lg cursor-pointer group/input_cv">
                  <div className="input-dragDropBox">
                    <input
                      type="file"
                      name="file"
                      accept=".doc,.docx,.pdf"
                      onChange={handleFileInputChange}
                      ref={fileInputRef}
                      className="block w-full text-sm text-slate-500 hidden"
                    />
                    {!selectedFile ? (
                      <div
                        className="input-inner flex flex-col gap-3 w-max m-auto"
                        onClick={chooseUploadCV}
                      >
                        <div className="input-inner_icon flex flex-row gap-3 font-bold items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="rgb(203 213 225)"
                            className="w-10 h-10"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.5 3.75a6 6 0 0 0-5.98 6.496A5.25 5.25 0 0 0 6.75 20.25H18a4.5 4.5 0 0 0 2.206-8.423 3.75 3.75 0 0 0-4.133-4.303A6.001 6.001 0 0 0 10.5 3.75Zm2.03 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v4.94a.75.75 0 0 0 1.5 0v-4.94l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Tải lên CV từ máy tính, chọn hoặc kéo thả
                        </div>
                        <span className="input-inner_format text-slate-400">
                          Hỗ trợ định dạng .doc, .docx, pdf có kích thước dưới
                          5MB
                        </span>
                        <span className="input-inner_action btn-apply font-bold m-auto text-center py-2 px-5 rounded-lg bg-slate-300 group-hover/input_cv:text-white group-hover/input_cv:bg-green-600">
                          Chọn CV
                        </span>
                      </div>
                    ) : (
                      <div className="input-inner flex flex-col gap-3 w-max m-auto">
                        <div className="input-inner_icon flex flex-row gap-3 font-bold items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="rgb(203 213 225)"
                            className="w-10 h-10"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.5 3.75a6 6 0 0 0-5.98 6.496A5.25 5.25 0 0 0 6.75 20.25H18a4.5 4.5 0 0 0 2.206-8.423 3.75 3.75 0 0 0-4.133-4.303A6.001 6.001 0 0 0 10.5 3.75Zm2.03 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v4.94a.75.75 0 0 0 1.5 0v-4.94l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Tải lên CV từ máy tính, chọn hoặc kéo thả
                        </div>
                        <span className="input-inner_format text-slate-400">
                          Hỗ trợ định dạng .doc, .docx, pdf có kích thước dưới
                          5MB
                        </span>
                        <div className="selected-file-detail flex flex-row gap-2 items-center justify-center text-green-500">
                          <svg
                            className="w-8 h-8"
                            fill="rgb(34 197 94)"
                            viewBox="-6.5 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M13.438 5.656l4.406 4.625c0.438 0.469 0.813 1.344 0.813 2.031v13.688c0 0.625-0.5 1.188-1.188 1.188h-16.281c-0.625 0-1.188-0.563-1.188-1.188v-20.031c0-0.625 0.563-1.188 1.188-1.188h10.25c0.688 0 1.563 0.406 2 0.875zM2.469 25.125h13.719c0.219 0 0.406-0.188 0.406-0.406v-11.438c0-0.219-0.188-0.406-0.406-0.406h-4.906c-0.219 0-0.406-0.188-0.406-0.406v-5.219c0-0.219-0.156-0.375-0.375-0.375h-8.031c-0.219 0-0.375 0.156-0.375 0.375v17.469c0 0.219 0.156 0.406 0.375 0.406zM15.219 10.531l-1.969-2.125c-0.156-0.156-0.281-0.094-0.281 0.125v1.906c0 0.188 0.188 0.375 0.375 0.375h1.75c0.219 0 0.281-0.125 0.125-0.281zM4.875 8.719h3.875c0.406 0 0.781 0.375 0.781 0.813v0.469c0 0.406-0.375 0.781-0.781 0.781h-3.875c-0.438 0-0.813-0.375-0.813-0.781v-0.469c0-0.438 0.375-0.813 0.813-0.813zM4.875 12.906h3.875c0.406 0 0.781 0.375 0.781 0.813v0.469c0 0.406-0.375 0.781-0.781 0.781h-3.875c-0.438 0-0.813-0.375-0.813-0.781v-0.469c0-0.438 0.375-0.813 0.813-0.813zM13.719 19.156h-8.844c-0.438 0-0.813-0.344-0.813-0.781v-0.469c0-0.438 0.375-0.781 0.813-0.781h8.844c0.406 0 0.813 0.344 0.813 0.781v0.469c0 0.438-0.406 0.781-0.813 0.781zM13.719 23.438h-8.844c-0.438 0-0.813-0.344-0.813-0.75v-0.5c0-0.438 0.375-0.781 0.813-0.781h8.844c0.406 0 0.813 0.344 0.813 0.781v0.5c0 0.406-0.406 0.75-0.813 0.75z"></path>
                          </svg>
                          <p className="truncate max-w-52">
                            {selectedFile?.name}
                          </p>
                          <span
                            className="delete-btn bg-red-100 rounded-md p-1 px-2"
                            onClick={handleDeleteFile}
                          >
                            <svg
                              className="w-6 h-6"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4V4zm2 2h6V4H9v2zM6.074 8l.857 12H17.07l.857-12H6.074zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1z"
                                fill="rgb(239 68 68)"
                              />
                            </svg>
                          </span>
                          <span
                            className="input-inner_action btn-apply font-bold text-center py-2 px-5 rounded-lg bg-slate-300 group-hover/input_cv:text-white group-hover/input_cv:bg-green-600"
                            onClick={chooseUploadCV}
                          >
                            Chọn CV
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="input-userInfo pt-3 mt-4 border-t flex flex-col gap-3">
                    <div className="input-userInfo__banner flex justify-between items-center">
                      <div className="input-userInfo__banner-label text-green-500">
                        Vui lòng nhập đầy đủ thông tin chi tiết:
                      </div>
                      <div className="input-userInfo__banner-required text-xs text-red-500">
                        (*) Thông tin bắt buộc.
                      </div>
                    </div>

                    <div className="input-userInfo__value flex flex-row flex-wrap gap-2 text-black text-start">
                      <div className="input-userInfo__value-username basis-full flex flex-col gap-1">
                        <InputLabel>
                          Họ và tên <span className="text-red-500"> *</span>
                        </InputLabel>
                        <TextField
                          className={`input_item w-full 
                                      ${errors.name ? 'border-red-500' : ''}
                                    `}
                          size="small"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Họ tên hiển thị với NTD"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs italic">
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-row gap-2 basis-full">
                        <div className="input-userInfo__value-email flex flex-col gap-1 w-full">
                          <InputLabel>
                            Email <span className="text-red-500"> *</span>
                          </InputLabel>
                          <TextField
                            className={`input_item
                                        ${errors.email ? 'border-red-500' : ''}
                                      `}
                            size="small"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email hiển thị với NTD"
                          />
                          {errors.email && (
                            <p className="text-red-500 text-xs italic">
                              {errors.email}
                            </p>
                          )}
                        </div>
                        <div className="input-userInfo__value-phone flex flex-col gap-1 w-full">
                          <InputLabel>
                            Số điện thoại{' '}
                            <span className="text-red-500"> *</span>
                          </InputLabel>
                          <TextField
                            className={`input_item
                                        ${errors.phone ? 'border-red-500' : ''}
                                      `}
                            size="small"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Số điện thoại hiển thị với NTD"
                          />
                          {errors.phone && (
                            <p className="text-red-500 text-xs italic">
                              {errors.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="apply-content_tab">
                  <div className="apply-content_tab-title flex flex-row items-center gap-3 text-lg font-semibold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-7 h-7"
                      fill="rgb(34 197 94)"
                      viewBox="0 0 512 512"
                    >
                      <path d="M278.5 215.6L23 471c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l74.8-74.8c7.4 4.6 15.3 8.2 23.8 10.5C200.3 452.8 270 454.5 338 409.4c12.2-8.1 5.8-25.4-8.8-25.4l-16.1 0c-5.1 0-9.2-4.1-9.2-9.2c0-4.1 2.7-7.6 6.5-8.8l97.7-29.3c3.4-1 6.4-3.1 8.4-6.1c4.4-6.4 8.6-12.9 12.6-19.6c6.2-10.3-1.5-23-13.5-23l-38.6 0c-5.1 0-9.2-4.1-9.2-9.2c0-4.1 2.7-7.6 6.5-8.8l80.9-24.3c4.6-1.4 8.4-4.8 10.2-9.3C494.5 163 507.8 86.1 511.9 36.8c.8-9.9-3-19.6-10-26.6s-16.7-10.8-26.6-10C391.5 7 228.5 40.5 137.4 131.6C57.3 211.7 56.7 302.3 71.3 356.4c2.1 7.9 12 9.6 17.8 3.8L253.6 195.8c6.2-6.2 16.4-6.2 22.6 0c5.4 5.4 6.1 13.6 2.2 19.8z" />
                    </svg>
                    Thư giới thiệu:
                  </div>
                  <div className="apply-content_tab-sub-title text-slate-500 mt-2">
                    Một thư giới thiệu ngắn gọn, chỉn chu sẽ giúp bạn trở nên
                    chuyên nghiệp và gây ấn tượng hơn với nhà tuyển dụng.
                  </div>
                  <div className="cover-letter-area border rounded-lg border-slate-400 px-1 mt-2">
                    <TextField
                      name="cover_letter"
                      value={formData.cover_letter}
                      onChange={handleChange}
                      multiline
                      rows={4}
                      placeholder="Viết giới thiệu ngắn gọn về bản thân (điểm mạnh, điểm yếu) và nêu rõ mong muốn, lý do bạn muốn ứng tuyển cho vị trí này."
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="apply-content_tab border border-slate-300 rounded-lg p-3">
                  <span className="note-title flex gap-2 items-center text-red-500 font-bold text-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="rgb(248 113 113)"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Lưu ý
                  </span>
                  <div className="note-content">
                    <p className="note-content__list mt-3">
                      <span>
                        1. TopCV khuyên tất cả các bạn hãy luôn cẩn trọng trong
                        quá trình tìm việc và chủ động nghiên cứu về thông tin
                        công ty, vị trí việc làm trước khi ứng tuyển.
                        <br />
                        Ứng viên cần có trách nhiệm với hành vi ứng tuyển của
                        mình. Nếu bạn gặp phải tin tuyển dụng hoặc nhận được
                        liên lạc đáng ngờ của nhà tuyển dụng, hãy báo cáo ngay
                        cho TopCV qua email
                        <a
                          className="text-green-500"
                          target="_top"
                          href="mailto:hotro@topcv.vn"
                        >
                          {' '}
                          hotro@topcv.vn
                        </a>{' '}
                        để được hỗ trợ kịp thời.
                      </span>
                    </p>
                    <p className="note-content__list mt-3">
                      <span>
                        2. Tìm hiểu thêm kinh nghiệm phòng tránh lừa đảo
                        <a
                          href="https://blog.topcv.vn/huong-dan-tim-viec-an-toan-trong-ky-nguyen-so/"
                          target="__blank"
                          className="font-semibold text-green-500"
                        >
                          {' '}
                          tại đây.
                        </a>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer py-5 px-8 flex flex-row gap-3 items-center border-t-4 border-slate-100">
              <span
                className="btn-close font-semibold py-2 px-4 rounded-lg text-slate-700 bg-slate-200 cursor-pointer hover:bg-slate-300"
                onClick={handleCloseModal}
              >
                Hủy
              </span>
              <button
                type="submit"
                className="btn-apply font-bold w-full text-center py-2 px-5 rounded-lg bg-green-500 text-white hover:bg-green-600 cursor-pointer"
              >
                Ứng tuyển ngay
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default ApplyCV;
