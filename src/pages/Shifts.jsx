import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Plus, Download, CalendarDays, Eye, Users, CheckCircle2, Trash2, Mail, FileText, Pencil, Search, Loader2 } from 'lucide-react';
import ShiftFormModal from '../components/ShiftFormModal';
import AssignModal from '../components/AssignModal';
import ShiftAssignmentsModal from '../components/ShiftAssignmentsModal';

export default function Shifts() {
  const [shifts, setShifts] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showAssign, setShowAssign] = useState(false);
  const [selectedShiftId, setSelectedShiftId] = useState(null);
  const [editingShift, setEditingShift] = useState(null);
  const [showAssignments, setShowAssignments] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const fetchShifts = async () => {
    try {
      const res = await axios.get('/shifts');
      setShifts(res.data);
    } catch (err) {
      console.error('Failed to load shifts', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShifts();
  }, []);

  const filteredShifts = shifts.filter(s => {
    let matchesDateRange = true;
    let matchesSearch = true;
    let matchesStatus = true;

    // Date range filter
    if (fromDate && toDate) {
      const date = new Date(s.shiftDate);
      matchesDateRange = date >= new Date(fromDate) && date <= new Date(toDate);
    }

    // Search filter
    if (search) {
      matchesSearch = s.shiftType.toLowerCase().includes(search.toLowerCase()) ||
                    s.shiftDate.includes(search) ||
                    `${s.startTime} - ${s.endTime}`.toLowerCase().includes(search.toLowerCase());
    }

    // Status filter
    if (statusFilter !== 'all') {
      matchesStatus = statusFilter === 'confirmed' ? s.isConfirmed : !s.isConfirmed;
    }

    return matchesDateRange && matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredShifts.length / pageSize);
  const currentData = filteredShifts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleExportByDate = async () => {
    if (!fromDate || !toDate) {
      alert('Please select both from and to dates for export.');
      return;
    }
    try {
      const res = await axios.get(`/shifts/export?from=${fromDate}&to=${toDate}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Shifts_${fromDate}_to_${toDate}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error('Export failed', err);
    }
  };

    const handleConfirm = async (shiftId) => {
        try {
            await axios.patch(`/shifts/${shiftId}/confirm`);
            fetchShifts();
        } catch (err) {
            console.error('Confirm failed', err);

            // Check if the error has a response and message from the server
            const errorMessage =
            err.response && err.response.data
                ? err.response.data
                : 'Failed to confirm shift';

            alert(errorMessage);
        }
    };


  const handleDelete = async (shiftId) => {
    if (!window.confirm('Are you sure you want to delete this shift?')) return;
    try {
      await axios.delete(`/shifts/${shiftId}`);
      fetchShifts();
    } catch (err) {
      console.error('Delete failed', err);
      alert('Failed to delete shift');
    }
  };

  const handleExportSingle = async (shiftId) => {
    try {
      const res = await axios.get(`/shifts/export/${shiftId}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Shift_${shiftId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error('Export failed', err);
    }
  };

  const handleNotify = async (shiftId) => {
    try {
      await axios.post(`/shifts/${shiftId}/notify`);
      alert('Shift email sent.');
    } catch (err) {
      console.error('Notify failed', err);
      alert('Failed to send email.');
    }
  };

  const handleEdit = (shift) => {
    setEditingShift(shift);
    setShowForm(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6">
      <div className="max-w-400 mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-indigo-600 mb-2">Shift Management</h1>
          </div>
          <button 
            onClick={() => { setEditingShift(null); setShowForm(true); }} 
            className="flex items-center bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5 mr-2" /> 
            Create New Shift
          </button>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4 items-center mb-4">
            <div className="flex items-center gap-3 flex-1">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search shifts by type, date, or time..."
                className="flex-1 border-0 bg-gray-100 rounded-lg px-4 py-3 focus:bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-200 px-6 py-3 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed Only</option>
                <option value="draft">Draft Only</option>
              </select>
              
              <div className="text-sm text-gray-500 bg-gray-100 px-7 py-3 rounded-lg">
                {filteredShifts.length} shift{filteredShifts.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>

          {/* Date Range and Export */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-gray-500" />
                <label className="text-sm font-medium text-gray-700">From</label>
                <input 
                  type="date" 
                  value={fromDate} 
                  onChange={(e) => setFromDate(e.target.value)} 
                  className="border border-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent" 
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">To</label>
                <input 
                  type="date" 
                  value={toDate} 
                  onChange={(e) => setToDate(e.target.value)} 
                  className="border border-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent" 
                />
              </div>
            </div>

            <button 
              onClick={handleExportByDate} 
              disabled={!fromDate || !toDate}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Download className="w-4 h-4" /> 
              Export Range
            </button>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mr-3" />
            <span className="text-lg text-gray-600">Loading shifts...</span>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
            {currentData.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <CalendarDays className="w-16 h-16 mx-auto mb-4 opacity-50" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No shifts found</h3>
                <p className="text-gray-500">
                  {search || statusFilter !== 'all' || fromDate || toDate
                    ? 'Try adjusting your search or filters' 
                    : 'Get started by creating your first shift'
                  }
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-indigo-100 to-blue-100">
                      <tr>
                        <th className="text-left py-4 px-6 font-semibold text-indigo-800">Date</th>
                        <th className="text-left py-4 px-6 font-semibold text-indigo-800">Shift Details</th>
                        <th className="text-left py-4 px-6 font-semibold text-indigo-800">Time</th>
                        <th className="text-left py-4 px-6 font-semibold text-indigo-800">Assigned</th>
                        <th className="text-left py-4 px-6 font-semibold text-indigo-800">Status</th>
                        <th className="text-right py-4 px-6 font-semibold text-indigo-800">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {currentData.map(shift => (
                        <tr key={shift.id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex flex-col items-center justify-center text-white font-semibold mr-4 leading-tight">
                                <div className="text-[12px]">{new Date(shift.shiftDate).toLocaleString('en-US', { month: 'short' })}</div>
                                <div className="text-[12px]">{new Date(shift.shiftDate).getDate()}</div>
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">{formatDate(shift.shiftDate)}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                              {shift.shiftType}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="text-gray-900 font-medium">{shift.startTime} - {shift.endTime}</div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center">
                              <Users className="w-4 h-4 text-gray-400 mr-2" />
                              <span className="text-gray-900 font-regular">{shift.assignments?.length ?? 0} assigned</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            {shift.isConfirmed ? (
                              <span className="inline-flex items-center px-3 py-1 text-sm font-regular rounded-full bg-green-100 text-green-700">
                                <CheckCircle2 className="w-4 h-4 mr-1" />
                                Confirmed
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-3 py-1 text-sm font-regular rounded-full bg-yellow-100 text-yellow-700">
                                <CalendarDays className="w-4 h-4 mr-1" />
                                Draft
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                title="View Assignments" 
                                onClick={() => { setSelectedShiftId(shift.id); setShowAssignments(true); }}
                                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                              >
                                <Eye className="w-5 h-5" />
                              </button>
                              
                              {!shift.isConfirmed && (
                                <>
                                  <button 
                                    title="Assign Staff" 
                                    onClick={() => { setSelectedShiftId(shift.id); setShowAssign(true); }}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  >
                                    <Users className="w-5 h-5" />
                                  </button>
                                  <button 
                                    title="Edit Shift" 
                                    onClick={() => handleEdit(shift)}
                                    className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                                  >
                                    <Pencil className="w-5 h-5" />
                                  </button>
                                  <button 
                                    title="Confirm Shift" 
                                    onClick={() => handleConfirm(shift.id)}
                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                  >
                                    <CheckCircle2 className="w-5 h-5" />
                                  </button>
                                  <button 
                                    title="Delete Shift" 
                                    onClick={() => handleDelete(shift.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  >
                                    <Trash2 className="w-5 h-5" />
                                  </button>
                                </>
                              )}
                              
                              {shift.isConfirmed && (
                                <button 
                                  title="Export PDF" 
                                  onClick={() => handleExportSingle(shift.id)}
                                  className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                >
                                  <FileText className="w-5 h-5" />
                                </button>
                              )}
                              
                              {!shift.isInformed && shift.isConfirmed && (
                                <button 
                                  title="Send Email Notification" 
                                  onClick={() => handleNotify(shift.id)}
                                  className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                                >
                                  <Mail className="w-5 h-5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between p-6 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, filteredShifts.length)} of {filteredShifts.length} shifts
                    </div>
                    <div className="flex gap-2">
                      {Array.from({ length: totalPages }, (_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            currentPage === i + 1
                              ? 'bg-indigo-600 text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Modals */}
        <AssignModal
          isOpen={showAssign}
          shiftId={selectedShiftId}
          onClose={() => setShowAssign(false)}
          onAssigned={fetchShifts}
        />
        <ShiftFormModal
          isOpen={showForm}
          shift={editingShift}
          onClose={() => { setShowForm(false); setEditingShift(null); }}
          onSuccess={fetchShifts}
        />
        <ShiftAssignmentsModal
          isOpen={showAssignments}
          shiftId={selectedShiftId}
          onClose={() => setShowAssignments(false)}
        />
      </div>
    </div>
  );
}