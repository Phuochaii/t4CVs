import { useEffect } from "react";
import {
    TextField,
    FormControl,
    OutlinedInput,
    InputAdornment,
    MenuItem,
    Button
} from "@mui/material";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import {
MapPinIcon,
StarIcon
} from "@heroicons/react/24/outline";
import JobService from "../../../modules/job-module";


const salary_range = [
    {
      value: "0",
      label: "Tất cả mức lương",
    },
    {
      value: "1",
      label: "Dưới 5 triệu",
    },
    {
      value: "2",
      label: "5 đến 10",
    },
    {
      value: "3",
      label: "10 đến 15",
    },
];

function SearchBoxComponent({
    cities,
    setCities,
    exp_year,
    setExpYear,
    locationId,
    setLocationId,
    expId,
    setExpId,
    titleRecruitment,
    setTitleRecruitment,
    handleSearch
}) {

    const fetchDataFilter = async () => {
        try {
        const locationResponse = await JobService.getAllLocation();
        setCities(locationResponse);

        const expResponse = await JobService.getAllExp();
        setExpYear(expResponse);
        } catch (error) {
        console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchDataFilter();
    }, []);

    return (
      <form className="search-job grid grid-cols-7 justify-center gap-x-4">
        <div className="group-search col-span-3 grid grid-cols-2">
          <div className="item item-search">
            <FormControl>
              <OutlinedInput
                id="outlined-adornment-amount"
                placeholder="Vị trí công việc"
                startAdornment={
                  <InputAdornment position="start">
                    <MagnifyingGlassIcon className="w-6" />
                  </InputAdornment>
                }
                onChange={(e) => {
                  setTitleRecruitment(e.target.value);
                }}
              />
            </FormControl>
          </div>
          <div className="item search-city">
            <TextField
              id="outlined-select-currency"
              select
              defaultValue={String(locationId)}
              className="w-full"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MapPinIcon className="w-7" />
                  </InputAdornment>
                ),
              }}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                    },
                  },
                },
              }}
              onChange={(e) => setLocationId(Number(e.target.value))}
            >
              <MenuItem key="0" value="0">
                Tất cả tỉnh/thành phố
              </MenuItem>
              {cities
                ? cities.map((city: any) => (
                    <MenuItem key={city.id} value={city.id}>
                      {city.name}
                    </MenuItem>
                  ))
                : "Error to fetch cities"}
            </TextField>
          </div>
        </div>
        <div className="group col-span-3 grid grid-cols-2 gap-x-4">
          {/* Số năm kinh nghiệm */}
          <div className="item col-span-1">
            <TextField
              id="outlined-select-currency"
              select
              defaultValue={String(expId)}
              className="w-full"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <StarIcon className="w-6 border-2 border-neutral-500 rounded-full" />
                  </InputAdornment>
                ),
              }}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                    },
                  },
                },
              }}
              onChange={(e) => setExpId(Number(e.target.value))}
            >
              <MenuItem key="0" value="0">
                Tất cả kinh nghiệm
              </MenuItem>
              {exp_year
                ? exp_year.map((exp: any) => (
                    <MenuItem key={exp.id} value={exp.id}>
                      {exp.name}
                    </MenuItem>
                  ))
                : "Error to fetch experience"}
            </TextField>
          </div>

          {/* Lương */}
          <div className="item col-span-1">
            <TextField
              id="outlined-select-currency"
              select
              defaultValue="0"
              className="w-full"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
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
                        d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </InputAdornment>
                ),
              }}
            >
              {salary_range.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>
        <Button
          className="btn-search"
          variant="contained"
          onClick={handleSearch}
        >
          Tìm kiếm
        </Button>
      </form>
    );
}

export default SearchBoxComponent;