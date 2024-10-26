export type CommentPost = {
  title: string;
  content: string;
  tastyApiId: number;
};

export type CommentGet = {
  id: number;
  title: string;
  content: string;
  createdBy: string;
  tastyApiId: number;
};
