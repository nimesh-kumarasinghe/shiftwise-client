import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Pencil, Trash2, Plus, Loader2, Search, X, Save, RotateCcw, AlertCircle, Check } from 'lucide-react';

const ToggleSwitch = ({ checked, onChange, disabled = false }) => (
  <button
    onClick={onChange}
    disabled={disabled}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out ${
      checked ? 'bg-green-600' : 'bg-gray-300'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
        checked ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

const BulkAddTable = ({ onSave, onCancel }) => {
  const [rows, setRows] = useState([
    {
      id: Date.now(),
      fullName: '',
      email: '',
      phone: '',
      role: '',
      availabilityNotes: '',
      maxWeeklyHours: 40,
      errors: {}
    }
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const addRow = () => {
    setRows([
      ...rows,
      {
        id: Date.now() + Math.random(),
        fullName: '',
        email: '',
        phone: '',
        role: '',
        availabilityNotes: '',
        maxWeeklyHours: 40,
        errors: {}
      }
    ]);
  };


  const removeRow = (id) => {
    if (rows.length > 1) {
      setRows(rows.filter(row => row.id !== id));
    }
  };

  const updateRow = (id, field, value) => {
    setRows(rows.map(row => 
      row.id === id 
        ? { ...row, [field]: value, errors: { ...row.errors, [field]: '' } }
        : row
    ));
  };

  const validateRow = (row) => {
    const errors = {};
    
    if (!row.fullName.trim()) {
      errors.fullName = 'Name is required';
    }
    
    if (!row.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) {
      errors.email = 'Invalid email format';
    }
    
    if (!row.role.trim()) {
      errors.role = 'Role is required';
    }
    
    if (!row.maxWeeklyHours || row.maxWeeklyHours < 1 || row.maxWeeklyHours > 168) {
      errors.maxWeeklyHours = 'Hours must be between 1-168';
    }

    if (!row.phone.trim()) {
      errors.phone = 'Phone is required';
    }
    if (!row.availabilityNotes.trim()) {
      errors.availabilityNotes = 'Availability notes required';
    }
    
    return errors;
  };

  const validateAllRows = () => {
    const updatedRows = rows.map(row => ({
      ...row,
      errors: validateRow(row)
    }));
    
    setRows(updatedRows);
    return updatedRows.every(row => Object.keys(row.errors).length === 0);
  };

  const handleSave = async () => {
    if (!validateAllRows()) {
      return;
    }

    // Check for duplicate emails
    const emails = rows.map(row => row.email.toLowerCase());
    const duplicates = emails.filter((email, index) => emails.indexOf(email) !== index);
    
    if (duplicates.length > 0) {
      alert('Duplicate emails found. Please ensure all emails are unique.');
      return;
    }

    setIsSubmitting(true);
    try {
      const validRows = rows.map(({ ...rest }) => rest);
      await onSave(validRows);
    } catch (error) {
      console.error('Failed to save employees:', error);
      alert('Failed to save employees. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-350 max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-blue-50">
          <h2 className="text-2xl font-bold text-indigo-600">Add Multiple Employees</h2>
          <button 
            onClick={onCancel}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-auto max-h-[60vh]">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-indigo-100">
                  <th className="text-left p-3 font-semibold text-indigo-800 border-b">Full Name *</th>
                  <th className="text-left p-3 font-semibold text-indigo-800 border-b">Email *</th>
                  <th className="text-left p-3 font-semibold text-indigo-800 border-b">Role *</th>
                  <th className="text-left p-3 font-semibold text-indigo-800 border-b">Phone *</th>
                  <th className="text-left p-3 font-semibold text-indigo-800 border-b">Availability Notes</th>
                  <th className="text-left p-3 font-semibold text-indigo-800 border-b">Max Hours *</th>
                  <th className="text-center p-3 font-semibold text-indigo-800 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-b border-gray-300 hover:bg-gray-50">
                    <td className="p-3">
                      <input
                        type="text"
                        value={row.fullName}
                        onChange={(e) => updateRow(row.id, 'fullName', e.target.value)}
                        placeholder="Enter full name"
                        className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent ${
                          row.errors.fullName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {row.errors.fullName && (
                        <p className="text-red-500 text-xs mt-1 flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {row.errors.fullName}
                        </p>
                      )}
                    </td>
                    <td className="p-3">
                      <input
                        type="email"
                        value={row.email}
                        onChange={(e) => updateRow(row.id, 'email', e.target.value)}
                        placeholder="Enter email"
                        className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent ${
                          row.errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {row.errors.email && (
                        <p className="text-red-500 text-xs mt-1 flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {row.errors.email}
                        </p>
                      )}
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={row.role}
                        onChange={(e) => updateRow(row.id, 'role', e.target.value)}
                        placeholder="Enter role"
                        className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent ${
                          row.errors.role ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {row.errors.role && (
                        <p className="text-red-500 text-xs mt-1 flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {row.errors.role}
                        </p>
                      )}
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={row.phone}
                        onChange={(e) => updateRow(row.id, 'phone', e.target.value)}
                        placeholder="Enter phone"
                        className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent ${
                          row.errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {row.errors.phone && (
                        <p className="text-red-500 text-xs mt-1 flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {row.errors.phone}
                        </p>
                      )}
                    </td>

                    <td className="p-3">
                      <input
                        type="text"
                        value={row.availabilityNotes}
                        onChange={(e) => updateRow(row.id, 'availabilityNotes', e.target.value)}
                        placeholder="Enter availability notes"
                        className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent ${
                          row.errors.availabilityNotes ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {row.errors.availabilityNotes && (
                        <p className="text-red-500 text-xs mt-1 flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {row.errors.availabilityNotes}
                        </p>
                      )}
                    </td>

                    <td className="p-3">
                      <input
                        type="number"
                        value={row.maxWeeklyHours}
                        onChange={(e) => updateRow(row.id, 'maxWeeklyHours', parseInt(e.target.value) || '')}
                        min="1"
                        max="168"
                        placeholder="Hours"
                        className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent ${
                          row.errors.maxWeeklyHours ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {row.errors.maxWeeklyHours && (
                        <p className="text-red-500 text-xs mt-1 flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {row.errors.maxWeeklyHours}
                        </p>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => removeRow(row.id)}
                        disabled={rows.length === 1}
                        className={`p-2 rounded-lg transition-colors ${
                          rows.length === 1 
                            ? 'text-gray-400 cursor-not-allowed' 
                            : 'text-red-600 hover:bg-red-50'
                        }`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <button
            onClick={addRow}
            className="mt-4 flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Another Row
          </button>
        </div>
        
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSubmitting}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save All Employees
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBulkAdd, setShowBulkAdd] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', role: '', maxWeeklyHours: '', isActive: '' });
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const pageSize = 8;

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('/employees');
      setEmployees(res.data);
    } catch (err) {
      console.error('Failed to load employees', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleBulkSave = async (newEmployees) => {
    try {
      const response = await axios.post('/employees/bulk', newEmployees);
      console.log(newEmployees);
      if (response.data?.rejectedEmails?.length) {
        alert(`Some emails were rejected (already exist):\n${response.data.rejectedEmails.join(', ')}`);
      } else {
        alert(`Successfully added ${newEmployees.length} employee(s)!`);
      }

      fetchEmployees(); // reload latest
      setShowBulkAdd(false);
    } catch (err) {
      console.error('Bulk save failed', err);
      alert('Failed to save employees. Please try again.');
    }
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/employees/${editingEmployee.id}`, formData);
      setShowEditModal(false);
      setEditingEmployee(null);
      setFormData({ fullName: '', email: '', phone: '', role: '', maxWeeklyHours: '', isActive: '' });
      fetchEmployees();
    } catch (err) {
      console.error('Edit failed', err);
      alert('Failed to update employee. Please try again.');
    }
  };

  // const handleDelete = async (id, name) => {
  //   if (!window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) return;
    
  //   try {
  //     await axios.delete(`/employees/${id}`);
  //     setEmployees(prev => prev.filter(emp => emp.id !== id));
  //     alert('Employee deleted successfully!');
  //   } catch (err) {
  //     console.error('Delete failed', err);
  //     alert('Failed to delete employee. Please try again.');
  //   }
  // };

  const toggleStatus = async (emp) => {
    const action = emp.isActive ? 'deactivate' : 'activate';
    const message = `Are you sure you want to ${action} "${emp.fullName}"?`;
    
    if (!window.confirm(message)) return;
    
    try {
      const updatedEmployee = { ...emp, isActive: !emp.isActive };
      await axios.put(`/employees/${emp.id}`, updatedEmployee);
      
      setEmployees(prev => 
        prev.map(employee => 
          employee.id === emp.id ? updatedEmployee : employee
        )
      );
      
      alert(`Employee ${action}d successfully!`);
    } catch (err) {
      console.error('Status toggle failed', err);
      alert(`Failed to ${action} employee. Please try again.`);
    }
  };

  const openEditModal = (employee) => {
    setEditingEmployee(employee);
    setFormData({
      fullName: employee.fullName,
      email: employee.email,
      phone: employee.phone,
      role: employee.role,
      maxWeeklyHours: employee.maxWeeklyHours,
      isActive: employee.isActive
    });
    setShowEditModal(true);
  };

  const filtered = employees.filter(emp => {
    const matchesSearch = emp.fullName.toLowerCase().includes(search.toLowerCase()) ||
                          emp.email.toLowerCase().includes(search.toLowerCase()) ||
                          emp.role.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || (statusFilter === 'active' ? emp.isActive : !emp.isActive);
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const currentData = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="min-h-screen bg-gray-50 px-6">
      <div className="max-w-400 mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-indigo-600 mb-2">Employee Management</h1>
          </div>
          <button
            onClick={() => setShowBulkAdd(true)}
            className="flex items-center bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-3 py-3 rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Multiple Employees
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex items-center gap-3 flex-1">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search employees by name, email & role..."
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
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
              
              <div className="text-sm text-gray-500 bg-gray-100 px-7 py-3 rounded-lg">
                {filtered.length} employee{filtered.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mr-3" />
            <span className="text-lg text-gray-600">Loading employees...</span>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
            {currentData.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No employees found</h3>
                <p className="text-gray-500">
                  {search || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filters' 
                    : 'Get started by adding your first employee'
                  }
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-indigo-100 to-blue-100">
                      <tr>
                        <th className="text-left p-6 font-semibold text-indigo-800 ">Employee</th>
                        <th className="text-left p-6 font-semibold text-indigo-800">Email</th>
                        <th className="text-left p-6 font-semibold text-indigo-800">Phone</th>
                        <th className="text-left p-6 font-semibold text-indigo-800">Role</th>
                        <th className="text-left p-6 font-semibold text-indigo-800">Hours</th>
                        <th className="text-left p-6 font-semibold text-indigo-800">Status</th>
                        <th className="text-right p-6 font-semibold text-indigo-800">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {currentData.map(emp => (
                        <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                          <td className="p-6">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-4">
                                {emp.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">{emp.fullName}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-6">
                            <div className="text-gray-900">{emp.email}</div>
                          </td>
                          <td className="p-6">
                            <div className="text-gray-900">{emp.phone}</div>
                          </td>
                          <td className="p-6">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                              {emp.role}
                            </span>
                          </td>
                          <td className="p-6">
                            <span className="text-gray-900 font-medium">{emp.maxWeeklyHours}h/week</span>
                          </td>
                          <td className="p-6">
                            <div className="flex items-center gap-3">
                              <ToggleSwitch
                                checked={emp.isActive}
                                onChange={() => toggleStatus(emp)}
                              />
                              <span className={`text-sm font-medium ${
                                emp.isActive ? 'text-green-700' : 'text-gray-500'
                              }`}>
                                {emp.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                          </td>
                          <td className="p-6">
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={() => openEditModal(emp)}
                                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                title="Edit employee"
                              >
                                <Pencil className="w-5 h-5 cursor-pointer" />
                              </button>
                              {/* <button 
                                onClick={() => handleDelete(emp.id, emp.fullName)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete employee"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button> */}
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
                      Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, filtered.length)} of {filtered.length} employees
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

        {/* Bulk Add Modal */}
        {showBulkAdd && (
          <BulkAddTable
            onSave={handleBulkSave}
            onCancel={() => setShowBulkAdd(false)}
          />
        )}

        {/* Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
            <form onSubmit={handleEditSave}>
              <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
                <h2 className="text-xl font-bold mb-6 text-indigo-600">Edit Employee</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Telephone"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Role"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Max Weekly Hours"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
                    value={formData.maxWeeklyHours}
                    onChange={(e) => setFormData({ ...formData, maxWeeklyHours: parseInt(e.target.value) || '' })}
                    required
                  />
                </div>
                <div className="flex justify-end gap-3 mt-8">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}