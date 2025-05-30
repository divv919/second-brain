import { useFetch } from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { useState } from "react";
import Paginate from "../components/Paginate";
import { Card } from "../components/ui/Card";
interface Content {
  link: string;
  type: string;
  title: string;
  tags: { name: string }[];
  createdAt: string;
  _id: string;
}
type SharedBrainData = {
  userDetails: {
    userId: {
      username: string;
    };
  };
  contentsByUser: {
    data: Content[];
    totalPages: number;
  };
};
const SharedBrainPage = () => {
  const params = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, loading } = useFetch<SharedBrainData>(
    `http://localhost:3000/api/v1/brain/${encodeURIComponent(
      params.hash || -1
    )}?page=${currentPage}`
  );
  return (
    <div className="p-10 bg-blue-50 flex flex-col gap-6">
      <div className="flex justify-between">
        <div className="text-2xl text-blue-600 font-bold flex gap-2 items-center">
          {data?.userDetails?.userId?.username}'s Links
          {!loading ? (
            <div className="text-xl font-normal">
              ({data?.contentsByUser.data.length} links)
            </div>
          ) : (
            <div>Loading</div>
          )}
        </div>

        <Button text="Export Content" variant="primary" />
      </div>
      <div className="grid grid-cols-3 gap-6">
        {data?.contentsByUser.data.map((content) => {
          return (
            <div className="flex justify-center">
              <Card
                createdAt={content.createdAt}
                type={content.type}
                title={content.title || ""}
                link={content.link}
              />
            </div>
          );
        })}
      </div>
      <Paginate
        totalPages={data?.contentsByUser.totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
export default SharedBrainPage;
