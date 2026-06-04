import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardList,
  CreditCard,
  CalendarCheck,
  BarChart3,
  LogOut,
  Menu,
  X,
  GraduationCap,
} from "lucide-react";

const navItems = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/students", icon: Users, label: "Students" },
  { to: "/admin/teachers", icon: BookOpen, label: "Teachers" },
  { to: "/admin/classes", icon: ClipboardList, label: "Classes" },
  { to: "/admin/fees", icon: CreditCard, label: "Fees" },
  { to: "/admin/attendance", icon: CalendarCheck, label: "Attendance" },
  { to: "/admin/reports", icon: BarChart3, label: "Reports" },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300 shrink-0`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-slate-800">
          <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          {sidebarOpen && (
            <div>
              <p className="text-sm font-bold text-white leading-tight">EduManage</p>
              <p className="text-xs text-emerald-400">School Admin</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span className="font-medium">{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="p-3 border-t border-slate-800">
          {sidebarOpen && (
            <div className="flex items-center gap-3 px-3 py-2 mb-2 rounded-xl bg-slate-800/50">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-xs 
              font-bold shrink-0">
                AD
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
                <p className="text-xs text-slate-400 truncate">{user?.email}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all w-full"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Admin Panel
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
