import React, { useState } from 'react';
import { Eye, EyeSlash, EnvelopeSimple, LockKey } from '@phosphor-icons/react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, validation and API calls would happen here
    onLogin();
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-[400px] bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
           <div className="px-4 py-2 rounded-lg">
             <img 
               src="https://i.ibb.co/99RKpWNq/Color-Black.png" 
               alt="Kletta Laaogo" 
               className="h-8 w-auto" 
             />
           </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-[#002b31] mb-2">Welcome back</h2>
        <p className="text-center text-gray-500 text-[13px] mb-8">Please enter your details to sign in.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[12px] font-semibold text-gray-700 ml-1">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <EnvelopeSimple size={18} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[42px] pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-[13px] text-gray-900 focus:outline-none focus:border-[#002b31] focus:ring-1 focus:ring-[#002b31] transition-all placeholder-gray-400"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[12px] font-semibold text-gray-700 ml-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <LockKey size={18} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[42px] pl-10 pr-10 bg-gray-50 border border-gray-200 rounded-lg text-[13px] text-gray-900 focus:outline-none focus:border-[#002b31] focus:ring-1 focus:ring-[#002b31] transition-all placeholder-gray-400"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end pt-1">
            <button type="button" className="text-[12px] font-medium text-[#002b31] hover:underline">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full h-[42px] bg-[#fcd34d] hover:bg-[#fbbf24] text-[#002b31] font-bold text-[13px] rounded-lg transition-colors shadow-sm mt-2"
          >
            Sign in
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-[12px] text-gray-500">Don't have an account yet? </span>
          <button className="text-[12px] font-bold text-[#002b31] hover:underline">
            Sign up
          </button>
        </div>
      </div>
      
      <div className="mt-8 text-center text-[11px] text-gray-400">
        &copy; 2025 Kletta. All rights reserved.
      </div>
    </div>
  );
};

export default Login;