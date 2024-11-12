import { addItemSchema } from "@/app/additem/zodSchema/addItemSchema"
import { instance } from "@/lib/axios"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"
import { z } from "zod"

export const useAddItem = () => {
  const addItemMutation = useMutation({
    mutationKey: ["addItem"],
    mutationFn: (values: z.infer<typeof addItemSchema>) => {
      return instance.post("/products", {
        images: values.itemImg ? [values.itemImg] : [],
        name: values.itemName,
        description: values.itemDescription,
        price: values.itemPrice,
        tags: values.itemTag?.map((tag) => tag.tag),
      });
    },
    onSuccess: (response) => {
      if (response.status === 201) {
        toast.success("제품 등록이 완료되었습니다.");
      }
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  })

  return addItemMutation;
}