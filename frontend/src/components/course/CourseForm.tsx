import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    createCourse,
    updateCourse,
} from "../../api/courseApi";
import Swal from "sweetalert2";

import {
    courseSchema,
    CourseFormData,
} from "../../validations/courseSchema";

interface CourseFormProps {

    initialData?: any;

    onSuccess?: () => void;

}

const CourseForm = ({
    initialData,
    onSuccess,
}: CourseFormProps) => {

    const form = useForm<CourseFormData>({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            title: "",
            slug: "",
            short_description: "",
            description: "",
            category: "",
            level: "",
            language: "English",
            duration: "",
            instructor: "",
            price: 0,
            thumbnail: "",
            is_published: false,
        },
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = form;

    useEffect(() => {

        if (initialData) {

            reset({

                title: initialData.title,
                slug: initialData.slug,
                short_description: initialData.short_description,
                description: initialData.description,
                category: initialData.category,
                level: initialData.level,
                language: initialData.language,
                duration: initialData.duration,
                instructor: initialData.instructor,
                price: Number(initialData.price),
                thumbnail: initialData.thumbnail,
                is_published: initialData.is_published,

            });

        }

    }, [initialData, reset]);

    // const onSubmit = async (data: CourseFormData) => {

    //     try {

    //         if (initialData) {

    //             await updateCourse(
    //                 initialData.id,
    //                 data
    //             );

    //             alert("Course Updated Successfully");

    //         } else {

    //             await createCourse(data);

    //             alert("Course Created Successfully");

    //         }

    //         onSuccess?.();

    //     } catch (error) {

    //         console.error(error);

    //         alert("Something went wrong");

    //     }

    // };

    const onSubmit = async (data: CourseFormData) => {
        try {
            // Loading Popup
            Swal.fire({
                title: initialData ? "Updating Course..." : "Creating Course...",
                text: "Please wait...",
                background: "#161122",
                color: "#ffffff",
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            if (initialData) {
                await updateCourse(initialData.id, data);

                Swal.close();

                await Swal.fire({
                    icon: "success",
                    title: "Course Updated 🎉",
                    text: "Course updated successfully.",
                    background: "#161122",
                    color: "#ffffff",
                    confirmButtonColor: "#7c3aed",
                    customClass: {
                        popup: "rounded-3xl",
                        confirmButton: "rounded-xl px-6 py-3",
                    },
                });
            } else {
                await createCourse(data);

                Swal.close();

                await Swal.fire({
                    icon: "success",
                    title: "Course Created 🎉",
                    text: "New course created successfully.",
                    background: "#161122",
                    color: "#ffffff",
                    confirmButtonColor: "#7c3aed",
                    customClass: {
                        popup: "rounded-3xl",
                        confirmButton: "rounded-xl px-6 py-3",
                    },
                });
            }

            onSuccess?.();
        } catch (error: any) {
            Swal.close();

            Swal.fire({
                icon: "error",
                title: "Operation Failed",
                text:
                    error?.response?.data?.detail ||
                    error?.response?.data?.message ||
                    "Something went wrong.",
                background: "#161122",
                color: "#ffffff",
                confirmButtonColor: "#ef4444",
                customClass: {
                    popup: "rounded-3xl",
                    confirmButton: "rounded-xl px-6 py-3",
                },
            });

            console.error(error);
        }
    };

    return (

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-2.5"
        >

            {/* Row 1 */}

            <div className="grid grid-cols-2 gap-2">

                <div>

                    <label className="mb-1.5 block text-sm font-medium text-gray-300">
                        Course Title
                    </label>

                    <input
                        type="text"
                        placeholder="React Masterclass"
                        {...register("title")}
                        className="w-full rounded-xl border border-[#2A2540] bg-[#211B38] p-2 text-white outline-none focus:border-purple-500"
                    />

                    {errors.title && (

                        <p className="mt-1 text-sm text-red-400">
                            {errors.title.message}
                        </p>

                    )}

                </div>

                <div>

                    <label className="mb-2 block text-sm font-medium text-gray-300">
                        Slug
                    </label>

                    <input
                        type="text"
                        placeholder="react-masterclass"
                        {...register("slug")}
                        className="w-full rounded-xl border border-[#2A2540] bg-[#211B38] p-2 text-white outline-none focus:border-purple-500"
                    />

                    {errors.slug && (

                        <p className="mt-1 text-sm text-red-400">
                            {errors.slug.message}
                        </p>

                    )}

                </div>

            </div>

            {/* Row 2 */}

            <div className="grid grid-cols-2 gap-5">

                <div>

                    <label className="mb-2 block text-sm font-medium text-gray-300">
                        Category
                    </label>

                    <input
                        type="text"
                        placeholder="Web Development"
                        {...register("category")}
                        className="w-full rounded-xl border border-[#2A2540] bg-[#211B38] p-2 text-white outline-none focus:border-purple-500"
                    />

                    {errors.category && (

                        <p className="mt-1 text-sm text-red-400">
                            {errors.category.message}
                        </p>

                    )}

                </div>

                <div>

                    <label className="mb-2 block text-sm font-medium text-gray-300">
                        Level
                    </label>

                    <input
                        type="text"
                        placeholder="Beginner"
                        {...register("level")}
                        className="w-full rounded-xl border border-[#2A2540] bg-[#211B38] p-2 text-white outline-none focus:border-purple-500"
                    />

                    {errors.level && (

                        <p className="mt-1 text-sm text-red-400">
                            {errors.level.message}
                        </p>

                    )}

                </div>

            </div>

            {/* Row 3 */}

            <div className="grid grid-cols-2 gap-5">

                <div>

                    <label className="mb-2 block text-sm font-medium text-gray-300">
                        Instructor
                    </label>

                    <input
                        type="text"
                        placeholder="John Doe"
                        {...register("instructor")}
                        className="w-full rounded-xl border border-[#2A2540] bg-[#211B38] p-2 text-white outline-none focus:border-purple-500"
                    />

                    {errors.instructor && (

                        <p className="mt-1 text-sm text-red-400">
                            {errors.instructor.message}
                        </p>

                    )}

                </div>

                <div>

                    <label className="mb-2 block text-sm font-medium text-gray-300">
                        Language
                    </label>

                    <input
                        type="text"
                        {...register("language")}
                        className="w-full rounded-xl border border-[#2A2540] bg-[#211B38] p-2 text-white outline-none focus:border-purple-500"
                    />

                    {errors.language && (

                        <p className="mt-1 text-sm text-red-400">
                            {errors.language.message}
                        </p>

                    )}

                </div>

            </div>

            {/* Row 4 */}

            <div className="grid grid-cols-2 gap-5">

                <div>

                    <label className="mb-2 block text-sm font-medium text-gray-300">
                        Duration
                    </label>

                    <input
                        type="text"
                        placeholder="20 Hours"
                        {...register("duration")}
                        className="w-full rounded-xl border border-[#2A2540] bg-[#211B38] p-2 text-white outline-none focus:border-purple-500"
                    />

                    {errors.duration && (

                        <p className="mt-1 text-sm text-red-400">
                            {errors.duration.message}
                        </p>

                    )}

                </div>

                <div>

                    <label className="mb-2 block text-sm font-medium text-gray-300">
                        Price
                    </label>

                    <input
                        type="number"
                        {...register("price", {
                            valueAsNumber: true,
                        })}
                        className="w-full rounded-xl border border-[#2A2540] bg-[#211B38] p-2 text-white outline-none focus:border-purple-500"
                    />

                    {errors.price && (

                        <p className="mt-1 text-sm text-red-400">
                            {errors.price.message}
                        </p>

                    )}

                </div>

            </div>

            {/* Thumbnail */}

            <div>

                <label className="mb-2 block text-sm font-medium text-gray-300">
                    Thumbnail URL
                </label>

                <input
                    type="text"
                    placeholder="https://example.com/image.png"
                    {...register("thumbnail")}
                    className="w-full rounded-xl border border-[#2A2540] bg-[#211B38] p-2 text-white outline-none focus:border-purple-500"
                />

            </div>

            {/* Short Description */}

            <div>

                <label className="mb-2 block text-sm font-medium text-gray-300">
                    Short Description
                </label>

                <textarea
                    rows={1}
                    placeholder="Write a short description..."
                    {...register("short_description")}
                    className="w-full rounded-xl border border-[#2A2540] bg-[#211B38] p-3 text-white outline-none focus:border-purple-500 resize-none"
                />

                {errors.short_description && (

                    <p className="mt-1 text-sm text-red-400">
                        {errors.short_description.message}
                    </p>

                )}

            </div>

            {/* Description */}

            <div>

                <label className="mb-2 block text-sm font-medium text-gray-300">
                    Description
                </label>

                <textarea
                    rows={2}
                    placeholder="Write full course description..."
                    {...register("description")}
                    className="w-full rounded-xl border border-[#2A2540] bg-[#211B38] p-3 text-white outline-none focus:border-purple-500 resize-none"
                />

                {errors.description && (

                    <p className="mt-1 text-sm text-red-400">
                        {errors.description.message}
                    </p>

                )}

            </div>

            {/* Publish */}

            <div className="flex items-center gap-3 rounded-xl border border-[#2A2540] bg-[#211B38] p-4">

                <input
                    type="checkbox"
                    {...register("is_published")}
                    className="h-5 w-5"
                />

                <label className="text-gray-300">
                    Publish this course
                </label>

            </div>

            {/* Buttons */}

            <div className="flex justify-end gap-4 pt-4">

                <button
                    type="button"
                    onClick={async () => {
                        const result = await Swal.fire({
                            title: "Discard Changes?",
                            text: "Unsaved changes will be lost.",
                            icon: "warning",
                            background: "#161122",
                            color: "#ffffff",
                            showCancelButton: true,
                            confirmButtonText: "Yes, Close",
                            cancelButtonText: "Continue Editing",
                            confirmButtonColor: "#ef4444",
                            cancelButtonColor: "#7c3aed",
                            customClass: {
                                popup: "rounded-3xl",
                                confirmButton: "rounded-xl px-6 py-3",
                                cancelButton: "rounded-xl px-6 py-3",
                            },
                        });

                        if (result.isConfirmed) {
                            onSuccess?.();
                        }
                    }}
                    className="rounded-xl border border-[#2A2540] px-6 py-3 text-gray-300 transition hover:bg-[#211B38]"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-3 font-semibold text-white transition hover:scale-105"
                >
                    {initialData ? "Update Course" : "Save Course"}
                </button>

            </div>

        </form>

    );

};

export default CourseForm;