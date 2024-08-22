import { useParams } from "react-router-dom";
import { getPandaMarket } from "../../api";
import { useEffect, useState } from "react";

const Detailitem = () => {
  const [items, setItems] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchPandaMarket = async () => {
      const products = await getPandaMarket();
      setItems(products.list);
    };

    fetchPandaMarket();
  }, []);

  const item = items.find((product) => Number(product.id) === Number(id));

  console.log("값", item?.name);
  console.log("값", item?.id);

  return (
    <div className="Detailitem">
      <div className="container">
        <section>
          <div>
            <img src={item?.images} alt={item?.name} />
          </div>
          <div>
            <h3>{item?.name}</h3>
            <p>{item?.price}</p>
          </div>
          <div>
            <h3>상품 소개</h3>
            <p>{item?.description}</p>
            <h3>상품 태그</h3>
            {item?.tags.map((tag) => (
              <p key={tag}>{tag}</p>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Detailitem;
