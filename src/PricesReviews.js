import React, { useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './PricesReviews.css';

function PricesReviews() {
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fadeIn');
            observer.unobserve(entry.target); // Unobserve to prevent repeated triggering
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
    <div className="prices-reviews-section">
      <div className="container-fluid">
        <div className="row">
          {/* Left Column: Our Prices */}
          <div className="col-md-6 prices-column animate-on-scroll">
            <div className="prices-content">
              <h2 className="section-title">OUR <span className="highlight">PRICES</span></h2>
              <p className="description">
                Our services spectrum encompasses many techniques and procedures, from straight hairstyling to face care.
              </p>
              <div className="price-list">
                <div className="price-item">
                  <span>HAIRCUT</span>
                  <span className="price">40$</span>
                </div>
                <div className="price-item">
                  <span>SHAVE</span>
                  <span className="price">35$</span>
                </div>
                <div className="price-item">
                  <span>HAIRCUT + SHAVE</span>
                  <span className="price">70$</span>
                </div>
                <div className="price-item">
                  <span>BEARD TRIM</span>
                  <span className="price">15$</span>
                </div>
              </div>
              <a href="#" className="btn btn-outline-light">View All Prices</a>
            </div>
          </div>

          {/* Right Column: Services Carousel */}
          <div className="col-md-6 services-carousel animate-on-scroll">
            <h2 className="section-title">OUR <span className="highlight">SERVICES</span></h2>
            <Carousel data-bs-theme="light">
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="./Haircut.jpg"
                  alt="Haircut"
                />
                <Carousel.Caption>
                  <h5>Hair Cutting</h5>
                  <p>Get Shape in Different Styles: straight, wavy, curly, and coily</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="./shaveimage.jpg"
                  alt="Beard Shave"
                />
                <Carousel.Caption>
                  <h5>Shave</h5>
                  <p>We specialize in over 25 beard types: Full Beard, Goatee, Balbo Beard, Circle Beard, and more.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="./Hairstyle.jpg"
                  alt="Third Service"
                />
                <Carousel.Caption>
                  <h5>Styling</h5>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricesReviews;
