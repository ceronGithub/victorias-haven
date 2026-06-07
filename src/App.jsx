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
import CalendarCarousel from './components/CalendarCarousel';
import WhyChooseUs   from './components/WhyChooseUs';
import RoomShowcase  from './components/RoomShowcase';
import Services      from './components/Services';
import Amenities     from './components/Amenities';
import Testimonials  from './components/Testimonials';
import Gallery       from './components/Gallery';
import Location      from './components/Location';
import FAQ           from './components/FAQ';
import Contact       from './components/Contact';
import Footer        from './components/Footer';
import GuestNotice   from './components/GuestNotice';

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
        <CalendarCarousel />
        <WhyChooseUs />
        <RoomShowcase />
        <Services />
        <Amenities />
        <Testimonials />
        <Gallery />
        <Location />
        <FAQ />
        <Contact />
      </main>

      <Footer />
      <GuestNotice />
    </>
  );
}