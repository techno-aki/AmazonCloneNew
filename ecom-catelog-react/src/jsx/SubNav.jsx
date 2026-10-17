import '../css/SubNav.css';
import menuIcon from '../assets/menu.png';
import diya from '../assets/diya.png';

const links = [
  'Prime Video',
  'Sell',
  'Bestsellers',
  "Today's Deals",
  'Mobiles',
  'New Releases',
  'Electronics',
  'Customer Service',
  'Prime',
  'Amazon Pay',
  'Home & Kitchen',
];

function SubNav() {
  return (
    <nav className="subnav">
      {/* All + hamburger */}
      <div className="subnav-item subnav-all">
        <img src={menuIcon} alt="menu" className="subnav-menu-img" />
        <span>All</span>
      </div>

      {/* Links */}
      <div className="subnav-links">
        {links.map((text) => (
          <a key={text} href="#" className="subnav-item" onClick={(e) => e.preventDefault()}>
            {text}
            {text === 'Prime' && <span className="subnav-caret">▾</span>}
          </a>
        ))}
      </div>

      {/* Festival banner (right side) */}
      <div className="subnav-festival">
        <img src={diya} alt="diya" className="subnav-diya-img" />
        <span>Great Indian Festival | Live Now</span>
        <span className="subnav-arrow">›</span>
      </div>
    </nav>
  );
}

export default SubNav;