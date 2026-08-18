import { useState, ChangeEvent, FormEvent } from "react";
import Swal from "sweetalert2";
import {
    FaEnvelope,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaFacebookF,
    FaTwitter,
    FaInstagram,
} from "react-icons/fa";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { name, email, message } = formData;

        if (!name.trim() || !email.trim() || !message.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Missing Information",
                text: "Please complete all fields before sending.",
                confirmButtonColor: "#6366f1",
            });
            return;
        }

        Swal.fire({
            icon: "success",
            title: "Message Sent!",
            text: "We will get back to you promptly.",
            timer: 3000,
            timerProgressBar: true,
            confirmButtonColor: "#6366f1",
        });

        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <section className="relative flex min-h-screen items-center justify-center p-4 sm:p-8 font-sans overflow-hidden">

            {/* Decorative Blob Shapes behind the main card */}
            <div className="absolute top-12 left-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
            <div className="absolute bottom-12 right-12 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>

            {/* Main Organic Outer Card */}
            <div className="relative w-full max-w-5xl bg-white border border-gray-200 shadow-2xl p-8 sm:p-12 md:p-16 lg:py-20 z-10
        /* Asymmetric custom corners replicating your reference image */
        rounded-[40px] rounded-tl-[100px] rounded-br-[100px] rounded-bl-[40px]">

                <div className="grid gap-12 lg:grid-cols-12 items-center">

                    
                    <div className="lg:col-span-6">
                        <h2 className="text-3xl font-extrabold text-[#2d3142] tracking-tight mb-3">
                            Let's talk
                        </h2>
                        <p className="text-sm text-slate-400 leading-relaxed mb-8 max-w-md">
                            To request a quote or want to meet up for coffee, contact us directly or fill out the form and we will get back to you promptly.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                           
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full rounded-2xl bg-[#f0f2f9] border-none p-4 text-sm text-[#2d3142] outline-none transition-all focus:bg-slate-100 focus:ring-2 focus:ring-indigo-400"
                                />
                            </div>

                            
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                    Your Email
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full rounded-2xl bg-[#f0f2f9] border-none p-4 text-sm text-[#2d3142] outline-none transition-all focus:bg-slate-100 focus:ring-2 focus:ring-indigo-400"
                                />
                            </div>

                            
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                    Your Message
                                </label>
                                <textarea
                                    rows={4}
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Type something if you want..."
                                    className="w-full rounded-2xl bg-[#f0f2f9] border-none p-4 text-sm text-[#2d3142] placeholder-slate-300 outline-none transition-all focus:bg-slate-100 focus:ring-2 focus:ring-indigo-400 resize-none"
                                />
                            </div>

                            
                            <button
                                type="submit"
                                className="rounded-full bg-[#6467f2] px-8 py-3.5 text-xs font-bold text-white tracking-wider shadow-lg shadow-indigo-600/30 transition-all hover:bg-indigo-700 hover:shadow-indigo-700/40 active:scale-95"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    
                    <div className="lg:col-span-6 flex flex-col items-center justify-center text-center lg:text-left lg:items-start lg:pl-8">

                        <div className="relative w-64 h-64 mb-10 flex items-center justify-center select-none pointer-events-none">
                            <div className="absolute inset-0 bg-indigo-50 rounded-full scale-90 blur-xl opacity-70"></div>
                            
                            <div className="relative border-4 border-dashed border-indigo-100 rounded-full p-8 animate-[spin_40s_linear_infinite]">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-indigo-100 to-purple-50 flex items-center justify-center">
                                    <FaEnvelope className="text-4xl text-[#6467f2] opacity-80" />
                                </div>
                            </div>
                            
                            <div className="absolute top-4 right-8 w-3 h-3 rounded-full bg-purple-400"></div>
                            <div className="absolute bottom-6 left-10 w-4 h-4 rounded-full bg-cyan-400 opacity-60"></div>
                            <div className="absolute top-1/2 left-2 w-2 h-2 rounded-full bg-amber-400"></div>
                        </div>

                        
                        <div className="space-y-4 mb-8 text-slate-500 text-sm">
                            <div className="flex items-start justify-center lg:justify-start gap-3">
                                <FaMapMarkerAlt className="text-indigo-400 mt-1 shrink-0" />
                                <span>151 New Park Ave, Hartford, CT 06106<br /><span className="text-xs text-slate-400">United States</span></span>
                            </div>
                            <div className="flex items-center justify-center lg:justify-start gap-3">
                                <FaPhoneAlt className="text-indigo-400 shrink-0" />
                                <span>+1 (203) 302-9545</span>
                            </div>
                            <div className="flex items-center justify-center lg:justify-start gap-3">
                                <FaEnvelope className="text-indigo-400 shrink-0" />
                                <a href="mailto:contactus@invelitasoft.com" className="hover:underline text-indigo-500">contactus@invelitasoft.com</a>
                            </div>
                        </div>

                        
                        <div className="flex items-center gap-3">
                            <a href="#" className="w-9 h-9 rounded-full bg-[#3b5998] text-white flex items-center justify-center text-sm transition hover:scale-110">
                                <FaFacebookF />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-full bg-[#1da1f2] text-white flex items-center justify-center text-sm transition hover:scale-110">
                                <FaTwitter />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 text-white flex items-center justify-center text-sm transition hover:scale-110">
                                <FaInstagram />
                            </a>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default ContactForm;
