import React, { useState } from 'react';
import ModernDashboard from './components/ModernDashboard';
import ScheduleManagement from './components/ScheduleManagement';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  // Function to handle navigation between views
  const navigateToView = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="App">
      {currentView === 'dashboard' && (
        <ModernDashboard 
          onNavigateToSchedule={() => navigateToView('schedule')}
        />
      )}
      
      {currentView === 'schedule' && (
        <ScheduleManagement 
          onNavigateBack={() => navigateToView('dashboard')} 
        />
      )}
    </div>
  );
}

export default App;
