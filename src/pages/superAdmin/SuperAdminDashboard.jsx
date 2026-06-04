import { School, Users, TrendingUp, AlertCircle } from "lucide-react";

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
    <div className="flex items-center justify-between mb-4">
      <p className="text-sm text-slate-400">{label}</p>
      <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
    </div>
    <p className="text-3xl font-bold text-white">{value}</p>
  </div>
);

const SuperAdminDashboard = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Super Admin Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">System-wide overview and management</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={School} label="Total Schools" value="24" color="bg-violet-600" />
        <StatCard icon={Users} label="Total Admins" value="36" color="bg-blue-600" />
        <StatCard icon={TrendingUp} label="Active Students" value="8,420" color="bg-emerald-600" />
        <StatCard icon={AlertCircle} label="Pending Requests" value="7" color="bg-amber-600" />
      </div>

      {/* Placeholder Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-base font-semibold text-white mb-4">Recent Schools</h2>
        <div className="space-y-3">
          {["Lahore Grammar School", "City School Karachi", "Beacon House Islamabad"].map((school) => (
            <div key={school} className="flex items-center justify-between py-3 border-b border-slate-800 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-violet-600/20 rounded-lg flex items-center justify-center">
                  <School className="w-4 h-4 text-violet-400" />
                </div>
                <span className="text-sm text-slate-300">{school}</span>
              </div>
              <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full">Active</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
