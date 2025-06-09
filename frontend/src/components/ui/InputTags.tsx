import { useEffect, useState } from "react";
import { changeToTagFormat } from "../../utils/changeToTagFormat";
import { CloseIcon } from "../../icons/CloseIcon";
import { useAuth } from "../../hooks/useAuth";

interface InputProps {
  placeholder: string;
  type: string;
  onChange?: (str: string) => void;
  label: string;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  value: string;
  maxLength?: string;
}

interface AllTags {
  _id: string;
  name: string;
}

export const InputTags = ({
  placeholder,
  type,
  onChange,
  label,
  tags,
  setTags,
  value,
  maxLength = "300",
}: InputProps) => {
  const [allTags, setAllTags] = useState<AllTags[]>([]);
  const [results, setResults] = useState<(string | undefined)[]>([]);
  const [showSuggestion, setShowSuggestion] = useState<boolean>(false);
  const [limitReached, setLimitReached] = useState(false);
  const { token } = useAuth();
  useEffect(() => {
    async function getAllTags() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_ROOT_URL}/api/v1/tags`,
          {
            headers: {
              ...(token ? { Authorization: token } : {}),
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error getting all tags");
        }
        const data = await response.json();
        setAllTags(data);
      } catch (err) {
        console.log(err);
      }
    }
    getAllTags();
  }, []);

  useEffect(() => {
    if (tags.length >= 5) {
      setLimitReached(true);
    } else {
      setLimitReached(false);
    }
  }, [tags]);

  useEffect(() => {
    const newResults: string[] = [];
    allTags?.map((tag) => {
      const query = value.trim();
      const fullQuery = tag.name;
      if (fullQuery.includes(query)) {
        newResults.push(fullQuery);
      }
    });
    setResults(newResults);
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // rules :- first sanitize , no duplicates, no empty

      const val = changeToTagFormat(
        (e.target as HTMLInputElement).value,
        false
      );
      if (val !== "" && !tags.find((tag) => tag === val)) {
        setTags([...tags, val]);
      }
      // (e.target as HTMLInputElement).value = "";
      onChange?.("");
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, idx) => idx !== index));
  };

  const tagStyles =
    "w-max bg-surface text-primary text-xs p-1 mb-2 rounded-md cursor-pointer gap-2 flex items-center ";

  return (
    <div className="flex flex-col gap-2 ">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="p-2 border-1 flex flex-col  border-gray-300 rounded-md">
        <div className="flex gap-2 flex-wrap items-center ">
          {tags.map((tag, index) => (
            <div key={index} className={tagStyles}>
              <div>#{tag}</div>
              <div
                onClick={() => {
                  removeTag(index);
                }}
              >
                <div className="bg-primary-light text-white  rounded-md">
                  <CloseIcon size="sm" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="relative">
          <input
            className="border-1 border-gray-300 outline-primary p-2 rounded-md w-full"
            placeholder={
              limitReached ? "Cannot add more than 5 tags" : placeholder
            }
            type={type}
            onKeyDown={handleKeyDown}
            onChange={(e) => onChange?.(e.target.value)}
            value={value}
            onFocus={() => {
              setShowSuggestion(true);
            }}
            maxLength={Number(maxLength)}
            disabled={tags.length >= 5}
            onBlur={() => {
              setShowSuggestion(false);
            }}
          />

          {!limitReached && !!results.length && showSuggestion && (
            <div className="rounded-md  absolute w-full flex flex-col gap-1 p-1  border  border-gray-300 bg-surface">
              {results?.slice(0, 5).map((result) => {
                // if (index > 5) return;
                return (
                  <div
                    onMouseDown={() => {
                      if (!tags.find((tag) => tag === result)) {
                        setTags([...tags, result || ""]);
                      }

                      onChange?.("");
                    }}
                    className="border rounded-md  border-gray-300 p-2 hover:bg-surface   bg-white"
                  >
                    {result}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
