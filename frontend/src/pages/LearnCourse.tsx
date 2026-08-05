import { useParams } from "react-router-dom";

const LearnCourse = () => {

    const { id } = useParams();

    return (
        <div className="min-h-screen bg-[#0b0914] text-white p-10">
            <h1 className="text-3xl font-bold">
                Learning Page
            </h1>

            <p className="mt-5">
                Course Id : {id}
            </p>
        </div>
    );
};

export default LearnCourse;