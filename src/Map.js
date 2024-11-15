import React, { useEffect } from 'react';
import './Map.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Map() {
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fadeIn');
            observer.unobserve(entry.target); // Unobserve after animation to prevent repeated triggering
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="map-section">
      <div className="container-fluid">
        <div className="row">
          {/* Left Column */}
          <div className="col-md-6 text-column animate-on-scroll">
            <h2>
              SERVICES BEYOND <span id="highlight">EXPECTTATION</span>
            </h2>
            <p className="description">
              Our barbershop is the territory created purely for men who appreciate premium quality, time, and flawless look. We’ll help you to look stylish and confident in the most discreet way.
            </p>
            <a href="#" className="btn btn-outline-light">Read More About Us</a>
          </div>

          {/* Right Column */}
          <div
            className="col-md-6 map-column animate-on-scroll"
            style={{
              backgroundImage: `url(./bgimageformap.jpg)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            <div className="location-info">
              <i className="fa-solid fa-location-dot" ></i>
              <h3> LOCATION</h3>
            </div>
            <p className="location-text">Blakkloud Barber, 208 Caribou St, Banff, AB T1L 1B9</p>
            <a href="#" className="get-directions">Get Directions <i class="fa-solid fa-arrow-right"></i></a>

            <div className="contact-info">
              <i className="fa-solid fa-phone"></i>
              <h4>+14037622771</h4>
            </div>
            <p className="hours">Monday – Friday: 9am – 7pm <br />  Saturday : 10am – 5pm <br />Sunday: Closed <i class="fa-solid fa-shop-lock"></i></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Map;
