import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, CheckCircle, XCircle } from 'lucide-react';

const Telemedicine: React.FC = () => {
  const medicines = [
    {
      name: "Paracetamol 500mg",
      price: "₹25",
      availability: "In Stock",
      inStock: true,
      description: "Pain reliever and fever reducer"
    },
    {
      name: "Amoxicillin 250mg",
      price: "₹80",
      availability: "In Stock",
      inStock: true,
      description: "Antibiotic for bacterial infections"
    },
    {
      name: "Omeprazole 20mg",
      price: "₹120",
      availability: "Out of Stock",
      inStock: false,
      description: "Proton pump inhibitor for acid reflux"
    },
    {
      name: "Metformin 500mg",
      price: "₹45",
      availability: "In Stock",
      inStock: true,
      description: "Diabetes medication"
    },
    {
      name: "Atorvastatin 10mg",
      price: "₹95",
      availability: "In Stock",
      inStock: true,
      description: "Cholesterol-lowering medication"
    },
    {
      name: "Losartan 50mg",
      price: "₹110",
      availability: "In Stock",
      inStock: true,
      description: "Blood pressure medication"
    }
  ];

  return (
    <section id="telemedicine" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Telemedicine & Pharmacy</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Order medicines online with home delivery and consult doctors virtually
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {medicines.map((medicine, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {medicine.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {medicine.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">{medicine.price}</span>
                    <div className="flex items-center space-x-2">
                      {medicine.inStock ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          medicine.inStock ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {medicine.availability}
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    className={`w-full ${
                      medicine.inStock 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!medicine.inStock}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {medicine.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-blue-50 to-teal-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-blue-900">
                Need a Prescription?
              </CardTitle>
              <CardDescription className="text-blue-700">
                Consult with our certified doctors online for prescriptions and health advice
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                Book Online Consultation
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Telemedicine;