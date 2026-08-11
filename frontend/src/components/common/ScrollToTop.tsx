import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
    const [scroll, setScroll] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;

            const progress =
                (window.scrollY / totalHeight) * 100;

            setScroll(progress);
        };

        window.addEventListener("scroll", handleScroll);

        handleScroll();

        return () =>
            window.removeEventListener("scroll", handleScroll);
    }, []);

    const size = 55;
    const stroke = 4;
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;

    const offset =
        circumference -
        (scroll / 100) * circumference;

    return (
        <button
            onClick={() =>
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                })
            }
           className="fixed bottom-6 right-6 z-[999] transition-transform duration-300 hover:scale-110"
        >
           <div className="relative h-[55px] w-[55px]">

                <svg
                    width={size}
                    height={size}
                    className="-rotate-90"
                >
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="rgba(255,255,255,.25)"
                        strokeWidth={stroke}
                        fill="none"
                    />

                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="#4F46E5"
                        strokeWidth={stroke}
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        style={{
                            transition: "stroke-dashoffset .2s",
                        }}
                    />
                </svg>

              <div className="absolute inset-[7px] flex flex-col items-center justify-center rounded-full bg-white shadow-lg">

                   <FaArrowUp className="-mb-[2px] text-xs text-indigo-700" />

                  <span className="mt-[1px] text-[10px] font-bold leading-none text-indigo-700">
                        {Math.round(scroll)}%
                    </span>

                </div>

            </div>
        </button>
    );
};

export default ScrollToTop;