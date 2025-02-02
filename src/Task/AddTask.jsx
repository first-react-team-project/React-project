import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { database, ref, push, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AddTask = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: new Date(),
        endDate: null,
        status: 'Pending',
        assignee: '',
        priority: 'P0'
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [user, setUser] = useState(null); // Store the current authenticated user

    useEffect(() => {
        // Check the user's authentication status when the component mounts
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser); // Set user if authenticated
            } else {
                setUser(null); // Set user to null if not authenticated
            }
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEndDateChange = (date) => {
        setFormData({
            ...formData,
            endDate: date
        });
    };

    const handleStartDateChange = (date) => {
        if (date instanceof Date && !isNaN(date)) {
            setFormData({
                ...formData,
                startDate: date
            });
        }
    };
 
    



    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user) {
            setError('You need to be logged in to add a task!');
            return;
        }

        if (!formData.title) {
            setError('Title is required!');
            return;
        }

        if (formData.endDate && formData.startDate > formData.endDate) {
            setError('End date cannot be before start date!');
            return;
        }

        setError('');

        const serializableFormData = {
            ...formData,
            startDate: formData.startDate.toISOString(),
            endDate: formData.endDate ? formData.endDate.toISOString() : null,
            userId: user.uid // Store the userId with the task data
        };

        const newTaskRef = ref(database, 'tasks');
        push(newTaskRef, serializableFormData)
            .then(() => {
                setSuccessMessage('Task added successfully!');
                setTimeout(() => setSuccessMessage(''), 3000);
                setFormData({
                    title: '',
                    description: '',
                    startDate: new Date(),
                    endDate: null,
                    status: 'Pending',
                    assignee: '',
                    priority: 'P0'
                });
            })
            .catch((error) => {
                setError('Error adding task: ' + error.message);
            });
    };

    return (
        <div className="w-[70%] mx-auto">
            <div className=''>
                <h1 className="text-3xl font-bold my-8 text-center">Add New Task</h1>
                <div className='grid place-items-center'>
                    <form className="w-full mt-12 sm:mt-0 max-w-lg" onSubmit={handleSubmit}>
                        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
                        {successMessage && <div className="text-green-600 mb-4 text-center">{successMessage}</div>}
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="title">
                                    Title
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                                    id="title"
                                    type="text"
                                    placeholder="Task Title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
                                    Description
                                </label>
                                <textarea
                                    className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                                    id="description"
                                    placeholder="Task Description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="startDate">
                                    Start Date
                                </label>
                                <DatePicker
                                    selected={formData.startDate}
                                    onChange={handleStartDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="endDate">
                                    End Date
                                </label>
                                <DatePicker
                                    selected={formData.endDate}
                                    onChange={handleEndDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="status">
                                    Status
                                </label>
                                <select
                                    className="block appearance-none w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Deployed">Deployed</option>
                                    <option value="Deferred">Deferred</option>
                                </select>
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="priority">
                                    Priority
                                </label>
                                <select
                                    className="block appearance-none w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                                    id="priority"
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                >
                                    <option value="P0">P0</option>
                                    <option value="P1">P1</option>
                                    <option value="P2">P2</option>
                                </select>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="mt-8 w-full p-3 bg-indigo-500 rounded-lg text-center text-white hover:bg-indigo-600 transition duration-300"
                        >
                            Add Task
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTask;

//////////////////////////////////////////////////////////////////////////////////////////////



// import React, { useState, useEffect } from 'react';
// import { ref, get, set, update } from '../firebase'; // تأكد من استيراد دالة update بشكل صحيح
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
//     const [showUpdateForm, setShowUpdateForm] = useState(false); // لحالة عرض نموذج التحديث
//     const [userEmail, setUserEmail] = useState('');
//     const [showUserList, setShowUserList] = useState(false);

//     // حالة القيم الجديدة للتحديث
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
//               setShowUpdateForm(false); 
//             alert('Task updated successfully!');
//            // إغلاق نموذج التحديث بعد النجاح
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

//             {/* عرض نموذج التحديث عند الضغط على Update */}
//             {showUpdateForm && (
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

//                 {/* زر التحديث وزر الحذف الناعم */}
//                 <button
//     onClick={() => setShowUpdateForm(true)} // تعديل هنا لاستخدام الحالة السابقة
//     className="bg-blue-500 text-white px-4 py-2 rounded"
// >
//     Update
// </button>

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

////////////////////////////////




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