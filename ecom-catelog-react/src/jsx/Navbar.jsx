import '../css/Navbar.css';
import logo from '../assets/logo.png';
import mapIcon from '../assets/map.jpg';
import flag from '../assets/flag.png';
import CategoryFilter from './CategoryFilter';

function Navbar({ categories, onCategorySelect, searchTerm, onSearchChange, cartCount = 0 }) {
  return (
    <header className="nav-top">
      {/* Logo */}
      <div className="nav-item nav-logo">
        <img src={logo} alt="Amazon" />
      </div>

      {/* Location */}
      <div className="nav-item nav-location">
        <img src={mapIcon} alt="location" />
        <div className="nav-two-line">
          <span className="nav-small">Delivering to Nagpur 440015</span>
          <span className="nav-bold">Update location</span>
        </div>
      </div>

      {/* Search bar */}
      <div className="nav-search">
        <CategoryFilter categories={categories} onSelect={onCategorySelect} />
        <input
          type="text"
          placeholder="Search Amazon"
          value={searchTerm}
          onChange={onSearchChange}
        />
        <button type="button" aria-label="Search">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#131921" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="10" cy="10" r="7" />
            <line x1="15.5" y1="15.5" x2="22" y2="22" />
          </svg>
        </button>
      </div>

      {/* Language */}
      <div className="nav-item nav-lang">
        <img src={flag} alt="flag" />
        <span className="nav-bold">EN</span>
      </div>

      {/* Account */}
      <div className="nav-item nav-two-line">
        <span className="nav-small">Hello, sign in</span>
        <span className="nav-bold">Account &amp; Lists</span>
      </div>

      {/* Orders */}
      <div className="nav-item nav-two-line">
        <span className="nav-small">Returns</span>
        <span className="nav-bold">&amp; Orders</span>
      </div>

      {/* Cart */}
      <div className="nav-item nav-cart">
        <svg width="38" height="34" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 2h4l2.7 12.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.5L23 6H6" />
          <circle cx="10" cy="20.5" r="1.5" />
          <circle cx="18" cy="20.5" r="1.5" />
        </svg>
        <span className="nav-cart-count">{cartCount}</span>
        <span className="nav-bold">Cart</span>
      </div>
    </header>
  );
}

export default Navbar;