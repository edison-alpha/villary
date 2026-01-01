
import React from 'react';

const Stats: React.FC = () => {
  const stats = [
    { value: "150+", label: "Tahun Usia Joglo" },
    { value: "5000+", label: "Tamu Puas" },
    { value: "4.9", label: "Rating Google" },
  ];

  return (
    <section className="bg-[#4A3426] py-12 md:py-20 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center py-6 md:py-0 border-white/10 last:border-0 md:border-r border-b md:border-b-0">
              <span className="text-5xl md:text-7xl font-serif font-bold mb-1 md:mb-2 tracking-tighter">
                {stat.value}
              </span>
              <p className="text-white/50 font-medium uppercase tracking-[0.2em] md:tracking-[0.3em] text-[9px] md:text-[10px] text-center">
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
