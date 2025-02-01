import PropTypes from 'prop-types';
import { useState } from "react";
import axios from "axios";

const FIREBASE_URL = "https://reactprojectteam-default-rtdb.firebaseio.com/tasks";

const TaskCard = ({
    id,
    title,
    description,
    startDate,
    endDate,
    status,
    assignee,
    priority,
}) => {
    const [complete, setComplete] = useState(status.toLowerCase() === "completed");

    const getDate = (dateString) => {
        const dateObject = new Date(dateString);
        return dateObject.toLocaleDateString();
    };

    const startDatee = getDate(startDate);
    const endDatee = getDate(endDate);

    const getStatusColor = (status) => {
        if (!status) return "bg-gray-100 text-gray-800";

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
        const newStatus = complete ? "Pending" : "Completed"; // تغيير الحالة بناءً على القيمة الحالية
        try {
            await axios.patch(`${FIREBASE_URL}/${id}.json`, {
                status: newStatus,
            });
            setComplete(!complete);
        } catch (error) {
            console.error("❌ Error updating task:", error);
        }
    };

    return (
        <div className="flex flex-col rounded-xl bg-white w-72 max-h-[370px] shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            {/* Header Section */}
            <div className={`relative mt-4 mx-4 rounded-lg ${getStatusColor(status)} shadow-sm`}>
                <h1 className="text-end pt-2 pr-3 text-sm font-semibold text-gray-600">{priority}</h1>
                <h1 className="font-bold text-center text-xl py-4 mb-4 text-gray-800">{title}</h1>
            </div>

            {/* Body Section */}
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

            {/* Footer Section */}
            <div className="p-4 flex items-center justify-between border-t border-gray-100">
                <p className="text-xs text-gray-600">{assignee || 'N/A'}</p>
                <button
                    onClick={handleToggleCompleted}
                    type="button"
                    className={`flex items-center justify-center gap-2 text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-300 ${
                        complete ? 'bg-green-100 text-green-800' : getStatusColor(status)
                    } hover:bg-opacity-80 focus:outline-none`}
                >
                    {complete ? 'Completed' : status}
                </button>
            </div>
        </div>
    );
};

TaskCard.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    assignee: PropTypes.string,
    priority: PropTypes.string,
};

export default TaskCard;
