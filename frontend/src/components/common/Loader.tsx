import { FaBookOpen } from "react-icons/fa";

interface LoaderProps {
  images?: string[];
}

const positions = [
  "left-16 top-20",
  "right-20 top-32",
  "left-24 bottom-24",
  "right-16 bottom-20",
];

const Loader = ({ images = [] }: LoaderProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#090817]">

      {/* Background Glow */}
      <div className="absolute h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[140px] animate-pulse"></div>

      {/* Floating Course Images */}
      {images.slice(0, 4).map((img, index) => (
        <img
          key={index}
          src={img}
          alt=""
          className={`
            absolute
            ${positions[index]}
            h-32
            w-44
            rounded-2xl
            object-cover
            border
            border-white/10
            shadow-2xl
            animate-float
          `}
          style={{
            animationDelay: `${index * 0.5}s`,
          }}
        />
      ))}

      {/* Main Loader */}
      <div className="relative flex flex-col items-center">

        {/* Outer Ring */}
        <div className="absolute h-56 w-56 rounded-full border border-indigo-500/20 animate-spin"></div>

        {/* Inner Ring */}
        <div className="absolute h-44 w-44 rounded-full border border-purple-500/30 animate-[spin_8s_linear_infinite_reverse]"></div>

        {/* Book Icon */}
        <div
          className="
            relative
            z-10
            flex
            h-28
            w-28
            items-center
            justify-center
            rounded-full
            bg-gradient-to-br
            from-indigo-500
            via-purple-500
            to-pink-500
            shadow-[0_0_60px_rgba(99,102,241,0.45)]
            animate-pulse
          "
        >
          <FaBookOpen size={48} className="text-white" />
        </div>

        <h1 className="mt-12 text-4xl font-bold tracking-wide text-white">
          LearnyFy
        </h1>

        <p className="mt-3 text-lg text-gray-300">
          Loading your learning journey...
        </p>

        {/* Progress Bar */}
        <div className="mt-8 h-2 w-72 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/3 animate-loading rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        </div>

      </div>
    </div>
  );
};

export default Loader;