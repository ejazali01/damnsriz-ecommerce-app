import React, { useRef, useState } from "react";
import "./style.css";

const Dashboard = () => {
  const [tooltip, setTooltip] = useState(false);
  const tooltipRef = useRef();

  const handleTooltipOpen = (text) => {
    setTooltip(text);
    if (tooltipRef.current) {
      tooltipRef.current.style.display = "block";
    }
  };

  const handleTooltipClose = (text) => {
    if (tooltipRef.current) {
      tooltipRef.current.style.display = "none";
    }
  };

  if (window.scrollY ) {
    window.scroll(0, 0); // reset the scroll position to the top left of the document.
  }
  return (
    <>
      <div className=" w-full h-screen flex justify-center p-6 bg-green-200 ">
        <div className=" text-black w-3/4 h-[600px] bg-white p-4 rounded-lg">
          <div className="text-sm ">Hey Dashboard</div>

        </div>
      </div>
    </>
  );
};

export default Dashboard;
