import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Welcome to EullaTech Solutions</h1>
      <p>Your premier technology solutions provider.</p>
      <Link to="/careers" style={{
        display: 'inline-block',
        marginTop: '20px',
        padding: '12px 24px',
        backgroundColor: '#3498db',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease'
      }}>
        Apply for Jobs
      </Link>
    </div>
  );
}

export default HomePage;
