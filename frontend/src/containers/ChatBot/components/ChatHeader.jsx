import React from "react";
import { ClearOutlined } from "@ant-design/icons";
import {
  ChatHeader,
  HeaderLogoCard,
  IconWrapper,
  Icon,
  ActiveIndicator,
  BotName,
  HeaderCleanButton,
} from "../ChatBotWidget.styles";

const ChatHeaderComponent = ({ onClear }) => (
  <ChatHeader>
    <HeaderLogoCard>
      <IconWrapper>
        <Icon src="/logo.svg" alt="Bot Icon" />
        <ActiveIndicator />
      </IconWrapper>
      <BotName>Nexora Assistant</BotName>
    </HeaderLogoCard>

    <HeaderCleanButton
      type="text"
      icon={<ClearOutlined style={{ fontSize: 18 }} />}
      onClick={onClear}
      title="Clear chat"
    />
  </ChatHeader>
);

export default ChatHeaderComponent;