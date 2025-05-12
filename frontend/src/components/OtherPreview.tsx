import { useEffect, useState } from "react";

const OtherPreview = ({ link }: { link: string }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{
    title: string | null;
    description: string | null;
    img: string | null;
  }>({ title: null, description: null, img: null });
  useEffect(() => {
    const fetchPreviewData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:3000/api/v1/preview?url=" + link
        );
        const responseData = await response.json();
        console.log("data fetched is : ", responseData);
        if (!response.ok) {
          throw new Error();
        }
        setData(responseData);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPreviewData();
  }, [link]);
  if (error) {
    return <div>Error Fetching link preview</div>;
  }
  if (loading) {
    return <div>Loading preview</div>;
  }

  return (
    <div>
      <img src={data.img === null ? "www.fallbackimage.com" : data.img} />
      {/* <div>{data.title || "Title not found"}</div> */}
      <div>{data.description || "Description not found"}</div>
    </div>
  );
};
export default OtherPreview;
