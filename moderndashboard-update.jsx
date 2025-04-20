import React, { useState } from 'react';
import { AlertCircle, Lock, Shield, Bell, Settings, Eye, Menu, Clock, ArrowLeft, Home, LogOut, Activity, ChevronRight, CheckCircle, Server, Map } from 'lucide-react';

const ModernDashboard = ({ onNavigateToSchedule }) => {
  const [threatMode, setThreatMode] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  
  // Simplified room data
  const rooms = [
    { id: '1001', status: 'locked', type: 'classroom', x: 70, y: 100, width: 120, height: 120 },
    { id: '1002', status: 'locked', type: 'classroom', x: 70, y: 230, width: 120, height: 120 },
    { id: '1003', status: 'unlocked', type: 'classroom', x: 70, y: 360, width: 120, height: 120 },
    { id: '1004', status: 'locked', type: 'classroom', x: 70, y: 490, width: 120, height: 120 },
    { id: '1005', status: 'locked', type: 'classroom', x: 350, y: 460, width: 120, height: 120 },
    { id: '1006', status: 'locked', type: 'classroom', x: 350, y: 230, width: 120, height: 120 },
    { id: '1007', status: 'safe-haven', type: 'classroom', x: 240, y: 100, width: 120, height: 120 },
    { id: '1008', status: 'safe-haven', type: 'classroom', x: 350, y: 690, width: 120, height: 120 },
    { id: '1009', status: 'unlocked', type: 'classroom', x: 480, y: 690, width: 120, height: 120 },
    { id: '1010', status: 'locked', type: 'classroom', x: 610, y: 690, width: 120, height: 120 },
    { id: '1011', status: 'locked', type: 'classroom', x: 740, y: 690, width: 120, height: 120 },
    { id: '1012', status: 'safe-haven', type: 'classroom', x: 870, y: 690, width: 120, height: 120 },
    { id: '1013', status: 'locked', type: 'classroom', x: 1000, y: 690, width: 120, height: 120 },
    { id: '1014', status: 'locked', type: 'classroom', x: 1000, y: 400, width: 120, height: 120 },
  ];
  
  // Simplified corridor data
  const corridors = [
    { id: 'corridor1', label: 'Corridor 1', x: 220, y: 620, width: 900, height: 60 },
    { id: 'corridor2', label: 'Corridor 2', x: 250, y: 230, width: 60, height: 400 },
    { id: 'corridor3', label: 'Corridor 3', x: 350, y: 380, width: 150, height: 60 },
  ];
  
  // Threat location
  const threatLocation = { x: 200, y: 580 };
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'locked': return 'bg-emerald-500';
      case 'safe-haven': return 'bg-amber-400';
      case 'unlocked': return 'bg-rose-500';
      default: return 'bg-gray-300';
    }
  };
  
  const handleRoomClick = (roomId) => {
    const room = rooms.find(r => r.id === roomId);
    setSelectedRoom(room);
  };
  
  const handleStatusChange = (newStatus) => {
    if (selectedRoom) {
      console.log(`Room ${selectedRoom.id} status changed to ${newStatus}`);
      // In a real application, this would update the state
    }
  };
  
  // Calculate status counts
  const lockedCount = rooms.filter(r => r.status === 'locked').length;
  const safeHavenCount = rooms.filter(r => r.status === 'safe-haven').length;
  const unlockedCount = rooms.filter(r => r.status === 'unlocked').length;
  
  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Mobile menu button */}
      <button 
        className="md:hidden fixed top-4 left-4 z-40 p-2 bg-indigo-600 text-white rounded-full shadow-lg"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <Menu size={20} />
      </button>

      {/* Modern sidebar */}
      <div className={`${showSidebar ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 fixed md:relative z-30 w-64 h-full bg-white shadow-lg flex flex-col`}>
        <div className="p-6">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-md bg-indigo-600 text-white flex items-center justify-center mr-3">
              <Shield size={18} />
            </div>
            <h1 className="text-xl font-bold text-gray-800">QuickSecure</h1>
          </div>
          
          <div className="mt-6 space-y-1">
            <button className="w-full px-3 py-2 rounded-xl flex items-center text-gray-700 hover:bg-slate-100">
              <Home size={18} className="mr-3 text-indigo-600" />
              <span>Dashboard</span>
            </button>
            <button className="w-full px-3 py-2 rounded-xl flex items-center bg-indigo-50 text-indigo-700 font-medium">
              <Map size={18} className="mr-3 text-indigo-600" />
              <span>Building Map</span>
            </button>
            <button className="w-full px-3 py-2 rounded-xl flex items-center text-gray-700 hover:bg-slate-100">
              <Activity size={18} className="mr-3 text-indigo-600" />
              <span>System Health</span>
            </button>
            <button 
              className="w-full px-3 py-2 rounded-xl flex items-center text-gray-700 hover:bg-slate-100"
              onClick={onNavigateToSchedule}
            >
              <Clock size={18} className="mr-3 text-indigo-600" />
              <span>Schedule</span>
            </button>
            <button className="w-full px-3 py-2 rounded-xl flex items-center text-gray-700 hover:bg-slate-100">
              <Settings size={18} className="mr-3 text-indigo-600" />
              <span>Settings</span>
            </button>
          </div>
        </div>
        
        {/* Status cards */}
        <div className="px-6 mt-4">
          <div className="text-sm font-medium text-gray-500 mb-3">BUILDING STATUS</div>
          
          {/* Security status card */}
          <div className={`p-4 rounded-xl mb-3 ${threatMode ? 'bg-rose-50 border border-rose-200' : 'bg-emerald-50 border border-emerald-200'}`}>
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">{threatMode ? 'THREAT ACTIVE' : 'ALL CLEAR'}</div>
              <div className={`w-4 h-4 rounded-full animate-pulse ${threatMode ? 'bg-rose-500' : 'bg-emerald-500'}`}></div>
            </div>
            <div className={`text-xl font-bold mt-1 ${threatMode ? 'text-rose-700' : 'text-emerald-700'}`}>
              {threatMode ? 'South Stairs Area' : 'Security Normal'}
            </div>
            <button 
              className={`mt-3 w-full py-2 rounded-lg text-white text-sm font-medium ${threatMode ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-rose-500 hover:bg-rose-600'}`}
              onClick={() => setThreatMode(!threatMode)}
            >
              {threatMode ? 'Clear Threat' : 'Activate Alert'}
            </button>
          </div>
          
          {/* Room stats card */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="text-sm font-medium mb-2">ROOM STATUS</div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-emerald-600">{lockedCount}</div>
                <div className="text-xs text-gray-500">Locked</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-amber-500">{safeHavenCount}</div>
                <div className="text-xs text-gray-500">Safe Haven</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-rose-500">{unlockedCount}</div>
                <div className="text-xs text-gray-500">Unlocked</div>
              </div>
            </div>
          </div>
          
          {/* Emergency actions */}
          <div className="mt-6">
            <div className="text-sm font-medium text-gray-500 mb-3">EMERGENCY ACTIONS</div>
            <div className="space-y-2">
              <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium flex items-center justify-center">
                <Lock size={16} className="mr-2" />
                <span>Lock All Doors</span>
              </button>
              <button className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-medium flex items-center justify-center">
                <Bell size={16} className="mr-2" />
                <span>Sound Alarm</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-auto p-4 border-t border-gray-200">
          <button className="w-full px-3 py-2 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
            <LogOut size={18} className="mr-2" />
            <span>Sign out</span>
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Modern header */}
        <header className="bg-white py-3 px-6 shadow-sm flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center text-gray-500 mr-4 md:hidden">
              <button onClick={() => setShowSidebar(!showSidebar)}>
                {showSidebar ? <ArrowLeft size={18} /> : <Menu size={18} />}
              </button>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Building Floor Plan</h2>
            {threatMode && (
              <div className="ml-4 px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-medium flex items-center">
                <AlertCircle size={14} className="mr-1" />
                <span>Active Threat</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-3 py-1.5 rounded-lg text-sm font-medium border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center">
              <Eye size={14} className="mr-1.5" />
              <span>Cameras</span>
            </button>
            {selectedRoom && (
              <button 
                onClick={() => setSelectedRoom(null)}
                className="px-3 py-1.5 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Close Room View
              </button>
            )}
          </div>
        </header>
        
        {/* Floor Plan */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="bg-white rounded-xl shadow-sm p-6 min-h-full overflow-auto">
            <div className="relative" style={{width: '1200px', height: '800px'}}>
              {/* Draw corridors */}
              {corridors.map(corridor => (
                <div 
                  key={corridor.id}
                  className="absolute bg-slate-100 flex items-center justify-center text-slate-500 font-medium border-2 border-slate-200"
                  style={{
                    left: corridor.x + 'px',
                    top: corridor.y + 'px',
                    width: corridor.width + 'px',
                    height: corridor.height + 'px',
                    zIndex: 0
                  }}
                >
                  <div className="bg-white px-2 py-1 rounded-lg shadow-sm">{corridor.label}</div>
                </div>
              ))}
              
              {/* Draw rooms with modern style */}
              {rooms.map(room => (
                <div 
                  key={room.id}
                  onClick={() => handleRoomClick(room.id)}
                  className={`absolute rounded-xl shadow-sm ${getStatusColor(room.status)} cursor-pointer hover:shadow-md transition-shadow duration-150`}
                  style={{
                    left: room.x + 'px',
                    top: room.y + 'px',
                    width: room.width + 'px',
                    height: room.height + 'px',
                    opacity: selectedRoom?.id === room.id ? 1 : 0.85,
                    border: selectedRoom?.id === room.id ? '3px solid #4f46e5' : '2px solid rgba(0,0,0,0.1)',
                  }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-xl font-bold text-white">{room.id}</div>
                    {room.status === 'locked' && (
                      <div className="text-xs text-white bg-black bg-opacity-20 px-2 py-0.5 rounded-full mt-1">
                        Locked
                      </div>
                    )}
                    {room.status === 'safe-haven' && (
                      <div className="text-xs text-white bg-black bg-opacity-20 px-2 py-0.5 rounded-full mt-1">
                        Safe Haven
                      </div>
                    )}
                    {room.status === 'unlocked' && (
                      <div className="text-xs text-white bg-black bg-opacity-20 px-2 py-0.5 rounded-full mt-1">
                        Unlocked
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Modern threat indicator */}
              {threatMode && (
                <div 
                  className="absolute z-10"
                  style={{
                    left: threatLocation.x + 'px',
                    top: threatLocation.y + 'px',
                  }}
                >
                  <div className="w-16 h-16 rounded-full animate-ping bg-rose-600 opacity-50"></div>
                  <div className="w-16 h-16 rounded-full bg-rose-600 absolute top-0 left-0 flex items-center justify-center shadow-lg">
                    <AlertCircle size={28} className="text-white" />
                  </div>
                </div>
              )}
              
              {/* Modern legend */}
              <div className="absolute top-6 right-6 bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
                  <span className="text-sm text-gray-700">Locked</span>
                </div>
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-amber-400 mr-2"></div>
                  <span className="text-sm text-gray-700">Safe Haven</span>
                </div>
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-rose-500 mr-2"></div>
                  <span className="text-sm text-gray-700">Unlocked</span>
                </div>
                {threatMode && (
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-rose-600 mr-2"></div>
                    <span className="text-sm text-gray-700">Threat Location</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Room details panel - modern style */}
      {selectedRoom && (
        <div className="w-80 bg-white shadow-lg border-l border-gray-200 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Room {selectedRoom.id}</h3>
            <button 
              onClick={() => setSelectedRoom(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          {/* Status card */}
          <div className={`p-4 rounded-xl mb-6 ${
            selectedRoom.status === 'locked' ? 'bg-emerald-50 border border-emerald-200' :
            selectedRoom.status === 'safe-haven' ? 'bg-amber-50 border border-amber-200' :
            'bg-rose-50 border border-rose-200'
          }`}>
            <div className="text-sm font-medium text-gray-500">Current Status</div>
            <div className="flex items-center mt-2">
              <div className={`w-3 h-3 rounded-full mr-2 ${getStatusColor(selectedRoom.status)}`}></div>
              <span className={`font-medium ${
                selectedRoom.status === 'locked' ? 'text-emerald-700' :
                selectedRoom.status === 'safe-haven' ? 'text-amber-700' :
                'text-rose-700'
              }`}>
                {selectedRoom.status === 'locked' ? 'Locked' :
                 selectedRoom.status === 'safe-haven' ? 'Safe Haven' :
                 'Unlocked'}
              </span>
            </div>
          </div>
          
          {/* Change status */}
          <div className="mb-6">
            <div className="text-sm font-medium text-gray-500 mb-3">CHANGE STATUS</div>
            <div className="space-y-2">
              <button 
                onClick={() => handleStatusChange('locked')}
                className={`w-full px-4 py-3 rounded-xl flex items-center ${
                  selectedRoom.status === 'locked' 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-emerald-50'
                }`}
              >
                <CheckCircle size={18} className={selectedRoom.status === 'locked' ? 'text-white' : 'text-emerald-500'} />
                <span className="ml-3 font-medium">Lock Room</span>
                {selectedRoom.status !== 'locked' && (
                  <ChevronRight size={18} className="ml-auto text-gray-400" />
                )}
              </button>
              
              <button 
                onClick={() => handleStatusChange('safe-haven')}
                className={`w-full px-4 py-3 rounded-xl flex items-center ${
                  selectedRoom.status === 'safe-haven' 
                    ? 'bg-amber-500 text-white' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-amber-50'
                }`}
              >
                <Shield size={18} className={selectedRoom.status === 'safe-haven' ? 'text-white' : 'text-amber-500'} />
                <span className="ml-3 font-medium">Set as Safe Haven</span>
                {selectedRoom.status !== 'safe-haven' && (
                  <ChevronRight size={18} className="ml-auto text-gray-400" />
                )}
              </button>
              
              <button 
                onClick={() => handleStatusChange('unlocked')}
                className={`w-full px-4 py-3 rounded-xl flex items-center ${
                  selectedRoom.status === 'unlocked' 
                    ? 'bg-rose-500 text-white' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-rose-50'
                }`}
              >
                <Lock size={18} className={selectedRoom.status === 'unlocked' ? 'text-white' : 'text-rose-500'} />
                <span className="ml-3 font-medium">Mark as Unlocked</span>
                {selectedRoom.status !== 'unlocked' && (
                  <ChevronRight size={18} className="ml-auto text-gray-400" />
                )}
              </button>
            </div>
          </div>
          
          {/* Actions */}
          <div>
            <div className="text-sm font-medium text-gray-500 mb-3">QUICK ACTIONS</div>
            <div className="space-y-3">
              <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium flex items-center justify-center">
                <Bell size={16} className="mr-2" />
                Send Alert
              </button>
              <button className="w-full py-3 border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl font-medium flex items-center justify-center">
                <Eye size={16} className="mr-2" />
                View Camera
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernDashboard;