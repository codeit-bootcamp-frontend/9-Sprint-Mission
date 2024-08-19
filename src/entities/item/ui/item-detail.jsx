function ItemDetailSection({ product }) {
  if (!product) return <div></div>;
  return (
    <div className="product-detail">
      <div className="product-image">
        <img src={product.images[0]} />
      </div>

      <div className="product-info">
        <div>
          <div className="product-name">{product.name}</div>
          <span className="product-price">
            {product.price.toLocaleString()}원
          </span>
        </div>
        <div className="product-description">{product.description}</div>
      </div>
      <div className="tags">
        {product.tags?.map((tag, i) => (
          <span key={`tag-${i}`} className="tag">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ItemDetailSection;
