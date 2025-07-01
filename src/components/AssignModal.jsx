import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { X, Users, Loader2, UserCheck, AlertCircle } from 'lucide-react';

export default function AssignModal({ isOpen, shiftId, onClose, onAssigned }) {
  const [employees, setEmployees] = useState([]);
  const [assignedIds, setAssignedIds] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);

  useEffect(() => {
    if (!isOpen || !shiftId) return;

    const fetchEmployees = async () => {
      setFetchingData(true);
      try {
        const resEmp = await axios.get('/employees');
        const resAssigned = await axios.get(`/shifts/${shiftId}/assignments`);
        const already = resAssigned.data.map(e => e.employeeId);
        setEmployees(resEmp.data);
        setAssignedIds(already);
      } catch (err) {
        console.error('Failed to load employees', err);
      } finally {
        setFetchingData(false);
      }
    };

    fetchEmployees();
  }, [isOpen, shiftId]);

  const toggleSelect = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const handleAssign = async () => {
    if (selected.length === 0) return;
    setLoading(true);
    try {
      await axios.post(`/shifts/${shiftId}/assign`, { employeeIds: selected });
      onAssigned();
      onClose();
      setSelected([]);
    } catch (err) {
      console.error('Assign failed', err);
      alert('Failed to assign employees');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSelected([]);
    onClose();
  };

  if (!isOpen) return null;

  // Filter available employees (active and not already assigned)
  const availableEmployees = employees.filter(emp => 
    emp.isActive && !assignedIds.includes(emp.id)
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-blue-50">
          <div className="flex items-center">
            <Users className="w-6 h-6 text-indigo-600 mr-3" />
            <h2 className="text-2xl font-bold text-indigo-600">Assign Employees to Shift</h2>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {fetchingData ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mr-3" />
              <span className="text-lg text-gray-600">Loading employees...</span>
            </div>
          ) : (
            <>
              {/* Selection Summary */}
              <div className="mb-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <UserCheck className="w-5 h-5 text-indigo-600 mr-2" />
                    <span className="font-semibold text-indigo-800">
                      {selected.length} employee{selected.length !== 1 ? 's' : ''} selected
                    </span>
                  </div>
                  <div className="text-sm text-indigo-600">
                    {availableEmployees.length} available
                  </div>
                </div>
              </div>

              {/* Employee List */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {availableEmployees.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Available Employees</h3>
                    <p className="text-gray-500">
                      All active employees are already assigned to this shift or there are no active employees.
                    </p>
                  </div>
                ) : (
                  availableEmployees.map(emp => (
                    <label 
                      key={emp.id} 
                      className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selected.includes(emp.id)
                          ? 'border-indigo-500 bg-indigo-50 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={selected.includes(emp.id)}
                          onChange={() => toggleSelect(emp.id)}
                          className="w-5 h-5 text-indigo-600 bg-gray-100 border-gray-300 rounded"
                        />
                      </div>
                      
                      <div className="flex items-center ml-4 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-4">
                          {emp.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-semibold text-gray-900">{emp.fullName}</h3>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              {emp.role}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">{emp.email}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-xs text-gray-500">{emp.phone}</span>
                            <span className="text-xs text-gray-500">{emp.maxWeeklyHours}h/week max</span>
                          </div>
                        </div>
                      </div>
                    </label>
                  ))
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button 
            onClick={handleClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={loading || selected.length === 0 || fetchingData}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Assigning...
              </>
            ) : (
              <>
                <UserCheck className="w-4 h-4 mr-2" />
                Assign Selected ({selected.length})
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}