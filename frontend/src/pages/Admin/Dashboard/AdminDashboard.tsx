import { useEffect, useState } from "react";
import { getAdminDashboard } from "../api/adminDashboardApi";


const AdminDashboard = () => {


    const [data,setData] = useState<any>(null);


    useEffect(()=>{

        loadDashboard();

    },[]);



    const loadDashboard = async()=>{

        const res = await getAdminDashboard();

        setData(res);

    }



    if(!data)
    {
        return <h2>Loading...</h2>
    }



    return (

        <div className="p-6">


            <h1 className="text-2xl font-bold mb-5">
                Admin Dashboard
            </h1>



            <div className="grid grid-cols-4 gap-5">


                <div className="p-5 rounded shadow bg-white">

                    <h3>Total Users</h3>

                    <h1 className="text-3xl">
                        {data.total_users}
                    </h1>

                </div>



                <div className="p-5 rounded shadow bg-white">

                    <h3>Total Courses</h3>

                    <h1 className="text-3xl">
                        {data.total_courses}
                    </h1>

                </div>



                <div className="p-5 rounded shadow bg-white">

                    <h3>Total Enrollment</h3>

                    <h1 className="text-3xl">
                        {data.total_enrollments}
                    </h1>

                </div>



                <div className="p-5 rounded shadow bg-white">

                    <h3>Revenue</h3>

                    <h1 className="text-3xl">
                        ₹{data.paid_enrollment_amount}
                    </h1>

                </div>


            </div>


        </div>

    )

}


export default AdminDashboard;