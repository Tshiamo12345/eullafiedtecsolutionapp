import './servicespage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCogs, FaCode, FaTools } from "react-icons/fa";
function ServicesPage() {
  return (
    <div className='servicePage'>
      <h1 className='mt-5'>Our Services</h1>
      <p>Discover the range of technology services we offer.</p>
      <div className='Container mt-4 mb-5'>
        <div className='row'>

        
          <div className='column2 col-md-4'>
            <FaTools size={50} color="#007bff" />
            <h5>IT Consulting</h5>
            <p>Our experts provide strategic IT consulting to help you leverage technology effectively.</p>
          </div>
            <div className='column1 col-md-4'>
            <FaCode size={50} color="#28a745" />
            <h5>Software Development</h5>
            <p>We create custom software solutions tailored to your business needs.</p>
          </div>
          <div className='column3 col-md-4'>
            <FaCogs size={50} color="#ffc107" />
            <h5>Digital Transformation</h5>
            <p>We assist businesses in transforming their operations through innovative digital solutions.</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ServicesPage;
