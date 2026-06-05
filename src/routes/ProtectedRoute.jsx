import { Navigate } from "react-router-dom";
// ─── REDUX HOOK IMPORT KIYA ───────────────────────────────────────────────
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRole }) => {
  // Redux store se auth slice nikalna aur check karna
  const { user, loading } = useSelector((state) => state.auth);

  // Agar slice mein loading state handle ho rahi ho toh reload par white screen se bachne ke liye check
  if (loading) {
    return (
      <div className="h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // 1. Agar user logged in nahi hai
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Agar user logged in hai lekin uska role allowed nahi hai
  if (allowedRole && user.role !== allowedRole) {
    // Role ke mutabiq sahi dashboard par redirect karein
    if (user.role === "superadmin") return <Navigate to="/superadmin/dashboard" replace />;
    if (user.role === "admin") return <Navigate to="/admin/dashboard" replace />;
    
    // Agar koi aur roles hain (like teacher/student) toh unka default route yahan de sakte hain
    return <Navigate to="/login" replace />;
  }

  // 3. Agar sab sahi hai toh page render karein
  return children;
};

export default ProtectedRoute;