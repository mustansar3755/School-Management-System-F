import { Users, BookOpen, CreditCard, CalendarCheck } from "lucide-react";

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

const AdminDashboard = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Your school's daily overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Users} label="Total Students" value="350" color="bg-emerald-600" />
        <StatCard icon={BookOpen} label="Teachers" value="28" color="bg-blue-600" />
        <StatCard icon={CreditCard} label="Fees Collected" value="PKR 1.2M" color="bg-violet-600" />
        <StatCard icon={CalendarCheck} label="Today's Attendance" value="94%" color="bg-amber-600" />
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-base font-semibold text-white mb-4">Recent Admissions</h2>
        <div className="space-y-3">
          {["Ali Hassan - Class 5", "Sara Khan - Class 8", "Ahmed Raza - Class 3"].map((student) => (
            <div key={student} className="flex items-center justify-between py-3 border-b border-slate-800 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-600/20 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-sm text-slate-300">{student}</span>
              </div>
              <span className="text-xs bg-blue-500/20 text-blue-400 px-2.5 py-1 rounded-full">New</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
