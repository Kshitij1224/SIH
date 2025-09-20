import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import images
import unaidsImage from '../../../assets/hlm-aids.png';
import whoImage from '../../../assets/UHC.webp';
import unicefImage from '../../../assets/FFg_ypNUUAQbigY.jpg';
import redCrossImage from '../../../assets/maxresdefault.jpg'
import gatesImage from '../../../assets/Search_Ideas_Madhi_KeepGoing_IG635379.jpg';
import msfImage from '../../../assets/Venezuela-Red-Cross-Health.jpg';

const Initiatives = () => {
  const initiatives = [
    {
      name: 'UNAIDS',
      image: unaidsImage,
      title: 'Ending AIDS as a public health threat',
      description: 'Global leadership and advocacy to end AIDS and ensure health for all',
      sourceUrl: 'https://www.who.int/news/item/11-06-2021-new-hiv-aids-political-declaration-seeks-to-end-inequalities-and-get-on-track-to-end-aids-by-2030',
    },
    {
      name: 'WHO',
      image: whoImage,
      title: 'Universal Health Coverage',
      description: 'Health for all by 2030',
      sourceUrl: 'https://www.who.int/health-topics/universal-health-coverage',
    },
    {
      name: 'UNICEF',
      image: unicefImage,
      title: 'Child Health Program',
      description: 'Protecting children\'s health globally',
      sourceUrl: 'https://www.unicef.org/india/what-we-do/newborn-and-child-health',
    },
    {
      name: 'Red Cross',
      image: redCrossImage,
      title: 'Emergency Response',
      description: 'Humanitarian health assistance',
      sourceUrl: 'https://www.icrc.org/en/what-we-do/health',
    },
    {
      name: 'Gates Foundation',
      image: gatesImage,
      title: 'Global Health Innovations',
      description: 'Advancing healthcare solutions for the world\'s most vulnerable',
      sourceUrl: 'https://www.gatesfoundation.org/',
    },
    {
      name: 'Doctors Without Borders',
      image: msfImage,
      title: 'Medical Humanitarian Aid',
      description: 'Providing emergency medical care in crisis situations',
      sourceUrl: 'https://www.doctorswithoutborders.org/',
    },
  ];

  const [current, setCurrent] = useState(0);

  const goPrev = () => setCurrent((c) => (c - 1 + initiatives.length) % initiatives.length);
  const goNext = () => setCurrent((c) => (c + 1) % initiatives.length);

  useEffect(() => {
    const id = setInterval(goNext, 5000);
    return () => clearInterval(id);
  }, [initiatives.length]);

  return (
    <section className="mb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Health Initiatives</h2>
          <p className="mt-3 text-lg text-gray-500">Explore impactful programs from global health organizations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initiatives.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    const fallbacks: Record<string, string> = {
                      UNAIDS: 'https://www.unaids.org/sites/default/files/2024-07/GLOBAL_AIDS_UPDATE_2024_en.jpg',
                      WHO: 'https://images.pexels.com/photos/7469239/pexels-photo-7469239.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=1',
                      UNICEF: 'https://www.unicef.org/sites/default/files/styles/media_large_image/public/UNI408835.jpg.webp?itok=gqrnI2qJ',
                      'Red Cross': 'https://images.pexels.com/photos/8460092/pexels-photo-8460092.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=1',
                    };
                    const name = (e.currentTarget.alt || '').trim();
                    (e.currentTarget as HTMLImageElement).src = fallbacks[name] || 'https://images.pexels.com/photos/6129052/pexels-photo-6129052.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=1';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {item.name}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-blue-600 rounded-lg text-blue-600 font-medium hover:bg-blue-100 hover:border-blue-700 hover:text-blue-800 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Learn more
                  <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Initiatives;