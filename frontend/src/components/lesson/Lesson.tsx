import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLessons } from "../../api/lessonApi";

const Lesson = () => {
    const { moduleId } = useParams<{ moduleId: string }>();
    const [lessons, setLessons] = useState<any[]>([]);

    const fetchLessons = async () => {
        try {
            if (!moduleId) return;

            const res = await getLessons(moduleId);

            console.log("LESSON DATA", res);

            setLessons(res);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchLessons();
    }, [moduleId]);

    return (
        <div>
            <h1>Lessons</h1>

            {lessons.map((lesson) => (
                <div key={lesson.id}>
                    {lesson.lesson_name}
                </div>
            ))}
        </div>
    );
};

export default Lesson;