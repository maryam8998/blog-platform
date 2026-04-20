import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Please enter a valid email');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const user = {
        id: 1,
        name: formData.name,
        email: formData.email,
      };

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', 'mock-token-' + Date.now());
      
      toast.success('Account created successfully!');
      navigate('/');
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-300px)] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-secondary bg-opacity-50 backdrop-blur-sm border border-accent border-opacity-20 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-neutral mb-2 text-center">Create Account</h2>
          <p className="text-neutral text-opacity-60 text-center mb-6">Join our community of writers</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="relative">
              <FiUser className="absolute left-3 top-3 text-accent opacity-60" size={20} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full name"
                className="w-full bg-primary bg-opacity-50 border border-accent border-opacity-20 rounded-lg pl-10 pr-4 py-3 text-neutral focus:outline-none focus:border-accent focus:border-opacity-60 transition"
              />
            </div>

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

            {/* Confirm Password */}
            <div className="relative">
              <FiLock className="absolute left-3 top-3 text-accent opacity-60" size={20} />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full bg-primary bg-opacity-50 border border-accent border-opacity-20 rounded-lg pl-10 pr-4 py-3 text-neutral focus:outline-none focus:border-accent focus:border-opacity-60 transition"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent hover:bg-blue-600 disabled:opacity-50 text-primary font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 mt-6"
            >
              {loading ? 'Creating account...' : <>Create Account <FiArrowRight size={18} /></>}
            </button>
          </form>

          {/* Link */}
          <p className="text-center text-neutral text-opacity-60 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-accent hover:text-blue-400 font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}