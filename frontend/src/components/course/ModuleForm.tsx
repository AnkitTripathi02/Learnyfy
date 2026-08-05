import { useState,useEffect } from "react";


interface Props {
    initialData?: any;
    onSuccess: (module: any) => void;
}


const ModuleForm = ({
     initialData,
    onSuccess
}: Props) => {


    const [formData, setFormData] = useState({

        title: "",
        description: ""

    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title,
                description: initialData.description
            });
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();


        const module = {

            id: Date.now(),

            title: formData.title,

            description: formData.description

        };


        onSuccess(module);


        setFormData({
            title: "",
            description: ""
        });

    };



    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >


            <div>

                <label className="text-sm text-gray-400">
                    Module Title
                </label>


                <input

                    value={formData.title}

                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            title: e.target.value
                        })
                    }

                    className="mt-2 w-full rounded-lg bg-[#0b0914] p-3 text-white outline-none"

                    placeholder="React Basics"

                    required

                />

            </div>



            <div>

                <label className="text-sm text-gray-400">
                    Description
                </label>


                <textarea

                    value={formData.description}

                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            description: e.target.value
                        })
                    }

                    className="mt-2 w-full rounded-lg bg-[#0b0914] p-3 text-white outline-none"

                    placeholder="Learn fundamentals"

                    rows={4}

                />

            </div>



            <button

                type="submit"

                className="w-full rounded-lg bg-purple-600 py-3 font-semibold text-white hover:bg-purple-700"

            >

                Save Module

            </button>


        </form>

    );

};


export default ModuleForm;