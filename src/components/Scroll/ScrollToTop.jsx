import { useState, useEffect } from "react";
import { GoArrowUp } from "react-icons/go";
import "./ScrollToTop.css";

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = function () {
    if (window.scrollY > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      <div className="scroll">
        {isVisible && (
          <button className="scrollBtn" type="button" onClick={scrollToTop}>
            {" "}
            <GoArrowUp size={25} />{" "}
          </button>
        )}
      </div>
    </>
  );
}

export default ScrollToTop;
