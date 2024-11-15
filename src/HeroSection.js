import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import './HeroSection.css';

const HeroSection = () => {
  const [nav, setNav] = useState(false);
  const [animate, setAnimate] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    setAnimate(true); // Trigger animation when component mounts
  }, []);

  return (
    <div className="Container-fluid">
      {/* Navbar Section */}
      <div className="navbar-container flex justify-between items-center h-24 max-w-[1600px] mx-auto px-4 text-white">
        <h1 className={`w-full text-3xl font-bold text-[#96885F] ${animate ? 'fade-in' : ''}`}>
          BLAKKLOUD
          <p className={`logo-subheading ${animate ? 'fade-in-sub' : ''}`}>Hair Style</p>
        </h1>
        <ul className="hidden md:flex">
          <li className="p-4">
            <Link to="/" className="cursor-pointer">Home</Link>
          </li>
          <li className="p-4">
            <Link to="/hero" className="cursor-pointer">Services</Link>
          </li>
          <li className="p-4">
            <Link to="/map" className="cursor-pointer">Aboutus</Link>
          </li>
          <li className="p-4">
            <Link to="/gallery" className="cursor-pointer">Gallery</Link>
          </li>
          <li className="p-4">
            <Link to="/location" className="cursor-pointer">Conatact</Link>
          </li>
          <li className="p-4">
            <Link to="/team" className="cursor-pointer">Appointment</Link>
          </li>
        </ul>
        <div onClick={handleNav} className="block md:hidden cursor-pointer">
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        <ul
          className={
            nav
              ? 'mobile-nav fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
              : 'ease-in-out duration-500 fixed left-[-100%]'
          }
        >
          <h1 className="text-3xl font-bold text-[#00df9a] m-4">BLAKKLOUD.</h1>
          <li className="p-4 border-b border-gray-600">
            <Link to="/" onClick={handleNav} className="cursor-pointer">Home</Link>
          </li>
          <li className="p-4 border-b border-gray-600">
            <Link to="/hero" onClick={handleNav} className="cursor-pointer">Services</Link>
          </li>
          <li className="p-4 border-b border-gray-600">
            <Link to="/map" onClick={handleNav} className="cursor-pointer">About us</Link>
          </li>
          <li className="p-4 border-b border-gray-600">
            <Link to="/gallery" onClick={handleNav} className="cursor-pointer">Gallery</Link>
          </li>
          <li className="p-4 border-b border-gray-600">
            <Link to="/location" onClick={handleNav} className="cursor-pointer">Conatact</Link>
          </li>
          <li className="p-4">
            <Link to="/book" onClick={handleNav} className="cursor-pointer">Book Appointment</Link>
          </li>
        </ul>
      </div>

      {/* Hero Section Content */}
      <div className="video-container">
        <div className="video-overlay"></div>
        <video autoPlay loop muted className="background-video">
          <source src="/video2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-text">
          <h1 className={animate ? 'fade-in' : ''}>
            WE KNOW YOUR <span id="secondpart">STYLE BETTER</span>
          </h1>
          <p className={animate ? 'fade-in-sub' : ''}>BANFF'S GR<i class="fa-solid fa-certificate" style={{ fontSize:'20px', opacity:'0.8'}}></i><i class="fa-solid fa-certificate" style={{ fontSize:'20px' , opacity:'0.8'}}></i>MING EXPERTS </p>
          <a href="#" className={`btn btn-primary ${animate ? 'fade-in-button' : ''}`}>
            MAKE AN APPOINTMENT
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
