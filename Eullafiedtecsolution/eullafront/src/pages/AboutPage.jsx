import './aboutpage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
function AboutPage() {
  return (
   <body className='myBody'>
          <div>
            <h1 className='aboutHeader mt-5'>
              About Us
            </h1>
          </div>
          <div className='container'>
            <div className='row'>
              <div className='col-md-7'>
                <h3>Who We Are?</h3>
                <p>
                  EullaTech Solutions is a leading provider of innovative technology solutions, dedicated to helping businesses thrive in the digital age. Our team of experts is committed to delivering high-quality services tailored to meet the unique needs of each client.
                </p>
                <h3 className='mt-5'>What We Do?</h3>
                <p>
                  We offer a wide range of services, including software development, IT consulting, and digital transformation solutions. Our goal is to empower businesses with the tools and expertise they need to succeed in a rapidly changing technological landscape.
                </p>
                
              </div>
              
              <div className='myColumn2 col-md-5 mt-4 mb-4'>
                <p>me</p>
              </div>
            </div>
          </div>
          <div className='container'>

          </div>


      </body>

  );
}

export default AboutPage;