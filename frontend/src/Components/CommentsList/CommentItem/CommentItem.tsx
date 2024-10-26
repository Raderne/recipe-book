import { FaRegUser } from "react-icons/fa";
import { CommentGet } from "../../../Models/Comment";
import { LuSubtitles } from "react-icons/lu";
import { BiBookContent } from "react-icons/bi";

type Props = {
  comment: CommentGet | undefined;
};

const CommentItem = ({ comment }: Props) => {
  return (
    <div className="w-full border-b-2 border-offwhite pb-6 last:border-none last:pb-0">
      <h1
        className="text-3xl font-black font-neue flex items-center"
        title={comment?.createdBy}
      >
        <FaRegUser className="text-xl mr-3" />
        {comment?.createdBy}
      </h1>
      <h1
        className="text-2xl font-black font-neue flex items-center"
        title={comment?.title}
      >
        <LuSubtitles className="text-xl mr-3" />
        {comment?.title}
      </h1>
      <p className="flex">
        <BiBookContent className="text-xl mr-3" />
        {comment?.content}
      </p>
    </div>
  );
};

export default CommentItem;
