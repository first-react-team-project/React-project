import { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import { Link } from "react-router-dom";
import { database, ref, get } from "../firebase";

const CompleteTask = () => {
    const [completedTasks, setCompletedTasks] = useState([]);

    useEffect(() => {
        const fetchCompletedTasks = async () => {
            try {
                const tasksRef = ref(database, "tasks");
                const snapshot = await get(tasksRef);
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const tasksArray = Object.keys(data).map(key => ({
                        id: key,
                        ...data[key],
                    }));
                    const filteredTasks = tasksArray.filter(task => task.status === 'Completed');
                    setCompletedTasks(filteredTasks);
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchCompletedTasks();
    }, []);

    return (
        <div className="w-[70%] mx-auto">
            <div className="mt-10">
                <h1 className="text-3xl font-bold my-8 text-center">Completed Tasks</h1>
            </div>
            {
                completedTasks.length > 0 ? (
                    <div className="flex flex-wrap gap-y-4 gap-x-14 justify-center overflow-y-scroll mt-5 h-[50vh] sm:h-[80vh]">
                        {completedTasks.map(task => (
                            <TaskCard
                                key={task.id}
                                title={task.title}
                                description={task.description}
                                startDate={task.startDate}
                                endDate={task.endDate}
                                status={task.status}
                                assignee={task.assignee}
                                priority={task.priority}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center mt-[17vh] sm:mt-[30vh]">
                        <p>No tasks found. <Link to="/addTask" className="text-indigo-500">Add a new task</Link></p>
                    </div>
                )
            }
        </div>
    );
};

export default CompleteTask;
