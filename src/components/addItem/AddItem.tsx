import axios from "axios";
import { useState } from "react";
import AddItemForm from "./AddItemForm";
import { useNavigate } from "react-router-dom";
import "./AddItem.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AdditemConstants } from "./AdditemConstants";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

type FormValues = z.infer<typeof AdditemConstants>;

const AddItem = () => {
  const navigate = useNavigate();

  const [src, setSrc] = useState<string | ArrayBuffer | null>(null);
  const [imgError, setImgError] = useState("");

  const { setValue, watch } = useForm<FormValues>();

  const formValues = watch();

  const form = useForm<z.infer<typeof AdditemConstants>>({
    resolver: zodResolver(AdditemConstants),
    mode: "all",
    defaultValues: {
      images: undefined,
      name: "",
      description: "",
      price: 0,
      tags: []
    }
  });

  const isLoading = form.formState.isSubmitting;
  const error = form.formState.errors;
  
  // 이미지 파일 변경함수
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length === 1) {
      const file = files[0];

      const validateImage = AdditemConstants.shape.images.safeParse(file);

      if (!validateImage.success) {
        setImgError("*이미지 등록은 최대 1개까지 가능합니다.");
        return;
      }

      setImgError("");
      setValue("images", file);

      // value를 초기화해야 취소 후 다시 같은 이미지를 업로드해도 미리보기가 잘 뜬다. 
      e.target.value = "";

      // 미리보기 생성
      const imageRead = new FileReader();

      imageRead.onloadend = () => {
        setSrc(imageRead.result);
      };
      imageRead.readAsDataURL(file);
    } 
  };

  // 업로드 이미지 삭제 함수
  const onDeleteImg = () => {
    setSrc(null);
    setValue("images", undefined);
  };

  const onSubmit = async (values: z.infer<typeof AdditemConstants>) => {
    try {
      const response = await axios.post("https://panda-market-api.vercel.app/products/", {
        images: values.images,
        name: values.name,
        description: values.description,
        price: values.price,
        tags: values.tags
      });

      if (response.status === 200) {
        const data = response.data;
        form.reset();
        navigate(`/items/${data.id}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("addItem onSubmit에서 API 오류 발생.", error);
        toast.error(error.response?.data.massege);
      } else {
        console.error("addItem onSubmit에서 알 수 없는 오류 발생.", error);
        toast.error("오류가 발생하여 등록되지 않았습니다. 잠시 후 다시 시도해주세요.");
      }
    } 
  };

  return (
    <div className="container">
      <form className="addItemForm" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="addItemHeader">
          <h1 className="headerTitle">상품 등록하기</h1>
          <button type="submit" className="headerBtn" disabled={!form.formState.isValid}>
            {isLoading ? "등록중" : "등록"}
          </button>
        </div>
        <div className="addItemImgBox">
          <h2 className="imgTitle">상품 이미지</h2>
          <div className="imgBox">
            <label htmlFor="itemImg" className="itemImg">
              <img src="/icons/plus.png" alt="파일 올리기" />
              <span>이미지 등록</span>
            </label>
            <input {...form.register("images")} type="file" id="itemImg" onChange={onChangeFile} accept="image/*" />
            {formValues.images && (
              <div className="previewBox">
                <button className="deleteBtn" onClick={onDeleteImg}>
                  <img src="/icons/delete.png" alt="삭제" />
                </button>
                <img src={src !== null ? src as string : ""} alt="사진 미리보기" className="previewImg" />
              </div>
            )}
          </div>
          {imgError !== "" && <p className="errorMsg">{imgError}</p>}
        </div>
        <AddItemForm formValues={formValues} setValue={setValue} register={form.register} error={error} />
      </form>
    </div>
  );
};

export default AddItem;
