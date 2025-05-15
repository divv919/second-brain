import { useEffect, useState } from "react";
import { AddButtonModal } from "../components/AddButtonModal";
import { ShareBrainModal } from "../components/ShareBrainModal";
import { Button } from "../components/ui/Button";
import { useFetch } from "../hooks/useFetch";
import { Card } from "../components/ui/Card";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

interface Content {
  link: string;
  type: string;
  title: string;
  tags: { name: string }[];
  createdAt: string;
}
const MainContent = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

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
  const { data, error, loading, refetch } = useFetch<Content[]>(
    "http://localhost:3000/api/v1/content?type=" + urlFrag
  );
  const allData = useFetch<Content[]>(
    "http://localhost:3000/api/v1/content?type=all"
  );

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
          totalContents={allData.data?.length}
        />
      )}
      <div className="bg-slate-100 flex flex-col gap-4 min-h-screen p-5">
        <div className="flex justify-between">
          <div className="text-2xl font-bold flex gap-2">
            {titleToShow} Links
            {!loading ? (
              <div className="text-2xl font-light">({data?.length} links)</div>
            ) : (
              <div>Loading</div>
            )}
          </div>
          <div className="flex justify-end gap-4">
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
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          {loading ? (
            <div>Loading</div>
          ) : (
            data?.map(({ link, title, type, tags, createdAt }: Content) => {
              return (
                <Card
                  createdAt={createdAt}
                  link={link}
                  title={title}
                  tags={tags}
                  type={type}
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default MainContent;
