import React from 'react';
import { useInView } from 'react-intersection-observer';
import './TeamMembers.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function TeamMembers() {
  const members = [
    { name: 'John Doe', position: 'CEO', image: './m1.jpg' },
    { name: 'Jane Smith', position: 'CTO', image: './m2.jpg' },
  ];

  // Observers for each section
  const { ref: leftSectionRef, inView: leftSectionInView } = useInView({ triggerOnce: true });
  const { ref: rightSectionRef, inView: rightSectionInView } = useInView({ triggerOnce: true });

  return (
    <div className="team-section container">
      <div className="row">
        {/* Left column with title and social icons */}
        <div
          className={`col-lg-3 col-md-4 text-start left-section ${leftSectionInView ? 'animate-from-left' : ''}`}
          ref={leftSectionRef}
        >
          <h2 className="section-title">
            MEET <span className="highlight">THE TEAM <i className="fa-solid fa-people-group" style={{ color: '#70927B', fontSize: '22px', paddingRight: '10px' }}></i></span>
          </h2>
          <hr className="title-divider" />
          <div className="social-icons">
            <a href="#" className="social-icon"><i className="fab fa-facebook"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-x-twitter"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>

        {/* Right column with team members grid */}
        <div className="col-lg-9 col-md-8" ref={rightSectionRef}>
          <div className={`row g-0 ${rightSectionInView ? 'animate-from-left' : ''}`}>
            {members.map((member, index) => (
              <div className="col-lg-6 col-md-6 col-sm-12" key={index}>
                <div className="team-member">
                  <img src={member.image} alt={member.name} className="member-image" />
                  <div className="overlay">
                    <h3 className="member-name">{member.name}</h3>
                    <p className="member-position">{member.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamMembers;
