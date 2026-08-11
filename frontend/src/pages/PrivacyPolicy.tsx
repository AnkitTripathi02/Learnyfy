import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";

const PrivacyPolicy = () => {
    return (
        <>
            <Navbar />

            <section className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white pt-28 pb-20">
                <div className="mx-auto max-w-5xl px-6">

                    {/* Header */}
                    <div className="mb-14 text-center">
                        <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-600">
                            LearnyFy Legal
                        </span>

                        <h1 className="mt-6 text-5xl font-extrabold text-gray-900">
                            Privacy Policy
                        </h1>

                        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
                            Your privacy is important to us. This Privacy Policy explains
                            how LearnyFy collects, uses, stores, and protects your
                            personal information while using our learning platform.
                        </p>

                        <p className="mt-4 text-sm text-gray-500">
                            Last Updated: August 2026
                        </p>
                    </div>

                    {/* Card */}
                    <div className="rounded-3xl border border-gray-200 bg-white p-10 shadow-xl">

                        {/* 1 */}
                        <div className="mb-10">
                            <h2 className="mb-3 text-2xl font-bold text-gray-900">
                                1. Information We Collect
                            </h2>

                            <p className="leading-8 text-gray-600">
                                We may collect personal information including your
                                name, email address, phone number, course
                                enrollments, payment details, and learning
                                progress.
                            </p>
                        </div>

                        {/* 2 */}
                        <div className="mb-10">
                            <h2 className="mb-3 text-2xl font-bold text-gray-900">
                                2. How We Use Your Information
                            </h2>

                            <ul className="list-disc space-y-3 pl-6 leading-8 text-gray-600">
                                <li>Create and manage your account.</li>
                                <li>Provide access to purchased courses.</li>
                                <li>Improve our learning platform.</li>
                                <li>Send important notifications.</li>
                                <li>Provide customer support.</li>
                            </ul>
                        </div>

                        {/* 3 */}
                        <div className="mb-10">
                            <h2 className="mb-3 text-2xl font-bold text-gray-900">
                                3. Data Security
                            </h2>

                            <p className="leading-8 text-gray-600">
                                We use industry-standard security measures to
                                protect your information against unauthorized
                                access, disclosure, or misuse.
                            </p>
                        </div>

                        {/* 4 */}
                        <div className="mb-10">
                            <h2 className="mb-3 text-2xl font-bold text-gray-900">
                                4. Cookies
                            </h2>

                            <p className="leading-8 text-gray-600">
                                LearnyFy may use cookies to enhance your
                                browsing experience, remember preferences, and
                                analyze website traffic.
                            </p>
                        </div>

                        {/* 5 */}
                        <div className="mb-10">
                            <h2 className="mb-3 text-2xl font-bold text-gray-900">
                                5. Third-Party Services
                            </h2>

                            <p className="leading-8 text-gray-600">
                                We may use trusted third-party services for
                                payments, analytics, authentication, and cloud
                                storage. These providers follow their own
                                privacy policies.
                            </p>
                        </div>

                        {/* 6 */}
                        <div className="mb-10">
                            <h2 className="mb-3 text-2xl font-bold text-gray-900">
                                6. Your Rights
                            </h2>

                            <ul className="list-disc space-y-3 pl-6 leading-8 text-gray-600">
                                <li>Access your personal information.</li>
                                <li>Request corrections.</li>
                                <li>Delete your account.</li>
                                <li>Withdraw consent where applicable.</li>
                            </ul>
                        </div>

                        {/* 7 */}
                        <div className="mb-10">
                            <h2 className="mb-3 text-2xl font-bold text-gray-900">
                                7. Changes to This Policy
                            </h2>

                            <p className="leading-8 text-gray-600">
                                We may update this Privacy Policy periodically.
                                Changes will be reflected on this page with an
                                updated revision date.
                            </p>
                        </div>

                        {/* Contact */}
                        <div className="rounded-2xl bg-indigo-50 p-8">
                            <h2 className="mb-3 text-2xl font-bold text-indigo-700">
                                Contact Us
                            </h2>

                            <p className="leading-8 text-gray-700">
                                If you have any questions regarding this Privacy
                                Policy, please contact us.
                            </p>

                            <div className="mt-5 space-y-2 text-gray-700">
                                <p>
                                    <strong>Email:</strong> support@learnyfy.com
                                </p>

                                <p>
                                    <strong>Phone:</strong> +91 98765 43210
                                </p>

                                <p>
                                    <strong>Address:</strong> Mumbai, Maharashtra, India
                                </p>
                            </div>
                        </div>

                    </div>

                </div>
            </section>

            <Footer />
        </>
    );
};

export default PrivacyPolicy;