import React, { useEffect, useRef, useState, useCallback } from "react";
import { CommentOutlined, BookOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import { clearMessages, sendMessage, updateUserReaction } from "./actions";
import { LOAD_MESSAGES_FROM_STORAGE } from "./constants";
import { chatService } from "../../services/chatService";
import { suggestedQuestions } from "./chatBotData";

import ChatHeader from "./components/ChatHeader";
import MessageList from "./components/MessageList";
import ChatInput from "./components/ChatInput";
import SuggestedQuestions from "./components/SuggestedQuestions";
import ResourcesTab from "./components/ResourcesTab";
import FaqTab from "./components/FaqTab";

import {
    ChatPanel,
    ChatBody,
    StyledTabs,
    TabContent,
} from "./ChatBotWidget.styles";

const autoCompleteOptions = [
    { value: "pricing", label: "pricing information" },
    { value: "contact", label: "contact support" },
    { value: "help", label: "get help" },
    { value: "services", label: "available services" },
    { value: "features", label: "product features" },
    { value: "demo", label: "schedule a demo" },
    { value: "documentation", label: "view documentation" },
    { value: "tutorial", label: "tutorials and guides" },
];

const getSuggestedQuestions = (templates) => {
    if (!Array.isArray(templates) || templates.length === 0) {
        return suggestedQuestions;
    }

    return templates.slice(0, 4).map(
        (template) =>
            template.messages?.[0]?.content ||
            template.name ||
            "Ask me anything!"
    );
};

const ChatBotWidget = () => {
    const [inputValue, setInputValue] = useState("");
    const [autoCompleteData, setAutoCompleteData] = useState([]);
    const [showSmartSuggestions, setShowSmartSuggestions] = useState(false);
    const [relatedQuestions, setRelatedQuestions] = useState([]);
    const [displayedRelatedQuestions, setDisplayedRelatedQuestions] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [activeTab, setActiveTab] = useState("chat");
    const [isFirstVisit, setIsFirstVisit] = useState(true);

    const dispatch = useDispatch();

    const { messages, typing, limitReached } = useSelector(
        (state) => state.chatBot
    );

    const messagesEndRef = useRef(null);
    const smartSuggestionsRef = useRef(null);

    const handleReaction = useCallback(
        (messageId, reaction, event) => {
            event?.preventDefault();
            dispatch(updateUserReaction(messageId, reaction));
        },
        [dispatch]
    );

    // Load saved messages
    useEffect(() => {
        const savedMessages = localStorage.getItem("chatbot_messages");

        if (savedMessages) {
            try {
                const parsedMessages = JSON.parse(savedMessages);

                if (parsedMessages.length > 0) {
                    dispatch({
                        type: LOAD_MESSAGES_FROM_STORAGE,
                        payload: parsedMessages,
                    });
                }
            } catch (error) {
                console.error("Error loading messages:", error);
            }
        }
    }, [dispatch]);

    // Save messages
    useEffect(() => {
        if (messages.length > 1) {
            localStorage.setItem(
                "chatbot_messages",
                JSON.stringify(messages)
            );
        }
    }, [messages]);

    // Fetch conversation templates
    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const templateData = await chatService.getTemplates();

                const fetchedTemplates = templateData.success
                    ? templateData.data.templates
                    : [];

                setTemplates(fetchedTemplates);
            } catch (error) {
                console.error("Failed to fetch templates:", error);
                setTemplates([]);
            }
        };

        fetchTemplates();
    }, []);

    // Close smart suggestions when clicking outside
    useEffect(() => {
        if (!showSmartSuggestions) return;

        const handleClickOutside = (event) => {
            if (
                smartSuggestionsRef.current &&
                !smartSuggestionsRef.current.contains(event.target)
            ) {
                setShowSmartSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showSmartSuggestions]);

    // Scroll to latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, typing]);

    useEffect(() => {
        setDisplayedRelatedQuestions(relatedQuestions);
    }, [relatedQuestions]);

    const handleInputChange = (value) => {
        setInputValue(value);

        if (value.length > 0) {
            const filteredOptions = autoCompleteOptions.filter(
                (option) =>
                    option.value.toLowerCase().includes(value.toLowerCase()) ||
                    option.label.toLowerCase().includes(value.toLowerCase())
            );

            setAutoCompleteData(
                filteredOptions.map((option) => ({
                    value: option.label,
                    label: option.label,
                }))
            );
        } else {
            setAutoCompleteData([]);
        }

        setShowSmartSuggestions(value.length === 0 && messages.length > 0);
    };

    const handleAutoCompleteSelect = (value) => {
        setInputValue(value);
        setAutoCompleteData([]);
        setShowSmartSuggestions(false);
    };

    const handleSend = async () => {
        const sentInput = inputValue.trim();

        if (!sentInput || typing || limitReached) return;

        setInputValue("");
        setAutoCompleteData([]);
        setShowSmartSuggestions(false);

        try {
            dispatch(sendMessage(sentInput));

            const result = await chatService.sendMessage({
                message: sentInput,
                provider: "gemini",
                useRag: true,
                topK: 5,
            });

            if (result.success) {
                setRelatedQuestions(
                    result.relatedQuestions || ["1", "2", "3", "4"]
                );

                if (isFirstVisit) {
                    setIsFirstVisit(false);
                }
            } else {
                dispatch(sendMessage(sentInput));
            }
        } catch (error) {
            console.error("Chat request failed:", error);
            dispatch(sendMessage(sentInput));
        }
    };

    const handleSuggestedQuestionClick = async (question) => {
        if (limitReached || typing) return;

        try {
            dispatch(sendMessage(question.trim()));

            const result = await chatService.sendMessage({
                message: question.trim(),
                provider: "gemini",
                useRag: true,
                topK: 5,
            });

            setIsFirstVisit(false);

            if (result.success) {
                setRelatedQuestions(result.relatedQuestions || []);
            } else {
                dispatch(sendMessage(question.trim()));
            }
        } catch (error) {
            console.error("Suggested question failed:", error);
            dispatch(sendMessage(question.trim()));
        }
    };

    const handleClear = () => {
        dispatch(clearMessages());

        localStorage.removeItem("chatbot_messages");

        setIsFirstVisit(true);
        setInputValue("");
        setAutoCompleteData([]);
        setShowSmartSuggestions(false);
        setRelatedQuestions([]);
        setActiveTab("chat");
    };

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const questions = getSuggestedQuestions(templates);

    const smartSuggestions = [
        "Tell me more about this",
        "Can you provide an example?",
        "What are the next steps?",
    ];

    return (
        <ChatPanel>
            <ChatHeader
                onClear={handleClear}
                onClose={() => {}}
            />

            <StyledTabs
                activeKey={activeTab}
                onChange={setActiveTab}
                centered
                items={[
                    {
                        key: "chat",
                        label: (
                            <TabContent>
                                <CommentOutlined />
                                <span>Chat</span>
                            </TabContent>
                        ),
                    },
                    {
                        key: "resources",
                        label: (
                            <TabContent>
                                <BookOutlined />
                                <span>Resources</span>
                            </TabContent>
                        ),
                    },
                    {
                        key: "faq",
                        label: (
                            <TabContent>
                                <QuestionCircleOutlined />
                                <span>FAQ</span>
                            </TabContent>
                        ),
                    },
                ]}
            />

            {activeTab === "chat" && (
                <>
                    <ChatBody>
                        {messages.length <= 1 && (
                            <div className="chat-welcome">
                                <div className="welcome-icon">
                                    <img src="/logo.svg" alt="LB Assistant" />
                                </div>

                                <h1>How can I help you today?</h1>

                                <p>
                                    Ask me anything about Nexora,
                                    accounts, links, orders and support.
                                </p>
                            </div>
                        )}

                        <MessageList
                            messages={messages}
                            formatTime={formatTime}
                            handleReaction={handleReaction}
                            typing={typing}
                        />

                        {!typing && !limitReached && (
                            <SuggestedQuestions
                                questions={questions}
                                onQuestionClick={handleSuggestedQuestionClick}
                                relatedQuestions={displayedRelatedQuestions}
                                isFirst={isFirstVisit}
                            />
                        )}

                        <div ref={messagesEndRef} />
                    </ChatBody>

                    <ChatInput
                        inputValue={inputValue}
                        autoCompleteData={autoCompleteData}
                        showSmartSuggestions={showSmartSuggestions}
                        smartSuggestions={smartSuggestions}
                        limitReached={limitReached}
                        typing={typing}
                        onInputChange={handleInputChange}
                        onAutoCompleteSelect={handleAutoCompleteSelect}
                        onSmartSuggestionClick={(suggestion) => {
                            setInputValue(suggestion);
                            setShowSmartSuggestions(false);
                        }}
                        onSend={handleSend}
                        smartSuggestionsRef={smartSuggestionsRef}
                    />
                </>
            )}

            {activeTab === "resources" && <ResourcesTab />}

            {activeTab === "faq" && <FaqTab />}
        </ChatPanel>
    );
};

export default ChatBotWidget;