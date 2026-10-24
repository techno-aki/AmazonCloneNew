
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9090';

// Fallback: koi file nahi chahiye, SVG khud hi bana hai
const NO_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">
       <rect width="100%" height="100%" fill="#e9ecef"/>
       <text x="50%" y="50%" font-family="Arial" font-size="32" fill="#868e96"
             text-anchor="middle" dominant-baseline="middle">No Image</text>
     </svg>`
  );

const resolveImage = (url) => {
  if (!url) return NO_IMAGE;
  if (url.startsWith('http')) return url;   // full URL ho to waise hi
  return `${API_URL}${url}`;                // /images/products/x.jpg -> backend ka URL
};

const ProductList = ({ products, onAddToCart, onBuyNow, loadingProductId }) => {
  return (
    <div className="row">
      {products.map((product) => (
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={product.id}>
          <div className="card h-100">
            <img
              src={resolveImage(product.imageUrl)}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = NO_IMAGE;
              }}
              className="card-img-top"
              alt={product.name}
              style={{ height: '300px', objectFit: 'contain', padding: '10px' }}
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text"><strong>{product.price}</strong></p>

              <div className="mt-auto d-flex gap-2">
                <button
                  className="btn btn-outline-primary flex-fill"
                  onClick={() => onAddToCart && onAddToCart(product)}
                >
                  Add to Cart
                </button>
               <button
                 className="btn btn-primary flex-fill"
                 onClick={() => onBuyNow(product)}
                 disabled={loadingProductId !== null}
               >
                 Buy Now
               </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;