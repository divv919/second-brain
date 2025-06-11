import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import Fallback from "./Fallback";

const Image = ({ link = "fallback.com" }: { link?: string }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    console.log("is loading : ", loading);
  }, [loading]);
  function handleLoad() {
    setLoading(false);
  }
  function handleError() {
    setError(true);
    setLoading(false);
  }

  return (
    <div className=" relative w-full h-full overflow-hidden">
      {loading && (
        <div className="-mt-2 absolute w-full h-full">
          <Skeleton height="120%" style={{ borderRadius: "0px" }} />
        </div>
      )}
      {error && (
        <div className="absolute w-full h-full">
          <Fallback text="No Preview" />
        </div>
      )}
      <img
        className={`${
          loading || error ? "opacity-0" : "opacity-100"
        } h-full w-full object-cover bg-blue-600`}
        onLoad={handleLoad}
        onError={handleError}
        src={link}
      />
    </div>
  );
};

export default Image;
