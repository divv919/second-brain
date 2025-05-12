import { useEffect, useState } from "react";
import { AddButtonModal } from "../components/AddButtonModal";
import { ShareBrainModal } from "../components/ShareBrainModal";
import { Button } from "../components/ui/Button";
import { useFetch } from "../hooks/useFetch";
import { Card } from "../components/ui/Card";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";

interface Content {
  link: string;
  type: string;
  title: string;
  tags: { name: string }[];
}
const OtherLinksPage = () => {
  const [currentOpenModal, setCurrentOpenModal] = useState<string>("");
  const { data, error, loading, refetch } = useFetch<Content[]>(
    "http://localhost:3000/api/v1/content?type=other"
  );
  useEffect(() => {
    console.log(data);
  }, [data]);

  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <>
      {currentOpenModal === "add_link" && (
        <AddButtonModal
          onClose={() => {
            setCurrentOpenModal("");
          }}
        />
      )}
      {currentOpenModal === "share" && (
        <ShareBrainModal onClose={() => setCurrentOpenModal("")} />
      )}
      <div className="bg-slate-100 flex flex-col gap-4 min-h-screen p-5">
        <div className="flex justify-between">
          <div className="text-2xl font-bold flex gap-2">
            All Links
            <div className="text-2xl font-light">({data?.length} links)</div>
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
          {data?.map(({ link, title, type, tags }: Content) => {
            return <Card link={link} title={title} tags={tags} type={type} />;
          })}
        </div>
      </div>
    </>
  );
};

export default OtherLinksPage;
