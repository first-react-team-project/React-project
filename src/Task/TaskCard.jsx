// import PropTypes from 'prop-types';
// import { useState } from "react";
// import axios from "axios";
// import {database, set,get, ref } from '../firebase'; 
// const FIREBASE_URL = "https://reactprojectteam-default-rtdb.firebaseio.com/tasks";

// const TaskCard = ({
//     id,
//     title,
//     description,
//     startDate,
//     endDate,
//     status,
//     assignee,
//     priority,
// }) => {
//     const [complete, setComplete] = useState(status.toLowerCase() === "completed");

//     const getDate = (dateString) => {
//         const dateObject = new Date(dateString);
//         return dateObject.toLocaleDateString();
//     };

//     const startDatee = getDate(startDate);
//     const endDatee = getDate(endDate);

//     const getStatusColor = (status) => {
//         if (!status) return "bg-gray-100 text-gray-800";

//         switch (status.toLowerCase()) {
//             case "completed":
//                 return "bg-green-100 text-green-800";
//             case "in progress":
//                 return "bg-blue-100 text-blue-800";
//             case "pending":
//                 return "bg-yellow-100 text-yellow-800";
//             case "deferred":
//                 return "bg-gray-100 text-gray-800";
//             case "deployed":
//                 return "bg-purple-100 text-purple-800";
//             default:
//                 return "bg-gray-100 text-gray-800";
//         }
//     };

//     const handleToggleCompleted = async () => {
//         const newStatus = complete ? "Pending" : "Completed"; // تغيير الحالة بناءً على القيمة الحالية
//         try {
//             await axios.patch(`${FIREBASE_URL}/${id}.json`, {
//                 status: newStatus,
//             });
//             setComplete(!complete);
//         } catch (error) {
//             console.error("❌ Error updating task:", error);
//         }
//     };
//     const [showForm, setShowForm] = useState(false);  // للتحكم في عرض النموذج
// const [userEmail, setUserEmail] = useState('');    // لتخزين البريد الإلكتروني

// const handleAddUser = async () => {
//     try {
//         // التحقق من أن البريد الإلكتروني موجود في قاعدة بيانات المستخدمين
//         const usersRef = ref(database, 'users'); // قاعدة بيانات المستخدمين
//         const snapshot = await get(usersRef);
//         const users = snapshot.val();

//         // البحث عن المستخدم بناءً على البريد الإلكتروني
//         let userExists = false;
//         for (const userId in users) {
//             if (users[userId].email === userEmail) {
//                 userExists = true;
//                 break;
//             }
//         }

//         if (userExists) {
//             // إذا كان المستخدم موجودًا، يمكن إضافته إلى المهمة
//             const userIdToAdd = Object.keys(users).find(userId => users[userId].email === userEmail);
//             const taskRef = ref(database, `tasks/${id}/assignedUsers/${userIdToAdd}`);
//             await set(taskRef, true);

//             const userTasksRef = ref(database, `users/${userIdToAdd}/tasks/${id}`);
//             await set(userTasksRef, true);

//             alert('User added to the task successfully!');
//         } else {
//             alert('User not found! Please make sure the user is registered.');
//         }
//     } catch (error) {
//         console.error('Error adding user to task:', error);
//     }
// };
//     return (
//         <div className="flex flex-col rounded-xl bg-white w-72 min-h-[400px] shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
//             {/* Header Section */}
//             <div className={`relative mt-4 mx-4 rounded-lg ${getStatusColor(status)} shadow-sm`}>
//                 <h1 className="text-end pt-2 pr-3 text-sm font-semibold text-gray-600">{priority}</h1>
//                 <h1 className="font-bold text-center text-xl py-4 mb-4 text-gray-800">{title}</h1>
//             </div>

//             {/* Body Section */}
//             <div className="p-4 text-center">
//                 <p className="text-sm text-gray-600">{description}</p>
//                 <div className="flex justify-between mt-4 text-sm font-semibold py-2 px-4">
//                     <div className="flex flex-col items-center">
//                         <p className="text-gray-500">Start Date</p>
//                         <p className="text-gray-700 font-light">{startDatee}</p>
//                     </div>
//                     <div className="flex flex-col items-center">
//                         <p className="text-gray-500">End Date</p>
//                         <p className="text-gray-700 font-light">{endDatee}</p>
//                     </div>
//                 </div>
//             </div>
//            {/* Add User Button */}
//            <div className="p-4 flex justify-center">
//                 <button
//                     onClick={() => setShowForm(!showForm)}
//                     className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-2"
//                 >
//                     Add User
//                 </button>
//             </div>

//             {/* Form to Add User */}
//             {showForm && (
//                 <div className="p-4">
//                     <input
//                         type="email"
//                         value={userEmail}
//                         onChange={(e) => setUserEmail(e.target.value)}
//                         placeholder="Enter user email"
//                         className="border p-1 rounded w-full"
//                     />
//                     <button
//                         onClick={handleAddUser}
//                         className="bg-green-500 text-white px-4 py-2 rounded mt-2"
//                     >
//                         Assign User
//                     </button>
//                 </div>
//             )}
//             {/* Footer Section */}
//             <div className="p-4 flex items-center justify-between border-t border-gray-100">
//                 <p className="text-xs text-gray-600">{assignee || 'N/A'}</p>
//                 <button
//                     onClick={handleToggleCompleted}
//                     type="button"
//                     className={`flex items-center justify-center gap-2 text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-300 ${
//                         complete ? 'bg-green-100 text-green-800' : getStatusColor(status)
//                     } hover:bg-opacity-80 focus:outline-none`}
//                 >
//                     {complete ? 'Completed' : status}
//                 </button>
//             </div>
//         </div>
//     );
// };

// TaskCard.propTypes = {
//     id: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     startDate: PropTypes.string.isRequired,
//     endDate: PropTypes.string.isRequired,
//     status: PropTypes.string.isRequired,
//     assignee: PropTypes.string,
//     priority: PropTypes.string,
// };

// export default TaskCard;



///////////////////////////////////////////////////////


// import PropTypes from 'prop-types'; 
// import { useState } from "react";
// import axios from "axios";
// import { database, set, get, ref } from '../firebase'; 
// const FIREBASE_URL = "https://reactprojectteam-default-rtdb.firebaseio.com/tasks";

// const TaskCard = ({
//     id,
//     title,
//     description,
//     startDate,
//     endDate,
//     status,
//     assignee,
//     priority,
// }) => {
//     const [complete, setComplete] = useState(status && status.toLowerCase() === "completed");
//     const [assignedUsersCount, setAssignedUsersCount] = useState(0);

//     const getDate = (dateString) => {
//         const dateObject = new Date(dateString);
//         return dateObject.toLocaleDateString();
//     };

//     const startDatee = getDate(startDate);
//     const endDatee = endDate ? getDate(endDate) : "N/A"; // Handle undefined endDate

//     const getStatusColor = (status) => {
//         if (!status) return "bg-gray-100 text-gray-800";

//         switch (status.toLowerCase()) {
//             case "completed":
//                 return "bg-green-100 text-green-800";
//             case "in progress":
//                 return "bg-blue-100 text-blue-800";
//             case "pending":
//                 return "bg-yellow-100 text-yellow-800";
//             case "deferred":
//                 return "bg-gray-100 text-gray-800";
//             case "deployed":
//                 return "bg-purple-100 text-purple-800";
//             default:
//                 return "bg-gray-100 text-gray-800";
//         }
//     };

//     const handleToggleCompleted = async () => {
//         const newStatus = complete ? "Pending" : "Completed"; // Toggle status
//         try {
//             await axios.patch(`${FIREBASE_URL}/${id}.json`, { status: newStatus });
//             setComplete(!complete);
//         } catch (error) {
//             console.error("❌ Error updating task:", error);
//         }
//     };

//     const [showForm, setShowForm] = useState(false);  
//     const [userEmail, setUserEmail] = useState('');    

//     const handleAddUser = async () => {
//         try {
//             const usersRef = ref(database, 'users');
//             const snapshot = await get(usersRef);
//             const users = snapshot.val();

//             let userExists = false;
//             for (const userId in users) {
//                 if (users[userId].email === userEmail) {
//                     userExists = true;
//                     break;
//                 }
//             }

//             if (userExists) {
//                 const userIdToAdd = Object.keys(users).find(userId => users[userId].email === userEmail);
//                 const taskRef = ref(database, `tasks/${id}/assignedUsers/${userIdToAdd}`);
//                 await set(taskRef, true);

//                 const userTasksRef = ref(database, `users/${userIdToAdd}/tasks/${id}`);
//                 await set(userTasksRef, true);

//                 // Update the assigned users count
//                 const assignedUsersRef = ref(database, `tasks/${id}/assignedUsers`);
//                 const assignedUsersSnapshot = await get(assignedUsersRef);
//                 setAssignedUsersCount(Object.keys(assignedUsersSnapshot.val() || {}).length);

//                 alert('User added to the task successfully!');
//             } else {
//                 alert('User not found! Please make sure the user is registered.');
//             }
//         } catch (error) {
//             console.error('Error adding user to task:', error);
//         }
//     };

//     return (
//         <div className="flex flex-col rounded-xl bg-white w-72 min-h-[400px] shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
//             <div className={`relative mt-4 mx-4 rounded-lg ${getStatusColor(status)} shadow-sm`}>
//                 <h1 className="text-end pt-2 pr-3 text-sm font-semibold text-gray-600">{priority}</h1>
//                 <h1 className="font-bold text-center text-xl py-4 mb-4 text-gray-800">{title}</h1>
//             </div>

//             <div className="p-4 text-center">
//                 <p className="text-sm text-gray-600">{description}</p>
//                 <div className="flex justify-between mt-4 text-sm font-semibold py-2 px-4">
//                     <div className="flex flex-col items-center">
//                         <p className="text-gray-500">Start Date</p>
//                         <p className="text-gray-700 font-light">{startDatee}</p>
//                     </div>
//                     <div className="flex flex-col items-center">
//                         <p className="text-gray-500">End Date</p>
//                         <p className="text-gray-700 font-light">{endDatee}</p>
//                     </div>
//                 </div>
//             </div>

//             <div className="p-4 flex justify-center">
//                 <button
//                     onClick={() => setShowForm(!showForm)}
//                     className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-2"
//                 >
//                     Add User
//                 </button>
//             </div>

//             {showForm && (
//                 <div className="p-4">
//                     <input
//                         type="email"
//                         value={userEmail}
//                         onChange={(e) => setUserEmail(e.target.value)}
//                         placeholder="Enter user email"
//                         className="border p-1 rounded w-full"
//                     />
//                     <button
//                         onClick={handleAddUser}
//                         className="bg-green-500 text-white px-4 py-2 rounded mt-2"
//                     >
//                         Assign User
//                     </button>
//                 </div>
//             )}

//             <div className="p-4 flex items-center justify-between border-t border-gray-100">
//                 <p className="text-xs text-gray-600">{assignee || 'N/A'}</p>
//                 <p className="text-xs text-gray-600">{assignedUsersCount} Users Assigned</p>
//                 <button
//                     onClick={handleToggleCompleted}
//                     type="button"
//                     className={`flex items-center justify-center gap-2 text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-300 ${complete ? 'bg-green-100 text-green-800' : getStatusColor(status)} hover:bg-opacity-80 focus:outline-none`}
//                 >
//                     {complete ? 'Completed' : status}
//                 </button>
//             </div>
//         </div>
//     );
// };

// TaskCard.propTypes = {
//     id: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     startDate: PropTypes.string.isRequired,
//     endDate: PropTypes.string,
//     status: PropTypes.string.isRequired,
//     assignee: PropTypes.string,
//     priority: PropTypes.string,
// };

// export default TaskCard;



// import PropTypes from 'prop-types';
// import { useState } from "react";
// import { database, set, get, ref } from '../firebase'; 

// const TaskCard = ({
//     id,
//     title = 'No title provided', // Fallback title
//     description = 'No description available', // Fallback description
//     startDate = 'No start date', // Fallback start date
//     endDate = 'No end date', // Fallback end date
//     status = 'No status', // Fallback status
//     assignee = 'N/A', // Fallback assignee
//     priority = 'Normal', // Fallback priority
// }) => {
//     const [complete, setComplete] = useState(status && status.toLowerCase() === "completed");
//     const [assignedUsersCount, setAssignedUsersCount] = useState(0);
//     const [showForm, setShowForm] = useState(false);
//     const [userEmail, setUserEmail] = useState('');
//     const getDate = (dateString) => {
//         const dateObject = new Date(dateString);
//         return dateObject.toLocaleDateString();
//     };



//     const startDatee = getDate(startDate);
//     const endDatee = endDate ? getDate(endDate) : "N/A"; 

//     const getStatusColor = (status) => {
//         if (!status) return "bg-gray-100 text-gray-800";

//         switch (status.toLowerCase()) {
//             case "completed":
//                 return "bg-green-100 text-green-800";
//             case "in progress":
//                 return "bg-blue-100 text-blue-800";
//             case "pending":
//                 return "bg-yellow-100 text-yellow-800";
//             case "deferred":
//                 return "bg-gray-100 text-gray-800";
//             case "deployed":
//                 return "bg-purple-100 text-purple-800";
//             default:
//                 return "bg-gray-100 text-gray-800";
//         }
//     };

//     const handleToggleCompleted = async () => {
//         const newStatus = complete ? "Pending" : "Completed"; 
//         try {
//             await set(ref(database, `tasks/${id}`), { status: newStatus });
//             setComplete(!complete);
//         } catch (error) {
//             console.error("❌ Error updating task:", error);
//         }
//     };

//     const handleAddUser = async () => {
//         try {
//             const usersRef = ref(database, 'users');
//             const snapshot = await get(usersRef);
//             const users = snapshot.val();

//             let userExists = false;
//             for (const userId in users) {
//                 if (users[userId].email === userEmail) {
//                     userExists = true;
//                     break;
//                 }
//             }

//             if (userExists) {
//                 const userIdToAdd = Object.keys(users).find(userId => users[userId].email === userEmail);
//                 const taskRef = ref(database, `tasks/${id}/assignedUsers/${userIdToAdd}`);
//                 await set(taskRef, true);

//                 const userTasksRef = ref(database, `users/${userIdToAdd}/tasks/${id}`);
//                 await set(userTasksRef, true);

//                 const assignedUsersRef = ref(database, `tasks/${id}/assignedUsers`);
//                 const assignedUsersSnapshot = await get(assignedUsersRef);
//                 setAssignedUsersCount(Object.keys(assignedUsersSnapshot.val() || {}).length);

//                 alert('User added to the task successfully!');
//             } else {
//                 alert('User not found! Please make sure the user is registered.');
//             }
//         } catch (error) {
//             console.error('Error adding user to task:', error);
//         }
//     };

//     return (
//         <div className="flex flex-col rounded-xl bg-white w-72 min-h-[400px] shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
//             <div className={`relative mt-4 mx-4 rounded-lg ${getStatusColor(status)} shadow-sm`}>
//                 <h1 className="text-end pt-2 pr-3 text-sm font-semibold text-gray-600">{priority}</h1>
//                 <h1 className="font-bold text-center text-xl py-4 mb-4 text-gray-800">{title}</h1>
//             </div>

//             <div className="p-4 text-center">
//                 <p className="text-sm text-gray-600">{description}</p>
//                 <div className="flex justify-between mt-4 text-sm font-semibold py-2 px-4">
//                     <div className="flex flex-col items-center">
//                         <p className="text-gray-500">Start Date</p>
//                         <p className="text-gray-700 font-light">{startDatee}</p>
//                     </div>
//                     <div className="flex flex-col items-center">
//                         <p className="text-gray-500">End Date</p>
//                         <p className="text-gray-700 font-light">{endDatee}</p>
//                     </div>
//                 </div>
//             </div>

//             <div className="p-4 flex justify-center">
//                 <button
//                     onClick={() => setShowForm(!showForm)}
//                     className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-2"
//                 >
//                     Add User
//                 </button>
//             </div>

//             {showForm && (
//                 <div className="p-4">
//                     <input
//                         type="email"
//                         value={userEmail}
//                         onChange={(e) => setUserEmail(e.target.value)}
//                         placeholder="Enter user email"
//                         className="border p-1 rounded w-full"
//                     />
//                     <button
//                         onClick={handleAddUser}
//                         className="bg-green-500 text-white px-4 py-2 rounded mt-2"
//                     >
//                         Assign User
//                     </button>
//                 </div>
//             )}

//             <div className="p-4 flex items-center justify-between border-t border-gray-100">
//                 <p className="text-xs text-gray-600">{assignee || 'N/A'}</p>
//                 <p className="text-xs text-gray-600">{assignedUsersCount} Users Assigned</p>
//                 <button
//                     onClick={handleToggleCompleted}
//                     type="button"
//                     className={`flex items-center justify-center gap-2 text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-300 ${complete ? 'bg-green-100 text-green-800' : getStatusColor(status)} hover:bg-opacity-80 focus:outline-none`}
//                 >
//                     {complete ? 'Completed' : status}
//                 </button>
//             </div>
//         </div>
//     );
// };

// TaskCard.propTypes = {
//     id: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     startDate: PropTypes.string.isRequired,
//     endDate: PropTypes.string,
//     status: PropTypes.string.isRequired,
//     assignee: PropTypes.string,
//     priority: PropTypes.string,
// };

// export default TaskCard;


////////////////////

// import React, { useState } from 'react';
// import { ref, get, set } from '../firebase';
// import axios from 'axios';
// import { database } from '../firebase'; // تأكد من أنك أضفت إعدادات Firebase الخاصة بك

// const TaskCard = ({
//     id,
//     title = 'No title provided', // Fallback title
//     description = 'No description available', // Fallback description
//     startDate = 'No start date', // Fallback start date
//     endDate = 'No end date', // Fallback end date
//     status = 'No status', // Fallback status
//     assignee = 'N/A', // Fallback assignee
//     priority = 'Normal', // Fallback priority
// }) => {
//     const [complete, setComplete] = useState(status && status.toLowerCase() === "completed");
//     const [assignedUsersCount, setAssignedUsersCount] = useState(0);
//     const [assignedUsers, setAssignedUsers] = useState([]);
//     const [showForm, setShowForm] = useState(false);
//     const [userEmail, setUserEmail] = useState('');
//     const [showUserList, setShowUserList] = useState(false);

//     const getDate = (dateString) => {
//         const dateObject = new Date(dateString);
//         return dateObject.toLocaleDateString();
//     };

//     const startDatee = getDate(startDate);
//     const endDatee = getDate(endDate);

//     const getStatusColor = (status) => {
//         switch (status.toLowerCase()) {
//             case "completed":
//                 return "bg-green-100 text-green-800";
//             case "in progress":
//                 return "bg-blue-100 text-blue-800";
//             case "pending":
//                 return "bg-yellow-100 text-yellow-800";
//             case "deferred":
//                 return "bg-gray-100 text-gray-800";
//             case "deployed":
//                 return "bg-purple-100 text-purple-800";
//             default:
//                 return "bg-gray-100 text-gray-800";
//         }
//     };

//     const handleToggleCompleted = async () => {
//         const newStatus = complete ? "Pending" : "Completed";
//         try {
//             await axios.patch(`${FIREBASE_URL}/${id}.json`, { status: newStatus });
//             setComplete(!complete);
//         } catch (error) {
//             console.error("❌ Error updating task:", error);
//         }
//     };

//     const handleAddUser = async () => {
//         try {
//             const usersRef = ref(database, 'users');
//             const snapshot = await get(usersRef);
//             const users = snapshot.val();

//             let userExists = false;
//             for (const userId in users) {
//                 if (users[userId].email === userEmail) {
//                     userExists = true;
//                     break;
//                 }
//             }

//             if (userExists) {
//                 const userIdToAdd = Object.keys(users).find(userId => users[userId].email === userEmail);
//                 const taskRef = ref(database, `tasks/${id}/assignedUsers/${userIdToAdd}`);
//                 await set(taskRef, true);

//                 const userTasksRef = ref(database, `users/${userIdToAdd}/tasks/${id}`);
//                 await set(userTasksRef, true);

//                 // Fetch updated list of assigned users
//                 const assignedUsersRef = ref(database, `tasks/${id}/assignedUsers`);
//                 const assignedUsersSnapshot = await get(assignedUsersRef);
//                 const usersList = Object.keys(assignedUsersSnapshot.val() || {}).map(userId => users[userId].email);
//                 setAssignedUsers(usersList);
//                 setAssignedUsersCount(usersList.length);

//                 alert('User added to the task successfully!');
//             } else {
//                 alert('User not found! Please make sure the user is registered.');
//             }
//         } catch (error) {
//             console.error('Error adding user to task:', error);
//         }
//     };

//     return (
//         <div className="flex flex-col rounded-xl bg-white w-72 min-h-[400px] shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
//             <div className={`relative mt-4 mx-4 rounded-lg ${getStatusColor(status)} shadow-sm`}>
//                 <h1 className="text-end pt-2 pr-3 text-sm font-semibold text-gray-600">{priority}</h1>
//                 <h1 className="font-bold text-center text-xl py-4 mb-4 text-gray-800">{title}</h1>
//             </div>

//             <div className="p-4 text-center">
//                 <p className="text-sm text-gray-600">{description}</p>
//                 <div className="flex justify-between mt-4 text-sm font-semibold py-2 px-4">
//                     <div className="flex flex-col items-center">
//                         <p className="text-gray-500">Start Date</p>
//                         <p className="text-gray-700 font-light">{startDatee}</p>
//                     </div>
//                     <div className="flex flex-col items-center">
//                         <p className="text-gray-500">End Date</p>
//                         <p className="text-gray-700 font-light">{endDatee}</p>
//                     </div>
//                 </div>
//             </div>

//             <div className="p-4 flex justify-center">
//                 <button
//                     onClick={() => setShowForm(!showForm)}
//                     className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-2"
//                 >
//                     Add User
//                 </button>
//             </div>

//             {showForm && (
//                 <div className="p-4">
//                     <input
//                         type="email"
//                         value={userEmail}
//                         onChange={(e) => setUserEmail(e.target.value)}
//                         placeholder="Enter user email"
//                         className="border p-1 rounded w-full"
//                     />
//                     <button
//                         onClick={handleAddUser}
//                         className="bg-green-500 text-white px-4 py-2 rounded mt-2"
//                     >
//                         Assign User
//                     </button>
//                 </div>
//             )}

//             <div className="p-4 flex items-center justify-between border-t border-gray-100">
//                 <p className="text-xs text-gray-600">{assignee}</p>
//                 <p className="text-xs text-gray-600">{assignedUsersCount} Users Assigned</p>
//                 <button
//                     onClick={() => setShowUserList(!showUserList)}
//                     className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg"
//                 >
//                     {showUserList ? 'Hide Users' : 'Show Users List'}
//                 </button>
//             </div>

//             {showUserList && (
//                 <div className="p-4">
//                     <h3 className="font-semibold text-gray-800">Assigned Users:</h3>
//                     <ul className="text-sm text-gray-600">
//                         {assignedUsers.map((email, index) => (
//                             <li key={index} className="py-1">{email}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}

//             <div className="p-4 flex items-center justify-between border-t border-gray-100">
//                 <button
//                     onClick={handleToggleCompleted}
//                     type="button"
//                     className={`flex items-center justify-center gap-2 text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-300 ${complete ? 'bg-green-100 text-green-800' : getStatusColor(status)} hover:bg-opacity-80 focus:outline-none`}
//                 >
//                     {complete ? 'Completed' : status}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default TaskCard;



//////////////////////////////////////////////////////////////////////


// import React, { useState, useEffect } from 'react';
// import { ref, get, set } from '../firebase';
// import axios from 'axios';
// import { database } from '../firebase'; // تأكد من أنك أضفت إعدادات Firebase الخاصة بك

// const TaskCard = ({
//     id,
//     title = 'No title provided', // Fallback title
//     description = 'No description available', // Fallback description
//     startDate = 'No start date', // Fallback start date
//     endDate = 'No end date', // Fallback end date
//     status = 'No status', // Fallback status
//     assignee = 'N/A', // Fallback assignee
//     priority = 'Normal', // Fallback priority
// }) => {
//     const [complete, setComplete] = useState(status && status.toLowerCase() === "completed");
//     const [assignedUsersCount, setAssignedUsersCount] = useState(0);
//     const [assignedUsers, setAssignedUsers] = useState([]);
//     const [showForm, setShowForm] = useState(false);
//     const [userEmail, setUserEmail] = useState('');
//     const [showUserList, setShowUserList] = useState(false);

//     const getDate = (dateString) => {
//         const dateObject = new Date(dateString);
//         return dateObject.toLocaleDateString();
//     };

//     const startDatee = getDate(startDate);
//     const endDatee = getDate(endDate);

//     const getStatusColor = (status) => {
//         switch (status.toLowerCase()) {
//             case "completed":
//                 return "bg-green-100 text-green-800";
//             case "in progress":
//                 return "bg-blue-100 text-blue-800";
//             case "pending":
//                 return "bg-yellow-100 text-yellow-800";
//             case "deferred":
//                 return "bg-gray-100 text-gray-800";
//             case "deployed":
//                 return "bg-purple-100 text-purple-800";
//             default:
//                 return "bg-gray-100 text-gray-800";
//         }
//     };

//     const handleToggleCompleted = async () => {
//         const newStatus = complete ? "Pending" : "Completed";
//         try {
//             await axios.patch(`${FIREBASE_URL}/${id}.json`, { status: newStatus });
//             setComplete(!complete);
//         } catch (error) {
//             console.error("❌ Error updating task:", error);
//         }
//     };

//     // Fetch assigned users for the task
//     const fetchAssignedUsers = async () => {
//         try {
//             const assignedUsersRef = ref(database, `tasks/${id}/assignedUsers`);
//             const snapshot = await get(assignedUsersRef);
//             const assignedUsersData = snapshot.val() || {};

//             const usersRef = ref(database, 'users');
//             const usersSnapshot = await get(usersRef);
//             const usersData = usersSnapshot.val() || {};

//             const usersList = Object.keys(assignedUsersData).map(userId => usersData[userId].email);
//             setAssignedUsers(usersList);
//             setAssignedUsersCount(usersList.length);
//         } catch (error) {
//             console.error('Error fetching assigned users:', error);
//         }
//     };

//     useEffect(() => {
//         // Fetch assigned users when component mounts
//         fetchAssignedUsers();
//     }, [id]);

//     const handleAddUser = async () => {
//         try {
//             const usersRef = ref(database, 'users');
//             const snapshot = await get(usersRef);
//             const users = snapshot.val();

//             let userExists = false;
//             for (const userId in users) {
//                 if (users[userId].email === userEmail) {
//                     userExists = true;
//                     break;
//                 }
//             }

//             if (userExists) {
//                 const userIdToAdd = Object.keys(users).find(userId => users[userId].email === userEmail);
//                 const taskRef = ref(database, `tasks/${id}/assignedUsers/${userIdToAdd}`);
//                 await set(taskRef, true);

//                 const userTasksRef = ref(database, `users/${userIdToAdd}/tasks/${id}`);
//                 await set(userTasksRef, true);

//                 // Fetch updated list of assigned users
//                 await fetchAssignedUsers();

//                 alert('User added to the task successfully!');
//                 setUserEmail(''); // Reset the email input
//             } else {
//                 alert('User not found! Please make sure the user is registered.');
//             }
//         } catch (error) {
//             console.error('Error adding user to task:', error);
//         }
//     };

//     return (
//         <div className="flex flex-col rounded-xl bg-white w-72 min-h-[400px] shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
//             <div className={`relative mt-4 mx-4 rounded-lg ${getStatusColor(status)} shadow-sm`}>
//                 <h1 className="text-end pt-2 pr-3 text-sm font-semibold text-gray-600">{priority}</h1>
//                 <h1 className="font-bold text-center text-xl py-4 mb-4 text-gray-800">{title}</h1>
//             </div>

//             <div className="p-4 text-center">
//                 <p className="text-sm text-gray-600">{description}</p>
//                 <div className="flex justify-between mt-4 text-sm font-semibold py-2 px-4">
//                     <div className="flex flex-col items-center">
//                         <p className="text-gray-500">Start Date</p>
//                         <p className="text-gray-700 font-light">{startDatee}</p>
//                     </div>
//                     <div className="flex flex-col items-center">
//                         <p className="text-gray-500">End Date</p>
//                         <p className="text-gray-700 font-light">{endDatee}</p>
//                     </div>
//                 </div>
//             </div>

//             <div className="p-4 flex justify-center">
//                 <button
//                     onClick={() => setShowForm(!showForm)}
//                     className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-2"
//                 >
//                     Add User
//                 </button>
//             </div>

//             {showForm && (
//                 <div className="p-4">
//                     <input
//                         type="email"
//                         value={userEmail}
//                         onChange={(e) => setUserEmail(e.target.value)}
//                         placeholder="Enter user email"
//                         className="border p-1 rounded w-full"
//                     />
//                     <button
//                         onClick={handleAddUser}
//                         className="bg-green-500 text-white px-4 py-2 rounded mt-2"
//                     >
//                         Assign User
//                     </button>
//                 </div>
//             )}

//             <div className="p-4 flex items-center justify-between border-t border-gray-100">
//                 <p className="text-xs text-gray-600">{assignee}</p>
//                 <p className="text-xs text-gray-600">{assignedUsersCount} Users Assigned</p>
//                 <button
//                     onClick={() => setShowUserList(!showUserList)}
//                     className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg"
//                 >
//                     {showUserList ? 'Hide Users' : 'Show Users List'}
//                 </button>
//             </div>

//             {showUserList && (
//                 <div className="p-4">
//                     <h3 className="font-semibold text-gray-800">Assigned Users:</h3>
//                     <ul className="text-sm text-gray-600">
//                         {assignedUsers.map((email, index) => (
//                             <li key={index} className="py-1">{email}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}

//             <div className="p-4 flex items-center justify-between border-t border-gray-100">
//                 <button
//                     onClick={handleToggleCompleted}
//                     type="button"
//                     className={`flex items-center justify-center gap-2 text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-300 ${complete ? 'bg-green-100 text-green-800' : getStatusColor(status)} hover:bg-opacity-80 focus:outline-none`}
//                 >
//                     {complete ? 'Completed' : status}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default TaskCard;




// import React, { useState, useEffect } from 'react';
// import { ref, get, set, update } from '../firebase'; 
// import axios from 'axios';
// import { database } from '../firebase';

// const TaskCard = ({
//     id,
//     title = 'No title provided', 
//     description = 'No description available', 
//     startDate = 'No start date', 
//     endDate = 'No end date', 
//     status = 'No status', 
//     assignee = 'N/A', 
//     priority = 'Normal', 
// }) => {
//     const [complete, setComplete] = useState(status && status.toLowerCase() === "completed");
//     const [assignedUsersCount, setAssignedUsersCount] = useState(0);
//     const [assignedUsers, setAssignedUsers] = useState([]);
//     const [showForm, setShowForm] = useState(false);
//     const [userEmail, setUserEmail] = useState('');
//     const [showUserList, setShowUserList] = useState(false);
//     const [updatedTitle, setUpdatedTitle] = useState(title);
//     const [updatedDescription, setUpdatedDescription] = useState(description);
//     const [updatedPriority, setUpdatedPriority] = useState(priority);

//     const getDate = (dateString) => {
//         const dateObject = new Date(dateString);
//         return dateObject.toLocaleDateString();
//     };

//     const startDatee = getDate(startDate);
//     const endDatee = getDate(endDate);

//     const getStatusColor = (status) => {
//         switch (status.toLowerCase()) {
//             case "completed":
//                 return "bg-green-100 text-green-800";
//             case "in progress":
//                 return "bg-blue-100 text-blue-800";
//             case "pending":
//                 return "bg-yellow-100 text-yellow-800";
//             case "deferred":
//                 return "bg-gray-100 text-gray-800";
//             case "deployed":
//                 return "bg-purple-100 text-purple-800";
//             default:
//                 return "bg-gray-100 text-gray-800";
//         }
//     };

//     const handleToggleCompleted = async () => {
//         const newStatus = complete ? "Pending" : "Completed";
//         try {
//             await axios.patch(`${FIREBASE_URL}/${id}.json`, { status: newStatus });
//             setComplete(!complete);
//         } catch (error) {
//             console.error("❌ Error updating task:", error);
//         }
//     };

//     const fetchAssignedUsers = async () => {
//         try {
//             const assignedUsersRef = ref(database, `tasks/${id}/assignedUsers`);
//             const snapshot = await get(assignedUsersRef);
//             const assignedUsersData = snapshot.val() || {};

//             const usersRef = ref(database, 'users');
//             const usersSnapshot = await get(usersRef);
//             const usersData = usersSnapshot.val() || {};

//             const usersList = Object.keys(assignedUsersData).map(userId => usersData[userId].email);
//             setAssignedUsers(usersList);
//             setAssignedUsersCount(usersList.length);
//         } catch (error) {
//             console.error('Error fetching assigned users:', error);
//         }
//     };

//     useEffect(() => {
//         fetchAssignedUsers();
//     }, [id]);

//     const handleAddUser = async () => {
//         try {
//             const usersRef = ref(database, 'users');
//             const snapshot = await get(usersRef);
//             const users = snapshot.val();

//             let userExists = false;
//             for (const userId in users) {
//                 if (users[userId].email === userEmail) {
//                     userExists = true;
//                     break;
//                 }
//             }

//             if (userExists) {
//                 const userIdToAdd = Object.keys(users).find(userId => users[userId].email === userEmail);
//                 const taskRef = ref(database, `tasks/${id}/assignedUsers/${userIdToAdd}`);
//                 await set(taskRef, true);

//                 const userTasksRef = ref(database, `users/${userIdToAdd}/tasks/${id}`);
//                 await set(userTasksRef, true);

//                 await fetchAssignedUsers();

//                 alert('User added to the task successfully!');
//                 setUserEmail('');
//             } else {
//                 alert('User not found! Please make sure the user is registered.');
//             }
//         } catch (error) {
//             console.error('Error adding user to task:', error);
//         }
//     };

//     const handleUpdateTask = async () => {
//         try {
//             const taskRef = ref(database, `tasks/${id}`);
//             await update(taskRef, {
//                 title: updatedTitle,
//                 description: updatedDescription,
//                 priority: updatedPriority,
//             });

//             alert('Task updated successfully!');
//         } catch (error) {
//             console.error('Error updating task:', error);
//         }
//     };

//     const handleSoftDelete = async () => {
//         try {
//             const taskRef = ref(database, `tasks/${id}`);
//             await update(taskRef, {
//                 isDeleted: true, // Mark the task as deleted (soft delete)
//             });

//             alert('Task marked as deleted!');
//         } catch (error) {
//             console.error('Error marking task as deleted:', error);
//         }
//     };

//     return (
//         <div className="flex flex-col rounded-xl bg-white w-72 min-h-[400px] shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
//             <div className={`relative mt-4 mx-4 rounded-lg ${getStatusColor(status)} shadow-sm`}>
//                 <h1 className="text-end pt-2 pr-3 text-sm font-semibold text-gray-600">{priority}</h1>
//                 <h1 className="font-bold text-center text-xl py-4 mb-4 text-gray-800">{title}</h1>
//             </div>

//             <div className="p-4 text-center">
//                 <p className="text-sm text-gray-600">{description}</p>
//                 <div className="flex justify-between mt-4 text-sm font-semibold py-2 px-4">
//                     <div className="flex flex-col items-center">
//                         <p className="text-gray-500">Start Date</p>
//                         <p className="text-gray-700 font-light">{startDatee}</p>
//                     </div>
//                     <div className="flex flex-col items-center">
//                         <p className="text-gray-500">End Date</p>
//                         <p className="text-gray-700 font-light">{endDatee}</p>
//                     </div>
//                 </div>
//             </div>

//             <div className="p-4 flex justify-center">
//                 <button
//                     onClick={() => setShowForm(!showForm)}
//                     className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-2"
//                 >
//                     Add User
//                 </button>
//             </div>

//             {showForm && (
//                 <div className="p-4">
//                     <input
//                         type="email"
//                         value={userEmail}
//                         onChange={(e) => setUserEmail(e.target.value)}
//                         placeholder="Enter user email"
//                         className="border p-1 rounded w-full"
//                     />
//                     <button
//                         onClick={handleAddUser}
//                         className="bg-green-500 text-white px-4 py-2 rounded mt-2"
//                     >
//                         Assign User
//                     </button>
//                 </div>
//             )}

//             <div className="p-4 flex items-center justify-between border-t border-gray-100">
//                 <p className="text-xs text-gray-600">{assignee}</p>
//                 <p className="text-xs text-gray-600">{assignedUsersCount} Users Assigned</p>
//                 <button
//                     onClick={() => setShowUserList(!showUserList)}
//                     className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg"
//                 >
//                     {showUserList ? 'Hide Users' : 'Show Users List'}
//                 </button>
//             </div>

//             {showUserList && (
//                 <div className="p-4">
//                     <h3 className="font-semibold text-gray-800">Assigned Users:</h3>
//                     <ul className="text-sm text-gray-600">
//                         {assignedUsers.map((email, index) => (
//                             <li key={index} className="py-1">{email}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}

//             <div className="p-4 flex items-center justify-between border-t border-gray-100">
//                 <button
//                     onClick={handleToggleCompleted}
//                     type="button"
//                     className={`flex items-center justify-center gap-2 text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-300 ${complete ? 'bg-green-100 text-green-800' : getStatusColor(status)} hover:bg-opacity-80 focus:outline-none`}
//                 >
//                     {complete ? 'Completed' : status}
//                 </button>

//                 {/* Update and Soft Delete buttons */}
//                 <div className="flex gap-2 mt-2">
//                     <button
//                         onClick={handleUpdateTask}
//                         className="bg-yellow-500 text-white px-4 py-2 rounded"
//                     >
//                         Update
//                     </button>
//                     <button
//                         onClick={handleSoftDelete}
//                         className="bg-red-500 text-white px-4 py-2 rounded"
//                     >
//                         Delete (Soft)
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TaskCard;

// import React, { useState } from 'react';
// import axios from 'axios';

// const TaskCard = ({
//     id,
//     title = 'No title provided', 
//     description = 'No description available', 
//     startDate = 'No start date', 
//     endDate = 'No end date', 
//     status = 'No status', 
//     assignee = 'N/A', 
//     priority = 'Normal', 
// }) => {
//     const [complete, setComplete] = useState(status && status.toLowerCase() === "completed");
//     const [showForm, setShowForm] = useState(false);
//     const [updatedTitle, setUpdatedTitle] = useState(title);
//     const [updatedDescription, setUpdatedDescription] = useState(description);
//     const [updatedPriority, setUpdatedPriority] = useState(priority);

//     // رابط قاعدة البيانات الخاص بك
//     const DATABASE_URL = 'https://reactprojectteam-default-rtdb.firebaseio.com/tasks.json';
//     // مفتاح الوصول إذا كانت القاعدة محمية
//     // const ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN';
//     const getStatusColor = (status) => {
//         switch (status.toLowerCase()) {
//             case 'completed':
//                 return 'bg-green-200';
//             case 'pending':
//                 return 'bg-yellow-200';
//             case 'in progress':
//                 return 'bg-blue-200';
//             default:
//                 return 'bg-gray-200';
//         }
//     };
    
//     const handleToggleCompleted = async () => {
//         const newStatus = complete ? "Pending" : "Completed";
//         try {
//             await axios.patch(`${DATABASE_URL}/${id}`, { status: newStatus });
//             setComplete(!complete);
//         } catch (error) {
//             console.error("❌ Error updating task:", error);
//         }
//     };

//     const handleUpdateTask = async () => {
//         try {
//             await axios.patch(`${DATABASE_URL}/${id}`, {
//                 title: updatedTitle,
//                 description: updatedDescription,
//                 priority: updatedPriority,
//             });
//             alert('Task updated successfully!');
//             setShowForm(false);
//         } catch (error) {
//             console.error('Error updating task:', error);
//         }
//     };

//     const handleSoftDelete = async () => {
//         try {
//             await axios.patch(`${DATABASE_URL}/${id}`, { isDeleted: true });
//             alert('Task marked as deleted!');
//         } catch (error) {
//             console.error('Error marking task as deleted:', error);
//         }
//     };

//     return (
//         <div className="flex flex-col rounded-xl bg-white w-72 min-h-[400px] shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
//             <div className={`relative mt-4 mx-4 rounded-lg ${getStatusColor(status)} shadow-sm`}>
//                 <h1 className="text-end pt-2 pr-3 text-sm font-semibold text-gray-600">{priority}</h1>
//                 <h1 className="font-bold text-center text-xl py-4 mb-4 text-gray-800">{title}</h1>
//             </div>

//             <div className="p-4 text-center">
//                 <p className="text-sm text-gray-600">{description}</p>
//                 <div className="flex justify-between mt-4 text-sm font-semibold py-2 px-4">
//                     <div className="flex flex-col items-center">
//                         <p className="text-gray-500">Start Date</p>
//                         <p className="text-gray-700 font-light">{new Date(startDate).toLocaleDateString()}</p>
//                     </div>
//                     <div className="flex flex-col items-center">
//                         <p className="text-gray-500">End Date</p>
//                         <p className="text-gray-700 font-light">{new Date(endDate).toLocaleDateString()}</p>
//                     </div>
//                 </div>
//             </div>

//             <div className="p-4 flex justify-center">
//                 <button
//                     onClick={() => setShowForm(!showForm)}
//                     className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-2"
//                 >
//                     {showForm ? 'Close Form' : 'Update'}
//                 </button>
//             </div>

//             {showForm && (
//                 <div className="p-4">
//                     <input
//                         type="text"
//                         value={updatedTitle}
//                         onChange={(e) => setUpdatedTitle(e.target.value)}
//                         placeholder="Update Task Title"
//                         className="border p-1 rounded w-full mb-2"
//                     />
//                     <input
//                         type="text"
//                         value={updatedDescription}
//                         onChange={(e) => setUpdatedDescription(e.target.value)}
//                         placeholder="Update Description"
//                         className="border p-1 rounded w-full mb-2"
//                     />
//                     <input
//                         type="text"
//                         value={updatedPriority}
//                         onChange={(e) => setUpdatedPriority(e.target.value)}
//                         placeholder="Update Priority"
//                         className="border p-1 rounded w-full mb-2"
//                     />
//                     <button
//                         onClick={handleUpdateTask}
//                         className="bg-yellow-500 text-white px-4 py-2 rounded mt-2"
//                     >
//                         Update Task
//                     </button>
//                 </div>
//             )}

//             <div className="p-4 flex items-center justify-between border-t border-gray-100">
//                 <p className="text-xs text-gray-600">{assignee}</p>
//             </div>

//             <div className="p-4 flex items-center justify-between border-t border-gray-100">
//                 <button
//                     onClick={handleToggleCompleted}
//                     type="button"
//                     className={`flex items-center justify-center gap-2 text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-300 ${complete ? 'bg-green-100 text-green-800' : getStatusColor(status)} hover:bg-opacity-80 focus:outline-none`}
//                 >
//                     {complete ? 'Completed' : status}
//                 </button>

//                 <button
//                     onClick={handleSoftDelete}
//                     className="bg-red-500 text-white px-4 py-2 rounded"
//                 >
//                     Soft Delete
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default TaskCard;

import React, { useState, useEffect } from 'react';
import { ref, get, set, update   } from '../firebase'; // تأكد من استيراد دالة update بشكل صحيح
import axios from 'axios';
import { database } from '../firebase';






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
    const [showUpdateForm, setShowUpdateForm] = useState(false); // لحالة عرض نموذج التحديث
    const [userEmail, setUserEmail] = useState('');
    const [showUserList, setShowUserList] = useState(false);

    // حالة القيم الجديدة للتحديث
    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [updatedDescription, setUpdatedDescription] = useState(description);
    const [updatedPriority, setUpdatedPriority] = useState(priority);
    
    const getDate = (dateString) => {
        const dateObject = new Date(dateString);
        return dateObject.toLocaleDateString();
    };

    const startDatee = getDate(startDate);
    const endDatee = getDate(endDate);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "completed":
                return "bg-green-100 text-green-800";
            case "in progress":
                return "bg-blue-100 text-blue-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "deferred":
                return "bg-gray-100 text-gray-800";
            case "deployed":
                return "bg-purple-100 text-purple-800";
            default:
                return "bg-gray-100 text-gray-800";
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
        fetchAssignedUsers();
    }, [id]);

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
                status:newStatus
            });
              setShowUpdateForm(false); 
            alert('Task updated successfully!');
           // إغلاق نموذج التحديث بعد النجاح
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

    return (
        <div className="flex flex-col rounded-xl bg-white w-72 min-h-[400px] shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className={`relative mt-4 mx-4 rounded-lg ${getStatusColor(status)} shadow-sm`}>
                <h1 className="text-end pt-2 pr-3 text-sm font-semibold text-gray-600">{priority}</h1>
                <h1 className="font-bold text-center text-xl py-4 mb-4 text-gray-800">{title}</h1>
            </div>

            <div className="p-4 text-center">
                <p className="text-sm text-gray-600">{description}</p>
                <div className="flex justify-between mt-4 text-sm font-semibold py-2 px-4">
                    <div className="flex flex-col items-center">
                        <p className="text-gray-500">Start Date</p>
                        <p className="text-gray-700 font-light">{startDatee}</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-gray-500">End Date</p>
                        <p className="text-gray-700 font-light">{endDatee}</p>
                    </div>
                </div>
            </div>

            <div className="p-4 flex justify-center">
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-2"
                >
                    Add User
                </button>
            </div>

            {showForm && (
                <div className="p-4">
                    <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="Enter user email"
                        className="border p-1 rounded w-full"
                    />
                    <button
                        onClick={handleAddUser}
                        className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                    >
                        Assign User
                    </button>
                </div>
            )}

            {/* عرض نموذج التحديث عند الضغط على Update */}
            {showUpdateForm && (
                <div className="p-4">
                    <input
                        type="text"
                        value={updatedTitle}
                        onChange={(e) => setUpdatedTitle(e.target.value)}
                        placeholder="Update Task Title"
                        className="border p-1 rounded w-full mb-2"
                    />
                    <input
                        type="text"
                        value={updatedDescription}
                        onChange={(e) => setUpdatedDescription(e.target.value)}
                        placeholder="Update Description"
                        className="border p-1 rounded w-full mb-2"
                    />
                    <input
                        type="text"
                        value={updatedPriority}
                        onChange={(e) => setUpdatedPriority(e.target.value)}
                        placeholder="Update Priority"
                        className="border p-1 rounded w-full mb-2"
                    />
                    <button
                        onClick={handleUpdateTask}
                        className="bg-yellow-500 text-white px-4 py-2 rounded mt-2"
                    >
                        Update Task
                    </button>
                </div>
            )}

            <div className="p-4 flex items-center justify-between border-t border-gray-100">
                <p className="text-xs text-gray-600">{assignee}</p>
                <p className="text-xs text-gray-600">{assignedUsersCount} Users Assigned</p>
                <button
                    onClick={() => setShowUserList(!showUserList)}
                    className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg"
                >
                    {showUserList ? 'Hide Users' : 'Show Users List'}
                </button>
            </div>

            {showUserList && (
                <div className="p-4">
                    <h3 className="font-semibold text-gray-800">Assigned Users:</h3>
                    <ul className="text-sm text-gray-600">
                        {assignedUsers.map((email, index) => (
                            <li key={index} className="py-1">{email}</li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="p-4 flex items-center justify-between border-t border-gray-100">
                <button
                    onClick={handleToggleCompleted}
                    type="button"
                    className={`flex items-center justify-center gap-2 text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-300 ${complete ? 'bg-green-100 text-green-800' : getStatusColor(status)} hover:bg-opacity-80 focus:outline-none`}
                >
                    {complete ? 'Completed' : status}
                </button>

                {/* زر التحديث وزر الحذف الناعم */}
              
    <>
        <button
            onClick={() => setShowUpdateForm(true)}
            className="bg-red-500 text-white p-1 rounded-md text-xs hover:bg-red-600 transition"
        >
            Update
        </button>

        <button
            onClick={handleSoftDelete}
            className="bg-red-500 text-white p-1 rounded-md text-xs hover:bg-red-600 transition"
        >
            Delete
        </button>
    </>


            </div>
        </div>
    );
};

export default TaskCard;