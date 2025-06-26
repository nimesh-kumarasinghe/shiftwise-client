import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { X, Calendar, Clock, Loader2, Save, Plus, Edit3 } from 'lucide-react';

export default function ShiftFormModal({ isOpen, shift, onClose, onSuccess }) {
  const [shiftDate, setShiftDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [shiftType, setShiftType] = useState('');
  const [daysCount, setDaysCount] = useState(1);
  const [skipWeekends, setSkipWeekends] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (shift) {
      setShiftDate(shift.shiftDate);
      setStartTime(shift.startTime);
      setEndTime(shift.endTime);
      setShiftType(shift.shiftType);
      setDaysCount(1);
      setSkipWeekends(false);
    } else {
      setShiftDate('');
      setStartTime('');
      setEndTime('');
      setShiftType('');
      setDaysCount(1);
      setSkipWeekends(false);
    }
  }, [shift]);

  const handleSubmit = async () => {
    if (!shiftDate || !startTime || !endTime || !shiftType) {
      alert('Please fill all required fields.');
      return;
    }

    setLoading(true);
    try {
      if (shift) {
        await axios.put(`/shifts/${shift.id}`, {
          shiftDate,
          startTime,
          endTime,
          shiftType
        });
      } else {
        await axios.post('/shifts', {
          shiftDate,
          daysCount,
          skipWeekends,
          startTime,
          endTime,
          shiftType
        });
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Shift operation failed:', error);
      alert('Shift operation failed.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-blue-50">
          <div className="flex items-center">
            {shift ? (
              <Edit3 className="w-6 h-6 text-indigo-600 mr-3" />
            ) : (
              <Plus className="w-6 h-6 text-indigo-600 mr-3" />
            )}
            <h2 className="text-2xl font-bold text-indigo-600">
              {shift ? 'Edit Shift' : 'Create New Shift'}
            </h2>
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
          <div className="space-y-6">
            {/* Shift Date */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4 mr-2 text-indigo-600" />
                Shift Date *
              </label>
              <input 
                type="date" 
                className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors" 
                value={shiftDate?.split('T')[0]} 
                onChange={(e) => setShiftDate(e.target.value)} 
              />
            </div>

            {/* Time Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <Clock className="w-4 h-4 mr-2 text-indigo-600" />
                  Start Time *
                </label>
                <input 
                  type="time" 
                  className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors" 
                  value={startTime} 
                  onChange={(e) => setStartTime(e.target.value)} 
                />
              </div>
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <Clock className="w-4 h-4 mr-2 text-indigo-600" />
                  End Time *
                </label>
                <input 
                  type="time" 
                  className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors" 
                  value={endTime} 
                  onChange={(e) => setEndTime(e.target.value)} 
                />
              </div>
            </div>

            {/* Shift Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Shift Type *
              </label>
              <input 
                type="text" 
                className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors" 
                value={shiftType} 
                onChange={(e) => setShiftType(e.target.value)} 
                placeholder="e.g., Day, Night, Morning, Evening" 
              />
            </div>

            {/* Bulk Creation Options (only for new shifts) */}
            {!shift && (
              <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                <h3 className="font-semibold text-purple-800 mb-4">Bulk Creation Options</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Number of Days
                    </label>
                    <input 
                      type="number" 
                      min="1" 
                      max="365"
                      className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 transition-colors" 
                      value={daysCount} 
                      onChange={(e) => setDaysCount(parseInt(e.target.value) || 1)} 
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={skipWeekends} 
                        onChange={() => setSkipWeekends(!skipWeekends)} 
                        className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 rounded mr-3"
                      />
                      <span className="text-sm font-medium text-gray-700">Skip Weekends</span>
                    </label>
                  </div>
                </div>
                <p className="text-xs text-purple-600 mt-2">
                  Create multiple shifts starting from the selected date
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button 
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit} 
            disabled={loading}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {shift ? 'Update Shift' : 'Create Shift'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}