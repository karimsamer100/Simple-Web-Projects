import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

function UdemyClone() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSkill, setActiveSkill] = useState(0);

  const courses = [
    {
      title: "The AI Engineer Course 2025: Complete AI Engineer Bootcamp",
      author: "365 Careers",
      rating: 4.5,
      reviews: "1,732 ratings",
      price: "£309.99",
      oldPrice: "£349.99",
      badge: "Bestseller",
      badgeColor: "badge-yellow",
    },
    {
      title: "Intro to AI Agents and Agentic AI",
      author: "365 Careers",
      rating: 4.6,
      reviews: "1,727 ratings",
      price: "£309.99",
      oldPrice: "£349.99",
      badge: "Ridership",
      badgeColor: "badge-yellow",
    },
    {
      title: "Artificial Intelligence for Business - ChatGPT Prize [2025]",
      author: "Multiple Professors, Kirill Eremenko",
      rating: 4.6,
      reviews: "4,855 ratings",
      price: "£579.99",
      oldPrice: "£719.99",
      badge: "Premium",
      badgeColor: "badge-purple",
    },
    {
      title: "AI Engineer Explorer Certificate Course",
      author: "School of AI",
      rating: 4.5,
      reviews: "87 ratings",
      price: "£309.99",
      oldPrice: "£349.99",
      badge: "Premium",
      badgeColor: "badge-purple",
    },
  ];

  const carouselItems = [
    { title: "IT Certifications", duration: "17.1m", icon: "🎯" },
    { title: "Data Science", duration: "17.1m", icon: "🏆" },
    { title: "Generative AI", duration: "17.1m", icon: "🤖" },
  ];

  const skills = [
    "Artificial Intelligence (AI)",
    "Python",
    "Microsoft Excel",
    "AI Agents & Agentic AI",
    "Digital Marketing",
    "Amazon AWS",
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselItems.length) % carouselItems.length
    );
  };

  return (
    <div className="udemy-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="logo">udemy</h1>
            <button className="nav-btn">Explore</button>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search for anything"
                className="search-input"
              />
            </div>
          </div>
          <div className="header-right">
            <button className="nav-btn">Plans & Pricing</button>
            <button className="nav-btn">Udemy Business</button>
            <button className="nav-btn">Teach on Udemy</button>
            <button className="cart-btn">🛒</button>
            <button className="btn-outline">Log in</button>
            <button className="btn-primary">Sign up</button>
            <button className="globe-btn">🌐</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-card">
            <h2 className="hero-title">Start Learning Today</h2>
            <p className="hero-text">
              Join millions of learners already growing with our platform
            </p>
            <button className="btn-hero">Get Started</button>
          </div>
          <div className="hero-image">
            <div className="hero-img-placeholder">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=400&fit=crop"
                alt="Student"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="carousel-section">
        <div className="carousel-container">
          <div className="carousel-text">
            <h3 className="section-title">
              Learn essential career and life skills
            </h3>
            <p className="section-desc">
              Udemy helps you build in-demand skills fast and advance your
              career in a changing job market.
            </p>
          </div>
          <div className="carousel-wrapper">
            <div className="carousel-track">
              {carouselItems.map((item, idx) => (
                <div
                  key={idx}
                  className={`carousel-card ${
                    idx === currentSlide ? "active" : ""
                  }`}
                >
                  <div className="carousel-icon">{item.icon}</div>
                  <div className="carousel-duration">⏱ {item.duration}</div>
                  <h4 className="carousel-title">{item.title}</h4>
                </div>
              ))}
            </div>
            <div className="carousel-controls">
              <button onClick={prevSlide} className="control-btn">
                ◀
              </button>
              {carouselItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`dot ${idx === currentSlide ? "active" : ""}`}
                />
              ))}
              <button onClick={nextSlide} className="control-btn">
                ▶
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Career Section */}
      <section className="ai-section">
        <div className="ai-content">
          <div className="ai-text">
            <h3 className="ai-title">Reimagine your career in the AI era</h3>
            <p className="ai-desc">
              Future-proof your skills with Personal Plan. Get access to a
              variety of fresh content from real-world experts.
            </p>
            <div className="ai-features">
              <div className="feature-item">
                <span className="feature-icon">🎓</span>
                <span>Learn AI and more</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📋</span>
                <span>Prep for a certification</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💬</span>
                <span>Practice with AI coaching</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📈</span>
                <span>Advance your career</span>
              </div>
            </div>
            <button className="btn-ai">Learn more</button>
            <p className="ai-price">Starting at £2,034.00/month</p>
          </div>
          <div className="ai-image">
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500&h=400&fit=crop"
              alt="AI Professional"
            />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section">
        <h3 className="section-title">
          Skills to transform your career and life
        </h3>
        <p className="section-desc">
          From critical skills to technical topics, Udemy supports your
          professional development.
        </p>

        <div className="skills-tabs">
          {skills.map((skill, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSkill(idx)}
              className={`skill-tab ${activeSkill === idx ? "active" : ""}`}
            >
              {skill}
            </button>
          ))}
        </div>

        <div className="courses-grid">
          {courses.map((course, idx) => (
            <div key={idx} className="course-card">
              <img
                src={`https://images.unsplash.com/photo-${
                  1550745165 + idx
                }?w=300&h=200&fit=crop`}
                alt={course.title}
                className="course-img"
              />
              <div className="course-content">
                <h4 className="course-title">{course.title}</h4>
                <p className="course-author">{course.author}</p>
                <div className="course-meta">
                  <span className={`badge ${course.badgeColor}`}>
                    {course.badge}
                  </span>
                  <div className="rating">
                    <span className="rating-num">{course.rating}</span>
                    <span className="star">⭐</span>
                  </div>
                  <span className="reviews">({course.reviews})</span>
                </div>
                <div className="course-price">
                  <span className="price">{course.price}</span>
                  <span className="old-price">{course.oldPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="view-all-btn">
          Show all Artificial Intelligence (AI) courses →
        </button>
      </section>

      {/* Trust Section */}
      <section className="trust-section">
        <h3 className="trust-title">
          Trusted by over 17,000 companies and millions of learners around the
          world
        </h3>
        <div className="trust-logos">
          <div className="logo-item">VW</div>
          <div className="logo-item">SAMSUNG</div>
          <div className="logo-item">cisco</div>
          <div className="logo-item">vimeo</div>
          <div className="logo-item">P&G</div>
          <div className="logo-item">HPE</div>
          <div className="logo-item">citi</div>
          <div className="logo-item">ERICSSON</div>
        </div>
      </section>
    </div>
  );
}

ReactDOM.render(<UdemyClone />, document.getElementById("root"));
