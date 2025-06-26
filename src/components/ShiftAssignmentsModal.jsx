import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { X, Users, Loader2, UserCheck, AlertCircle } from 'lucide-react';

export default function ShiftAssignmentsModal({ isOpen, shiftId, onClose }) {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen || !shiftId) return;

    const fetchAssignments = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/shifts/${shiftId}/assignments`);
        setAssignments(res.data);
      } catch (err) {
        console.error('Failed to fetch assignments', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [isOpen, shiftId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-blue-50">
          <div className="flex items-center">
            <Users className="w-6 h-6 text-indigo-600 mr-3" />
            <h2 className="text-2xl font-bold text-indigo-600">Assigned Employees</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mr-3" />
              <span className="text-lg text-gray-600">Loading assignments...</span>
            </div>
          ) : (
            <>
              {/* Assignment Summary */}
              <div className="mb-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <UserCheck className="w-5 h-5 text-indigo-600 mr-2" />
                    <span className="font-semibold text-indigo-800">
                      {assignments.length} employee{assignments.length !== 1 ? 's' : ''} assigned
                    </span>
                  </div>
                </div>
              </div>

              {/* Employee List */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {assignments.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Assigned Employees</h3>
                    <p className="text-gray-500">
                      No employees have been assigned to this shift yet.
                    </p>
                  </div>
                ) : (
                  assignments.map((assignment) => (
                    <div 
                      key={assignment.employeeId} 
                      className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 hover:shadow-md"
                    >
                      <div className="flex items-center flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-4">
                          {assignment.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-semibold text-gray-900">{assignment.fullName}</h3>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              {assignment.role}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">{assignment.email}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button 
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}