import axios from "axios";
import { useEffect, useState } from "react";
import AddItemForm from "./AddItemForm";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { AdditemConstants } from "./AdditemConstants";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import "./AddItem.css";
import useToken from "../../hooks/useToken";

type FormValues = z.infer<typeof AdditemConstants>;

const AddItem = () => {
  const navigate = useNavigate();
  const context = useToken();

  const [src, setSrc] = useState<string>();
  const [imgError, setImgError] = useState("");

  const { setValue, getValues, watch } = useForm<FormValues>();

  const formValues = watch();

  const form = useForm<z.infer<typeof AdditemConstants>>({
    resolver: zodResolver(AdditemConstants),
    mode: "all",
    defaultValues: {
      images: null,
      name: "",
      description: "",
      price: "",
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

      setValue("images", file);
      setImgError("");

      // value를 초기화해야 취소 후 다시 같은 이미지를 업로드해도 미리보기가 잘 뜬다. 
      e.target.value = "";

      // 미리보기 생성
      const imageRead = new FileReader();

      // 타입 지정을 위해 조건문 추가
      imageRead.onloadend = () => {
        if (imageRead.result && typeof imageRead.result === "string") {
          setSrc(imageRead.result);
        }
      };

      imageRead.readAsDataURL(file);
    } 
  };

  // 업로드 이미지 삭제 함수
  const onDeleteImg = () => {
    setSrc("");
    setValue("images", null);
  };
  
  const onSubmit = async (values: z.infer<typeof AdditemConstants>) => {
    try {
      const currentValue = getValues();
      let newImgUrl: string | undefined;

      // 이미지가 등록된 경우 이미지 등록 후 새 URL 받는 과정
      if (currentValue.images) {
        const formData = new FormData();
        formData.append("image", currentValue.images);
        
        try {
          const imgUpload = await axios.post("https://panda-market-api.vercel.app/images/upload", formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${context?.accessToken}`
            }
          });
    
          if (imgUpload.status === 201) {
            newImgUrl = imgUpload.data.url;
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error("addItem 이미지 업로드 요청에서 API 오류 발생.", error);
            toast.error(error.response?.data.message);
          } else {
            console.error("addItem 이미지 업로드 요청에서 알 수 없는 오류 발생.", error);
            toast.error("오류가 발생하여 업로드되지 않았습니다. 잠시 후 다시 시도해주세요.");
          }
          return;
        }
      }
      
      // 이미지 외 자료 등록
      const response = await axios.post("https://panda-market-api.vercel.app/products/", {
        images: [newImgUrl],
        name: values.name,
        description: values.description,
        price: values.price,
        tags: currentValue.tags?.map((tag) => ({tag}))
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${context?.accessToken}`
        }
      });

      if (response.status === 200) {
        const data = response.data;
        form.reset();
        navigate(`/items/${data.id}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("addItem onSubmit에서 API 오류 발생.", error);
        toast.error(error.response?.data.message);
      } else {
        console.error("addItem onSubmit에서 알 수 없는 오류 발생.", error);
        toast.error("오류가 발생하여 등록되지 않았습니다. 잠시 후 다시 시도해주세요.");
      }
    } 
  };

  // 토큰 만료를 막기 위한 토큰 갱신
  useEffect(() => {
    const refresh = async () => {
      try {
        const response = await axios.post("https://panda-market-api.vercel.app/auth/refresh-token", {
          refreshToken: context?.accessToken
        });

        if (response.status === 200) {
          localStorage.setItem("accessToken", response.data.accessToken);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("토큰갱신 API 오류 발생", error);
        } else {
          console.error("토큰갱신 시 알 수 없는 오류 발생", error);
        }
        toast.error("로그인 상태가 아닙니다. 다시 확인해주세요.");
      }
    }

    refresh();
  }, [context?.accessToken]);

  return (
    <div className="container">
      <FormProvider {...form}>
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
                  <img src={src} alt="사진 미리보기" className="previewImg" />
                </div>
              )}
            </div>
            {imgError !== "" && <p className="errorMsg">{imgError}</p>}
            {error && <span className="errorMsg">{error.images?.message}</span>}
          </div>
          <AddItemForm formValues={formValues} setValue={setValue} error={error} />
        </form>
      </FormProvider>
    </div>
  );
};

export default AddItem;
