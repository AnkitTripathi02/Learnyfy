import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";

const TermsAndConditions = () => {
    return (
        <>
            <Navbar />

            <section className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-white pt-28 pb-20">
                <div className="mx-auto max-w-5xl rounded-3xl bg-white p-10 shadow-2xl">

                    <div className="text-center">
                        <span className="rounded-full bg-indigo-100 px-5 py-2 text-sm font-semibold text-indigo-600">
                            Legal
                        </span>

                        <h1 className="mt-6 text-5xl font-extrabold text-gray-900">
                            Terms & Conditions
                        </h1>

                        <p className="mt-5 text-lg text-gray-500">
                            Please read these Terms & Conditions carefully before
                            using LearnyFy.
                        </p>
                    </div>

                    <div className="mt-12 space-y-10 text-gray-600 leading-8">

                        <div>
                            <h2 className="mb-3 text-2xl font-bold text-gray-900">
                                1. Acceptance of Terms
                            </h2>

                            <p>
                                By accessing or using LearnyFy, you agree to be
                                bound by these Terms & Conditions. If you do not
                                agree with any part of these terms, please do
                                not use our platform.
                            </p>
                        </div>

                        <div>
                            <h2 className="mb-3 text-2xl font-bold text-gray-900">
                                2. User Accounts
                            </h2>

                            <p>
                                You are responsible for maintaining the
                                confidentiality of your account credentials and
                                for all activities performed under your account.
                            </p>
                        </div>

                        <div>
                            <h2 className="mb-3 text-2xl font-bold text-gray-900">
                                3. Course Access
                            </h2>

                            <p>
                                Purchased courses provide personal access only.
                                Sharing, copying, reselling, or redistributing
                                course content without permission is strictly
                                prohibited.
                            </p>
                        </div>

                        <div>
                            <h2 className="mb-3 text-2xl font-bold text-gray-900">
                                4. Payments
                            </h2>

                            <p>
                                Paid courses must be purchased through approved
                                payment methods. Prices may change without prior
                                notice.
                            </p>
                        </div>

                        <div>
                            <h2 className="mb-3 text-2xl font-bold text-gray-900">
                                5. Intellectual Property
                            </h2>

                            <p>
                                All course videos, source code, documents,
                                graphics, logos, and learning materials belong
                                to LearnyFy and are protected by copyright laws.
                            </p>
                        </div>

                        <div>
                            <h2 className="mb-3 text-2xl font-bold text-gray-900">
                                6. Prohibited Activities
                            </h2>

                            <ul className="list-disc space-y-2 pl-6">
                                <li>Sharing account credentials.</li>
                                <li>Uploading malicious software.</li>
                                <li>Attempting to hack or disrupt the platform.</li>
                                <li>Copying or redistributing course materials.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="mb-3 text-2xl font-bold text-gray-900">
                                7. Limitation of Liability
                            </h2>

                            <p>
                                LearnyFy is not responsible for any direct or
                                indirect damages resulting from the use of our
                                services or educational content.
                            </p>
                        </div>

                        <div>
                            <h2 className="mb-3 text-2xl font-bold text-gray-900">
                                8. Changes to Terms
                            </h2>

                            <p>
                                We reserve the right to update these Terms &
                                Conditions at any time. Continued use of the
                                platform indicates acceptance of the revised
                                terms.
                            </p>
                        </div>

                        <div>
                            <h2 className="mb-3 text-2xl font-bold text-gray-900">
                                9. Contact Us
                            </h2>

                            <p>
                                If you have any questions regarding these Terms
                                & Conditions, please contact us at
                                <span className="font-semibold text-indigo-600">
                                    {" "}support@learnyfy.com
                                </span>.
                            </p>
                        </div>

                    </div>

                    <div className="mt-16 rounded-2xl bg-indigo-50 p-6 text-center">
                        <p className="font-semibold text-indigo-700">
                            Last Updated: August 2026
                        </p>
                    </div>

                </div>
            </section>

            <Footer />
        </>
    );
};

export default TermsAndConditions;