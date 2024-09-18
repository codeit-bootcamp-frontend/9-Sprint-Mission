import { ChangeEvent, FormEvent, useReducer } from "react";
import Navbar from "../../components/Navbar";
import ItemForm from "./components/ItemForm";
import { Container } from "../../styles/Container";
import { ItemFormValues } from "../../types/types";

const INITIAL_VALUES: ItemFormValues = {
  imgFile: null,
  title: "",
  content: "",
  price: "",
  tags: [],
};

type Action =
  | { type: "CHANGE_VALUE"; name: string; value: string | File | null }
  | { type: "CHANGE_TAGS"; tags: { id: number; value: string }[] }
  | { type: "RESET" };

function reducer(state: ItemFormValues, action: Action): ItemFormValues {
  switch (action.type) {
    case "CHANGE_VALUE":
      return { ...state, [action.name]: action.value };
    case "CHANGE_TAGS":
      return { ...state, tags: action.tags };
    case "RESET":
      return INITIAL_VALUES;
    default:
      return state;
  }
}

function AddItemPage() {
  const [values, dispatch] = useReducer(reducer, INITIAL_VALUES);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch({ type: "CHANGE_VALUE", name, value });
  };

  const handleFileChange = (name: string, file: File | null) => {
    dispatch({ type: "CHANGE_VALUE", name, value: file });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);
    dispatch({ type: "RESET" });
  };

  const handleTagChange = (updatedItems: { id: number; value: string }[]) => {
    dispatch({ type: "CHANGE_TAGS", tags: updatedItems });
  };

  return (
    <>
      <Navbar />
      <Container>
        <ItemForm
          values={values}
          handleFileChange={handleFileChange}
          handleInputChange={handleInputChange}
          handleTagChange={handleTagChange}
          onSubmit={handleSubmit}
        />
      </Container>
    </>
  );
}

export default AddItemPage;
