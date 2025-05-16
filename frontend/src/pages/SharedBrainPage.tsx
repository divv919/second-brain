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
  const { data, loading, error } = useFetch<SharedBrainData>(
    `http://localhost:3000/api/v1/brain/${encodeURIComponent(
      params.hash || -1
    )}?page=${currentPage}`
  );
  return (
    <div className="p-10 bg-blue-50">
      <div className="flex justify-between">
        <div className="">
          <div className="text-2xl text-blue-600 font-bold flex gap-2 items-center">
            {data?.userDetails?.userId?.username}'s Links
            {!loading ? (
              <div className="text-xl font-light">
                ({data?.contentsByUser.data.length} links)
              </div>
            ) : (
              <div>Loading</div>
            )}
          </div>
        </div>
        <Button text="Export Content" variant="primary" />
      </div>
      <div>
        {data?.contentsByUser.data.map((content) => {
          return (
            <div>
              <div>{content.type}</div>
              <div>{content.title}</div>
              <Card
                createdAt={content.createdAt}
                type={content.type}
                title={content.title || ""}
                link={content.link}
              />
              <div>{content.link}</div>
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
