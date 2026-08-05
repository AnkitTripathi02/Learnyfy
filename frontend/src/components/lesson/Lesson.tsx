import React, { useEffect, useState } from "react";
import { getLessons } from "../../api/lessonApi";


const Lesson = () => {

    const [lessons,setLessons] = useState<any[]>([]);


    const fetchLessons = async()=>{

        try{

            const res = await getLessons();

            console.log("LESSON DATA",res.data);

            setLessons(res.data);

        }catch(error){

            console.log(error);

        }

    }


    useEffect(()=>{
        fetchLessons();
    },[]);



    return(
        <div>

            <h1>
                Lessons
            </h1>


            {
                lessons.map((lesson)=>(
                    <div key={lesson.id}>
                        {lesson.lesson_name}
                    </div>
                ))
            }


        </div>
    )

}


export default Lesson;