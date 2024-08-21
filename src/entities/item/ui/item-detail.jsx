function ItemDetailSection({ itemDetail }) {
  return (
    <div className="product-detail">
      <div className="product-image">
        <img src={itemDetail.images[0]} />
      </div>

      <div className="product-info">
        <div>
          <div className="product-name">{itemDetail.name}</div>
          <span className="product-price">
            {itemDetail.price.toLocaleString()}원
          </span>
        </div>
        <div className="product-description">{itemDetail.description}</div>
      </div>
      <div className="tags">
        {itemDetail.tags?.map((tag, i) => (
          <span key={`tag-${i}`} className="tag">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ItemDetailSection;
