import { useEffect, useState } from 'react';
import '../css/App.css';
import ProductList from './ProductList';
import CategoryFilter from './CategoryFilter';
import Navbar from './Navbar';
import SubNav from './SubNav';
import PromoCards from './PromoCards';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9090';

   
  useEffect(() => {
    fetch(`${API_URL}/api/products`)
    .then(response => response.json())
    .then(data => setProducts(data)); 

    fetch(`${API_URL}/api/categories`)
    .then(response => response.json())
    .then(data => setCategories(data)); 
  }, []);

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    scrollToProducts();
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId ? Number(categoryId) : null);
    scrollToProducts();
  };

const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };




const handleBuyNow = async (product) => {
    try {
      // 1. Backend se order banwao (sirf productId bhejo)
      const res = await fetch(`${API_URL}/api/payments/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id }),
      });
      if (!res.ok) throw new Error('Order create nahi hua');
      const order = await res.json();

      // 2. Razorpay popup kholo
      const options = {
        key: order.key,
        amount: order.amount,
        currency: order.currency,
        name: 'AmaCart',
        description: product.name,
        order_id: order.orderId,
        handler: async (response) => {
          // 3. Payment ke baad backend se signature verify karwao
          const v = await fetch(`${API_URL}/api/payments/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response),
          });
          const result = await v.json();
          alert(result.verified
            ? `Payment successful! ID: ${response.razorpay_payment_id}`
            : 'Payment verify nahi hui, support se contact karo');
        },
        theme: { color: '#febd69' },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (r) => alert(`Payment failed: ${r.error.description}`));
      rzp.open();
    } catch (err) {
      console.error(err);
      alert('Kuch gadbad hui, dobara try karo');
    }
  };

  const filterProducts = products
  .filter(product => {
    return(
      (selectedCategory ? product.category.id === selectedCategory : true)
      &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  })
   .sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  return (
    <>
      <Navbar
              categories={categories}
              onCategorySelect={handleCategorySelect}
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              cartCount={0}
            />
            <SubNav />
            <PromoCards />

      <div className='container' id="products">
        <div className='d-flex justify-content-end my-3'>
          <select className='form-control w-auto' onChange={handleSortChange}>
            <option value="asc">Sort by price: Low to High</option>
            <option value="desc">Sort by price: High to Low</option>
          </select>
        </div>

        <div>
          {filterProducts.length ? (
            <ProductList products={filterProducts} onBuyNow={handleBuyNow} />
          ) : (
            <p>No Products Found</p>
          )}
        </div>
      </div>
    </>
  )
}

export default App
