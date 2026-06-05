import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSchool } from "../../store/schoolSlice"; // Apne path ke mutabiq verify karein
import { School, X } from "lucide-react";
import Button from "../../components/comman/Button"; // Reusable button ka path

const AddSchoolModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  // Redux store se loading state access ki
  const { loading = false } = useSelector((state) => state.schools || {});

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    code: "",
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    subscriptionPlan: "free",
  });

  // Agar modal open na ho to kuch bhi render na karein
  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      address: formData.address,
      code: formData.code.toUpperCase(),
      owner: {
        name: formData.ownerName,
        phone: formData.ownerPhone,
        email: formData.ownerEmail,
      },
      subscription: {
        plan: formData.subscriptionPlan,
        start_date: new Date(),
        end_date: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1),
        ),
      },
    };

    dispatch(addSchool(payload)).then((res) => {
      if (!res.error) {
        // State reset aur modal close parent function ke throw
        setFormData({
          name: "",
          address: "",
          code: "",
          ownerName: "",
          ownerPhone: "",
          ownerEmail: "",
          subscriptionPlan: "free",
        });
        onClose();
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col scale-in">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <School className="w-5 h-5 text-emerald-500" />
            <h2 className="text-lg font-bold text-white">
              Register New School
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-600 cursor-pointer p-1 rounded-full transition-colors hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Container */}
        <form
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto space-y-6 flex-1 text-left custom-scrollbar"
        >
          {/* Section 1 */}
          <div>
            <h3 className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-3">
              1. Institution Info
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  School Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-md
                   py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  placeholder="e.g. Allied School"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Unique School Code *
                </label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-md
                   py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-emerald-500 uppercase"
                  placeholder="e.g. LHR-042"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-md
                   py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  placeholder="Institutional physical address"
                />
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <h3 className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-3">
              2. Point of Contact (Owner)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-md
                   py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  placeholder="Owner Name"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="ownerPhone"
                  value={formData.ownerPhone}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-md
                   py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  placeholder="+923000000000"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="ownerEmail"
                  value={formData.ownerEmail}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-md
                   py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  placeholder="owner@domain.com"
                />
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <h3 className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-3">
              3. Billing & Operations
            </h3>
            <div className="w-full md:w-1/2">
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Subscription Tier
              </label>
              <select
                name="subscriptionPlan"
                value={formData.subscriptionPlan}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-md
                 py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-emerald-500 capitalize"
              >
                <option value="free">Free Tier</option>
                <option value="basic">Basic Plan</option>
                <option value="standard">Standard Plan</option>
                <option value="premium">Premium Access</option>
              </select>
            </div>
          </div>

          {/* Reusable Buttons Implementation */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>

            <Button type="submit" variant="success" isLoading={loading}>
              Save Records
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSchoolModal;
