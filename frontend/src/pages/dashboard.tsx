import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { SideBar } from "../components/ui/SideBar";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { AddButtonModal } from "../components/AddButtonModal";
import { useState } from "react";
import { ShareBrainModal } from "../components/ShareBrainModal";
export function Dashboard() {
  const [currentOpenModal, setCurrentOpenModal] = useState<string>("");

  return (
    <div className="flex">
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
      <div className="w-1/5">
        <SideBar />
      </div>
      <div className="w-4/5">
        <div className="bg-slate-100 flex flex-col gap-4 h-screen p-5">
          <div className="flex justify-between">
            <div className="text-2xl font-bold">All Links</div>
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
            <Card
              type="tweet"
              title="first tweet"
              link="https://twitter.com/Priyansh_31Dec/status/1920824012571025816"
              tags={["javascript", "#newOne", "tweet"]}
            />
            <Card
              type="youtube"
              title="first video"
              link="https://www.youtube.com/embed/dJZTSs8GoPc?si=D_mS2vqRyA9WKiIi"
              tags={[
                "types",
                "#hackathons",
                "best",
                "mor__ee",
                "###MOreTag",
                "add",
                "Hahs",
              ]}
            />
            <Card
              type="youtube"
              title="first video"
              link="https://www.youtube.com/embed/dJZTSs8GoPc?si=D_mS2vqRyA9WKiIi"
              tags={[
                "types",
                "#hackathons",
                "best",
                "mor__ee",
                "###MOreTag",
                "add",
                "Hahs",
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
