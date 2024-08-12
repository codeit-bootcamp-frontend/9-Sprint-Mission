function ProductListItems({ product }) {
  function formatPrice(price) {
    return new Intl.NumberFormat("ko-KR").format(price);
  }

  return (
    <>
      <img src={product.images[0]} alt={product.name} />
      <div className="product-list-text">
        <p className="product-description">{product.description}</p>
        <h2 className="product-price">{formatPrice(product.price)}원</h2>
        <p className="product-favoritecount">♡ {product.favoriteCount}</p>
      </div>
    </>
  );
}

export default ProductListItems;
