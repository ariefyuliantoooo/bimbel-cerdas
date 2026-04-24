import React, { useState, useEffect } from 'react';
import { getRentals } from '../lib/api';

const Rentals = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const data = await getRentals(true);
        setRentals(data);
      } catch (error) {
        console.error('Error fetching rentals:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRentals();
  }, []);

  if (loading) {
    return <div className="pt-32 pb-24 min-h-[60vh] text-center text-xl">Loading...</div>;
  }

  return (
    <div className="pt-32 pb-24 min-h-[60vh] bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 text-center mb-4">
          Sewa Baju Adat & Profesi
        </h1>
        <p className="text-xl text-slate-600 text-center mb-16 max-w-3xl mx-auto">
          Koleksi baju adat nusantara dan seragam profesi terlengkap untuk berbagai acara.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rentals.map((item) => (
            <div key={item.id} className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-slate-100 group hover:shadow-2xl transition-all duration-300">
              <div className="h-64 overflow-hidden relative bg-slate-100">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    No Image
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-primary-600 shadow-sm">
                  Rp {parseInt(item.price).toLocaleString('id-ID')}/hari
                </div>
              </div>
              <div className="p-8">
                <span className="text-sm font-semibold text-primary-500 tracking-wider uppercase mb-2 block">
                  {item.category}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.name}</h3>
                <p className="text-slate-600 mb-6 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>Ukuran: {item.size}</span>
                  <span>Stok: {item.stock}</span>
                </div>
              </div>
            </div>
          ))}
          {rentals.length === 0 && (
            <div className="col-span-full text-center text-slate-500 py-12">
              Belum ada koleksi baju yang tersedia saat ini.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rentals;
