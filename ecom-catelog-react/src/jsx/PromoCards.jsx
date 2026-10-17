import { useRef, useState, useEffect } from 'react';
import '../css/PromoCards.css';

import giftFuture from '../assets/GiftFuture.jpg';
import dumbbells from '../assets/DumbelAndMore.jpg';
import bags from '../assets/BagsAndBagpacs.jpg';
import jeans from '../assets/Under399Jeans.jpg';
import kitchen from '../assets/festivKitchedEssentials.jpg';

const cards = [
  {
    id: 1,
    theme: 'orange',
    title: '₹28,990 ₹21,240',
    subtitle: 'Gift a healthier future this Diwali',
    brand: 'WHOOP',
    /*badge: 'Live Now',*/
    image: giftFuture,
    sponsored: true,
  },
  {
    id: 2,
    theme: 'green',
    title: 'Starting ₹199 Dumbbells & more',
    perks: ['Free Delivery', 'Easy Returns'],
    badge: 'Shop Now',
    image: dumbbells,
  },
  {
    id: 3,
    theme: 'red',
    title: 'Under ₹999 Bags & backpacks',
    perks: ['Free Delivery', 'Easy Returns'],
    /*badge: 'Shop Now',*/
    image: bags,
  },
  {
    id: 4,
    theme: 'red',
    title: 'Under ₹399 Jeans',
    perks: ['Free Delivery', 'Easy Returns'],
    /*badge: 'Shop Now', */
    image: jeans,
  },
  {
    id: 5,
    theme: 'lightgreen',
    title: 'Festive kitchen essentials',
    subtitle: 'Biggest price drop in 90 days',
    perks: ["Customers' most loved", 'Wide selection'],
    /*badge: 'Shop Now',*/
    image: kitchen,
  },
];

function PromoCards() {

  const rowRef = useRef(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

    const updateArrows = () => {
      const el = rowRef.current;
      if (!el) return;
      setAtStart(el.scrollLeft <= 5);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 5);
    };

    useEffect(() => {
      updateArrows();
      window.addEventListener('resize', updateArrows);
      return () => window.removeEventListener('resize', updateArrows);
    }, []);

const scrollLeft = () => {
    rowRef.current.scrollBy({ left: -760, behavior: 'smooth' });
  };
  const scrollRight = () => {
    rowRef.current.scrollBy({ left: 760, behavior: 'smooth' });
  };

  const goToProducts = () => {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

  return (
    <section className="promo-wrap">
           <div className="promo-row" ref={rowRef} onScroll={updateArrows}>
        {cards.map((c) => (
          <div key={c.id} className={`promo-card promo-${c.theme}`}>
            <h2 className="promo-title">{c.title}</h2>

            {c.subtitle && <p className="promo-subtitle">{c.subtitle}</p>}

            {c.perks && (
              <div className="promo-perks">
                {c.perks.map((p, i) => (
                  <span key={p}>
                    {i > 0 && <i className="promo-divider" />}
                    {p}
                  </span>
                ))}
              </div>
            )}

            {c.brand && <div className="promo-brand">{c.brand}</div>}

                        <div
                          className="promo-image-box promo-clickable"
                          onClick={goToProducts}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === 'Enter' && goToProducts()}
                        >
              <img src={c.image} alt={c.title} />
              {c.badge && <span className="promo-badge">{c.badge}</span>}
            </div>

            <div className="promo-festival">Great Indian Festival</div>

            {!c.sponsored && (
              <div className="promo-cashback">
                35% cashback up to ₹150 on your first order*
              </div>
            )}

            <div className="promo-bank">
              <span className="promo-bank-logo">SBI card</span>
              <span className="promo-bank-text">
                <b>10% Instant Discount*</b>
                <small>on Debit/Credit Card &amp; Credit Card EMI</small>
              </span>
            </div>

            <div className="promo-footer">
              <span>*T&amp;C apply</span>
              {c.sponsored && <span className="promo-sponsored">Sponsored</span>}
            </div>
          </div>
        ))}
      </div>

      <button
        className={`promo-btn promo-prev ${atStart ? 'promo-hidden' : ''}`}
        onClick={scrollLeft}
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        className={`promo-btn promo-next ${atEnd ? 'promo-hidden' : ''}`}
        onClick={scrollRight}
        aria-label="Next"
      >
        ›
      </button>

    </section>
  );
}

export default PromoCards;