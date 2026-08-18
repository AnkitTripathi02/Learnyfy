import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyProfile } from "../api/profileApi";
import DashboardCard from "../components/dashboard/DashboardCard";
import ProgressCard from "../components/dashboard/ProgressCard";
import ActivityCard from "../components/dashboard/ActivityCard";
import { getDashboardStats } from "../api/dashboardApi";

import {
    FaBookOpen,
    FaCheckCircle,
    FaClipboardCheck,
    FaTrophy,
} from "react-icons/fa";

const Dashboard = () => {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    const [stats, setStats] = useState({
        total_courses: 0,
        completed_courses: 0,
        practice_count: 0,
        rank: 0,
    });

    const verifyUser = async () => {
        try {
            await getMyProfile();
        } catch (error) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            navigate("/login", { replace: true });
        }
    };

    const loadDashboardStats = async () => {
        try {
            const response = await getDashboardStats();
            setStats(response.data);
        } catch (error) {
            console.error("Failed to load dashboard stats", error);
        }
    };


    useEffect(() => {
        verifyUser();
        loadDashboardStats();
    }, [navigate]);

    // const handleLogout = () => {
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("user");

    //     navigate("/login", { replace: true });
    // };

return (
    <div className="p-8">

        <h1 className="text-4xl font-bold text-white">
            Welcome {user.full_name} 👋
        </h1>

        <p className="mt-2 text-gray-400">
            Keep learning and improve your skills.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            <DashboardCard
                title="Total Courses"
                value={stats.total_courses.toString()}
                icon={<FaBookOpen />}
            />

            <DashboardCard
                title="Completed"
                value={stats.completed_courses.toString()}
                icon={<FaCheckCircle />}
            />

            <DashboardCard
                title="Practice"
                value={stats.practice_count.toString()}
                icon={<FaClipboardCheck />}
            />

            <DashboardCard
                title="Rank"
                value={`#${stats.rank}`}
                icon={<FaTrophy />}
            />

        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">

            <div className="lg:col-span-2">
                <ProgressCard />
            </div>

            <div>
                <ActivityCard />
            </div>

        </div>

    </div>
);
};

export default Dashboard;