import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaDownload } from "react-icons/fa";
import { getCertificate } from "../api/certificateApi";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Certificate = () => {
    const { id } = useParams();
    const certificateRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    const [certificate, setCertificate] = useState<any>(null);
    const [loading, setLoading] = useState(true);

useEffect(() => {
    if (id) {
        loadCertificate();
    }
}, [id]);

    const downloadPDF = async () => {
        if (!certificateRef.current) return;

        const canvas = await html2canvas(certificateRef.current, {
            scale: 4,
            useCORS: true,
        });

        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("landscape", "mm", "a4");

        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();

        pdf.addImage(imgData, "PNG", 0, 0, width, height);

        pdf.save(`${certificate.course_name}-Certificate.pdf`);
    };

    const loadCertificate = async () => {
        try {
            const data = await getCertificate(
                id!,
                user.id
            );

            setCertificate(data);
        } catch (err) {
            console.log(err);
            console.log("URL ID:", id);
console.log("USER:", user);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-yellow-500 border-t-transparent"></div>

                    <p className="mt-5 text-lg font-semibold">
                        Preparing your certificate...
                    </p>
                </div>
            </div>
        );
    }

    if (!certificate) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Certificate not found.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4">

            <div
                ref={certificateRef}
                className="mx-auto max-w-5xl rounded-3xl border-[16px] border-yellow-500 bg-white p-12 shadow-[0_0_60px_rgba(234,179,8,0.4)]"
                style={{
                    backgroundImage:
                        "linear-gradient(135deg,#ffffff,#fffdf2)",
                }}
            >
                <div className="text-center">

                    <h3 className="text-lg font-bold tracking-[6px] text-yellow-600">
                        LEARNYFY
                    </h3>

                    <h1 className="mt-8 text-5xl font-black text-gray-800">
                        Certificate of Completion
                    </h1>

                    <p className="mt-6 text-gray-500">
                        This Certificate is proudly presented to
                    </p>

                    <h2 className="mt-6 text-5xl font-bold text-indigo-600">
                        {certificate.student_name}
                    </h2>

                    <p className="mt-8 text-lg text-gray-500">
                        For successfully completing
                    </p>

                    <h3 className="mt-4 text-4xl font-black">
                        {certificate.course_name}
                    </h3>

                    <div className="mt-10 flex justify-center">
                        <div className="flex h-28 w-28 items-center justify-center rounded-full border-[6px] border-yellow-500 bg-yellow-100 shadow-lg">
                            <div className="text-center">
                                <div className="text-3xl">🏆</div>
                                <div className="text-xs font-bold">
                                    VERIFIED
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-20 grid grid-cols-3 gap-10">

                    <div className="text-center">
                        <div className="border-t-2 border-black pt-2">
                            Instructor
                        </div>

                        <div className="mt-2 font-bold">
                            {certificate.instructor_name}
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="border-t-2 border-black pt-2">
                            Completion Date
                        </div>

                        <div className="mt-2 font-bold">
                            {certificate.completion_date}
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="border-t-2 border-black pt-2">
                            Certificate ID
                        </div>

                        <div className="mt-2 font-bold">
                            {certificate.certificate_id}
                        </div>
                    </div>

                </div>
                <div className="mt-16 flex justify-between">

                    <div className="text-center">

                        <div className="font-serif text-3xl italic">
                            Ankit Sharma
                        </div>

                        <div className="border-t pt-2">
                            Founder & CEO
                        </div>

                    </div>

                    <div className="text-center">

                        <div className="font-serif text-3xl italic">
                            LearnyFy
                        </div>

                        <div className="border-t pt-2">
                            Official Seal
                        </div>

                    </div>
</div> 
                </div>
                <div className="mx-auto mt-8 flex max-w-5xl justify-center gap-5">

                    <button
                        onClick={() => navigate("/my-courses")}
                        className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
                    >
                        <FaArrowLeft />
                        Back
                    </button>

                    <button
                        onClick={downloadPDF}
                        className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
                    >
                        <FaDownload />
                        Download PDF
                    </button>

                </div>

            </div>

        
    );
};

export default Certificate;