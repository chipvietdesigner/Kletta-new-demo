import React, { useState } from 'react';
import { Eye, EyeSlash, CheckCircle, ShieldCheck } from '@phosphor-icons/react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen w-full font-sans bg-white">
      <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-12 lg:px-20 xl:px-24 relative z-10">
        <div className="absolute top-8 left-8 sm:left-12 lg:left-20 xl:left-24"><img src="https://i.ibb.co/99RKpWNq/Color-Black.png" alt="Kletta" className="h-8 w-auto" /></div>
        <div className="w-full max-w-[400px] mx-auto">
          <div className="mb-10"><h1 className="text-[24px] font-semibold text-[#000000] mb-3 tracking-tight">Welcome back</h1><p className="text-[#000000] text-[14px] font-normal">Enter your details to access your accounting dashboard.</p></div>
          <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-5">
            <div className="space-y-1.5"><label className="text-[13px] font-medium text-[#000000]">Email</label><input type="email" placeholder="name@company.com" className="w-full h-[48px] px-4 rounded-xl border border-[#E5E7EB] text-[#000000] placeholder-[#BCC2C2] focus:border-[#1E6F73] outline-none transition-all shadow-sm font-normal" /></div>
            <div className="space-y-1.5"><div className="flex items-center justify-between"><label className="text-[13px] font-medium text-[#000000]">Password</label><button type="button" className="text-[12px] font-medium text-[#1E6F73]">Forgot password?</button></div><div className="relative"><input type={showPassword ? "text" : "password"} placeholder="Enter your password" className="w-full h-[48px] px-4 pr-12 rounded-xl border border-[#E5E7EB] text-[#000000] placeholder-[#BCC2C2] focus:border-[#1E6F73] outline-none transition-all shadow-sm font-normal" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#616A6B]">{showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}</button></div></div>
            <button type="submit" className="w-full bg-[#002b31] text-white h-[52px] rounded-xl font-medium text-[15px] transition-all shadow-md mt-2">Sign in</button>
          </form>
          <div className="mt-8 text-center"><p className="text-[14px] text-[#616A6B] font-medium">Don't have an account?{' '}<button className="text-[#1E6F73] font-medium hover:underline">Sign up</button></p></div>
        </div>
      </div>
      <div className="hidden lg:flex flex-1 bg-[#002b31] relative items-center justify-center overflow-hidden">
        <div className="w-[380px] bg-white rounded-2xl shadow-2xl p-6 space-y-4">
           <div className="flex items-center gap-3"><ShieldCheck size={18} weight="fill" className="text-[#002b31]" /><div className="text-[12px] font-medium text-[#000000]">Kletta AI Auto-verification</div></div>
           <div className="h-px bg-gray-100"></div>
           <div className="flex justify-between items-center"><div className="text-[11px] font-medium text-[#616A6B]">Status</div><div className="text-[18px] font-medium text-[#000000]">+€4,500.00</div></div>
           <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 border border-green-100 text-green-700 text-[11px] font-medium"><CheckCircle weight="fill" />Verified</div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;