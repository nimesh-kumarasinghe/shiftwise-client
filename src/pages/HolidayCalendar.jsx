import { useEffect, useState } from 'react';
import { Calendar, MapPin, Clock, Star, Loader2, Globe } from 'lucide-react';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Custom Calendar Component
const CustomCalendar = ({ holidays, onMonthChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const startOfMonth = dayjs(currentDate).startOf('month');
  const endOfMonth = dayjs(currentDate).endOf('month');
  const startOfCalendar = startOfMonth.startOf('week');
  const endOfCalendar = endOfMonth.endOf('week');
  
  const days = [];
  let day = startOfCalendar;
  
  while (day.isBefore(endOfCalendar) || day.isSame(endOfCalendar, 'day')) {
    days.push(day);
    day = day.add(1, 'day');
  }
  
  const isHoliday = (date) => {
    return holidays.some(h => dayjs(h.date).isSame(date, 'day'));
  };
  
  const getHolidayName = (date) => {
    const holiday = holidays.find(h => dayjs(h.date).isSame(date, 'day'));
    return holiday?.name;
  };
  
  const navigateMonth = (direction) => {
    const newDate = dayjs(currentDate).add(direction, 'month').toDate();
    setCurrentDate(newDate);
    onMonthChange(newDate);
  };
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow border border-gray-100">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-indigo-600">
          {dayjs(currentDate).format('MMMM YYYY')}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-indigo-50 rounded-lg transition-colors text-indigo-600"
          >
            ←
          </button>
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-indigo-50 rounded-lg transition-colors text-indigo-600"
          >
            →
          </button>
        </div>
      </div>
      
      {/* Days of Week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(dayName => (
          <div key={dayName} className="p-3 text-center text-sm font-semibold text-gray-500">
            {dayName}
          </div>
        ))}
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const isCurrentMonth = day.month() === dayjs(currentDate).month();
          const isToday = day.isSame(dayjs(), 'day');
          const isHolidayDay = isHoliday(day);
          const holidayName = getHolidayName(day);
          
          return (
            <div
              key={index}
              className={`
                relative p-2 min-h-[60px] border border-gray-100 rounded-lg transition-all duration-200 hover:bg-gray-50
                ${!isCurrentMonth ? 'text-gray-300 bg-gray-50/50' : ''}
                ${isToday ? 'ring-2 ring-indigo-300 bg-indigo-50' : ''}
                ${isHolidayDay ? 'bg-gradient-to-br from-red-50 to-pink-50 border-red-200' : ''}
              `}
              title={holidayName}
            >
              <div className={`
                text-sm font-medium
                ${isToday ? 'text-indigo-700' : isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                ${isHolidayDay ? 'text-red-700 font-bold' : ''}
              `}>
                {day.date()}
              </div>
              
              {isHolidayDay && (
                <div className="absolute top-1 right-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                </div>
              )}
              
              {isHolidayDay && holidayName && (
                <div className="text-xs text-red-600 font-medium mt-1 leading-tight">
                  {holidayName.length > 12 ? holidayName.substring(0, 12) + '...' : holidayName}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function HolidayCalendar() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCountryName, setSelectedCountryName] = useState('');
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [year, setYear] = useState(new Date().getFullYear());

    const apiKey = import.meta.env.VITE_CALENDARIFIC_API_KEY;

  // Initialize dayjs relative time plugin
  dayjs.extend(relativeTime);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get(`https://calendarific.com/api/v2/countries?api_key=${apiKey}`);
        setCountries(res.data.response.countries);
      } catch (err) {
        console.error('Failed to fetch countries', err);
      } finally {
        setCountriesLoading(false);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;
    
    const fetchHolidays = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${selectedCountry}&year=${year}`
        );
        const data = res.data.response.holidays.map(h => ({
          name: h.name,
          date: h.date.iso
        }));
        setHolidays(data);
      } catch (err) {
        console.error('Failed to fetch holidays', err);
        setHolidays([]);
      } finally {
        setLoading(false);
      }
    };
    fetchHolidays();
  }, [selectedCountry, year]);

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    const country = countries.find(c => c['iso-3166'] === countryCode);
    setSelectedCountry(countryCode);
    setSelectedCountryName(country?.country_name || '');
  };

  const handleMonthChange = (newDate) => {
    const newYear = newDate.getFullYear();
    if (newYear !== year) {
      setYear(newYear);
    }
  };

  const upcomingHolidays = holidays
    .filter(h => dayjs(h.date).isAfter(dayjs()))
    .slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50 px-6">
      <div className="max-w-400 mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-indigo-600 mb-2">Global Holiday Calendar</h1>
            <p className="text-gray-600">Discover holidays and celebrations around the world</p>
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-blue-100 px-4 py-2 rounded-lg">
            <Globe className="w-5 h-5 text-indigo-600" />
            <span className="text-indigo-700 font-medium">{year}</span>
          </div>
        </div>

        {/* Country Selection */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-900">Select Country</h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {countriesLoading ? (
              <div className="flex items-center gap-2 text-gray-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Loading countries...</span>
              </div>
            ) : (
              <select
                value={selectedCountry}
                onChange={handleCountryChange}
                className="flex-1 max-w-md border border-gray-200 px-4 py-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent text-gray-900"
              >
                <option value="">Choose a country to explore holidays...</option>
                {countries.map(c => (
                  <option key={c['iso-3166']} value={c['iso-3166']}>
                    {c.country_name}
                  </option>
                ))}
              </select>
            )}
            
            {selectedCountryName && (
              <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-lg">
                <Star className="w-4 h-4 text-indigo-600" />
                <span className="text-indigo-700 font-medium">{selectedCountryName}</span>
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mr-3" />
            <span className="text-lg text-gray-600">Loading holidays...</span>
          </div>
        )}

        {/* Main Content */}
        {!loading && selectedCountry && (
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Calendar */}
            <div className="xl:col-span-2">
              <CustomCalendar holidays={holidays} onMonthChange={handleMonthChange} />
            </div>
            
            {/* Upcoming Holidays Sidebar */}
            <div className="xl:col-span-2">
              <div className="bg-white rounded-2xl p-6 shadow border border-gray-100 sticky top-6">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Upcoming Holidays</h2>
                </div>
                
                {upcomingHolidays.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {upcomingHolidays.map((holiday, index) => (
                      <div key={index} className="group p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 hover:from-indigo-100 hover:to-blue-100 transition-all duration-200">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate group-hover:text-indigo-700 transition-colors">
                              {holiday.name}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {dayjs(holiday.date).format('MMM D, YYYY')}
                            </p>
                            <p className="text-xs text-indigo-600 mt-1 font-medium">
                              {dayjs(holiday.date).fromNow()}
                            </p>
                          </div>
                          <div className="flex-shrink-0 ml-3">
                            <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-pink-400 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">No upcoming holidays found for this year</p>
                  </div>
                )}
                
                {/* Holiday Legend */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Legend</h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gradient-to-br from-red-50 to-pink-50 border border-red-200 rounded"></div>
                      <span className="text-gray-600">Holiday dates</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-indigo-50 border-2 border-indigo-300 rounded"></div>
                      <span className="text-gray-600">Today</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-gray-600">Holiday indicator</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !selectedCountry && (
          <div className="bg-white rounded-2xl p-12 shadow border border-gray-100 text-center">
            <div className="max-w-md mx-auto">
              <Globe className="w-16 h-16 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Holiday Calendar</h2>
              <p className="text-gray-600 mb-6">
                Select a country from the dropdown above to view holidays and celebrations throughout the year. 
                Holidays will be highlighted on the calendar with detailed information.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Interactive Calendar</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  <span>Holiday Details</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}