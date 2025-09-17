import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const GovernmentSchemes: React.FC = () => {
  const schemes = [
    {
      title: "Ayushman Bharat",
      description: "Health insurance scheme providing coverage up to ₹5 lakh per family per year.",
      link: "https://pmjay.gov.in/"
    },
    {
      title: "Pradhan Mantri Suraksha Bima Yojana",
      description: "Accident insurance scheme offering coverage for accidental death and disability.",
      link: "https://www.jansuraksha.gov.in/"
    },
    {
      title: "Pradhan Mantri Matru Vandana Yojana",
      description: "Maternity benefit scheme providing financial assistance to pregnant women.",
      link: "https://pmmvy.nic.in/"
    },
    {
      title: "National Health Mission",
      description: "Comprehensive health system strengthening initiative across urban and rural areas.",
      link: "https://nhm.gov.in/"
    },
    {
      title: "Rashtriya Swasthya Bima Yojana",
      description: "Health insurance scheme for families below poverty line with cashless treatment.",
      link: "https://www.rsby.gov.in/"
    },
    {
      title: "Janani Suraksha Yojana",
      description: "Safe motherhood intervention promoting institutional delivery among poor women.",
      link: "https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=841&lid=309"
    }
  ];

  return (
    <section id="government-schemes" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Government Health Schemes</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore various government health schemes designed to provide accessible healthcare to all citizens
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {schemes.map((scheme, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-blue-900">
                    {scheme.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {scheme.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    variant="outline" 
                    className="w-full group"
                    onClick={() => window.open(scheme.link, '_blank')}
                  >
                    More Details
                    <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GovernmentSchemes;