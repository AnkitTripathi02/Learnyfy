import { useEffect, useState } from "react";
// import { getMyCourses } from "../../api/enrollmentApi";
import { getMyCourses } from "../api/enrollmentApi";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";



const MyCourses = () => {

    const navigate = useNavigate();

    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { search } = useSearch();


    const filteredCourses = courses.filter(
        (course) =>
            course.title
                .toLowerCase()
                .includes(search.toLowerCase())
    );


    const loadCourses = async () => {

        try {

            const user = localStorage.getItem("user");

            if (!user) {
                return;
            }


            const userData = JSON.parse(user);


            const response = await getMyCourses(
                userData.id
            );


            setCourses(response.data);


        } catch (error) {

            console.error(
                "My courses error",
                error
            );

        }
        finally {
            setLoading(false);
        }

    };


    useEffect(() => {

        loadCourses();

    }, []);



    if (loading) {

        return (
            <div className="text-white">
                Loading...
            </div>
        )

    }



    return (

        <div className="h-[830px] p-8 text-white">


            <h1 className="text-3xl font-bold mb-6">
                My Courses
            </h1>



            {
                filteredCourses.length === 0 ?

                    (
                        <p className="text-gray-400">
                            No enrolled courses found
                        </p>
                    )

                    :

                    (

                        <div className="grid md:grid-cols-3 gap-6 overflow-y">


                            {
                                filteredCourses.map((course) => (

                                    <div
                                        key={course.id}
                                        className="rounded-xl bg-[#161122] border border-[#2c2545] p-5"
                                    >

                                        <img
                                            src={course.thumbnail}
                                            className="h-40 w-full object-cover rounded-lg"
                                        />


                                        <h2 className="mt-4 text-xl font-semibold">
                                            {course.title}
                                        </h2>


                                        <p className="mt-2 text-gray-400">
                                            {course.description}
                                        </p>


                                        <button
                                            onClick={() => navigate(`/learn/${course.course_id}`)}
                                            className="mt-4 bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700"
                                        >
                                            Continue Learning
                                        </button>


                                    </div>

                                ))
                            }


                        </div>

                    )

            }


        </div>

    );

};


export default MyCourses;