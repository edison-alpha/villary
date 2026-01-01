
import React from 'react';

const Stats: React.FC = () => {
  const stats = [
    { value: "50+", label: "Vibrant Countries Served" },
    { value: "2M", label: "Happy Customers Globally" },
    { value: "85%", label: "Repeat Booking Rate" },
  ];

  return (
    <section className="bg-[#0d5c63] py-20 text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center py-8 md:py-0 border-white/10 last:border-0 md:border-r border-b md:border-b-0">
              <span className="text-7xl font-serif font-bold mb-2 tracking-tighter">
                {stat.value}
              </span>
              <p className="text-white/50 font-medium uppercase tracking-[0.3em] text-[10px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
