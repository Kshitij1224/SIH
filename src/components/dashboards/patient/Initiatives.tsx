import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Initiatives = () => {
  const initiatives = [
    {
      name: 'UNESCO',
      // Place the user's provided image at public/initiatives/unesco.jpg
      image: '/initiatives/unesco.jpg',
      title: 'Global Health Education Initiative',
      description: 'Promoting health literacy worldwide',
      sourceUrl: 'https://www.unesco.org/en/health-education',
    },
    {
      name: 'WHO',
      image: '/initiatives/who.jpg',
      title: 'Universal Health Coverage',
      description: 'Health for all by 2030',
      sourceUrl: 'https://www.who.int/health-topics/universal-health-coverage',
    },
    {
      name: 'UNICEF',
      image: '/initiatives/unicef.jpg',
      title: 'Child Health Program',
      description: 'Protecting children\'s health globally',
      sourceUrl: 'https://www.unicef.org/health',
    },
    {
      name: 'Red Cross',
      image: '/initiatives/redcross.jpg',
      title: 'Emergency Response',
      description: 'Humanitarian health assistance',
      sourceUrl: 'https://www.icrc.org/en/what-we-do/health',
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
    <section className="mb-8">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-gray-900">Health Initiatives</h2>
        <p className="text-gray-600">Explore impactful programs from UNESCO, WHO, UNICEF and more</p>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Slides track */}
        <div className="overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-700"
            style={{ transform: `translateX(-${current * 100}%)`, width: `${initiatives.length * 100}%` }}
          >
            {initiatives.map((item, i) => (
              <div key={i} className="min-w-full">
                <div className="relative bg-black/5">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-80 md:h-96 object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallbacks if local images aren't present yet
                      const fallbacks: Record<string, string> = {
                        UNESCO: 'https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=1',
                        WHO: 'https://images.pexels.com/photos/7469239/pexels-photo-7469239.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=1',
                        UNICEF: 'https://images.pexels.com/photos/8460340/pexels-photo-8460340.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=1',
                        'Red Cross': 'https://images.pexels.com/photos/8460092/pexels-photo-8460092.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=1',
                      };
                      const name = (e.currentTarget.alt || '').trim();
                      (e.currentTarget as HTMLImageElement).src = fallbacks[name] || 'https://images.pexels.com/photos/6129052/pexels-photo-6129052.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=1';
                    }}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {/* Content */}
                  <div className="absolute left-6 right-6 bottom-6 text-white">
                    <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs mb-2">{item.name}</div>
                    <h3 className="text-2xl font-semibold">{item.title}</h3>
                    <p className="text-sm text-white/90 max-w-2xl">{item.description}</p>
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
                    >
                      Know more about it →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Left/Right Controls */}
        <button onClick={goPrev} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow border border-gray-200 hover:bg-gray-50">
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        <button onClick={goNext} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow border border-gray-200 hover:bg-gray-50">
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>

        {/* Dots */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {initiatives.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => setCurrent(idx)}
              className={`w-2.5 h-2.5 rounded-full ${current === idx ? 'bg-blue-600' : 'bg-gray-300'} transition-colors`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Initiatives;