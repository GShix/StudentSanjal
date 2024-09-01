import React, { useState } from 'react';

function FAQ() {
  const [filter, setFilter] = useState('');
  const [faqs, setFaqs] = useState([
    {
      question: "What is StudentSanjal?",
      answer: "StudentSanjal is a vibrant online platform designed for Nepalese college students to connect, collaborate, and enhance their educational experience. It offers features like account management, interactive Q&A, content sharing, and virtual events.",
      open: false,
    },
    {
      question: "How do I create an account on StudentSanjal?",
      answer: "Creating an account is easy! Simply sign up using your college email address and verify your identity with a college ID card. Once verified, you can start exploring and engaging with the community.",
      open: false,
    },
    {
      question: "Can I participate in virtual events?",
      answer: "Absolutely! StudentSanjal offers a range of free/paid virtual events that you can join or host. These events provide opportunities to network, learn, and collaborate with fellow students.",
      open: false,
    },
    {
      question: "How can I share content with the community?",
      answer: "You can share posts, academic resources, and ideas directly through your profile. You can also share them through message directly to your peers.",
      open: false,
    },
    {
      question: "Is my data secure on StudentSanjal?",
      answer: "Yes, your privacy and security are the top priorities. We use secure methods to protect your personal information and ensure that only verified students can get full access the platform.",
      open: false,
    },
  ]);

  const filteredFaqs = faqs.filter((faq) => {
    const lowerCaseFilter = filter.toLowerCase();
    return (
      faq.question.toLowerCase().includes(lowerCaseFilter) ||
      faq.answer.toLowerCase().includes(lowerCaseFilter)
    );
  });

  const toggleFAQ = (index) => {
    const updatedFaqs = [...faqs];
    updatedFaqs[index].open = !updatedFaqs[index].open;
    setFaqs(updatedFaqs);
  };

  const handleSearch = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="py-8 px-5 sm:px-8 bg-white rounded shadow pb-14">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 max-sm:items-start">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0 max-sm:hidden">Frequently Asked Questions</h1>
        <h1 className="text-2xl font-bold mb-4 sm:hidden sm:mb-0">FAQs</h1>
        <input
          type="text"
          value={filter}
          onChange={handleSearch}
          placeholder="Search FAQs"
          className="w-full sm:w-1/3 p-2 mb-2 sm:mb-0 border rounded"
        />
      </div>
      <ul>
        {filteredFaqs.map((faq, index) => (
          <li key={index} className="mb-4">
            <button
              className="w-full text-left p-4 bg-gray-100 rounded-t shadow hover:bg-[#E3D6B4]"
              onClick={() => toggleFAQ(index)}>
              {index + 1}. <span className="question">{faq.question}</span>
            </button>
            {faq.open && (
              <div className="p-4 bg-white border rounded-b shadow-inner">
                <div className="answer max-sm:text-sm">{faq.answer}</div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FAQ;
