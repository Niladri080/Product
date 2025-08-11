import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, MessageCircle } from 'lucide-react';

export default function FAQ({setActiveSection}) {
  const [openItems, setOpenItems] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'orders', name: 'Orders & Shipping' },
    { id: 'products', name: 'Products' },
    { id: 'payments', name: 'Payments' },
    { id: 'returns', name: 'Returns & Exchanges' },
    { id: 'account', name: 'Account' }
  ];

  const faqData = [
    {
      id: 1,
      category: 'orders',
      question: 'How can I track my order?',
      answer: 'Once your order is shipped, you will receive a tracking number via email. You can use this number to track your package on our website or the carrier\'s website. You can also check your order status by logging into your account and visiting the "My Orders" section.'
    },
    {
      id: 2,
      category: 'orders',
      question: 'What are your shipping options and delivery times?',
      answer: 'We offer several shipping options: Standard shipping (5-7 business days), Express shipping (2-3 business days), and Overnight shipping (1 business day). Shipping costs vary based on your location and the shipping method selected. Free standard shipping is available on orders over $75.'
    },
    {
      id: 3,
      category: 'products',
      question: 'Do you have size guides for clothing items?',
      answer: 'Yes, we provide detailed size guides for all our clothing items. You can find the size guide on each product page by clicking the "Size Guide" link. Our size guides include measurements for chest, waist, hips, and inseam to help you find the perfect fit.'
    },
    {
      id: 4,
      category: 'products',
      question: 'Are your electronics covered by warranty?',
      answer: 'All electronics sold on our website come with manufacturer warranties. The warranty period varies by product and manufacturer, typically ranging from 1-3 years. Warranty information is clearly listed on each product page. We also offer extended warranty options for select items.'
    },
    {
      id: 5,
      category: 'payments',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers. All payments are processed securely using SSL encryption to protect your financial information.'
    },
    {
      id: 6,
      category: 'payments',
      question: 'Is it safe to shop on your website?',
      answer: 'Absolutely. We use industry-standard SSL encryption to protect your personal and payment information. Our website is PCI DSS compliant, and we never store your credit card information on our servers. All transactions are processed through secure payment gateways.'
    },
    {
      id: 7,
      category: 'returns',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most items. Products must be in original condition with tags attached. Electronics must be returned in original packaging with all accessories. Some items like underwear, swimwear, and personalized products are not eligible for return for hygiene reasons.'
    },
    {
      id: 8,
      category: 'returns',
      question: 'How do I initiate a return or exchange?',
      answer: 'To start a return, log into your account and go to "My Orders." Find the order you want to return and click "Return Items." Follow the prompts to select items and reason for return. You\'ll receive a prepaid return label via email within 24 hours.'
    },
    {
      id: 9,
      category: 'account',
      question: 'How do I create an account?',
      answer: 'Click "Sign Up" at the top of any page and fill in your email, password, and basic information. You can also create an account during checkout. Having an account allows you to track orders, save favorites, and enjoy faster checkout on future purchases.'
    },
    {
      id: 10,
      category: 'account',
      question: 'I forgot my password. How can I reset it?',
      answer: 'Click "Sign In" and then "Forgot Password" on the login page. Enter your email address and we\'ll send you a password reset link. Check your email (including spam folder) and follow the instructions to create a new password.'
    },
    {
      id: 11,
      category: 'products',
      question: 'Do you restock sold-out items?',
      answer: 'We regularly restock popular items, but availability depends on manufacturer supply. You can sign up for restock notifications on any sold-out product page. We\'ll email you as soon as the item is back in stock.'
    },
    {
      id: 12,
      category: 'orders',
      question: 'Can I cancel or modify my order after placing it?',
      answer: 'Orders can be cancelled or modified within 2 hours of placement, as long as they haven\'t entered the fulfillment process. Contact our customer service team immediately if you need to make changes. Once an order is shipped, it cannot be modified.'
    }
  ];

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const filteredFAQs = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about shopping on Products. We're here to help with any questions or concerns.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Side - Search and Categories */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Search & Filter
            </h2>
            
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
                      activeCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - FAQ Items */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Questions & Answers
            </h2>
            
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No questions found matching your search.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFAQs.map((item) => (
                  <div key={item.id} className="border border-gray-300 rounded-md">
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                    >
                      <h3 className="font-medium text-gray-900 pr-4">{item.question}</h3>
                      {openItems.has(item.id) ? (
                        <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      )}
                    </button>
                    {openItems.has(item.id) && (
                      <div className="px-4 pb-3 border-t border-gray-200">
                        <p className="text-gray-600 leading-relaxed pt-3">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <MessageCircle className="w-8 h-8 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h3>
            <p className="text-xl text-gray-600 mb-6">
              Our customer support team is here to help you with any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={()=>setActiveSection('contact')} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200">
                Contact Support
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors duration-200">
                Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
