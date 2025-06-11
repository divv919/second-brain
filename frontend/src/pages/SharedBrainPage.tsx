import { useFetch } from "../hooks/useFetch";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { useState } from "react";
import Paginate from "../components/Paginate";
import { Card } from "../components/ui/Card";
import { ImportIcon } from "../icons/ImportIcon";
import Skeleton from "react-loading-skeleton";
import NotFound from "../components/ui/NotFound";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
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
  const { user } = useAuth();
  const params = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const { token, getUsername } = useAuth();
  const { enableSnackbar } = useToast();

  const { data, loading, error } = useFetch<SharedBrainData>(
    `${import.meta.env.VITE_BACKEND_ROOT_URL}/api/v1/brain/${encodeURIComponent(
      params.hash || -1
    )}?page=${currentPage}`
  );

  const handleImport = async () => {
    if (!user) {
      navigate("/auth?redirectTo=" + location.pathname);
    } else {
      try {
        if (getUsername() === data?.userDetails?.userId?.username) {
          enableSnackbar("Cannot import own content", "error");
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_ROOT_URL}/api/v1/content`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: token } : {}),
            },
            body: JSON.stringify(data?.contentsByUser.data),
          }
        );
        if (!response.ok) {
          throw new Error();
        }

        enableSnackbar("Imported successfully", "success");
      } catch (err) {
        enableSnackbar("Imported failed", "error");
        console.log(err);
      }
    }
  };
  if (error) {
    return (
      <div className="min-h-screen p-10 bg-blue-50 flex flex-col items-center gap-6">
        <div className="w-1/3 min-w-80 max-w-200 aspect-4/3 ">
          <NotFound />
        </div>
        <div className="flex flex-col gap-6 items-center">
          <div className="text-xl">The content is not publicly available</div>
          <Link to="/home">
            <Button text="Dashboard" variant="primary" />
          </Link>
        </div>
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className="min-h-screen  p-10 bg-blue-50 flex flex-col gap-6">
        <main className="flex justify-between">
          <div className="w-1/2 ">
            <Skeleton height={30} />
          </div>
          <div className="w-1/8">
            <Skeleton height={30} />
          </div>
        </main>
        <main>
          <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            <div className="flex justify-center">
              <div className="w-full">
                <Skeleton height={300} />
              </div>
            </div>
            <div className="w-full">
              <Skeleton height={300} />
            </div>
            <div className="w-full">
              <Skeleton height={300} />
            </div>
            <div className="w-full">
              <Skeleton height={300} />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-10 bg-blue-50 flex flex-col gap-6">
      <div className="flex justify-between">
        <div className="text-xl lg:text-2xl text-wrap text-blue-600 font-bold flex flex-col items-start md:flex-row gap-1 lg:gap-2 md:items-center">
          {data?.userDetails?.userId?.username}
          's Links
          <div className="text-xl font-normal">
            ({data?.contentsByUser.data.length} links)
          </div>
        </div>

        <>
          <div className="md:hidden">
            <Button
              text=""
              variant="primary"
              startIcon={<ImportIcon size="md" />}
              onClick={handleImport}
            />
          </div>
          <div className="hidden md:block">
            <Button
              text="Import Content"
              variant="primary"
              startIcon={<ImportIcon size="md" />}
              onClick={handleImport}
            />
          </div>
        </>
      </div>

      <div>
        <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {data?.contentsByUser.data.map((content) => {
            return (
              <Card
                createdAt={content.createdAt}
                type={content.type}
                title={content.title || ""}
                link={content.link}
              />
            );
          })}
        </div>
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
