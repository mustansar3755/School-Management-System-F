import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Link component ko import kiya
import { useDispatch, useSelector } from "react-redux"; 
import { loginUser } from "../../store/authSlice"; 
import { GraduationCap, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  const dispatch = useDispatch();
  const { loading, error: serverError } = useSelector((state) => state.auth); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setLocalError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    const resultAction = await dispatch(loginUser(formData));

    if (loginUser.fulfilled.match(resultAction)) {
      const userRole = resultAction.payload.user.role;

      if (userRole === "superadmin") {
        navigate("/superadmin/dashboard");
      } else if (userRole === "admin") {
        navigate("/admin/dashboard");
      } else if (userRole === "teacher") {
        navigate("/teacher/dashboard");
      } else if (userRole === "student") {
        navigate("/student/dashboard");
      }
    } else {
      setLocalError(resultAction.payload?.message || "Invalid credentials. Please try again.");
    }
  };

  const displayError = localError || serverError;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDM0di0yaC0ydi0yaDJ2LTJoMnYyaDJ2Mmgtcm0wIDAiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40" />

      <div className="relative w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-blue-600 shadow-2xl shadow-blue-500/30 mb-4">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">EduManage</h1>
          <p className="text-blue-300 mt-1 text-sm">School Management System</p>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">Welcome back</h2>
            <p className="text-slate-400 text-sm mt-1">Sign in to your account to continue</p>
          </div>

          

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm text-slate-300 mb-1.5 font-medium">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@school.com"
                  required
                  className="w-full bg-white/5 border border-white/10 text-white placeholder:text-slate-500 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm text-slate-300 mb-1.5 font-medium">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/5 border border-white/10 text-white placeholder:text-slate-500 rounded-xl pl-10 pr-12 py-3 text-sm focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {displayError && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {displayError}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-200 mt-2 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* ─── ADDED: REGISTRATION REDIRECT SECTION ─── */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center text-sm">
            <p className="text-slate-400">
              Don't have an account?{" "}
              <Link 
                to="/register" 
                className="text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-200 underline underline-offset-4 decoration-blue-500/30 hover:decoration-blue-300"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-slate-500 text-xs mt-6">
          © 2026 EduManage. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;