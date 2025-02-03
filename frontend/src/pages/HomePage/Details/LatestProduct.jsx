import { ChevronLeft, ChevronRight } from "lucide-react"; // Importing icons
import { useRef } from "react";
import ProductCard from "../../../components/ProductCard";

const LatestProduct = ({ products }) => {
  const scrollRef = useRef(null);

  // Scroll left
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  // Scroll right
  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className="w-full px-4">
      {/** Header section */}
      <div className="flex justify-between items-center mt-5">
        <h2 className="text-lg font-bold">Latest Drop</h2>

        {/** Chevron Icons */}
        <div className="flex items-center gap-2">
          <button className="p-2 bg-primary rounded-full" onClick={scrollLeft}>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-bold">Shop</span>
          <button className="p-2 bg-primary rounded-full" onClick={scrollRight}>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/** Scrollable products list */}
      <div className="relative">
        <div
          ref={scrollRef} // 👈 Fix: Added reference here
          className="flex overflow-x-auto gap-4 mt-3 mb-6 scrollbar-hide scroll-smooth flex-nowrap"
        >
          {products.map((product) => (
            <ProductCard product={product}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestProduct;
