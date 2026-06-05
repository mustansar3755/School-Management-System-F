import { useState } from "react";
import AddSchoolModal from "./AddSchoolModal"; // Path check kar lein
import Button from "../../components/comman/Button";  // Custom Button import kiya
import { Plus } from "lucide-react";

const ManageSchools = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="p-2 text-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Manage Schools</h1>
        </div>
        
        {/* Reusable Button Trigger */}
        <Button 
          variant="success" 
          icon={Plus} 
          onClick={() => setModalOpen(true)}
        >
          Add New School
        </Button>
      </div>

      {/* Alag se banaya hua Modal call kiya */}
      <AddSchoolModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
      />
    </div>
  );
};

export default ManageSchools;