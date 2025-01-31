import React, { useState } from "react";
import { Edit, PhoneCall, Mail, Plus, Trash, Calendar, User, Briefcase, MapPin } from "lucide-react";

const initialUser = {
  name: "Sammy Hill",
  status: "Salaried",
  position: "Sales Assistant",
  assignedTo: "John Heart",
  company: "ElectrixMax",
  address: "645 Prospect Crescent",
  city: "Pasadena",
  state: "CA",
  zip: "91103",
  phone: "+1(626)555-7292",
  email: "sammyh@dx-email.com",
};

const initialTasks = [
  { subject: "Call to clarify customer requirements.", dueDate: "12/10/2020", assignedTo: "Arthur Miller", completed: false },
  { subject: "Send pictures/brochures of new products.", dueDate: "12/5/2020", assignedTo: "Samantha Bright", completed: false },
  { subject: "Follow up and discuss the offer.", dueDate: "12/9/2020", assignedTo: "Greta Sims", completed: false },
];

function ProfilePage() {
  const [user, setUser] = useState(initialUser);
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState({ subject: "", dueDate: "", assignedTo: "" });
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const addTask = () => {
    if (newTask.subject && newTask.dueDate && newTask.assignedTo) {
      setTasks([...tasks, { ...newTask, completed: false }]);
      setNewTask({ subject: "", dueDate: "", assignedTo: "" });
      setIsAddingTask(false);
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleSaveProfile = () => {
    setUser({ ...user });
    setIsEditingProfile(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative h-48 bg-gradient-to-r from-blue-500 to-blue-600">
              <div className="absolute -bottom-16 left-8">
                <div className="relative">
                  <img 
                    src="/api/placeholder/400/400" 
                    alt={user.name}
                    className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg object-cover"
                  />
                  <button className="absolute -bottom-2 -right-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-colors">
                    <Edit size={14} />
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-20 px-8 pb-8">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {user.status}
                    </span>
                    <span className="text-gray-600">{user.position}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="inline-flex items-center px-4 py-2 rounded-lg text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors">
                    <Mail className="w-4 h-4 mr-2" />
                    Message
                  </button>
                  <button className="inline-flex items-center px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                    <PhoneCall className="w-4 h-4 mr-2" />
                    Call
                  </button>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Briefcase className="w-5 h-5 mr-3 text-gray-400" />
                    <span>{user.company}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <User className="w-5 h-5 mr-3 text-gray-400" />
                    <span>Reports to {user.assignedTo}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                    <span>{user.address}, {user.city}, {user.state}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-5 h-5 mr-3 text-gray-400" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <PhoneCall className="w-5 h-5 mr-3 text-gray-400" />
                    <span>{user.phone}</span>
                  </div>
                </div>
              </div>

              {isEditingProfile ? (
                <div className="mt-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Edit Profile</h3>
                    <input
                      type="text"
                      placeholder="Name"
                      className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                      value={user.name}
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Position"
                      className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                      value={user.position}
                      onChange={(e) => setUser({ ...user, position: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Email"
                      className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Phone"
                      className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                      value={user.phone}
                      onChange={(e) => setUser({ ...user, phone: e.target.value })}
                    />
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setIsEditingProfile(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveProfile}
                        className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="mt-4 inline-flex items-center px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Tasks Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Tasks</h2>
              <button 
                onClick={() => setIsAddingTask(true)}
                className="inline-flex items-center px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </button>
            </div>

            <div className="space-y-4">
              {tasks.map((task, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(index)}
                    className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded cursor-pointer focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <h3 className={`font-medium ${task.completed ? "line-through text-gray-400" : "text-gray-900"}`}>
                      {task.subject}
                    </h3>
                    <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                      <span>Assigned to {task.assignedTo}</span>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1.5" />
                        {task.dueDate}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeTask(index)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            {isAddingTask && (
              <div className="mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Add New Task</h3>
                  <input
                    type="text"
                    placeholder="Task subject"
                    className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    value={newTask.subject}
                    onChange={(e) => setNewTask({ ...newTask, subject: e.target.value })}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="date"
                      className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Assign to"
                      className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                      value={newTask.assignedTo}
                      onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setIsAddingTask(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={addTask}
                      className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                    >
                      Add Task
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;