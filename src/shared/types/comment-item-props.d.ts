import { Comment } from "./comment";

export interface CommentItemProps {
  comment: Comment;
  dropdownVisible: number | null;
  toggleDropdown: (commentId: number) => void;
  handleEditClick: (commentId?: number) => void; // commentId를 선택적으로 받음
  handleDeleteClick: (commentId?: number) => void; // commentId를 선택적으로 받음
}
