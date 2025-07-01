import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Users, CalendarCheck2, CalendarX2, CalendarDays, UserCheck, Calendar, Clock } from 'lucide-react';

export default function Dashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const res = await axios.get('/dashboard/summary');
        setSummary(res.data);
      } catch (err) {
        console.error('Failed to load dashboard summary', err);
      }
    }
    fetchSummary();
  }, []);

  if (!summary) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        <SummaryCard 
          icon={<Users />} 
          title="Total Employees" 
          value={summary.totalEmployees}
          iconBgColor="bg-indigo-50"
          iconColor="text-indigo-600"
        />
        {/* <SummaryCard 
          icon={<UserCheck />} 
          title="Active Employees" 
          value={summary.activeEmployees}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
        /> */}
        <SummaryCard 
          icon={<CalendarDays />} 
          title="Total Shifts" 
          value={summary.totalShifts}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <SummaryCard 
          icon={<CalendarCheck2 />} 
          title="Confirmed Shifts" 
          value={summary.confirmedShifts}
          iconBgColor="bg-green-50"
          iconColor="text-green-600"
        />
        <SummaryCard 
          icon={<CalendarX2 />} 
          title="Unconfirmed Shifts" 
          value={summary.unconfirmedShifts}
          iconBgColor="bg-orange-50"
          iconColor="text-orange-600"
        />
        <SummaryCard 
          icon={<Calendar />} 
          title="Upcoming Shifts" 
          value={summary.upcomingShifts?.length || 0}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Idle Employees */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-indigo-600">Idle Employees (no shifts this week)</h2>
          {summary.idleEmployees.length === 0 ? (
            <p className="text-gray-500 text-sm">No idle employees this week.</p>
          ) : (
            <div>
              {/* Table Headers */}
              <div className="grid grid-cols-2 gap-4 pb-3 mb-3 border-b border-gray-200">
                <div className="font-semibold text-gray-700">Name</div>
                <div className="font-semibold text-gray-700">Role</div>
              </div>
              
              {/* Employee List */}
              <ul className="divide-y divide-gray-100 max-h-70 overflow-y-auto">
                {summary.idleEmployees.map(emp => (
                  <li key={emp.id} className="py-3 grid grid-cols-2 gap-4">
                    <span className="font-medium text-gray-700">{emp.fullName}</span>
                    <span className="text-sm text-gray-500">{emp.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Upcoming Shifts */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-indigo-600">Upcoming Shifts</h2>
          {!summary.upcomingShifts || summary.upcomingShifts.length === 0 ? (
            <p className="text-gray-500 text-sm">No upcoming shifts scheduled.</p>
          ) : (
            <div>
              {/* Table Headers */}
              <div className="grid grid-cols-3 gap-4 pb-3 mb-3 border-b border-gray-200">
                <div className="font-semibold text-gray-700">Date</div>
                <div className="font-semibold text-gray-700">Shift</div>
                <div className="font-semibold text-gray-700">Staff</div>
              </div>
              
              {/* Shifts List */}
              <ul className="divide-y divide-gray-100 max-h-70 overflow-y-auto">
                {summary.upcomingShifts.map((shift, index) => (
                  <li key={index} className="py-3 grid grid-cols-3 gap-4">
                    <span className="font-medium text-gray-700">
                      {new Date(shift.shiftDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                    <span className="text-sm text-gray-600">
                      {shift.shiftType} - {shift.startTime}
                    </span>
                    <span className="text-sm text-gray-500">
                      {shift.assignedEmployeeCount} assigned
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Weekly Shift Calendar */}
      {summary.weeklyShiftLoad && summary.weeklyShiftLoad.length > 0 && (
        <div className="bg-white rounded-xl shadow p-6 mt-8">
          <h2 className="text-xl font-bold text-indigo-600">Weekly Shift Schedule</h2>
          <p className='mb-4 text-gray-500 text-sm'>(Week start from today)</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
            {(() => {
              // Group shifts by date
              const shiftsByDate = summary.weeklyShiftLoad.reduce((acc, shift) => {
                const dateKey = new Date(shift.date).toDateString();
                if (!acc[dateKey]) {
                  acc[dateKey] = [];
                }
                acc[dateKey].push(shift);
                return acc;
              }, {});

              return Object.entries(shiftsByDate).map(([dateKey, shifts]) => (
                <div key={dateKey} className="border border-gray-200 rounded-lg p-4 min-h-[200px]">
                  {/* Date Header */}
                  <div className="text-center mb-3 pb-2 border-b border-gray-100">
                    <div className="font-semibold text-gray-800">
                      {new Date(dateKey).toLocaleDateString('en-US', { 
                        weekday: 'short' 
                      })}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(dateKey).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                  
                  {/* Shifts for this day */}
                  <div className="space-y-2">
                    {shifts.map((shift, index) => (
                      <div 
                        key={index} 
                        className={`p-3 rounded-lg border-l-4 ${
                          shift.confirmation 
                            ? 'bg-green-50 border-green-500' 
                            : 'bg-orange-50 border-orange-400'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-sm font-medium text-gray-800">
                            {shift.shiftType}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                            shift.confirmation 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-orange-100 text-orange-700'
                          }`}>
                            {shift.confirmation ? 'Confirmed' : 'Pending'}
                          </span>
                        </div>
                        <div className="text-xs text-gray-700 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1">
                              <Clock className={`w-4 h-4 ${
                                shift.confirmation ? 'text-green-600' : 'text-orange-600'
                              }` } />
                              {shift.startTime}
                            </span>
                            <span className="font-medium flex items-center gap-1">
                              <Users className={`w-4 h-4 ${
                                shift.confirmation ? 'text-green-600' : 'text-orange-600'
                              }` } />
                              {shift.assignedCount} staff
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Empty state */}
                  {shifts.length === 0 && (
                    <div className="text-center text-gray-400 text-sm mt-8">
                      No shifts scheduled
                    </div>
                  )}
                </div>
              ));
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ icon, title, value, iconBgColor, iconColor }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow flex items-center space-x-4">
      <div className={`${iconColor} ${iconBgColor} p-3 rounded-full`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-medium">{title}</p>
        <p className="text-lg font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}