import React from 'react';
import { HelpCircle, Book, MessageCircle, Mail, ExternalLink, ChevronRight } from 'lucide-react';

interface HelpSupportProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpSupport({ isOpen, onClose }: HelpSupportProps) {
  const faqs = [
    {
      question: 'How do I add a new product?',
      answer: 'Click the "Add Product" button in the top right corner. Fill in the product details including name, category, purchase date, and warranty period. You can also add an image to help identify your product.'
    },
    {
      question: 'How are warranty notifications handled?',
      answer: 'WarrantyWise sends notifications based on your settings. You can receive both browser and email notifications when warranties are about to expire. Adjust your notification preferences in Settings.'
    },
    {
      question: 'Can I export my product data?',
      answer: 'Yes! Use the "Export Data" button to download a CSV file containing all your product and warranty information.'
    },
    {
      question: 'How do I track service history?',
      answer: 'Open a product\'s details and scroll to the Service History section. Click "Add Service" to log maintenance, repairs, or inspections.'
    },
    {
      question: 'What do the different warranty statuses mean?',
      answer: 'Green indicates an active warranty, yellow means the warranty is expiring soon (within 30 days by default), and red shows expired warranties.'
    }
  ];

  const guides = [
    {
      title: 'Getting Started Guide',
      description: 'Learn the basics of managing your warranties and products',
      icon: Book
    },
    {
      title: 'Service History Tracking',
      description: 'How to maintain detailed service records for your products',
      icon: MessageCircle
    },
    {
      title: 'Notification Setup',
      description: 'Configure alerts to never miss a warranty expiration',
      icon: Mail
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Help & Support</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <span className="sr-only">Close</span>
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quick Start Guides */}
            <section>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Start Guides</h3>
              <div className="space-y-4">
                {guides.map((guide, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <guide.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <div className="text-left">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">{guide.title}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{guide.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </button>
                ))}
              </div>
            </section>

            {/* Contact Support */}
            <section>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Contact Support</h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Need help? Our support team is available Monday through Friday, 9AM-5PM EST.
                </p>
                <div className="space-y-3">
                  <a
                    href="mailto:support@warrantywise.com"
                    className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    <Mail className="h-5 w-5" />
                    <span>support@warrantywise.com</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Live Chat</span>
                  </a>
                </div>
              </div>
            </section>
          </div>

          {/* FAQs */}
          <section className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <summary className="flex justify-between items-center cursor-pointer p-4">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{faq.question}</span>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <p className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Additional Resources */}
          <section className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Additional Resources</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="#"
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Book className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Documentation</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Detailed guides and tutorials</p>
                  </div>
                </div>
                <ExternalLink className="h-5 w-5 text-gray-400" />
              </a>
              <a
                href="#"
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <MessageCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Community Forum</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Connect with other users</p>
                  </div>
                </div>
                <ExternalLink className="h-5 w-5 text-gray-400" />
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}