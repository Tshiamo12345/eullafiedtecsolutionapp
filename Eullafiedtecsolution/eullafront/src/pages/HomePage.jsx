import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import "./homepage.css";
import ServicesPage from './ServicesPage';
import {
  FaStar

} from 'react-icons/fa';
import image from '../assets/medium-shot-man-typing-laptop.jpg';
function HomePage() {
  const navigate = useNavigate();

  const testimonials = [
    {
      name: "Lerato M.",
      feedback: "EullaTech helped transform our business website into a modern and responsive platform. Highly recommend!",
      role: "Business Owner"
    },
    {
      name: "Kabelo T.",
      feedback: "Their IT support team is always quick to respond and super professional. Great service!",
      role: "IT Manager"
    },
    {
      name: "Nadia P.",
      feedback: "From start to finish, the project was handled with creativity and technical excellence.",
      role: "Marketing Lead"
    },
    {
      name: "Thabo K.",
      feedback: "They delivered our app on time and beyond expectations. Great communication throughout.",
      role: "Startup Founder"
    }
  ];

  return (
    <div>
      <div className='homepage'>
        <h1>Welcome to EullaTech Solutions</h1>
        <p>Your premier technology solutions provider, delivering innovative,
          reliable, <br />and scalable services that empower businesses to achieve their digital goals.</p>

        <div className="apply-button-container">
          <button
            type="button"
            className="apply-button"
            onClick={() => navigate('/careers')}
          >
            Apply for Jobs
          </button>
        </div>
      </div>
      {/* 🌟 Section Separator */}
      <div className="section-separator">
        <div className="separator-line"></div>
        <div className="separator-icon">
          <FaStar />
        </div>
        <div className="separator-line"></div>
      </div>
      {/* ✅ About Us Section */}
      <section className="about-section py-5">
        <div className="container">
          <div className='row'>
            <div className="col-md-7 ">
              <h1>About Us</h1>
              <div className='content'>
                <div className='row'>
                  <div className='col-md-6 mt-4'>
                    <h5>Who We Are?</h5>
                    <p>
                      EullaTech Solutions is a leading provider of innovative technology solutions, dedicated to helping businesses thrive in the digital age. Our team of experts is committed to delivering high-quality services tailored to meet the unique needs of each client.
                    </p>
                  </div>
                  <div className='col-md-6 mt-4'>
                    <h5>What We Do?</h5>
                    <p>
                      We offer a wide range of services, including software development, IT consulting, and digital transformation solutions. Our goal is to empower businesses with the tools and expertise they need to succeed in a rapidly changing technological landscape.
                    </p>

                  </div>
                </div>
              </div>
            </div>
            <div className="aColumn1 col-md-5">
              <img src={image} alt="About Us" className="image1 img-fluid" />
            </div>
          </div>
        </div>
      </section>
      {/* end About Us Section */}


      {/* ✅ Services Section */}
      <div id='service'>
        <ServicesPage />
      </div >
      {/* end Services Section */}

      {/* ✅ Testimonials Section */}
      <section className="testimonials-section py-5">
        <div className="container">
          <h2 className="text-center mb-4">Testimonials</h2>
          <div className="testimonials-slider">
            <div className="testimonials-track">
              {[...testimonials, ...testimonials].map((t, i) => (
                <div key={i} className="testimonial-card">
                  <p className="testimonial-feedback">“{t.feedback}”</p>
                  <h5 className="testimonial-name">- {t.name}</h5>
                  <small className="testimonial-role">{t.role}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* end Testimonials Section */}

{/* 🌟 Section Separator */}
      <div className="section-separator">
        <div className="separator-line"></div>
        <div className="separator-icon">
          <FaStar />
        </div>
        <div className="separator-line"></div>
      </div>
      {/* ✅ Footer */}
      <footer className="myFooter">
        <div className="container">
          <div className="row">
            <div className="col-md-4 footer-col mb-3">
              <h5>Address</h5>
              <p className="mb-0">2490 Extension 1.</p>
              <p className="mb-0">Soshanguve South, Pretoria.</p>
              <p className="mb-0">South Africa.</p>
            </div>

            <div className="col-md-4 footer-col mb-3">
              <h5>Quick Links</h5>
              <ul className="list-unstyled mb-0">
                <li><a href="/" className="text-decoration-none">Home</a></li>
                <li><a href="/about" className="text-decoration-none">About</a></li>
                <li><a href="#service" className="text-decoration-none">Services</a></li>
                <li><a href="/contact" className="text-decoration-none">Contact</a></li>
              </ul>
            </div>

            <div className="col-md-4 footer-col mb-3">
              <h5>Contact</h5>
              <p className="mb-1">Email: <a href="mailto:tshiamomogolane265@gmail.com">tshiamomogolane265@gmail.com</a></p>
              <p className="mb-0">Phone: (+27) 68 000 6695</p>
            </div>
          </div>
        </div>
      </footer>

      <div className="created text-center">
        <small>&copy; 2025 Tshiamo Mogolane. All rights reserved.</small>
      </div>
    </div>
  );
}

export default HomePage;
