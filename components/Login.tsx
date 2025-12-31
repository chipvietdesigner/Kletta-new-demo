
import React, { useState } from 'react';
import { 
  Eye, 
  EyeSlash, 
  CheckCircle, 
  ShieldCheck, 
  Receipt,
  CreditCard,
  ChartPieSlice,
  Info
} from '@phosphor-icons/react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="flex min-h-screen w-full font-sans bg-white overflow-hidden">
      {/* LEFT COLUMN: Illustration & Message (Dark Panel) */}
      <div className="hidden lg:flex w-[40%] bg-[#002b31] relative flex-col justify-end p-16 overflow-hidden">
        {/* Abstract Background Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-kletta-yellow opacity-[0.08] rounded-full blur-[100px] animate-float"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-kletta-yellow opacity-[0.05] rounded-full blur-[120px] animate-float-reverse"></div>

        {/* Brand Logo (White) - Positioned at top left */}
        <div className="absolute top-12 left-16">
          <img src="https://i.ibb.co/Z6DzgDcm/Color-White.png" alt="Kletta" className="h-8 w-auto" />
        </div>

        {/* Premium Illustration Area - Moved down to avoid overlap */}
        <div className="relative mb-12 z-10 flex items-center justify-center">
          <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
             {/* Floating elements representing accounting clarity */}
             <div className="absolute top-8 left-0 w-48 h-64 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 transform -rotate-12 animate-float shadow-2xl flex flex-col p-6">
                <div className="w-10 h-10 rounded-lg bg-kletta-yellow/20 flex items-center justify-center mb-4">
                  <Receipt size={24} weight="fill" className="text-kletta-yellow" />
                </div>
                <div className="h-2 w-full bg-white/20 rounded-full mb-2"></div>
                <div className="h-2 w-2/3 bg-white/20 rounded-full mb-6"></div>
                <div className="mt-auto flex items-center gap-2">
                   <ShieldCheck size={18} weight="fill" className="text-green-400" />
                   <span className="text-[10px] text-white/60 font-medium tracking-wider uppercase">Auto-verified</span>
                </div>
             </div>

             <div className="absolute bottom-0 right-0 w-56 h-40 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 transform rotate-6 animate-float-reverse shadow-2xl flex items-center justify-center p-8">
                <div className="w-full flex flex-col gap-3">
                   <div className="flex justify-between items-center">
                      <CreditCard size={28} weight="fill" className="text-white/40" />
                      <div className="w-8 h-8 rounded-full bg-kletta-yellow/10 flex items-center justify-center">
                        <ChartPieSlice size={18} weight="fill" className="text-kletta-yellow" />
                      </div>
                   </div>
                   <div className="mt-2">
                      <div className="text-[20px] font-bold text-white tabular-nums tracking-tight">€12,400.00</div>
                      <div className="text-[11px] text-white/50 font-medium uppercase tracking-widest mt-1">Expenses Logged</div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Headline & Copy */}
        <div className="relative z-10 max-w">
          <h2 className="text-[48px] font-bold text-white leading-[1.1] mb-6 tracking-tight">
            Accounting app for<br />sole traders
          </h2>
          <p className="text-[16px] text-white/90 font-normal leading-relaxed mb-8">
            Kletta is the smart accounting partner built for you — the ambitious sole traders who take on the business world with confidence and clarity.
          </p>
          <a 
            href="https://kletta.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[14px] font-bold text-white underline underline-offset-8 hover:text-kletta-yellow transition-colors"
          >
            Why Kletta? Get the full story
          </a>
        </div>
      </div>

      {/* RIGHT COLUMN: Login Form (White Panel) */}
      <div className="flex-1 flex flex-col relative">
        {/* Center Content Wrapper */}
        <div className="flex-1 flex flex-col justify-center items-center px-8 sm:px-12 py-16">
          <div className="w-full max-w-[400px] flex flex-col">
            <div className="text-left mb-10">
              <h1 className="text-[28px] font-bold text-black tracking-tight mb-2">Welcome back.</h1>
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
      </div>
    </div>
  );
};

export default LoginScreen;
