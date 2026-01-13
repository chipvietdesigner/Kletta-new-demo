import React, { useState } from 'react';
import { 
  Eye, 
  EyeSlash, 
  CheckCircle, 
  Info
} from '@phosphor-icons/react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="flex min-h-screen w-full font-sans bg-[#F7F6EE] overflow-hidden items-center justify-center p-6">
      {/* Centered Login Card */}
      <div className="w-full max-w-[480px] bg-white p-12 rounded-[32px] shadow-sm flex flex-col border border-black/5">
        <div className="text-left mb-10">
          <h1 className="text-[28px] font-bold text-black tracking-tight mb-2">Welcome to Kletta</h1>
          <p className="text-[14px] text-gray-700 font-normal">
            New to Kletta? <button className="text-[#1E6F73] font-bold hover:underline">Sign up</button>
          </p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[13px] font-normal text-gray-700 ml-1">Email</label>
            <input 
              type="email" 
              required
              placeholder="name@company.com" 
              className="w-full h-[52px] px-4 rounded-xl border border-gray-300 text-[14px] font-normal text-black focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] outline-none transition-all" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-normal text-gray-700 ml-1">Your password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                required
                placeholder="Enter your password" 
                className="w-full h-[52px] px-4 pr-12 rounded-xl border border-gray-300 text-[14px] font-normal text-black focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] outline-none transition-all" 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors"
              >
                {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#fcd34d] hover:bg-[#fbbf24] text-[#002b31] h-[56px] rounded-xl font-bold text-[16px] transition-all shadow-md mt-4 flex items-center justify-center transform active:scale-[0.98]"
          >
            Log in
          </button>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div 
                onClick={() => setRememberMe(!rememberMe)}
                className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-all ${rememberMe ? 'bg-[#1E6F73] border-[#1E6F73]' : 'border-gray-300 bg-white group-hover:border-gray-400'}`}
              >
                {rememberMe && <CheckCircle size={14} weight="bold" className="text-white" />}
              </div>
              <span className="text-[13px] font-normal text-gray-700 select-none">Remember me</span>
              <Info size={16} className="text-gray-400 ml-[-4px]" />
            </label>
            <button type="button" className="text-[13px] font-normal text-gray-700 hover:text-[#1E6F73] transition-colors">
              Forgot password?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;