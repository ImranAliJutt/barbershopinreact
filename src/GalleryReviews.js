import React, { useEffect } from 'react';
import './GalleryReviews.css';

function GalleryReviews() {
  // UseEffect hook to add scroll animations
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated'); // Add 'animated' class when in view
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is in view
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="gallery-reviews-section">
      <div className="container-fluid">
        <div className="row">
          {/* Left Column: Gallery */}
          <div className="col-md-6 gallery-column animate-on-scroll">
            <div className="gallery">
              {/* Title in the center of the top row */}
              <h2 className="gallery-title"><span className="highlight">Discover</span> Our Works</h2>

              {/* Gallery Images */}
              <div className="gallery-item animate-on-scroll">
                <img src="./image1.jpg" alt="Gallery Item 1" />
                <div className="overlay">
                  <h3>Title 1</h3>
                  <p>Description for image 1</p>
                </div>
              </div>
              <div className="gallery-item animate-on-scroll">
                <img src="./image4.jpg" alt="Gallery Item 2" />
                <div className="overlay">
                  <h3>Title 2</h3>
                  <p>Description for image 2</p>
                </div>
              </div>
              <div className="gallery-item animate-on-scroll">
                <img src="./iimage6.jpg" alt="Gallery Item 3" />
                <div className="overlay">
                  <h3>Title 3</h3>
                  <p>Description for image 3</p>
                </div>
              </div>
              <div className="gallery-item animate-on-scroll">
                <img src="./image3.jpg" alt="Gallery Item 4" />
                <div className="overlay">
                  <h3>Title 4</h3>
                  <p>Description for image 4</p>
                </div>
              </div>
              <div className="gallery-item animate-on-scroll">
                <img src="./image5.jpg" alt="Gallery Item 5" />
                <div className="overlay">
                  <h3>Title 5</h3>
                  <p>Description for image 5</p>
                </div>
              </div>
              <div className="gallery-item animate-on-scroll">
                <img src="./beared.jpg" alt="Gallery Item 6" />
                <div className="overlay">
                  <h3>Title 6</h3>
                  <p>Description for image 6</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Customer Reviews */}
          <div className="col-md-6 reviews-column animate-on-scroll">
            <h2 className="section-title">CUSTOMER <span className="highlight">REVIEWS</span></h2>
            <div className="reviews">
              <div className="review">
                <p className="review-text">"Amazing service! Highly recommend."</p>
                <p className="review-author">- Alex Johnson</p>
                <div className="review-stars">⭐⭐⭐⭐⭐</div>
              </div>
              <div className="review">
                <p className="review-text">"The best experience I've had at a salon!"</p>
                <p className="review-author">- Maria Garcia</p>
                <div className="review-stars">⭐⭐⭐⭐⭐</div>
              </div>
              <div className="review">
                <p className="review-text">"Exceptional attention to detail and friendly staff."</p>
                <p className="review-author">- Liam Brown</p>
                <div className="review-stars">⭐⭐⭐⭐⭐</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GalleryReviews;
