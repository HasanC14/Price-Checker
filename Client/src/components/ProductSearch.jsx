import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import SkeletonCard from "./SkeletonCard";

import Binary from "../assets/binary.png";
import StarTech from "../assets/startech.png";
import Ryans from "../assets/rayans.svg";
import PCHouse from "../assets/pchousew.webp";
import TechLand from "../assets/techland.webp";
import Ultra from "../assets/ultra.webp";

import { FaCircleInfo, FaXmark } from "react-icons/fa6";
import Loader from "./Loader";
import Card from "./Card";

const ProductSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState(null);

  const handleSearch = async () => {
    setIsLoading(true);
    setProducts(null);
    try {
      console.log(inputValue);

      const response = await fetch(
        `https://price-poka-servre.vercel.app/scrape/${inputValue}`
      );
      const data = await response.json();
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex space-x-4">
          <form className="w-full ">
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Khoj the Search"
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-20 py-2 gradient-btn"
                onClick={() => handleSearch(true)}
                disabled={isLoading || !inputValue.trim()}
              >
                {isLoading ? <Loader /> : "Search"}
              </button>
              <button
                type="submit"
                className="text-gray-600 absolute end-24 bottom-5 text-sm "
                onClick={() => setInputValue("")}
                disabled={isLoading || !inputValue.trim()}
              >
                <FaXmark />
              </button>
            </div>
          </form>
        </div>
        {isLoading}
        <div className="flex text-red-500 items-center mt-1 text-xs">
          <FaCircleInfo className="mr-2" />
          Try to provide an accurate product name for better search results.
        </div>
      </div>

      {isLoading && (
        <div className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
          <div className="text-xs text-red-600 max-w-lg mx-auto text-center mt-4">
            Scraping data from multiple websites might take some time.
          </div>
        </div>
      )}

      {products && (
        <div className="mt-8">
          {Object.keys(products).map((shop) => (
            <div
              key={shop}
              className="my-8 bg_glass rounded-lg lg:p-6 p-4 lg:pb-0 pb-0"
            >
              <div className="mb-4 bg-white p-2  rounded-lg">
                {shop === "Binary" && (
                  <img src={Binary} alt={shop} className="lg:w-36 w-16" />
                )}
                {shop === "StarTech" && (
                  <img src={StarTech} alt={shop} className="lg:w-24 w-16" />
                )}
                {shop === "Ryans" && (
                  <img src={Ryans} alt={shop} className="lg:w-28 w-16" />
                )}
                {shop === "PcHouse" && (
                  <img src={PCHouse} alt={shop} className="lg:w-36 w-16" />
                )}
                {shop === "TechLand" && (
                  <img
                    src={TechLand}
                    alt={shop}
                    className="lg:w-32 w-16 bg-black p-3"
                  />
                )}
                {shop === "UltraTech" && (
                  <img src={Ultra} alt={shop} className="lg:w-28 w-16" />
                )}
              </div>

              <Swiper
                // pagination={pagination}
                pagination={{
                  dynamicBullets: true,
                  clickable: true,
                }}
                modules={[Pagination]}
                spaceBetween={20}
                breakpoints={{
                  400: { slidesPerView: 2.5 },
                  640: { slidesPerView: 3.5 },
                  1024: { slidesPerView: 4.5 },
                }}
                className="mySwiper"
              >
                {products[shop].length === 0 ? (
                  <SwiperSlide key={`${shop}-empty`}>
                    <div className="text-prime">No Product Found</div>
                  </SwiperSlide>
                ) : (
                  products[shop].map((product, index) => (
                    <SwiperSlide key={index}>
                      <Card product={product} />
                    </SwiperSlide>
                  ))
                )}
              </Swiper>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProductSearch;
