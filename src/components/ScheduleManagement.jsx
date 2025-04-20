import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Edit, Plus, ChevronDown, ChevronUp, Save, RefreshCw, Check, X, ArrowLeft, Filter } from 'lucide-react';

const ScheduleManagement = ({ onNavigateBack }) => {
  // States for schedule management
  const [scheduleAction, setScheduleAction] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [scheduleType, setScheduleType] = useState('building');
  const [showScheduleOptions, setShowScheduleOptions] = useState(false);
  
  // Mock building schedule data
  const [buildingSchedule, setBuildingSchedule] = useState({
    operatingHours: {
      Monday: { start: '07:30', end: '16:00' },
      Tuesday: { start: '07:30', end: '16:00' },
      Wednesday: { start: '07:30', end: '16:00' },
      Thursday: { start: '07:30', end: '16:00' },
      Friday: { start: '07:30', end: '16:00' },
      Saturday: { start: '', end: '' },
      Sunday: { start: '', end: '' },
    },
    bellSchedule: [
      { period: 1, start: '08:00', end: '08:50' },
      { period: 2, start: '08:55', end: '09:45' },
      { period: 3, start: '09:50', end: '10:40' },
      { period: 4, start: '10:45', end: '11:35' },
      { period: 5, start: '11:40', end: '12:30' },
      { period: 6, start: '12:35', end: '13:25' },
      { period: 7, start: '13:30', end: '14:20' },
    ],
    schoolYear: {
      start: '2025-08-15',
      end: '2026-06-10',
    },
    transitionTime: 5, // minutes between classes
  });
  
  // Mock room schedule data
  const [rooms, setRooms] = useState([
    { 
      id: '1001', 
      name: 'Science Lab A',
      usesBuildingSchedule: true,
      activePeriods: [1, 2, 3, 5, 6],
      customSchedule: [] 
    },
    { 
      id: '1002', 
      name: 'Math Room 102',
      usesBuildingSchedule: true,
      activePeriods: [1, 2, 4, 5, 7],
      customSchedule: [] 
    },
    { 
      id: '1003', 
      name: 'English 103',
      usesBuildingSchedule: false,
      activePeriods: [],
      customSchedule: [
        { day: 'Monday', start: '09:00', end: '11:30' },
        { day: 'Monday', start: '13:00', end: '15:00' },
        { day: 'Wednesday', start: '09:00', end: '11:30' },
        { day: 'Wednesday', start: '13:00', end: '15:00' },
        { day: 'Friday', start: '09:00', end: '12:00' },
      ]
    },
    // Add more rooms as needed
  ]);

  // Handle room selection
  const handleRoomSelect = (roomId) => {
    const room = rooms.find(r => r.id === roomId);
    setSelectedRoom(room);
    setScheduleType('room');
  };
  
  // Toggle period selection for room
  const togglePeriod = (period) => {
    if (!selectedRoom) return;
    
    const updatedRooms = rooms.map(room => {
      if (room.id === selectedRoom.id) {
        let activePeriods = [...room.activePeriods];
        
        if (activePeriods.includes(period)) {
          activePeriods = activePeriods.filter(p => p !== period);
        } else {
          activePeriods.push(period);
          activePeriods.sort((a, b) => a - b);
        }
        
        return {
          ...room,
          activePeriods
        };
      }
      return room;
    });
    
    setRooms(updatedRooms);
    setSelectedRoom(updatedRooms.find(r => r.id === selectedRoom.id));
  };
  
  // Toggle room schedule type
  const toggleRoomScheduleType = (usesBuildingSchedule) => {
    if (!selectedRoom) return;
    
    const updatedRooms = rooms.map(room => {
      if (room.id === selectedRoom.id) {
        return {
          ...room,
          usesBuildingSchedule
        };
      }
      return room;
    });
    
    setRooms(updatedRooms);
    setSelectedRoom(updatedRooms.find(r => r.id === selectedRoom.id));
  };
  
  // Add custom schedule entry for a room
  const addCustomScheduleEntry = () => {
    if (!selectedRoom) return;
    
    const updatedRooms = rooms.map(room => {
      if (room.id === selectedRoom.id) {
        return {
          ...room,
          customSchedule: [
            ...room.customSchedule,
            { day: 'Monday', start: '08:00', end: '09:00' }
          ]
        };
      }
      return room;
    });
    
    setRooms(updatedRooms);
    setSelectedRoom(updatedRooms.find(r => r.id === selectedRoom.id));
  };
  
  // Update custom schedule entry
  const updateCustomScheduleEntry = (index, field, value) => {
    if (!selectedRoom) return;
    
    const updatedRooms = rooms.map(room => {
      if (room.id === selectedRoom.id) {
        const updatedSchedule = [...room.customSchedule];
        updatedSchedule[index] = {
          ...updatedSchedule[index],
          [field]: value
        };
        
        return {
          ...room,
          customSchedule: updatedSchedule
        };
      }
      return room;
    });
    
    setRooms(updatedRooms);
    setSelectedRoom(updatedRooms.find(r => r.id === selectedRoom.id));
  };
  
  // Remove custom schedule entry
  const removeCustomScheduleEntry = (index) => {
    if (!selectedRoom) return;
    
    const updatedRooms = rooms.map(room => {
      if (room.id === selectedRoom.id) {
        const updatedSchedule = room.customSchedule.filter((_, i) => i !== index);
        
        return {
          ...room,
          customSchedule: updatedSchedule
        };
      }
      return room;
    });
    
    setRooms(updatedRooms);
    setSelectedRoom(updatedRooms.find(r => r.id === selectedRoom.id));
  };
  
  // Handle building bell schedule update
  const updateBellSchedule = (index, field, value) => {
    const updatedBellSchedule = [...buildingSchedule.bellSchedule];
    updatedBellSchedule[index] = {
      ...updatedBellSchedule[index],
      [field]: value
    };
    
    setBuildingSchedule({
      ...buildingSchedule,
      bellSchedule: updatedBellSchedule
    });
  };
  
  // Handle operating hours update
  const updateOperatingHours = (day, field, value) => {
    setBuildingSchedule({
      ...buildingSchedule,
      operatingHours: {
        ...buildingSchedule.operatingHours,
        [day]: {
          ...buildingSchedule.operatingHours[day],
          [field]: value
        }
      }
    });
  };
  
  // Handle school year update
  const updateSchoolYear = (field, value) => {
    setBuildingSchedule({
      ...buildingSchedule,
      schoolYear: {
        ...buildingSchedule.schoolYear,
        [field]: value
      }
    });
  };
  
  // Handle transition time update
  const updateTransitionTime = (value) => {
    setBuildingSchedule({
      ...buildingSchedule,
      transitionTime: parseInt(value, 10)
    });
  };
  
  // Save schedule changes
  const saveScheduleChanges = () => {
    // In a real application, this would save to the database
    console.log('Building Schedule:', buildingSchedule);
    console.log('Room Schedules:', rooms);
    
    // Reset states
    setScheduleAction(null);
  };
  
  // Render schedule options dropdown
  const renderScheduleOptions = () => {
    return (
      <div className="absolute mt-2 top-full left-0 w-64 bg-white rounded-lg shadow-lg overflow-hidden z-10 border border-gray-200">
        <button 
          className="w-full px-4 py-3 text-left hover:bg-indigo-50 flex items-center"
          onClick={() => {
            setScheduleAction('edit');
            setShowScheduleOptions(false);
          }}
        >
          <Edit size={16} className="mr-3 text-indigo-600" />
          <span className="font-medium">Edit Current Schedule</span>
        </button>
        <button 
          className="w-full px-4 py-3 text-left hover:bg-indigo-50 flex items-center border-t border-gray-100"
          onClick={() => {
            setScheduleAction('new');
            setShowScheduleOptions(false);
          }}
        >
          <Plus size={16} className="mr-3 text-indigo-600" />
          <span className="font-medium">Make New Schedule</span>
        </button>
      </div>
    );
  };
  
  // Render schedule management interface
  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white py-4 px-6 shadow-sm flex items-center justify-between">
        <div className="flex items-center">
          <button 
            className="mr-4 text-gray-600 hover:text-gray-900"
            onClick={onNavigateBack}
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Schedule Management</h1>
        </div>
        
        <div className="flex items-center">
          <div className="relative">
            <button 
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
              onClick={() => setShowScheduleOptions(!showScheduleOptions)}
            >
              <Calendar size={16} className="mr-2" />
              <span>Schedule Options</span>
              {showScheduleOptions ? (
                <ChevronUp size={16} className="ml-2" />
              ) : (
                <ChevronDown size={16} className="ml-2" />
              )}
            </button>
            
            {showScheduleOptions && renderScheduleOptions()}
          </div>
          
          {scheduleAction && (
            <button 
              className="ml-3 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center"
              onClick={saveScheduleChanges}
            >
              <Save size={16} className="mr-2" />
              <span>Save Changes</span>
            </button>
          )}
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {scheduleAction && (
          <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Select View</h2>
              
              <div className="space-y-2 mb-6">
                <button 
                  className={`w-full px-3 py-2 rounded-lg text-left flex items-center ${
                    scheduleType === 'building' 
                      ? 'bg-indigo-50 text-indigo-700 font-medium' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setScheduleType('building');
                    setSelectedRoom(null);
                  }}
                >
                  <Calendar size={16} className="mr-3 text-indigo-600" />
                  <span>Building Schedule</span>
                </button>
                <button 
                  className={`w-full px-3 py-2 rounded-lg text-left flex items-center ${
                    scheduleType === 'room' && !selectedRoom
                      ? 'bg-indigo-50 text-indigo-700 font-medium' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setScheduleType('room');
                    setSelectedRoom(null);
                  }}
                >
                  <Filter size={16} className="mr-3 text-indigo-600" />
                  <span>Room Schedules</span>
                </button>
              </div>
              
              {scheduleType === 'room' && (
                <>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">SELECT ROOM</h3>
                  <div className="space-y-1 max-h-96 overflow-y-auto">
                    {rooms.map(room => (
                      <button 
                        key={room.id}
                        className={`w-full px-3 py-2 text-left rounded-lg ${
                          selectedRoom?.id === room.id
                            ? 'bg-indigo-50 text-indigo-700 font-medium'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                        onClick={() => handleRoomSelect(room.id)}
                      >
                        <div className="font-medium">Room #{room.id}</div>
                        <div className="text-xs text-gray-500">{room.name}</div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        
        {/* Main schedule editor */}
        <div className="flex-1 overflow-y-auto p-6">
          {!scheduleAction && (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <Calendar size={48} className="text-indigo-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Schedule Management</h2>
              <p className="text-gray-600 max-w-md mb-6">
                View and edit building-wide schedules or individual room schedules.
                Select an option to get started.
              </p>
              <div className="flex flex-col gap-3 w-64">
                <button 
                  className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
                  onClick={() => setScheduleAction('edit')}
                >
                  Edit Current Schedule
                </button>
                <button 
                  className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                  onClick={() => setScheduleAction('new')}
                >
                  Make New Schedule
                </button>
              </div>
            </div>
          )}
          
          {scheduleAction && scheduleType === 'building' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Building Schedule</h2>
              
              {/* School Year Settings */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">School Year</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input 
                      type="date" 
                      value={buildingSchedule.schoolYear.start}
                      onChange={(e) => updateSchoolYear('start', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input 
                      type="date" 
                      value={buildingSchedule.schoolYear.end}
                      onChange={(e) => updateSchoolYear('end', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2"
                    />
                  </div>
                </div>
              </div>
              
              {/* Operating Hours */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Operating Hours</h3>
                <div className="space-y-3">
                  {Object.keys(buildingSchedule.operatingHours).map(day => (
                    <div key={day} className="grid grid-cols-3 gap-4 items-center">
                      <div className="font-medium">{day}</div>
                      <div>
                        <input 
                          type="time" 
                          value={buildingSchedule.operatingHours[day].start}
                          onChange={(e) => updateOperatingHours(day, 'start', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg p-2"
                        />
                      </div>
                      <div>
                        <input 
                          type="time" 
                          value={buildingSchedule.operatingHours[day].end}
                          onChange={(e) => updateOperatingHours(day, 'end', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg p-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Bell Schedule */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Bell Schedule</h3>
                  <div>
                    <label className="inline-block text-sm font-medium text-gray-700 mr-2">
                      Transition Time (minutes)
                    </label>
                    <input 
                      type="number" 
                      min="0"
                      max="15"
                      value={buildingSchedule.transitionTime}
                      onChange={(e) => updateTransitionTime(e.target.value)}
                      className="w-16 border border-gray-300 rounded-lg p-2"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-gray-200">
                        <th className="pb-2 font-semibold text-gray-600">Period</th>
                        <th className="pb-2 font-semibold text-gray-600">Start Time</th>
                        <th className="pb-2 font-semibold text-gray-600">End Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {buildingSchedule.bellSchedule.map((period, index) => (
                        <tr key={period.period} className="border-b border-gray-100">
                          <td className="py-3">
                            <span className="font-medium">Period {period.period}</span>
                          </td>
                          <td className="py-3">
                            <input 
                              type="time" 
                              value={period.start}
                              onChange={(e) => updateBellSchedule(index, 'start', e.target.value)}
                              className="border border-gray-300 rounded-lg p-2"
                            />
                          </td>
                          <td className="py-3">
                            <input 
                              type="time" 
                              value={period.end}
                              onChange={(e) => updateBellSchedule(index, 'end', e.target.value)}
                              className="border border-gray-300 rounded-lg p-2"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {scheduleAction && scheduleType === 'room' && selectedRoom && (
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Room #{selectedRoom.id} - {selectedRoom.name}
                </h2>
              </div>
              
              {/* Schedule Type Selection */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Schedule Type</h3>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio"
                      checked={selectedRoom.usesBuildingSchedule}
                      onChange={() => toggleRoomScheduleType(true)}
                      className="form-radio h-5 w-5 text-indigo-600"
                    />
                    <span className="ml-2 font-medium">Sync with Building Schedule</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio"
                      checked={!selectedRoom.usesBuildingSchedule}
                      onChange={() => toggleRoomScheduleType(false)}
                      className="form-radio h-5 w-5 text-indigo-600"
                    />
                    <span className="ml-2 font-medium">Use Custom Schedule</span>
                  </label>
                </div>
              </div>
              
              {/* Building Schedule Selection */}
              {selectedRoom.usesBuildingSchedule && (
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Active Periods</h3>
                  <p className="text-gray-600 mb-4">
                    Select which periods this room is occupied.
                  </p>
                  <div className="grid grid-cols-4 gap-3">
                    {buildingSchedule.bellSchedule.map(period => (
                      <div 
                        key={period.period}
                        onClick={() => togglePeriod(period.period)}
                        className={`p-4 rounded-lg border-2 cursor-pointer flex flex-col items-center ${
                          selectedRoom.activePeriods.includes(period.period)
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-bold text-lg">Period {period.period}</div>
                        <div className="text-sm text-gray-500">
                          {period.start} - {period.end}
                        </div>
                        {selectedRoom.activePeriods.includes(period.period) && (
                          <div className="mt-2 text-indigo-600">
                            <Check size={18} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Custom Schedule */}
              {!selectedRoom.usesBuildingSchedule && (
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Custom Schedule</h3>
                    <button 
                      className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium flex items-center"
                      onClick={addCustomScheduleEntry}
                    >
                      <Plus size={16} className="mr-1" />
                      Add Time Slot
                    </button>
                  </div>
                  
                  {selectedRoom.customSchedule.length === 0 ? (
                    <p className="text-gray-500 italic">No custom schedule entries yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {selectedRoom.customSchedule.map((entry, index) => (
                        <div key={index} className="flex items-center bg-gray-50 p-3 rounded-lg">
                          <div className="grid grid-cols-3 gap-4 flex-grow">
                            <div>
                              <label className="block text-xs font-medium text-gray-500 mb-1">Day</label>
                              <select 
                                value={entry.day}
                                onChange={(e) => updateCustomScheduleEntry(index, 'day', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-2"
                              >
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-500 mb-1">Start Time</label>
                              <input 
                                type="time" 
                                value={entry.start}
                                onChange={(e) => updateCustomScheduleEntry(index, 'start', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-2"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-500 mb-1">End Time</label>
                              <input 
                                type="time" 
                                value={entry.end}
                                onChange={(e) => updateCustomScheduleEntry(index, 'end', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-2"
                              />
                            </div>
                          </div>
                          <button 
                            className="ml-3 p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100"
                            onClick={() => removeCustomScheduleEntry(index)}
                          >
                            <X size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          
          {scheduleAction && scheduleType === 'room' && !selectedRoom && (
            <div className="max-w-4xl mx-auto text-center py-12">
              <Clock size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">Select a Room</h3>
              <p className="text-gray-600">
                Choose a room from the sidebar to view and edit its schedule.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleManagement; 'Science Lab A',
      usesBuildingSchedule: true,
      activePeriods: [1, 2, 3, 5, 6],
      customSchedule: [] 
    },
    { 
      id: '1002', 
      name: 'Math Room 102',
      usesBuildingSchedule: true,
      activePeriods: [1, 2, 4, 5, 7],
      customSchedule: [] 
    },
    { 
      id: '1003', 
      name: 'English 103',
      usesBuildingSchedule: false,
      activePeriods: [],
      customSchedule: [
        { day: 'Monday', start: '09:00', end: '11:30' },
        { day: 'Monday', start: '13:00', end: '15:00' },
        { day: 'Wednesday', start: '09:00', end: '11:30' },
        { day: 'Wednesday', start: '13:00', end: '15:00' },
        { day: 'Friday', start: '09:00', end: '12:00' },
      ]
    },
    // Add more rooms as needed
  ]);

  // Handle room selection
  const handleRoomSelect = (roomId) => {
    const room = rooms.find(r => r.id === roomId);
    setSelectedRoom(room);
    setScheduleType('room');
  };
  
  // Toggle period selection for room
  const togglePeriod = (period) => {
    if (!selectedRoom) return;
    
    const updatedRooms = rooms.map(room => {
      if (room.id === selectedRoom.id) {
        let activePeriods = [...
