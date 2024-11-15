import React from 'react';
import './Location.css';

function Location() {
  return (
    <div className="location-section">
      {/* Full Width Map */}
      <div className="map-container">
        <iframe
          title="Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4939.089925287049!2d-115.57628921043562!3d51.17395439725277!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5370ca45dca73e93%3A0x3ede4f90520a7bcf!2sBlakkloud%20Barber!5e0!3m2!1sen!2sca!4v1731119484104!5m2!1sen!2sca"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

export default Location;
