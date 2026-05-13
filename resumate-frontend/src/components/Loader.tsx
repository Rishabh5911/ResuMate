import React from "react";

interface LoaderProps {
  text?: string;            
  color?: string;      
}

const Loader: React.FC<LoaderProps> = ({
  text = "Loading...",
  color = "text-white",
}) => {
  return (
    <div className={`flex items-center gap-3 ${color}`}>
      <div className="custom-loader"></div>
      <p className="animate-pulse font-medium">{text}</p>
    </div>
  );
};

export default Loader;