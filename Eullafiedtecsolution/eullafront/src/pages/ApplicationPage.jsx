function ApplicationPage() {
  return (
    <div style={{ 
      padding: '40px 20px', 
      maxWidth: '800px', 
      margin: '0 auto',
      backgroundColor: '#f4f6f8',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '20px' }}>Job Applications</h1>
      <p style={{ color: '#555', fontSize: '18px', lineHeight: '1.6' }}>
        Join our team at EullaTech Solutions! We're looking for talented individuals to help us build innovative technology solutions.
      </p>
      
      <div style={{ marginTop: '30px' }}>
        <h2 style={{ color: '#2c3e50', marginBottom: '25px' }}>Available Positions</h2>
        <div style={{ marginTop: '20px' }}>
          <div style={{ 
            border: '1px solid #34495e', 
            borderRadius: '8px', 
            padding: '25px', 
            marginBottom: '20px',
            backgroundColor: '#ecf0f1',
            boxShadow: '0 2px 5px rgba(44, 62, 80, 0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}>
            <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Frontend Developer</h3>
            <p style={{ color: '#555' }}><strong style={{ color: '#2c3e50' }}>Location:</strong> Remote/Hybrid</p>
            <p style={{ color: '#555' }}><strong style={{ color: '#2c3e50' }}>Experience:</strong> 2+ years</p>
            <p style={{ color: '#555', marginBottom: '20px' }}>We're looking for a skilled Frontend Developer to join our team and help build amazing user experiences.</p>
            <button style={{
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
              transition: 'background-color 0.3s ease, transform 0.2s ease',
              boxShadow: '0 2px 4px rgba(52, 152, 219, 0.3)'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#2980b9';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#3498db';
              e.target.style.transform = 'translateY(0)';
            }}>
              Apply Now
            </button>
          </div>
          
          <div style={{ 
            border: '1px solid #34495e', 
            borderRadius: '8px', 
            padding: '25px', 
            marginBottom: '20px',
            backgroundColor: '#ecf0f1',
            boxShadow: '0 2px 5px rgba(44, 62, 80, 0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}>
            <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Backend Developer</h3>
            <p style={{ color: '#555' }}><strong style={{ color: '#2c3e50' }}>Location:</strong> Remote/Hybrid</p>
            <p style={{ color: '#555' }}><strong style={{ color: '#2c3e50' }}>Experience:</strong> 3+ years</p>
            <p style={{ color: '#555', marginBottom: '20px' }}>Join our backend team to build scalable and robust server-side applications.</p>
            <button style={{
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
              transition: 'background-color 0.3s ease, transform 0.2s ease',
              boxShadow: '0 2px 4px rgba(52, 152, 219, 0.3)'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#2980b9';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#3498db';
              e.target.style.transform = 'translateY(0)';
            }}>
              Apply Now
            </button>
          </div>
          
          <div style={{ 
            border: '1px solid #34495e', 
            borderRadius: '8px', 
            padding: '25px', 
            marginBottom: '20px',
            backgroundColor: '#ecf0f1',
            boxShadow: '0 2px 5px rgba(44, 62, 80, 0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}>
            <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>UI/UX Designer</h3>
            <p style={{ color: '#555' }}><strong style={{ color: '#2c3e50' }}>Location:</strong> Remote/Hybrid</p>
            <p style={{ color: '#555' }}><strong style={{ color: '#2c3e50' }}>Experience:</strong> 2+ years</p>
            <p style={{ color: '#555', marginBottom: '20px' }}>Help us create beautiful and intuitive user interfaces and experiences.</p>
            <button style={{
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
              transition: 'background-color 0.3s ease, transform 0.2s ease',
              boxShadow: '0 2px 4px rgba(52, 152, 219, 0.3)'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#2980b9';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#3498db';
              e.target.style.transform = 'translateY(0)';
            }}>
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationPage;