import React, { useState } from 'react';
import { Eye, EyeSlash, CheckCircle, TrendUp, ShieldCheck } from '@phosphor-icons/react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen w-full font-sans bg-white">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-12 lg:px-20 xl:px-24 relative z-10">
        {/* Logo */}
        <div className="absolute top-8 left-8 sm:left-12 lg:left-20 xl:left-24">
           <img 
             src="https://i.ibb.co/99RKpWNq/Color-Black.png" 
             alt="Kletta" 
             className="h-8 w-auto" 
           />
        </div>

        <div className="w-full max-w-[400px] mx-auto">
          <div className="mb-10">
            <h1 className="text-[32px] font-bold text-[#002b31] mb-3 tracking-tight">Welcome back</h1>
            <p className="text-[#6B7280] text-[15px]">
              Enter your details to access your accounting dashboard.
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-[#002b31]">Email</label>
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full h-[48px] px-4 rounded-xl border border-[#E5E7EB] text-[#0F2F33] placeholder-gray-400 focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] outline-none transition-all shadow-sm"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[13px] font-bold text-[#002b31]">Password</label>
                <button type="button" className="text-[12px] font-medium text-[#1E6F73] hover:underline">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full h-[48px] px-4 pr-12 rounded-xl border border-[#E5E7EB] text-[#0F2F33] placeholder-gray-400 focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] outline-none transition-all shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#002b31] hover:bg-[#003840] text-white h-[52px] rounded-xl font-bold text-[15px] transition-all shadow-md hover:shadow-lg mt-2 flex items-center justify-center"
            >
              Sign in
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[14px] text-gray-500">
              Don't have an account?{' '}
              <button className="text-[#1E6F73] font-bold hover:underline">
                Sign up
              </button>
            </p>
          </div>
        </div>
        
        {/* Footer copyright */}
        <div className="absolute bottom-6 left-0 right-0 text-center lg:text-left lg:pl-24">
           <p className="text-[11px] text-gray-400">© 2025 Kletta. All rights reserved.</p>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 bg-[#002b31] relative items-center justify-center overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-10" style={{ 
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', 
            backgroundSize: '32px 32px' 
        }}></div>
        
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#1E6F73] rounded-full mix-blend-multiply filter blur-[128px] opacity-50"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#fcd34d] rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>

        {/* Floating UI Card Mockup */}
        <div className="relative z-10 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-700 ease-out">
           <div className="w-[380px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/10">
              {/* Fake Header */}
              <div className="h-14 border-b border-gray-100 flex items-center justify-between px-6 bg-white">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                       <ShieldCheck size={18} weight="fill" className="text-[#002b31]" />
                    </div>
                    <div>
                       <div className="text-[12px] font-bold text-[#002b31]">Kletta AI</div>
                       <div className="text-[10px] text-gray-400">Auto-verification</div>
                    </div>
                 </div>
                 <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                 </div>
              </div>
              
              {/* Fake Content */}
              <div className="p-6 space-y-4">
                 <div className="flex items-center justify-between">
                    <div className="space-y-1">
                       <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Status</div>
                       <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 border border-green-100 text-green-700 text-[11px] font-bold">
                          <CheckCircle weight="fill" />
                          Verified
                       </div>
                    </div>
                    <div className="text-right space-y-1">
                       <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Amount</div>
                       <div className="text-[18px] font-bold text-[#002b31]">+€4,500.00</div>
                    </div>
                 </div>
                 
                 <div className="h-px bg-gray-100"></div>
                 
                 <div className="space-y-3">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-lg bg-[#FFF7D6] flex items-center justify-center text-[#92400E]">
                          <TrendUp weight="fill" size={20} />
                       </div>
                       <div className="flex-1">
                          <div className="text-[13px] font-bold text-[#002b31]">Business Income</div>
                          <div className="text-[11px] text-gray-500">Consulting Fees</div>
                       </div>
                       <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                          <CheckCircle size={10} weight="fill" className="text-white" />
                       </div>
                    </div>
                 </div>
                 
                 <div className="pt-2">
                    <button className="w-full py-2.5 bg-[#002b31] text-white rounded-lg text-[12px] font-bold shadow-md">
                       View Transaction
                    </button>
                 </div>
              </div>
           </div>
           
           {/* Floating Badge */}
           <div className="absolute -right-8 top-12 bg-white rounded-xl shadow-xl p-3 flex items-center gap-3 border border-gray-100 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                 <TrendUp weight="bold" size={20} />
              </div>
              <div>
                 <div className="text-[11px] font-bold text-gray-400">Monthly Profit</div>
                 <div className="text-[14px] font-bold text-[#002b31]">+32%</div>
              </div>
           </div>
        </div>

        <div className="absolute bottom-12 text-center max-w-md px-6">
           <h2 className="text-[24px] font-bold text-white mb-2">Automate your accounting</h2>
           <p className="text-gray-300 text-[14px] leading-relaxed">
              Join thousands of sole traders who trust Kletta for effortless bookkeeping and tax returns.
           </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;