import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSchools } from "../../store/schoolSlice"; 
import AddSchoolModal from "./AddSchoolModal"; 
import Button from "../../components/comman/Button";  
import { Plus, School, ShieldCheck } from "lucide-react";

const ManageSchools = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  // Individual hooks optimization: Direct and simple selectors
  const schoolsList = useSelector((state) => state.schools.schoolsList);
  const loading = useSelector((state) => state.schools.loading);
  const error = useSelector((state) => state.schools.error);

  useEffect(() => {
    dispatch(fetchSchools());
  }, [dispatch]);

  return (
    <div className="p-6 text-white min-h-screen bg-slate-950">
      <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manage Schools</h1>
          <p className="text-sm text-slate-400 mt-1">
            Overview and status tracking of all registered institutional clients.
          </p>
        </div>
        
        <Button variant="success" icon={Plus} onClick={() => setModalOpen(true)}>
          Add New School
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 gap-3 text-slate-400">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm">Fetching structural ecosystem data...</p>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-950/40 border border-red-900 text-red-400 rounded-xl text-sm">
          🚨 <strong>Data Pipeline Interrupted:</strong> {error}
        </div>
      ) : !schoolsList || schoolsList.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-2xl p-16 text-center">
          <School className="w-12 h-12 text-slate-600 mb-4" />
          <h3 className="text-lg font-semibold text-slate-200">No Schools Registered Yet</h3>
          <p className="text-sm text-slate-400 max-w-sm mt-1">
            Get started by onboarding your first tenant branch to setup schemas.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-slate-900 border border-slate-800 rounded-xl shadow-md">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-5">Institution</th>
                <th className="py-3.5 px-5">Code</th>
                <th className="py-3.5 px-5">Point of Contact</th>
                <th className="py-3.5 px-5">Tier</th>
                <th className="py-3.5 px-5 text-right">Operational Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {schoolsList.map((school) => (
                <tr key={school._id || school.code} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 px-5">
                    <div className="font-semibold text-white">{school.name}</div>
                    <div className="text-xs text-slate-400">{school.address}</div>
                  </td>
                  <td className="py-4 px-5">
                    <span className="font-mono text-xs bg-slate-950 border border-slate-800 px-2 py-1 rounded text-emerald-400">
                      {school.code}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <div className="text-slate-200">{school.owner?.name || "N/A"}</div>
                    <div className="text-xs text-slate-500">{school.owner?.email || "No Email"}</div>
                  </td>
                  <td className="py-4 px-5">
                    <span className="flex items-center gap-1.5 capitalize font-medium text-xs text-slate-300">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                      {school.subscription?.plan || "Free"}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                      school.status === "active" 
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                        : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                    }`}>
                      {school.status || "Active"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddSchoolModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default ManageSchools;