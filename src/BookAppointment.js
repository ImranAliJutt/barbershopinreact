import React, { useEffect, useState } from 'react';
import './BookAppointment.css';

function BookAppointment() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    description: '',
  });

  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Appointment booked successfully!');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          date: '',
          description: '',
        });
      } else {
        alert('Failed to book appointment. Please try again.');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('An error occurred while booking the appointment. Please try again.');
    }
  };

  return (
    <div className="appointment-section">
      <div className="container">
        <div className="row">
          {/* Left Column: Appointment Form */}
          <div className="col-md-6">
            <h2 className="section-title animate-on-scroll"><i class="fa-regular fa-clock" style={{color:'#70927B' , fontSize:'24px' , paddingRight:'10px'}}></i> Make An <span className="highlight">Appointment </span></h2>
            <form className="appointment-form animate-on-scroll" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-submit animate-on-scroll" style={{paddingTop:"12px" , paddingBottom:"12px" , borderRadius:"0px"}}>Book Now</button>
            </form>
          </div>

          {/* Right Column: Descriptive Text */}
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <div className="info-text animate-on-scroll">
              <h3>BOOK SLOT WITH EASE <i class="fa-regular fa-calendar-check" style={{color:'#70927B' , fontSize:'22px' , paddingLeft:'10px'}}></i> </h3>
              <p>We offer a seamless appointment booking experience for all your styling needs. Schedule a time that suits you, and let our team take care of the rest.</p>
              <p>Our experts are here to help you look and feel your best. Book your appointment today and let us bring your vision to life!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookAppointment;
