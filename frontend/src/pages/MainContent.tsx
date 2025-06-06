import { useState } from "react";
import { AddButtonModal } from "../components/AddButtonModal";
import { ShareBrainModal } from "../components/ShareBrainModal";
import { Button } from "../components/ui/Button";
import { useFetch } from "../hooks/useFetch";
import { Card } from "../components/ui/Card";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import { useAuth } from "../hooks/useAuth";
import EmptyPlaceholder from "../components/ui/EmptyPlaceholder";

interface Content {
  link: string;
  type: string;
  title: string;
  tags: { name: string }[];
  createdAt: string;
  _id: string;
}
interface Data {
  totalPages: number;
  data: Content[];
}
const MainContent = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { token } = useAuth();
  let urlFrag;
  let titleToShow;

  if (pathname === "/home/twitter") {
    urlFrag = "tweet";
    titleToShow = "Twitter";
  } else if (pathname === "/home/youtube") {
    urlFrag = "youtube";
    titleToShow = "Youtube";
  } else if (pathname === "/home/other") {
    urlFrag = "other";
    titleToShow = "Other";
  } else if (pathname === "/home/dashboard") {
    urlFrag = "all";
    titleToShow = "All";
  } else if (pathname === "/home/tags") {
    urlFrag = "tag&value=" + searchParams.get("value");
    titleToShow = "#" + searchParams.get("value");
  } else {
    urlFrag = "invalid";
    titleToShow = "invalid";
  }
  const [currentOpenModal, setCurrentOpenModal] = useState<string>("");
  const { data, loading, refetch } = useFetch<Data>(
    `http://localhost:3000/api/v1/content?type=${urlFrag}&page=${currentPage}`
  );
  const allData = useFetch<Data>(
    "http://localhost:3000/api/v1/content?type=all"
  );
  async function handleDelete(id: string) {
    try {
      console.log("Delete handler running");
      const response = await fetch("http://localhost:3000/api/v1/content", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",

          ...(token ? { Authorization: token } : {}),
        },
        body: JSON.stringify({ linkId: id }),
      });
      if (!response.ok) {
        throw new Error("Error deleting content");
      }
      const json = await response.json();
      console.log(json);
      refetch();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      {currentOpenModal === "add_link" && (
        <AddButtonModal
          refetch={refetch}
          onClose={() => {
            setCurrentOpenModal("");
          }}
        />
      )}
      {currentOpenModal === "share" && (
        <ShareBrainModal
          onClose={() => setCurrentOpenModal("")}
          totalContents={allData.data?.data.length}
        />
      )}
      <div className="w-full bg-slate-100 flex flex-col gap-6 min-h-screen p-6">
        <div className="flex justify-between">
          <div className="text-xl lg:text-2xl text-blue-600 font-bold flex gap-1 lg:gap-2 items-center">
            {titleToShow} Links
            {!loading ? (
              <div className="text-xl font-light">
                ({data?.data.length || "0"} links)
              </div>
            ) : (
              <div>Loading</div>
            )}
          </div>
          <div className="hidden md:flex md:justify-end md:gap-4">
            <Button
              variant="secondary"
              size="md"
              text="Share Brain"
              startIcon={<ShareIcon size="md" />}
              onClick={() => setCurrentOpenModal("share")}
            />
            <Button
              variant="primary"
              size="md"
              text="Add Content"
              startIcon={<PlusIcon size="md" />}
              onClick={() => setCurrentOpenModal("add_link")}
            />
          </div>
          <div className="md:hidden flex justify-end gap-4">
            <Button
              variant="secondary"
              size="md"
              startIcon={<ShareIcon size="md" />}
              onClick={() => setCurrentOpenModal("share")}
            />
            <Button
              variant="primary"
              size="md"
              startIcon={<PlusIcon size="md" />}
              onClick={() => setCurrentOpenModal("add_link")}
            />
          </div>
        </div>

        <div className="w-full">
          {loading ? (
            <div>Loading</div>
          ) : data?.data.length ? (
            data?.data.map(
              ({ link, title, type, tags, createdAt, _id }: Content) => {
                return (
                  <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                    <div className="flex justify-center">
                      <Card
                        createdAt={createdAt}
                        link={link}
                        title={title}
                        tags={tags}
                        type={type}
                        onDelete={() => {
                          handleDelete(_id);
                        }}
                      />
                    </div>
                  </div>
                );
              }
            )
          ) : (
            <div className="w-full  p-20 flex flex-col gap-5 justify-center items-center ">
              <EmptyPlaceholder />
              <div className="text-xl text-blue-600 ">No Items to show</div>
            </div>
          )}
        </div>
      </div>

      <Paginate
        totalPages={data?.totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default MainContent;
