import "./EditForm.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EditSchema } from "./EditConstants";
import { zodResolver } from "@hookform/resolvers/zod";

interface IProps {
  content: string;
  commentId: number;
  setOpenCommentId: React.Dispatch<React.SetStateAction<number | null>>;
  setEditCommentId: React.Dispatch<React.SetStateAction<number | null>>;
}

const EditForm: React.FC<IProps> = ({ content, commentId, setOpenCommentId, setEditCommentId }) => {
  const onCancel = () => {
    setEditCommentId(null);
    setOpenCommentId(null);
  };

  const form = useForm<z.infer<typeof EditSchema>>({
    resolver: zodResolver(EditSchema),
    defaultValues: {
      content,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const handleEdit = async (values: z.infer<typeof EditSchema>) => {
    try {
      const response = await axios.patch(
        `https://panda-market-api.vercel.app/comments/${commentId}`,
        {
          content: values.content,
        }
      );

      if (response.status === 200) {
        form.reset();
        toast.success("댓글이 수정되었습니다.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("상세페이지 EditForm onEdit PATCH 요청에서 API 오류 발생", error);
        toast.error(error.response?.data.message);
      } else {
        console.error("상세페이지 EditForm onEdit PATCH 요청에서 알 수 없는 오류 발생", error);
        toast.error("오류가 발생하였으니 잠시 후 다시 시도해주세요.");
      }
    } finally {
      setEditCommentId(null);
      setOpenCommentId(null);
    }
  };

  return (
    <form className="editForm" onSubmit={form.handleSubmit(handleEdit)}>
      <textarea
        {...form.register("content")}
        id="editComment"
        defaultValue={content}
        rows={5}
        className="editItemContents"
      />
      <div className="editBtnBox">
        <button className="cancelBtn" onClick={onCancel}>
          취소
        </button>
        <button type="submit" className="editBtn" disabled={!form.formState.isValid}>
          {isLoading ? "수정중" : "수정 완료"}
        </button>
      </div>
    </form>
  );
};

export default EditForm;
