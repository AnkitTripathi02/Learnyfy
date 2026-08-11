import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-6 text-center">
      <h1 className="text-7xl font-bold text-indigo-600">404</h1>

      <h2 className="mt-4 text-3xl font-semibold">
        Page Not Found
      </h2>

      <p className="mt-3 text-gray-600">
        The page you are looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="mt-8 rounded-lg bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-700"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;