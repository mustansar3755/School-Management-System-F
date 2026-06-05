import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSuperAdminStats } from "../../store/dashboardSlice"; // Path check kar lein
import { School, Users, TrendingUp, AlertCircle, Loader2 } from "lucide-react";

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-slate-900 border border-slate-800 rounded-md p-5 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <p className="text-sm text-slate-400">{label}</p>
      <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
    </div>
    <p className="text-3xl font-bold text-white">
      {typeof value === "number" ? value.toLocaleString() : value}
    </p>
  </div>
);

const SuperAdminDashboard = () => {
  const dispatch = useDispatch();
  
  // Redux store se analytics aur loader nikalein
  const { stats, loading, error } = useSelector((state) => state.dashboard);

  // Initial load par real data hit karne ke liye
  useEffect(() => {
    dispatch(fetchSuperAdminStats());
  }, [dispatch]);

  // Loading indicator overlay
  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-3 text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
        <p className="text-sm font-medium">Fetching real-time overview...</p>
      </div>
    );
  }

  // Error boundary response
  if (error) {
    return (
      <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl">
        Failed to load dashboard metrics: {error}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Super Admin Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">System-wide overview and management</p>
      </div>

      {/* Dynamic StatCards using Backend Values */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={School} label="Total Schools" value={stats.totalSchools} color="bg-violet-600" />
        <StatCard icon={Users} label="Total Admins" value={stats.totalAdmins} color="bg-blue-600" />
        <StatCard icon={TrendingUp} label="Active Students" value={stats.activeStudents} color="bg-emerald-600" />
        <StatCard icon={AlertCircle} label="Pending Requests" value={stats.pendingRequests} color="bg-amber-600" />
      </div>

      {/* Dynamic Data Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-base font-semibold text-white mb-4">Recent Schools</h2>
        <div className="space-y-3">
          {stats.recentSchools && stats.recentSchools.length > 0 ? (
            stats.recentSchools.map((school) => (
              <div key={school._id} className="flex items-center justify-between py-3 border-b border-slate-800 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-violet-600/20 rounded-lg flex items-center justify-center">
                    <School className="w-4 h-4 text-violet-400" />
                  </div>
                  <span className="text-sm text-slate-300 font-medium">{school.name}</span>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  school.status === "active" 
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                    : "bg-slate-800 text-slate-400"
                }`}>
                  {school.status || "Active"}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500 py-2">No recently registered schools found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;