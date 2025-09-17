import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "How do I book an appointment through MedX?",
      answer: "You can book an appointment by creating an account, selecting your preferred doctor, and choosing an available time slot. You'll receive a confirmation email with all the details."
    },
    {
      question: "Are online consultations as effective as in-person visits?",
      answer: "Online consultations are highly effective for routine check-ups, follow-ups, and non-emergency medical advice. However, certain conditions may require in-person examination, which our doctors will advise you about."
    },
    {
      question: "How can I access government health schemes?",
      answer: "Our platform provides detailed information about various government health schemes. You can check your eligibility and apply directly through our integrated portal or visit the respective government websites."
    },
    {
      question: "Is my medical data secure on MedX?",
      answer: "Yes, we use end-to-end encryption and follow HIPAA compliance standards to ensure your medical data is completely secure and confidential. Your information is never shared without your explicit consent."
    },
    {
      question: "What payment methods are accepted for medicine orders?",
      answer: "We accept all major payment methods including credit/debit cards, UPI, net banking, and digital wallets. We also offer cash on delivery for medicine orders in select areas."
    },
    {
      question: "How does the AI chatbot help with health queries?",
      answer: "Our AI chatbot provides instant responses to common health questions, helps you understand symptoms, and can guide you to appropriate healthcare resources. It's available 24/7 for preliminary health guidance."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our healthcare services and platform
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white rounded-lg shadow-sm border"
              >
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-gray-50">
                  <span className="font-medium text-gray-900">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;