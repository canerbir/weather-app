import { useState, useEffect } from "react";
import axios from "axios";
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";
import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";
import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";

const APIkey = "fd4ffb10b9a7fb6d1e2acc73214e4a9b";

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Dörtyol");
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue !== "") {
      setLocation(inputValue);
    }

    const input = document.querySelector("input");

    if (input.value === "") {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }

    input.value = "";
  };

  useEffect(() => {

    setLoading(true);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;

    axios.get(url).then((res) => {
      setTimeout(() => {
        setData(res.data);
        setLoading(false);
      }, 700)
    }).catch(err => {
      setLoading(false);
      setErrorMsg(err)
    })
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("")
    }, 2000)
    return () => clearTimeout(timer);
  }, [errorMsg])

  if (!data) {
    return (
      <div className="h-screen flex justify-center items-center bg-imageBg">
        <div>
          <ImSpinner8 className="text-5xl animate-spin" />
        </div>
      </div>
    );
  }

  let icon;
  console.log(data.weather[0].main);
  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy className="text-gray-300" />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill className="text-gray-400" />;
      break;
    case "Rain":
      icon = <IoMdRainy className="text-blue-300" />;
      break;
    case "Clear":
      icon = <IoMdSunny className="text-yellow-400" />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill className="text-blue-300" />;
      break;
    case "Snow":
      icon = <IoMdSnow className="text-blue-100" />;
      break;
    case "Thunderstrom":
      icon = <IoMdThunderstorm className="text-gray-500" />;
      break;
  }

  const date = new Date();

  return (
    <div
      className="text-white w-full h-screen bg-imageBg bg-no-repeat bg-cover bg-center
     flex flex-col items-center justify-center px-4 lg:px-0"
    >
      {errorMsg && <div className="">{`${errorMsg.response.data.message}`}</div>}
      <form
        className={`${animate ? "animate-shake" : "animate-none"
          }h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8`}
      >
        <div className="h-full relative flex items-center justify-center p-2">
          <input
            onChange={(e) => handleInput(e)}
            className="flex-1 bg-transparent outline-none text-white placeholder:text-white
           text-[15px] font-light pl-6 h-full"
            type="text"
            placeholder="Şehir veya ülke arayın"
          />
          <button
            onClick={(e) => handleSubmit(e)}
            className="hover:bg-black/20 w-20 h-12 rounded-full flex justify-center items-center transition"
          >
            <IoMdSearch className="text-white text-2xl" />
          </button>
        </div>
      </form>
      <div
        className="w-full max-w-[450px] bg-black/20 min-h-[584px] text-whitebackdrpo-blur-[32px] rounded-[32px] py-12 px-6">
        {loading ? <div className="w-full h-full flex justify-center items-center">
          <ImSpinner8 className="text-5xl animate-spin" />
        </div> :
          <div>
            <div className="flex items-center gap-x-5">
              <div className="text-[87px]">{icon}</div>
              <div>
                <div className="text-2xl font-semibold">
                  {data.name}, {data.sys.country}
                </div>
                <div>
                  {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                  {date.getUTCFullYear()}
                </div>
              </div>
            </div>
            <div className="my-20">
              <div className="flex justify-center items-center">
                <div className="text-[144px] leading-none">
                  {parseInt(data.main.temp)}
                </div>
                <div className="text-4xl">
                  <TbTemperatureCelsius />
                </div>
              </div>
              <div className="capitalize text-center">
                {data.weather[0].description}
              </div>
            </div>
            <div className="max-w-[378px] mx-auto flex flex-col gap-y-6 my-6">
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  <div className="text-[20px]">
                    <BsEye />
                  </div>
                  <div>
                    Görüş Mesafesi{" "}
                    <span className="ms-2">
                      {data.visibility / 1000}
                      km
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className="text-[20px]">
                    <BsThermometer />
                  </div>
                  <div className="flex">
                    Hissedilen
                    <div className="flex ml-2">
                      {parseInt(data.main.feels_like)}
                      <TbTemperatureCelsius />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-[378px] mx-auto flex flex-col gap-y-6">
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  <div className="text-[20px]">
                    <BsWater />
                  </div>
                  <div>
                    Nem <span className="ml-2">{data.main.humidity}%</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className="text-[20px]">
                    <BsWind />
                  </div>
                  <div>
                    Rüzgar <span className="ml-2">{data.wind.speed} m/s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
