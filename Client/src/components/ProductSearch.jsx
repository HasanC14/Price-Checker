import { useState } from "react";
import Binary from "../assets/binary.png";
import StarTech from "../assets/startech.png";
import Ryans from "../assets/rayans.svg";
import PCHouse from "../assets/pchousew.webp";
import TechLand from "../assets/techland.webp";
import Ultra from "../assets/ultra.webp";
import { FaCircleInfo } from "react-icons/fa6";

const extractNumbersFromString = (str) => {
  const regex = /[0-9]+(?:,[0-9]{3})*(?:\.[0-9]+)?/g;
  const matches = str.match(regex);

  if (matches && matches.length > 0) {
    // Return the last match found (assuming it's the main numeric value)
    const lastMatch = matches[matches.length - 1];
    const numericString = lastMatch.replace(/,/g, ""); // Remove commas
    return parseFloat(numericString); // Parse to float
  } else {
    return "Out Of Stock"; // Return NaN if no numeric value found
  }
};
const ProductSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState(null);
  const [loadingGif, setLoadingGif] = useState("");

  const gifUrls = [
    "https://giphy.com/embed/rIpm4UI7pv7WFiSm4s",
    "https://giphy.com/embed/ZXf6dCfo4h9br1PMEQ",
    "https://giphy.com/embed/RIwWQuRrVJLC4AB5Ik",
    "https://giphy.com/embed/ghbSg8kaE3U15aD2cp",
    "https://giphy.com/embed/gIzLZvcPFQyeQd4oRY",
    "https://giphy.com/embed/9itja4ux9fpFTSu7le ",
    "https://giphy.com/embed/l2Rno9dUdSVxorDj2",
  ];

  const handleSearch = async () => {
    setIsLoading(true);
    setLoadingGif(gifUrls[Math.floor(Math.random() * gifUrls.length)]);
    try {
      const response = await fetch(
        `http://localhost:3000/scrape?product=${inputValue}`
      );
      const data = await response.json();
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
              placeholder="❌monitor ✅Msi Pro MP251"
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 gradient-btn"
              onClick={handleSearch}
              disabled={isLoading || !inputValue.trim()}
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>
        <div className="flex text-red-500 items-center mt-1">
          <FaCircleInfo
            className="mr-2"
            // title="Please provide a accurate product name for better results."
          />
          Try to provide a accurate product name for better results.
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center mt-4">
          <iframe
            src={loadingGif}
            width="480"
            height="271"
            style={{ border: "none" }}
            frameBorder="0"
            className="giphy-embed"
            allowFullScreen
            title="Loading"
          ></iframe>
        </div>
      )}

      {products && (
        <div className="mt-8">
          {Object.keys(products).map((shop) => (
            <div key={shop} className="my-8">
              <div className="mb-4">
                {shop === "Binary" && (
                  <img src={Binary} alt={shop} className="w-36" />
                )}
                {shop === "StarTech" && (
                  <img src={StarTech} alt={shop} className="w-32" />
                )}
                {shop === "Ryans" && (
                  <img src={Ryans} alt={shop} className="w-32" />
                )}
                {shop === "PC House" && (
                  <img src={PCHouse} alt={shop} className="w-36" />
                )}
                {shop === "TechLand" && (
                  <img
                    src={TechLand}
                    alt={shop}
                    className="w-32 bg-black p-3"
                  />
                )}
                {shop === "Ultra Technology" && (
                  <img src={Ultra} alt={shop} className="w-32" />
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products[shop].length <= 0 ? (
                  <div className="text-prime">No Product Found</div>
                ) : (
                  ""
                )}

                {products[shop].map((product, index) => (
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={index}
                    className="bg_glass rounded-lg overflow-hidden shadow-md text-prime hover:scale-105 transition-all ease-in-out duration-500 p-2 space-y-2"
                  >
                    <img
                      src={product?.img}
                      alt={product?.price}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <h6 className="text-sm truncate">{product?.name}</h6>

                    <p className="text-xl font-semibold pb-3 gradient-text">
                      {extractNumbersFromString(product?.price) == 0
                        ? "Out Of Stock"
                        : extractNumbersFromString(product?.price)}
                      ৳
                    </p>
                    {/* <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline hover:text-blue-700"
                      >
                        View Product
                      </a> */}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProductSearch;
