import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import AddTask from './Task/AddTask';
import Sidebar from './Task/Sidebar';
import AllTasks from './Task/AllTasks';
import CompleteTask from './Task/CompleteTask';
import InProgressTask from './Task/InProgressTask';
import Dashboard from './Task/Dashboard';
import PendingTask from './Task/PendingTask';
import Deployed from './Task/Deployed';
import Deferred from './Task/Deferred';
import './App.css';

const App = () => {
  return (
    <Router> {/* هنا تم إضافة BrowserRouter */}
      <div className='flex h-full'>
        <Sidebar />
        <Routes>
          <Route path="/" element={<AllTasks />} />
          <Route path="/addTask" element={<AddTask />} />
          <Route path="/allTask" element={<AllTasks />} />
          <Route path="/completeTask" element={<CompleteTask />} />
          <Route path="/pendingTask" element={<PendingTask />} />
          <Route path="/deployedTask" element={<Deployed />} />
          <Route path="/deferredTask" element={<Deferred />} />
          <Route path="/inProgressTask" element={<InProgressTask />} />
          <Route path="/statsTask" element={<Dashboard />} />
        </Routes>
      </div>
    </Router> 
  );
};

export default App;
