import { X } from "lucide-react";
import React, {
  useEffect,
  useRef,
  useState,
  type SetStateAction,
} from "react";

type AddTagsProps = {
  value: string[];
  setValue: React.Dispatch<SetStateAction<string[]>>;
  tags: string[];
};

const AddTags: React.FC<AddTagsProps> = ({ value, setValue, tags }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [tagListVis, setTagListVis] = useState(false);
  const [tagInp, setTagInp] = useState("");

  const visTagList = tags.filter(
    (tag) =>
      tag.toLowerCase().includes(tagInp.toLowerCase()) && !value.includes(tag)
  );

  const addTag = (tag: string) => {
    if (!value.includes(tag)) setValue((prev) => [...prev, tag]);
    setTagListVis(false);
    setTagInp("");
  };

  const delTag = (tag: string) => {
    setValue((prev) => prev.filter((t) => t !== tag));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    setTagInp(inputVal);
    setTagListVis(true);
  };

  // 👇 Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setTagListVis(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-[200px]" ref={wrapperRef}>
      {/* Selected tags and input */}
      <div className="flex flex-wrap items-center gap-2 border-b bg-white p-1">
        {value.map((tag) => (
          <div
            key={tag}
            className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-sm"
          >
            <span>{tag}</span>
            <button
              type="button"
              className="text-blue-600 cursor-pointer hover:text-red-500"
              onClick={() => delTag(tag)}
            >
              <X size={14} />
            </button>
          </div>
        ))}
        <input
          type="text"
          value={tagInp}
          ref={inputRef}
          className="flex-1 min-w-[100px] max-w-[120px] outline-none"
          onChange={handleInputChange}
          onFocus={() => setTagListVis(true)}
        />
      </div>

      {/* Tag dropdown list */}
      {tagListVis && visTagList.length > 0 && (
        <div className="absolute left-0 mt-1 w-full bg-white border rounded shadow z-10 max-h-40 overflow-y-auto">
          {visTagList.map((tag) => (
            <button
              key={tag}
              className="w-full text-left px-3 py-2 hover:bg-blue-100"
              onClick={() => addTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddTags;
