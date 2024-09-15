import { useState } from "react";
import Navbar from "../../components/Navbar";
import ItemForm from "./components/ItemForm";
import styled from "styled-components";
import { Container } from "../../styles/Container";

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
      <AddItemPageContainer>
        <ItemForm
          values={values}
          handleChange={handleChange}
          handleInputChange={handleInputChange}
          handleTagChange={handleTagChange}
          onSubmit={handleSubmit}
        />
      </AddItemPageContainer>
    </>
  );
}

export default AddItemPage;

const AddItemPageContainer = styled.div`
  ${Container}
`;
