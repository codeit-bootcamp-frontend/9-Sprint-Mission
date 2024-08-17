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

  return (
    <>
      <Navbar />
      <div className="container">
        <ItemForm
          values={values}
          handleChange={handleChange}
          handleInputChange={handleInputChange}
          handleTagChange={handleTagChange}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}

export default AddItemPage;
