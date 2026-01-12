import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQ = () => {
  const faqs = [
    {
      question: "How long does it take for a report to be addressed?",
      answer:
        "Once submitted, reports are reviewed by the authorities. Resolution times may vary depending on the complexity of the issue, but most issues are addressed within 3-7 days.",
    },
    {
      question: "Can I report anonymously?",
      answer:
        "No, CivicReport does not allows anonymous reporting. Because, providing concrete details helps authorities reach out for clarification, speeding up resolution.",
    },
    {
      question: "Who reviews the reports?",
      answer:
        "All reports are reviewed by trained moderators and forwarded to the appropriate municipal or local authority for action.",
    },
    {
      question: "Can I track the status of my report?",
      answer:
        "Absolutely! You can check the status of all your submitted reports under the 'My Reports' section.",
    },
    {
      question: "What types of issues can I report?",
      answer:
        "You can report a variety of civic issues including road damage, water leakage, garbage accumulation, streetlight outages, public safety concerns, and more.",
    },
    {
      question: "Is there a limit to how many reports I can submit?",
      answer:
        "There is no limit. You can report as many issues as you notice. Each report helps improve the city and makes the authorities more aware of ongoing problems.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section className="max-w-11/12 mx-auto">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-green-900 text-center mb-6">
          Frequently Asked Questions
        </h2>
        <p className="text-green-800 text-center mb-12 max-w-2xl mx-auto">
          Have questions about how CivicReport works or how to submit reports? 
          Here are some of the most common questions from our users. If you 
          need further assistance, feel free to reach out to our support team.
        </p>
      </div>

      {/* FAQ items */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            {/* Question */}
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-4 text-left text-secondary font-medium focus:outline-none hover:bg-gray-50 transition"
            >
              {faq.question}
              <span className="ml-2">
                {openIndex === index ? (
                  <FaChevronUp className="w-4 h-4" />
                ) : (
                  <FaChevronDown className="w-4 h-4" />
                )}
              </span>
            </button>

            {/* Answer */}
            {openIndex === index && (
              <div className="px-4 pb-4 text-gray-700 text-sm md:text-base">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
