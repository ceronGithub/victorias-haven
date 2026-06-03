/**
 * App.jsx
 * Root component for Victoria's Haven.
 * Renders all page sections in order and initialises
 * the global scroll-reveal observer via useScrollReveal.
 */

import { useScrollReveal } from './hooks/useScrollReveal';
import Header        from './components/Header';
import Hero          from './components/Hero';
import BookingWidget from './components/BookingWidget';
import WhyChooseUs   from './components/WhyChooseUs';
import RoomShowcase  from './components/RoomShowcase';

import './styles/main.css';
import './styles/mediaQueries.css';

export default function App() {
  /* Activate IntersectionObserver for all .revealFade elements */
  useScrollReveal();

  return (
    <>
      <Header />

      <main id="mainContent">
        <Hero />
        <BookingWidget />
        <WhyChooseUs />
        <RoomShowcase />
      </main>
    </>
  );
}
