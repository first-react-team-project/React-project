
import React, { useState, useEffect } from 'react';
import { ref, get, set, update } from '../firebase'; 
import axios from 'axios';
import { database ,onValue, auth} from '../firebase';
import './task.css'


const TaskCard = ({
    id,
    title = 'No title provided', 
    description = 'No description available', 
    startDate = 'No start date', 
    endDate = 'No end date', 
    status = 'No status', 
    assignee = 'N/A', 
    priority = 'Normal', 
    
}) => {
    const [complete, setComplete] = useState(status && status.toLowerCase() === "completed");
    const [assignedUsersCount, setAssignedUsersCount] = useState(0);
    const [assignedUsers, setAssignedUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [showUserList, setShowUserList] = useState(false);
    const [userId, setUserId] = useState(null);
    // إضافة الحالة لعرض قائمة الاختيارات للـ status
    const [showStatusSelect, setShowStatusSelect] = useState(false);
    const [newStatus, setNewStatus] = useState(status);

    // حالة القيم الجديدة للتحديث
    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [updatedDescription, setUpdatedDescription] = useState(description);
    const [updatedPriority, setUpdatedPriority] = useState(priority);
    
    const [showAddUserForm, setShowAddUserForm] = useState(false);  // إضافة هذا السطر لتعريف الحالة
    


    const [role, setRole] = useState(null); // لتخزين الدور
    const [isManager, setIsManager] = useState(false); 



    const getDate = (dateString) => {
        const dateObject = new Date(dateString);
        return dateObject.toLocaleDateString();
    };

    const startDatee = getDate(startDate);
    const endDatee = getDate(endDate);


    const getStatusColor = (status) => {
      switch (status) {
        case 'Completed':
          return '#0f766e'; 
        case 'In Progress':
          return '#f59e0b';  
        case 'Pending':
          return '#be185d';  
        default:
          return '#d1d5db';  
      }
    };
    const handleToggleCompleted = async () => {
        const newStatus = complete ? "Pending" : "Completed";
        try {
            await axios.patch(`${FIREBASE_URL}/${id}.json`, { status: newStatus });
            setComplete(!complete);
        } catch (error) {
            console.error("❌ Error updating task:", error);
        }
    };

    const fetchAssignedUsers = async () => {
        try {
            const assignedUsersRef = ref(database, `tasks/${id}/assignedUsers`);
            const snapshot = await get(assignedUsersRef);
            const assignedUsersData = snapshot.val() || {};

            const usersRef = ref(database, 'users');
            const usersSnapshot = await get(usersRef);
            const usersData = usersSnapshot.val() || {};

            const usersList = Object.keys(assignedUsersData).map(userId => usersData[userId].email);
            setAssignedUsers(usersList);
            setAssignedUsersCount(usersList.length);
        } catch (error) {
            console.error('Error fetching assigned users:', error);
        }
    };

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setUserId(user.uid);
        }
    }, []);

    useEffect(() => {
        if (!userId) return;
    
        const roleRef = ref(database, `users/${userId}/role`);
        const unsubscribe = onValue(roleRef, (snapshot) => {
            const role = snapshot.val();
            setIsManager(role === 'manager');
        });
    
        fetchAssignedUsers();
    
        return () => unsubscribe();
    }, [id, userId]);
    

    const handleAddUser = async () => {
        try {
            const usersRef = ref(database, 'users');
            const snapshot = await get(usersRef);
            const users = snapshot.val();

            let userExists = false;
            for (const userId in users) {
                if (users[userId].email === userEmail) {
                    userExists = true;
                    break;
                }
            }

            if (userExists) {
                const userIdToAdd = Object.keys(users).find(userId => users[userId].email === userEmail);
                const taskRef = ref(database, `tasks/${id}/assignedUsers/${userIdToAdd}`);
                await set(taskRef, true);

                const userTasksRef = ref(database, `users/${userIdToAdd}/tasks/${id}`);
                await set(userTasksRef, true);

                await fetchAssignedUsers();

                alert('User added to the task successfully!');
                setUserEmail('');
            } else {
                alert('User not found! Please make sure the user is registered.');
            }
        } catch (error) {
            console.error('Error adding user to task:', error);
        }
    };

    const handleUpdateTask = async () => {
        try {
            const taskRef = ref(database, `tasks/${id}`);
            await update(taskRef, {
                title: updatedTitle,
                description: updatedDescription,
                priority: updatedPriority,
                status: newStatus 
            });
            setShowUpdateForm(false);
            alert('Task updated successfully!');
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleSoftDelete = async () => {
        try {
            const taskRef = ref(database, `tasks/${id}`);
            await update(taskRef, { isDeleted: true });
            alert('Task marked as deleted!');
        } catch (error) {
            console.error('Error marking task as deleted:', error);
        }
    };


    const handleStatusChange = async (e) => {
        const selectedStatus = e.target.value;
        setNewStatus(selectedStatus); 
        try {
            const taskRef = ref(database, `tasks/${id}`);
            await update(taskRef, { status: selectedStatus });
            setShowStatusSelect(false); 
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };





    return (
      <div className="card1">
        {/* Header Section with Status and Priority */}
        <div className="card-header1" style={{backgroundColor:`${getStatusColor(status)}`}}>
          <h1 className="priority1">{priority}</h1>
          <div className="status-btn"></div>
          <h1 className="title1">{title}</h1>
        </div>
    
        {/* Description Section */}
        <div className="card-description1">
          <p className="text12">{description}</p>
          <div className="dates1">
            <div className="date-item1">
              <div className="flex flex-col items-center flex-1">
                <p className="text12">Start Date</p>
                <p className="date1">{startDatee}</p>
              </div>
              <div className="h-8 w-px bg-gray-200 mx-4"></div>
              <div className="flex flex-col items-center flex-1">
                <p className="text12">End Date</p>
                <p className="date1">{endDatee}</p>
              </div>
            </div>
          </div>
        </div>
    
        {/* Status Button Section */}
        <div className="card-status-btn1">
          <button
            style={{ background: getStatusColor(status) }}
            onClick={() => setShowStatusSelect(!showStatusSelect)}
            className="w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:shadow-md"
          >
            {newStatus}
          </button>
        </div>
    
        {/* Status Select Dropdown */}
        {showStatusSelect && (
          <div className="px-6 pt-3">
            <select
              className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              id="status"
              name="status"
              value={newStatus}
              onChange={handleStatusChange}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Deployed">Deployed</option>
              <option value="Deferred">Deferred</option>
            </select>
          </div>
        )}
    
        {/* Users Section */}
        <div className="card-users1">
          <div className="user-info1">
            <p className="text12">{assignee}</p>
            <div className="count1">
              <span className="circle1"></span>
              <p className="text12">{assignedUsersCount} Users</p>
            </div>
          </div>
          <button
            onClick={() => setShowUserList(!showUserList)}
            className="user-btn1"
          >
            {showUserList ? 'Hide Users' : 'Show Users'}
          </button>
        </div>
    
        {/* User List */}
        {showUserList && (
          <div className="card-user-list1">
            <h3 className="font-semibold text-gray-800 mb-3">Assigned Users</h3>
            <ul className="space-y-2">
              {assignedUsers.map((email, index) => (
                <li key={index} className="user-list-item1">
                  {email}
                </li>
              ))}
            </ul>
          </div>
        )}
    
        {/* Buttons Section */}
        {isManager && (
          <div className="card-buttons1">
            <button
              onClick={() => setShowAddUserForm(true)}
              className="add-btn1"
            >
              Add User
            </button>
            <button
              onClick={() => setShowUpdateForm(true)}
              className="update-btn1"
            >
              Update
            </button>
            <button
              onClick={handleSoftDelete}
              className="delete-btn1"
            >
              Delete
            </button>
          </div>
        )}
    
        {/* Update Task Form */}
        {showUpdateForm && (
          <div className="card-form">
            <div className="space-y-4">
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                placeholder="Updated title"
              />
              <textarea
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
                placeholder="Updated description"
              />
              <select
                value={updatedPriority}
                onChange={(e) => setUpdatedPriority(e.target.value)}
              >
                <option value="p2">P2</option>
                <option value="P1">P1</option>
                <option value="P0">P0</option>
              </select>
              <div className="flex justify-between">
                <button
                  onClick={handleUpdateTask}
                  className="bg-blue-500 text-white py-2.5 px-4 rounded-xl font-medium"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowUpdateForm(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
    
        {/* Add User Form */}
        {showAddUserForm && (
          <div className="card-form1">
            <div className="space-y-4">
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Enter user email"
              />
              <div className="flex justify-between">
                <button
                  onClick={handleAddUser}
                  className="bg-blue-500 text-white py-2.5 px-4 rounded-xl font-medium"
                >
                  Add User
                </button>
                <button
                  onClick={() => setShowAddUserForm(false)}
                  className="cancel-btn1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
    
//    
};

export default TaskCard;
///////////////////////////////////////////////////




































