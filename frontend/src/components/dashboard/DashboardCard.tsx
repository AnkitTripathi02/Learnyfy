import React from "react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const DashboardCard = ({
  title,
  value,
  icon,
}: DashboardCardProps) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#141222] p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-purple-500">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-gray-400 text-sm">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            {value}
          </h2>

        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-2xl text-white">

          {icon}

        </div>

      </div>

    </div>
  );
};

export default DashboardCard;