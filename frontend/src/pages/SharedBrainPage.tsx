import { useFetch } from "../hooks/useFetch";
import { useParams } from "react-router-dom";
type SharedBrainData = {
  userDetails: {
    userId: {
      username: string;
    };
  };
  contentsByUser: any[]; // You can replace `any` with the actual content structure
};
const SharedBrainPage = () => {
  const params = useParams();
  console.log(params);
  const { data, loading, error } = useFetch<SharedBrainData>(
    "http://localhost:3000/api/v1/brain/" + encodeURIComponent(params.hash || 1)
  );
  return (
    <div>
      <div>{data?.userDetails?.userId?.username}</div>
      <div>
        {data?.contentsByUser.map((content) => {
          return (
            <div>
              <div>{content.type}</div>
              <div>{content.title}</div>

              <div>{content.link}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SharedBrainPage;
