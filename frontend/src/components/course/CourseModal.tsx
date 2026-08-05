import { ReactNode } from "react";
import { FaTimes } from "react-icons/fa";

interface Props {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
}

const CourseModal = ({
    open,
    onClose,
    children,
}: Props) => {

    if (!open) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-6">

            {/* Close when clicking outside */}
            <div
                className="absolute inset-0"
                onClick={onClose}
            />

            <div className="relative flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-[#2A2540] bg-[#171325] shadow-2xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b border-[#2A2540] px-8 py-4">

                    <div>

                        <h2 className="text-2xl font-bold text-white">
                            Create New Course
                        </h2>

                        <p className="mt-1 text-sm text-gray-400">
                            Fill all required information below.
                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#211B38] text-gray-400 transition hover:bg-red-500 hover:text-white"
                    >
                        <FaTimes />
                    </button>

                </div>

                {/* Body */}

                <div className="flex-1 overflow-y-auto py-2 px-5">

                    {children}

                </div>

            </div>

        </div>

    );

};

export default CourseModal;