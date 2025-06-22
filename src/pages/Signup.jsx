import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Dummy login
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-80" onSubmit={handleSignup}>
        <h2 className="text-2xl font-bold mb-6 text-center">ShiftWise Login</h2>
        <input className="w-full p-2 mb-4 border rounded" type="email" placeholder="Email" required />
        <input className="w-full p-2 mb-4 border rounded" type="password" placeholder="Password" required />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700" type="submit">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;