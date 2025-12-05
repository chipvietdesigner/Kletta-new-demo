import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen w-full font-['Aktifo-A']">
      {/* Left Side - Form */}
      <div className="w-1/2 bg-white flex flex-col justify-center px-24 relative">
        <div className="absolute top-12 left-12">
          <div className="px-4 py-2 rounded-lg">
             <img 
               src="https://i.ibb.co/99RKpWNq/Color-Black.png" 
               alt="Kletta Laaogo" 
               className="h-8 w-auto" 
             />
           </div>
        </div>

        <div className="max-w-md w-full mx-auto">
          <h2 className="text-3xl font-semibold mb-3 text-[#1a1a1a]">Welcome back!</h2>
          <p className="text-gray-600 mb-8">Enter your email and password to sign in,</p>

          <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-5">
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="text-left">
              <button type="button" className="text-sm font-medium text-[#1a1a1a] hover:underline">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#002B31] text-white py-3.5 rounded-lg font-medium hover:bg-[#003840] transition-colors mt-2"
            >
              Sign in
            </button>

            <div className="text-center mt-6">
              <span className="text-gray-600">Don't have an account? </span>
              <button type="button" className="font-semibold text-[#1a1a1a] hover:underline">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Image & Marketing */}
      <div className="w-1/2 bg-[#F9FAF4] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="max-w-lg text-center z-10 mt-20">
          <h2 className="text-5xl font-semibold text-[#1a1a1a] leading-tight mb-12">
            The easiest accounting app for sole traders.
          </h2>
        </div>
        
        <div className="flex-1 w-full flex items-end justify-center">
            <img 
                src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&q=80&w=800" 
                alt="Smiling professional woman with crossed arms" 
                className="object-cover h-[80%] max-w-full"
                style={{ filter: 'contrast(1.05)' }}
            />
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;