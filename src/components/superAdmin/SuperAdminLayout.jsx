import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice"; // Path verify kar lein
import {
  LayoutDashboard,
  School,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  GraduationCap,
} from "lucide-react";

const navItems = [
  { to: "/superadmin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/superadmin/schools", icon: School, label: "Manage Schools" },
  { to: "/superadmin/admins", icon: Users, label: "Manage Admins" },
  { to: "/superadmin/reports", icon: BarChart3, label: "Reports" },
  { to: "/superadmin/settings", icon: Settings, label: "System Settings" },
];

const SuperAdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux store se user data nikala safely
  const { user } = useSelector((state) => state.auth || {});

  const handleLogout = () => {
    dispatch(logout()); 
    navigate("/login");
  };

  return (
    <div className="flex h-screen w-screen bg-slate-950 text-white overflow-hidden select-none">
      
      {/* SIDEBAR */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300 ease-in-out shrink-0 h-full`}
      >
        {/* Header / Logo */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-slate-800 shrink-0">
          <div className="w-9 h-9 bg-violet-600 rounded-xl flex items-center justify-center shrink-0 shadow-md shadow-violet-600/10">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          {sidebarOpen && (
            <div className="animate-fade-in truncate">
              <p className="text-sm font-bold text-white leading-tight">EduManage</p>
              <p className="text-xs text-violet-400 font-medium">Super Admin</p>
            </div>
          )}
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group relative ${
                  isActive
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20 font-semibold"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span className="truncate">{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Profile & Logout Section */}
        <div className="p-3 border-t border-slate-800 bg-slate-900 shrink-0">
          {sidebarOpen && (
            <div className="flex items-center gap-3 px-3 py-2.5 mb-2 rounded-xl bg-slate-950/40 border border-slate-800/40 overflow-hidden">
              <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 text-white">
                {user?.name ? user.name.substring(0, 2).toUpperCase() : "SA"}
              </div>
              <div className="overflow-hidden text-left">
                <p className="text-xs font-semibold text-white truncate">
                  {user?.name || "Super Admin"}
                </p>
                <p className="text-[10px] text-slate-500 truncate">
                  {user?.email || "superadmin@domain.com"}
                </p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all w-full font-medium"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* RIGHT MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        
        {/* TOP BAR */}
        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 shrink-0 z-10">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-slate-400 hover:text-white transition-colors p-1.5 hover:bg-slate-800 rounded-lg"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-950 px-3 py-1.5 rounded-full border border-slate-800/50">
            <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse" />
            Super Admin Panel
          </div>
        </header>

        {/* COMPONENT VIEWPORT (OUTLET) */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-950 text-left h-[calc(100vh-64px)] w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;