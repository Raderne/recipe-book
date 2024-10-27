import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { CommentGet, CommentPost } from "../Models/Comment";

const api = "http://localhost:5191/api/comment";

export const getAllComments = async (postId: number) => {
  try {
    const response = await axios.get<CommentGet[]>(api + `/${postId}`);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const postComment = async (comment: CommentPost, id: number) => {
  try {
    const response = await axios.post<CommentGet>(`${api}/${id}`, {
      title: comment.title,
      content: comment.content,
      tastyApiId: comment.tastyApiId,
    });
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const deleteComment = async (id: number) => {
  try {
    const response = await axios.delete(`${api}/${id}`);
    return response;
  } catch (error) {
    handleError(error);
  }
};
