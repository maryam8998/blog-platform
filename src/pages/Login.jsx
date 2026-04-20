import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Please enter a valid email');
      return;
    }

    setLoading(true);

    // Mock authentication
    setTimeout(() => {
      const user = {
        id: 1,
        name: formData.email.split('@')[0],
        email: formData.email,
      };

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', 'mock-token-' + Date.now());
      
      toast.success('Login successful!');
      navigate('/');
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-300px)] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-secondary bg-opacity-50 backdrop-blur-sm border border-accent border-opacity-20 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-neutral mb-2 text-center">Welcome Back</h2>
          <p className="text-neutral text-opacity-60 text-center mb-6">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="relative">
              <FiMail className="absolute left-3 top-3 text-accent opacity-60" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                className="w-full bg-primary bg-opacity-50 border border-accent border-opacity-20 rounded-lg pl-10 pr-4 py-3 text-neutral focus:outline-none focus:border-accent focus:border-opacity-60 transition"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FiLock className="absolute left-3 top-3 text-accent opacity-60" size={20} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full bg-primary bg-opacity-50 border border-accent border-opacity-20 rounded-lg pl-10 pr-4 py-3 text-neutral focus:outline-none focus:border-accent focus:border-opacity-60 transition"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent hover:bg-blue-600 disabled:opacity-50 text-primary font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 mt-6"
            >
              {loading ? 'Signing in...' : <>Sign In <FiArrowRight size={18} /></>}
            </button>
          </form>

          {/* Link */}
          <p className="text-center text-neutral text-opacity-60 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-accent hover:text-blue-400 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}