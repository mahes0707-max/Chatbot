
import React, { useState } from "react";
import { FaqContainer } from "../ChatBotWidget.styles";

const faqData = [
  {
    key: 1,
    question: "What is Nexora?",
    answer:
      "Nexora is a student-focused platform that provides learning resources, AI chatbot assistance and career support.",
  },
  {
    key: 2,
    question: "How can I create an account?",
    answer:
      "You can register using the available sign-up option or sign in using your Google account.",
  },
  {
    key: 3,
    question: "How do I use the AI chatbot?",
    answer:
      "Open New Conversation, type your question and send it. The chatbot will generate a response.",
  },
  {
    key: 4,
    question: "Can I access my previous conversations?",
    answer:
      "Yes. Visit Chat History to view and continue your previous conversations.",
  },
  {
    key: 5,
    question: "Can I delete my chat history?",
    answer:
      "Yes. You can delete individual conversations from the Chat History section.",
  },
  {
    key: 6,
    question: "Where can I find programming resources?",
    answer:
      "Visit the Resources page to access websites for programming, DSA, AI, machine learning and web development.",
  },
  {
    key: 7,
    question: "Is the platform free to use?",
    answer:
      "The platform provides its available features according to your account access and configuration.",
  },
  {
    key: 8,
    question: "Can I use the platform on mobile devices?",
    answer:
      "Yes. The platform is designed to support desktop, tablet and mobile screens.",
  },
  {
    key: 9,
    question: "What should I do if the chatbot is not responding?",
    answer:
      "Check your internet connection and try again. If the issue continues, contact support.",
  },
  {
    key: 10,
    question: "How can I log out of my account?",
    answer:
      "Click the Logout option in the sidebar or top navigation.",
  },
];

const FaqTab = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  return (
    <FaqContainer
      style={{
  width: "100%",
  maxWidth: "none",
  minHeight: "calc(100vh - 100px)",
  height: "auto",
  maxHeight: "none",
  padding: "32px 40px",
  boxSizing: "border-box",
  overflow: "visible",
}}
    >
      <h2 style={{ marginBottom: "8px" }}>
        Frequently Asked Questions
      </h2>

      <p style={{ marginBottom: "28px", color: "#718096" }}>
        Find answers to common questions about Linkbuilders.
      </p>

      {faqData.map((faq) => (
        <div
          key={faq.key}
          style={{
            borderBottom: "1px solid #e2e8f0",
            padding: "18px 0",
          }}
        >
          <button
            type="button"
            onClick={() =>
              setActiveQuestion(
                activeQuestion === faq.key ? null : faq.key
              )
            }
            aria-expanded={activeQuestion === faq.key}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              fontSize: "16px",
              fontWeight: 600,
              color: "inherit",
              padding: "4px 0",
            }}
          >
            <span>{faq.question}</span>

            <span style={{ fontSize: "20px", marginLeft: "12px" }}>
              {activeQuestion === faq.key ? "−" : "+"}
            </span>
          </button>

          {activeQuestion === faq.key && (
            <p
              style={{
                marginTop: "14px",
                marginBottom: "4px",
                color: "#718096",
                lineHeight: 1.7,
                fontSize: "15px",
              }}
            >
              {faq.answer}
            </p>
          )}
        </div>
      ))}
    </FaqContainer>
  );
};

export default FaqTab;
