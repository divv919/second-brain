import { useEffect, useState } from "react";
import Fallback from "./ui/Fallback";
import Skeleton from "react-loading-skeleton";
import Image from "./ui/Image";
const OtherPreview = ({ link }: { link: string }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{
    title: string | null;
    description: string | null;
    img: string | null;
  }>({ title: null, description: null, img: null });
  const newWord = data.title?.replace("- YouTube", "");
  console.log(newWord);
  useEffect(() => {
    const fetchPreviewData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_ROOT_URL}/api/v1/preview?url=` + link
        );
        const responseData = await response.json();
        console.log("data fetched is : ", responseData);
        if (!response.ok) {
          throw new Error();
        }
        setData(responseData);
      } catch (err) {
        setError(true);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPreviewData();
  }, [link]);
  if (error) {
    return (
      <div className="h-full w-full">
        <Fallback text="No Preview" />
      </div>
    );
  }
  if (loading) {
    return (
      <div className="w-full h-full">
        <Skeleton height="100%" />
      </div>
    );
  }

  return (
    <div>
      <div className="w-full aspect-video ">
        {/* <img
          className="w-full h-full "
          src={
            data.img === null
              ? `https://picsum.photos/id/${Math.floor(
                  Math.random() * 1000
                )}/800/450`
              : data.img
          }
        /> */}
        <Image link={data.img || undefined} />
      </div>
    </div>
  );
};
export default OtherPreview;
