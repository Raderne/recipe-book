import { useEffect, useState } from "react";
import { CommentGet, CommentPost } from "../../Models/Comment";
import { getAllComments, postComment } from "../../Services/CommentServices";
import CommentItem from "./CommentItem/CommentItem";
import { useAuth } from "../../Context/useAuth";
import { FaRegUserCircle } from "react-icons/fa";
import { RecipeGet } from "../../Models/Recipe";
import { IoSend } from "react-icons/io5";
import { handleError } from "../../Helpers/ErrorHandler";
import { VscLoading } from "react-icons/vsc";

type Props = {
  tastyApiId: number | undefined;
  savedRecipe: RecipeGet | undefined;
};

const CommentsList = ({ tastyApiId, savedRecipe }: Props) => {
  const [allComments, setAllComments] = useState<CommentGet[]>();
  const [loadingComments, setLoadingComments] = useState(false);
  const [comment, setComment] = useState<CommentPost>({
    title: "",
    content: "",
    tastyApiId: tastyApiId as number,
  });
  const [postingComment, setPostingComment] = useState(false);
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

  const handlePostComment = async () => {
    if (!comment.title || !comment.content) {
      return;
    }
    let id;

    if (!savedRecipe?.id) {
      id = 4;
    } else {
      id = savedRecipe?.id;
    }

    setPostingComment(true);
    try {
      const res = await postComment(comment, id as number);
      if (res && res.data) {
        setAllComments([...allComments!, res.data]);
      }
      setComment({ title: "", content: "", tastyApiId: tastyApiId as number });
      setPostingComment(false);
    } catch (error) {
      handleError(error);
    }
  };

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
          value={comment?.title}
          onChange={(e) => setComment({ ...comment, title: e.target.value })}
        />
        <div className="flex pb-2">
          <textarea
            id="PostComment"
            className="w-full h-28 p-2 resize-none bg-[#323555] text-offwhite focus:outline-none rounded-lg"
            placeholder="Write a comment..."
            value={comment?.content}
            onChange={(e) =>
              setComment({ ...comment, content: e.target.value })
            }
          ></textarea>
          {isLoggedIn() && (
            <button
              className="flex items-center justify-center bg-[#323555] px-4 ml-2 rounded-lg focus:outline-none hover:bg-[#48507a] transition-colors duration-300"
              onClick={handlePostComment}
            >
              {postingComment ? (
                <VscLoading className="text-2xl animate-spin" />
              ) : (
                <IoSend className="text-2xl" />
              )}
            </button>
          )}
        </div>
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
