import { Loader2 } from "lucide-react";

const Button = ({
  children,
  type = "button",
  variant = "primary", // primary, success, danger, warning, info, outline
  size = "md",         // sm, md, lg
  isLoading = false,
  disabled = false,
  onClick,
  icon: Icon,          // Lucide icon pass karne ke liye (Optional)
  className = "",      // Kisi specific jagah extra CSS add karne ke liye
  ...props
}) => {
  
  // Base core styles jo har button par apply honge
  const baseStyles = "inline-flex cursor-pointer items-center justify-center font-medium rounded-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none gap-2";

  // State Variants Tailwind mapping
  const variants = {
    primary: "bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white shadow-lg shadow-violet-600/10",
    success: "bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white shadow-lg shadow-emerald-600/10",
    danger: "bg-red-600 hover:bg-red-500 active:bg-red-700 text-white shadow-lg shadow-red-600/10",
    warning: "bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white shadow-lg shadow-amber-600/10",
    info: "bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white shadow-lg shadow-blue-600/10",
    outline: "bg-transparent border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white"
  };

  // Size variations
  const sizes = {
    sm: "px-3.5 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Agar component loading state mein ho tou loader show karein */}
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        // Agar koi icon pass kiya gaya hai tou wo render hoga
        Icon && <Icon className="w-4 h-4 shrink-0" />
      )}
      
      <span>{children}</span>
    </button>
  );
};

export default Button;