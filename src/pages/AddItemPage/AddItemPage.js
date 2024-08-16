import { useState } from "react";
import "./AddItemPage.css";
import Navbar from "../../components/Navbar/Navbar";
import ItemForm from "../../components/ItemForm/ItemForm";

const INITIAL_VALUES = {
  imgFile: null,
  title: "",
  content: "",
  price: "",
  tags: [],
};

function AddItemPage() {
  const [values, setValues] = useState(INITIAL_VALUES);

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    setValues(INITIAL_VALUES);
  };

  const handleTagChange = (updatedItems) => {
    setValues((prevValues) => ({
      ...prevValues,
      tags: updatedItems,
    }));
  };

  const isFormValid = () => {
    return (
      values.imgFile !== null &&
      values.title !== "" &&
      values.content !== "" &&
      values.price !== "" &&
      values.tags.length !== 0
    );
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <form className="AddItem-bar">
          <h2 className="AddItem-bar-title">상품 등록하기</h2>
          <button
            onClick={handleSubmit}
            className="AddItem-bar-button"
            type="submit"
            disabled={!isFormValid()}
          >
            등록
          </button>
        </form>
        <ItemForm
          values={values}
          handleChange={handleChange}
          handleInputChange={handleInputChange}
          handleTagChange={handleTagChange}
        />
      </div>
    </>
  );
}

export default AddItemPage;
