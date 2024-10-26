import { useEffect, useState } from "react";
import { CommentGet } from "../../Models/Comment";
import { getAllComments } from "../../Services/CommentServices";
import CommentItem from "./CommentItem/CommentItem";
import { useAuth } from "../../Context/useAuth";
import { FaRegUserCircle } from "react-icons/fa";

type Props = {
  tastyApiId: number | undefined;
};

const CommentsList = ({ tastyApiId }: Props) => {
  const [allComments, setAllComments] = useState<CommentGet[]>();
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentTitle, setCommentTitle] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    const fetchAllComments = async () => {
      setLoadingComments(true);
      const res = await getAllComments(tastyApiId as number);
      setAllComments(res?.data);
      setLoadingComments(false);
    };

    if (tastyApiId) {
      fetchAllComments();
    }
  }, [tastyApiId]);

  return (
    <div className="flex flex-col space-y-5">
      <div className="space-y-4 border-b border-offwhite">
        <h1
          className="text-3xl font-black font-neue flex items-center"
          title="Comments"
        >
          <FaRegUserCircle className="text-xl mr-3" />
          {isLoggedIn()
            ? user?.userName
            : "You must be logged in to post a comment"}
        </h1>
        <input
          id="PostTitle"
          className="w-full p-2 bg-[#323555] text-offwhite focus:outline-none rounded-lg"
          placeholder="Title"
          value={commentTitle}
          onChange={(e) => setCommentTitle(e.target.value)}
        />
        <textarea
          id="PostComment"
          className="w-full h-28 p-2 resize-none bg-[#323555] text-offwhite focus:outline-none rounded-lg"
          placeholder="Write a comment..."
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
        ></textarea>
      </div>

      {loadingComments ? (
        <p>Loading comments...</p>
      ) : allComments && allComments.length > 0 ? (
        allComments?.map((comment) => (
          <CommentItem comment={comment} key={comment.id} />
        ))
      ) : (
        <div className="text-center">
          <p className="text-xl">No Comments Yet, Be First to Comment!!</p>
        </div>
      )}
    </div>
  );
};

export default CommentsList;
