import styled, { keyframes } from "styled-components";
import { Button, Input, Tabs } from "antd";

export const FloatingButton = styled(Button)`
    position: fixed;
    bottom: 20px;
    right: 20px;
    border-radius: 50%;
    scale: 1.2;
    background: #343750;
    color: white;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    transition: all 0.2s ease;
    z-index: 1000;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);

    transition: all 0.2s ease;

    &:hover {
        background: black;
        color: white;
        transform: scale(1.1);
    }

    &:focus {
        outline: none;
    }
`;


export const ChatPanel = styled.div`
    width: 100%;
    min-height: calc(100vh - 125px);
    display: flex;
    flex-direction: column;
    background: #ffffff;
    border: 1px solid #e8edf5;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 8px 30px rgba(30, 50, 90, 0.05);

    @media (max-width: 760px) {
        min-height: calc(100vh - 105px);
        border-radius: 12px;
    }
`;


export const ChatHeader = styled.div`
    padding: 16px 24px;
    background: #ffffff;
    color: #202b50;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #edf0f5;

    h3 {
        margin: 0;
        font-size: 17px;
        font-weight: 700;
    }
`;


export const ChatBody = styled.div`
    flex: 1;
    min-height: 0;
    padding: 30px 24px;
    overflow-y: auto;
    background: #ffffff;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-thumb {
        background: #d6deed;
        border-radius: 10px;
    }

    .chat-welcome {
        max-width: 680px;
        margin: 55px auto 35px;
        text-align: center;

        .welcome-icon {
            width: 66px;
            height: 66px;
            margin: 0 auto 22px;
            padding: 13px;
            border-radius: 20px;
            background: #f0f4ff;
            display: grid;
            place-items: center;

            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }

        h1 {
            font-size: clamp(24px, 4vw, 34px);
            font-weight: 700;
            color: #202b50;
            margin: 0 0 12px;
        }

        p {
            font-size: 15px;
            color: #7b849b;
            line-height: 1.7;
            margin: 0;
        }
    }

    @media (max-width: 600px) {
        padding: 20px 14px;

        .chat-welcome {
            margin: 35px auto 25px;
        }
    }
`;


export const Timestamp = styled.div`
    font-size: 10px;
    margin: 0 2px;
    color: #888;
    text-align: right;
    margin-top: 4px;
    ${(props) =>
        props.sender === "user" ? "text-align: right;" : "text-align: left"}
`;


export const ChatFooter = styled.div`
    padding: 16px 24px 22px;
    background: #ffffff;
    border-top: 1px solid #edf0f5;
    display: flex;
    gap: 12px;
    align-items: center;
    width: 100%;
    max-width: 850px;
    margin: 0 auto;

    @media (max-width: 600px) {
        padding: 12px;
    }
`;



export const MessageBubble = styled.div`
    max-width: 85%;
    padding: 11px 15px;
    font-size: 14px;
    line-height: 1.6;
    overflow-wrap: anywhere;
    border-radius: 15px;
    transition: all 0.2s ease;

    ${(props) =>
        props.sender === "user"
            ? `
        background: #4169e1;
        border: 1px solid #4169e1;
        color: white;
        align-self: flex-end;
        margin-left: auto;
        text-align: left;
        border-bottom-right-radius: 4px;
    `
            : `
        background: #ffffff;
        border: 1px solid #e8edf5;
        color: #26334d;
        align-self: flex-start;
        border-bottom-left-radius: 4px;
    `}
`;


export const BotMessageWrapper = styled.div`
    display: flex;
    align-items: start;
    gap: 8px;
    margin-bottom: 6px;
    align-self: flex-start;
`;

export const TypingMessageWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
    align-self: flex-start;
`;

export const BotIcon = styled.div`
    background-color: white;
    background-image: url("/logo.svg");
    background-size: 80% 80%;
    background-repeat: no-repeat;
    background-position: center;
    width: 32px;
    height: 32px;
    border-radius: 100%;
    font-size: 18px;
    color: black;
    flex-shrink: 0;
    margin-top: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ddd;
`;

export const MessagesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
`;

export const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
`;

export const TypingIndicator = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 8px 12px;
    background: white;
    border-radius: 8px;
    align-self: flex-center;
    font-size: 12px;

    .dot {
        width: 6px;
        height: 6px;
        background: black;
        border-radius: 50%;
        animation: ${bounce} 1.4s infinite ease-in-out;
    }
    .dot:nth-child(2) {
        animation-delay: 0.2s;
    }
    .dot:nth-child(3) {
        animation-delay: 0.4s;
    }
`;


export const StyledInput = styled(Input)`
    border: 1px solid #dce3ef;
    border-radius: 12px;
    font-size: 14px;
    padding: 10px 13px;

    &:focus,
    &:hover {
        border-color: #4776e6;
        box-shadow: 0 0 0 3px rgba(71, 118, 230, 0.1);
    }
`;

export const HeaderCleanButton = styled(Button)`
    color: #dfd9d9;

    &:hover {
        color: #f6a1c7 !important;
    }
`;

export const HeaderCloseButton = styled(Button)`
    color: #fae8f0;

    &:hover {
        color: #f6a1c7 !important;
    }
`;


export const SendButton = styled(Button)`
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background: #4776e6;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    transition: all 0.2s ease;

    &:hover {
        background: #315ac2 !important;
        color: white !important;
        transform: translateY(-2px);
    }
`;


export const StyledTabs = styled(Tabs)`
    padding: 0 24px;
    background: #ffffff;

    .ant-tabs-nav {
        margin-bottom: 0;
        border-bottom: 1px solid #edf0f5;
    }

    .ant-tabs-tab {
        padding: 13px 20px;
        margin: 0;
        transition: all 0.2s ease;
    }

    .ant-tabs-tab-active {
        font-weight: 600;
    }

    .ant-tabs-ink-bar {
        background: #4776e6;
        height: 3px;
        border-radius: 5px;
    }

    @media (max-width: 600px) {
        padding: 0 8px;

        .ant-tabs-tab {
            padding: 12px;
        }
    }
`;

export const TabContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-width: 85px;
    color: #526078;
    font-size: 13px;
    font-weight: 500;
`;

export const MessageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
`;

export const HeaderLogoCard = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const IconWrapper = styled.div`
    position: relative;
    width: 32px;
    height: 32px;
`;

export const Icon = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
`;

export const ActiveIndicator = styled.div`
    position: absolute;
    bottom: 2px;
    right: 2px;
    width: 10px;
    height: 10px;
    background: #4caf50;
    border: 2px solid #3b4a60;
    border-radius: 50%;
`;

export const BotName = styled.h3`
    font-size: 15px;
    font-weight: 600;
    margin: 0;
    color: white;
`;

export const SuggestedQuestionsContainer = styled.div`
    width: 100%;
    max-width: 850px;
    margin: 20px auto;
    padding: 10px 0;
`;

export const SuggestedQuestionsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

export const SuggestedQuestionItem = styled.div`
    padding: 15px 18px;
    background: #ffffff;
    border: 1px solid #e5eaf2;
    border-radius: 12px;
    font-size: 13px;
    color: #526078;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
    max-width: none;

    &:hover {
        background: #f7f9ff;
        border-color: #9db7f8;
        transform: translateY(-2px);
    }
`;



export const ResourcesContainer = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-height: 400px;
    overflow-y: auto;
`;

export const ResourcesGrid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const ResourceCard = styled.div`
    background: #ffffff;
    border-radius: 8px;
    padding: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    gap: 8px;
    cursor: pointer;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    }

    h5 {
        margin: 0;
        font-size: 14px;
        font-weight: 600;
        color: #1890ff;
    }

    p {
        font-size: 12px;
        color: #555;
        line-height: 1.4;
        margin: 0;
    }

    .resource-icon {
        font-size: 20px;
        color: #1890ff;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #e6f0ff;
    }
`;

export const SuggestedResources = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;

    h5 {
        margin-bottom: 8px;
        font-size: 15px;
        font-weight: 600;
        color: #1890ff;
    }

    .resource-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .resource-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #f5f8ff;
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 13px;
        cursor: pointer;
        transition: all 0.2s ease;
        position: relative;

        &:hover {
            background: #e6f0ff;
        }

        &.read {
            opacity: 0.6;
        }

        .resource-type {
            font-size: 18px;
            color: #1890ff;
            margin-right: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .unread-indicator {
            width: 10px;
            height: 10px;
            background: #ff4d4f;
            border-radius: 50%;
            position: absolute;
            right: 8px;
            top: 50%;
            transform: translateY(-50%);
        }
    }
`;

export const FaqContainer = styled.div`
    padding: 16px;
    max-height: 400px;
    overflow-y: auto;

    .faq-collapse {
        background: transparent;
        border: none;

        .ant-collapse-item {
            margin-bottom: 8px;
            border: 1px solid #e8e8e8;
            border-radius: 8px;
            overflow: hidden;

            .ant-collapse-header {
                padding: 12px 16px;
                font-size: 14px;
                font-weight: 500;
                color: #1890ff;
                background: #f8f9fa;

                &:hover {
                    background: #e6f0ff;
                }
            }

            .ant-collapse-content {
                border-top: 1px solid #e8e8e8;
                background: white;

                .ant-collapse-content-box {
                    padding: 12px 16px;
                }
            }
        }

        .ant-collapse-item-active {
            .ant-collapse-header {
                background: #e6f0ff;
                font-weight: 600;
            }
        }
    }
`;

export const FaqItem = styled.div`
    .faq-answer {
        font-size: 13px;
        line-height: 1.5;
        color: #555;
        margin-bottom: 8px;
    }

    .faq-tags {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
    }

    .faq-tag {
        background: #f0f0f0;
        color: #666;
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 500;
    }
`;

export const LikeIconsWrapper = styled.div`
    display: flex;
    margin-top: 10px;
    align-items: center;
    gap: 15px;
    margin-left: 5px;
    font-size: 16px;
    font-weight: bold;
`;

export const ReactionButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    color: ${(props) => (props.$active ? "#1890ff" : "#666")};

    &:hover {
        background: #f0f0f0;
        transform: scale(1.1);
    }

    &:active {
        transform: scale(0.95);
    }
`;
