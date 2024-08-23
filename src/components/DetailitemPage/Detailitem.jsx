import ItemSection from "./components/ItemSection";
import ContactUsSection from "./components/ContactUsSection";
import styled from "styled-components";

export const Title = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 26px;
  text-align: left;
`;

const Detailitem = () => {
  return (
    <div className="Detailitem">
      <div className="container">
        <ItemSection />
        <ContactUsSection />
      </div>
    </div>
  );
};

export default Detailitem;
