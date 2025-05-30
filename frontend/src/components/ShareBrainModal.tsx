import { useFetch } from "../hooks/useFetch";
import { CloseIcon } from "../icons/CloseIcon";
import { CopyIcon } from "../icons/CopyIcon";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { useState } from "react";
import { useEffect } from "react";
// import InputCheckbox from "./ui/InputCheckbox";

export const ShareBrainModal = ({
  onClose,
  totalContents = 0,
}: {
  onClose: () => void;
  totalContents?: number;
}) => {
  // const LinkSharingData = useFetch("http://localhost:3000/api/v1/brain/share");
  const [showUserState, setShowUserState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actualState, setActualState] = useState(false);
  useEffect(() => {
    console.log("Loading : ", loading);
  }, [loading]);
  useEffect(() => {
    try {
      async function checkEnableShare() {
        try {
          setLoading(true);

          const response = await fetch(
            "http://localhost:3000/api/v1/brain/share",
            {
              credentials: "include",
              headers: {
                Authorization:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODIxYTUyYTUxOWU1NjdmYThmMzRkNjEiLCJpYXQiOjE3NDcwMzU0Mzh9.C5rS8L233xWV23KbNvkZGAQyrYOVysdxBuT_9yS5cbo",
              },
            }
          );
          if (!response.ok) {
            throw new Error("Error changing enable share");
          }
          const json = await response.json();
          console.log("Enable share get req ", json?.shareLink);
          setLoading(false);
          setActualState(json?.shareLink);
          // setEnabledForShare(json?.enableShare);
        } catch (err) {
          console.log(err);
          setLoading(false);

          // setEnabledForShare(!enabledForShare);
        }
      }
      checkEnableShare();
    } catch (err) {}
  }, []);

  useEffect(() => {
    if (!loading) {
      setShowUserState(actualState);
    }
  }, [actualState]);
  // useEffect(() => {
  //   async function changeEnableShare() {
  //     console.log("Use effect is run");
  //     try {
  //       const response = await fetch(
  //         "http://localhost:3000/api/v1/brain/share",
  //         {
  //           credentials: "include",
  //           method: "POST",
  //           body: JSON.stringify({
  //             toShare: enabledForShare,
  //           }),
  //           headers: {
  //             "Content-Type": "application/json",

  //             Authorization:
  //               "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODIxYTUyYTUxOWU1NjdmYThmMzRkNjEiLCJpYXQiOjE3NDcwMzU0Mzh9.C5rS8L233xWV23KbNvkZGAQyrYOVysdxBuT_9yS5cbo",
  //           },
  //         }
  //       );
  //       if (!response.ok) {
  //         throw new Error("Error changing enable share");
  //       }
  //       const json = await response.json();
  //       // setEnabledForShare(json?.enableShare);
  //     } catch (err) {
  //       console.log(err);
  //       setEnabledForShare(!enabledForShare);
  //     }
  //   }
  //   changeEnableShare();
  // }, [enabledForShare]);

  async function handleEnableShare(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/v1/brain/share", {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          toShare: !actualState,
        }),
        headers: {
          "Content-Type": "application/json",

          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODIxYTUyYTUxOWU1NjdmYThmMzRkNjEiLCJpYXQiOjE3NDcwMzU0Mzh9.C5rS8L233xWV23KbNvkZGAQyrYOVysdxBuT_9yS5cbo",
        },
      });
      if (!response.ok) {
        throw new Error("Error changing enable share");
      }
      setActualState(!actualState);
      // setEnabledForShare(json?.enableShare);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  async function handleCopy() {
    try {
      const response = await fetch("http://localhost:3000/api/v1/brain/share", {
        credentials: "include",
        method: "POST",
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODIxYTUyYTUxOWU1NjdmYThmMzRkNjEiLCJpYXQiOjE3NDcwMzU0Mzh9.C5rS8L233xWV23KbNvkZGAQyrYOVysdxBuT_9yS5cbo",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ enableShare: true }),
      });
      if (!response.ok) {
        throw new Error("Error enabling link share");
      }
      const json = await response.json();
      await navigator.clipboard.writeText(
        "http://localhost:5173/sharedBrain/" + encodeURIComponent(json.link)
      );
      alert("link copied");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="flex  h-full w-full top-0 left-0  justify-center fixed z-100 items-center">
      <div className="bg-black opacity-80 w-screen h-screen  "></div>

      <div className="fixed w-1/3 min-h-1/2 bg-white p-6 flex flex-col gap-8 rounded-md">
        <div className="flex justify-between border-b border-gray-300 pb-2">
          <div className="text-xl font-semibold text-blue-600">
            Share Your Second Brain
          </div>
          <div className="text-gray-800 cursor-pointer" onClick={onClose}>
            <CloseIcon size="md" />
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="w-full break-words text-gray-800 text-md ">
            Share your entire contents of Notes, Documents, Tweets and Video
            links stored in your Second Brain with others. <br />
            Person with the link will be able to see and import all your
            contents into their own Second Brain.
          </div>
          <Input
            label="Enable sharing"
            inSameLine={true}
            type="checkbox"
            onChange={(e) => e && handleEnableShare(e)}
            checked={showUserState}
            loading={loading}
          />
          <div className="flex flex-col gap-2">
            <Button
              text="Copy Link"
              variant="primary"
              endIcon={<CopyIcon size="md" />}
              size="md"
              onClick={handleCopy}
            />
            <div className="text-center text-gray-800 text-md">
              {totalContents} Contents will be shared
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
