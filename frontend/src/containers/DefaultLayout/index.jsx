import { chatService } from "../../services/chatService";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { clearMessages } from "../ChatBot/actions";
import { LOAD_MESSAGES_FROM_STORAGE } from "../ChatBot/constants";
import ResourcesTab from "../ChatBot/components/ResourcesTab";
import FaqTab from "../ChatBot/components/FaqTab";
import {
    LayoutDashboard,
    MessageSquare,
    History,
    BookOpen,
    CircleHelp,
    UserRound,
    Settings,
    LogOut,
    Menu,
    X,
    Bot,
    ArrowUpRight,
    Sparkles,
    ShieldCheck,
    Activity,
    Clock3,
    Mail,
    ChevronRight,
    Plus,
} from "lucide-react";

import ChatBotWidget from "../ChatBot/index.js";


// ======================
// MAIN LAYOUT
// ======================

const AppLayout = styled.div`
    min-height: 100vh;
    display: flex;
    background: #f5f7fc;
    font-family: "Segoe UI", Arial, sans-serif;
`;

// ======================
// SIDEBAR
// ======================

const Sidebar = styled.aside`
    position: fixed;
    top: 0;
    left: 0;
    width: 260px;
    height: 100vh;
    padding: 28px 18px;
    background: #ffffff;
    border-right: 1px solid #e9edf5;
    display: flex;
    flex-direction: column;
    z-index: 1100;
    transition: transform 0.25s ease;

    @media (max-width: 760px) {
        transform: translateX(
            ${({ $open }) => ($open ? "0" : "-100%")}
        );
        box-shadow: ${({ $open }) =>
            $open ? "10px 0 35px rgba(0,0,0,.12)" : "none"};
    }
`;

const Brand = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 10px;
    margin-bottom: 42px;

    .brand-icon {
        width: 38px;
        height: 38px;
        border-radius: 11px;
        display: grid;
        place-items: center;
        background: linear-gradient(135deg, #263b78, #4776e6);
        color: white;
    }

    h2 {
        margin: 0;
        font-size: 21px;
        font-weight: 800;
        color: #202b50;
    }

    span {
        color: #4776e6;
    }
`;

const NavLabel = styled.p`
    padding: 0 12px;
    color: #9aa3b5;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin: 0 0 12px;
`;

const NavButton = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 13px;
    padding: 12px 14px;
    margin-bottom: 6px;
    border: none;
    border-radius: 10px;
    background: ${({ $active }) =>
        $active ? "#edf2ff" : "transparent"};
    color: ${({ $active }) =>
        $active ? "#4169d8" : "#68738a"};
    font-size: 14px;
    font-weight: ${({ $active }) =>
        $active ? "700" : "500"};
    text-align: left;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background: #f0f4fc;
        color: #4169d8;
        transform: translateX(2px);
    }
`;

const NewChatButton = styled.button`
    width: 100%;
    padding: 12px;
    margin-bottom: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    border: none;
    border-radius: 10px;
    color: white;
    font-weight: 700;
    background: linear-gradient(120deg, #263b78, #4776e6);
    cursor: pointer;
    box-shadow: 0 6px 15px rgba(71, 118, 230, 0.2);

    &:hover {
        transform: translateY(-2px);
    }
`;

const SidebarBottom = styled.div`
    margin-top: auto;
    border-top: 1px solid #edf0f5;
    padding-top: 18px;
`;

const UserCard = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 8px 0;

    .avatar {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background: #eaf0ff;
        color: #4169d8;
        display: grid;
        place-items: center;
        font-weight: 800;
    }

    .details {
        min-width: 0;
        flex: 1;
    }

    strong {
        display: block;
        color: #26334d;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    small {
        color: #929bad;
        font-size: 11px;
    }
`;

// ======================
// MAIN CONTENT
// ======================

const Main = styled.main`
    width: calc(100% - 260px);
    min-height: 100vh;
    margin-left: 260px;
    padding: 30px 5% 55px;

    @media (max-width: 760px) {
        width: 100%;
        margin-left: 0;
        padding: 20px 16px 45px;
    }
`;

const Topbar = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    margin-bottom: 32px;
`;

const MenuButton = styled.button`
    display: none;
    border: 1px solid #e4e9f2;
    background: white;
    padding: 9px;
    border-radius: 9px;
    cursor: pointer;
    color: #263b78;

    @media (max-width: 760px) {
        display: flex;
    }
`;

const TopbarRight = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-left: auto;
`;

const Status = styled.span`
    color: #16845b;
    background: #e7f8ef;
    padding: 9px 14px;
    border-radius: 30px;
    font-size: 12px;
    font-weight: 600;
`;

const LogoutButton = styled.button`
    background: #fff0f0;
    color: #dc4545;
    border: 1px solid #ffe0e0;
    border-radius: 9px;
    padding: 10px 15px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background: #ffe4e4;
    }
`;

// ======================
// DASHBOARD HERO
// ======================

const Hero = styled.section`
    position: relative;
    overflow: hidden;
    padding: 43px;
    border-radius: 22px;
    color: white;
    background: linear-gradient(120deg, #263b78, #4776e6);
    box-shadow: 0 15px 35px rgba(44, 72, 145, 0.14);

    h1 {
        margin: 0 0 13px;
        font-size: clamp(25px, 4vw, 36px);
    }

    p {
        margin: 0;
        max-width: 650px;
        line-height: 1.7;
        color: #e1e9ff;
    }

    .hero-icon {
        position: absolute;
        right: 45px;
        bottom: 20px;
        opacity: 0.13;
    }

    @media (max-width: 600px) {
        padding: 28px 22px;

        .hero-icon {
            display: none;
        }
    }
`;

// ======================
// STATS
// ======================

const SectionTitle = styled.h2`
    margin: 32px 0 18px;
    font-size: 20px;
    color: #202b50;
`;

const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;

    @media (max-width: 500px) {
        grid-template-columns: 1fr;
    }
`;

const StatCard = styled.div`
    padding: 24px;
    border-radius: 17px;
    background: white;
    border: 1px solid #e9edf5;
    box-shadow: 0 5px 20px rgba(30, 50, 90, 0.04);

    .stat-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .stat-icon {
        width: 42px;
        height: 42px;
        border-radius: 12px;
        display: grid;
        place-items: center;
        background: #edf2ff;
        color: #4776e6;
    }

    span {
        color: #7b849b;
        font-size: 13px;
    }

    strong {
        display: block;
        margin-top: 12px;
        font-size: 30px;
        color: #263b78;
    }
`;

// ======================
// QUICK ACTIONS
// ======================

const QuickGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;

    @media (max-width: 850px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 500px) {
        grid-template-columns: 1fr;
    }
`;

const QuickCard = styled.button`
    text-align: left;
    background: white;
    border: 1px solid #e9edf5;
    border-radius: 15px;
    padding: 21px;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
        border-color: #9db7f8;
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgba(30, 50, 90, 0.06);
    }

    .quick-icon {
        color: #4776e6;
        margin-bottom: 14px;
    }

    h3 {
        color: #263b78;
        font-size: 15px;
        margin: 0 0 7px;
    }

    p {
        color: #8791a6;
        font-size: 12px;
        line-height: 1.6;
        margin: 0;
    }
`;

// ======================
// PAGE SECTIONS
// ======================

const PageHeading = styled.div`
    margin-bottom: 26px;

    h1 {
        color: #202b50;
        font-size: 28px;
        margin: 0 0 8px;
    }

    p {
        color: #7b849b;
        margin: 0;
        line-height: 1.6;
    }
`;

const Placeholder = styled.div`
    background: white;
    padding: 30px;
    border: 1px solid #e9edf5;
    border-radius: 16px;
    color: #7b849b;
    line-height: 1.7;

    h3 {
        color: #263b78;
        margin-top: 0;
    }
`;

const InfoRow = styled.div`
    padding: 15px 0;
    border-bottom: 1px solid #edf0f5;
    display: flex;
    align-items: center;
    gap: 12px;
    color: #526078;

    &:last-child {
        border-bottom: none;
    }
`;

// ======================
// LOGIN PAGE
// ======================


const LoginPage = styled.div`
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 35px;
    overflow: hidden;
    position: relative;
    background:
        radial-gradient(circle at 15% 20%, rgba(59,130,246,.22), transparent 35%),
        radial-gradient(circle at 85% 80%, rgba(139,92,246,.22), transparent 35%),
        #080e20;

    &::before,
    &::after {
        content: "";
        position: absolute;
        width: 350px;
        height: 350px;
        border-radius: 50%;
        filter: blur(100px);
        opacity: .25;
        pointer-events: none;
    }

    &::before {
        background: #2563eb;
        top: -150px;
        left: -100px;
    }

    &::after {
        background: #9333ea;
        bottom: -150px;
        right: -100px;
    }

    @media (max-width: 650px) {
        padding: 18px;
    }
`;

const LoginCard = styled.div`
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 1050px;
    min-height: 580px;
    display: grid;
    grid-template-columns: 1.1fr .9fr;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,.12);
    border-radius: 26px;
    background: rgba(17, 27, 52, .88);
    box-shadow: 0 30px 100px rgba(0,0,0,.4);
    backdrop-filter: blur(20px);

    @media (max-width: 760px) {
        grid-template-columns: 1fr;
        max-width: 470px;
        min-height: auto;
    }
`;

const LoginVisual = styled.div`
    padding: 55px 48px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: white;
    position: relative;
    overflow: hidden;
    background: linear-gradient(145deg, #172b60, #263b78 55%, #542b91);

    &::after {
        content: "";
        position: absolute;
        width: 320px;
        height: 320px;
        right: -100px;
        bottom: -120px;
        border: 1px solid rgba(255,255,255,.16);
        border-radius: 50%;
        box-shadow:
            0 0 0 35px rgba(255,255,255,.035),
            0 0 0 75px rgba(255,255,255,.025);
    }

    .brand {
        display: flex;
        align-items: center;
        gap: 13px;
        font-size: 25px;
        font-weight: 800;
        letter-spacing: 1px;
    }

    .brand img {
        width: 48px;
        height: 48px;
        object-fit: contain;
        border-radius: 12px;
    }

    .hero-content {
        position: relative;
        z-index: 1;
    }

    h1 {
        font-size: clamp(34px, 4vw, 48px);
        line-height: 1.2;
        margin: 0 0 20px;
        font-weight: 800;
    }

    p {
        color: #dbe5ff;
        font-size: 15px;
        line-height: 1.9;
        max-width: 390px;
    }

    .tagline {
        color: #b9ccff;
        font-size: 13px;
        letter-spacing: 2px;
        font-weight: 700;
    }

    @media (max-width: 760px) {
        padding: 30px;

        .hero-content {
            margin: 35px 0;
        }

        h1 {
            font-size: 32px;
        }
    }
`;

const LoginPanel = styled.div`
    padding: 55px 42px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #101a32;
    color: white;

    .welcome-label {
        color: #8baaff;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 2px;
        text-transform: uppercase;
        margin-bottom: 15px;
    }

    h2 {
        font-size: 30px;
        margin: 0 0 12px;
        color: #ffffff;
    }

    .description {
        color: #aab7d1;
        font-size: 14px;
        line-height: 1.8;
        margin-bottom: 35px;
    }

    .secure-note {
        color: #8190ac;
        font-size: 12px;
        text-align: center;
        margin-top: 22px;
        line-height: 1.7;
    }

    @media (max-width: 760px) {
        padding: 38px 28px;
    }
`;

const LoginButton = styled.button`
    width: 100%;
    min-height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 13px;
    background: #ffffff;
    color: #202b40;
    border: 1px solid #e1e5ec;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: all .25s ease;

    &:hover {
        background: #f0f4ff;
        transform: translateY(-3px);
        box-shadow: 0 12px 25px rgba(0,0,0,.2);
    }

    &:active {
        transform: translateY(0);
    }

    .google-icon {
        font-size: 23px;
        font-weight: 800;
        color: #4285F4;
    }
`;


const Overlay = styled.div`
    display: none;

    @media (max-width: 760px) {
        display: ${({ $open }) => ($open ? "block" : "none")};
        position: fixed;
        inset: 0;
        background: rgba(15, 23, 42, 0.35);
        z-index: 1050;
    }
`;

// ======================
// NAVIGATION
// ======================

const navigation = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "history", label: "Chat History", icon: History },
    { id: "resources", label: "Resources", icon: BookOpen },
    { id: "faq", label: "FAQ", icon: CircleHelp },
    { id: "profile", label: "My Profile", icon: UserRound },
    { id: "settings", label: "Settings", icon: Settings },
];

// ======================
// MAIN COMPONENT
// ======================

const DefaultLayout = () => {
    const { user, sessionKey } = useSelector(
        (state) => state.auth
    );

    const dispatch = useDispatch();

    const [activePage, setActivePage] = useState("dashboard");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [chatSessions, setChatSessions] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [historyError, setHistoryError] = useState("");

    // Restore logged-in user
    useEffect(() => {
        if (sessionKey && !user) {
            const fetchUser = async () => {
                try {
                    const response = await fetch(
                        "http://localhost:3000/api/auth/me",
                        {
                            headers: {
                                "x-session-key": sessionKey,
                            },
                        }
                    );

                    if (response.ok) {
                        const data = await response.json();

                        dispatch({
                            type: "SET_USER",
                            payload: data.user,
                        });
                    } else {
                        localStorage.removeItem("sessionKey");
                        dispatch({ type: "LOGOUT" });
                    }
                } catch (error) {
                    console.error("Fetch user error:", error);

                    localStorage.removeItem("sessionKey");
                    dispatch({ type: "LOGOUT" });
                }
            };

            fetchUser();
        }
    }, [sessionKey, user, dispatch]);

    useEffect(() => {
    if (!sessionKey || !user) return;

    const fetchChatSessions = async () => {
        setHistoryLoading(true);
        setHistoryError("");

        const result = await chatService.getSessions();

        if (result.success) {
            setChatSessions(result.data);
        } else {
            setHistoryError(result.error || "Failed to load chat history");
        }

        setHistoryLoading(false);
    };

    fetchChatSessions();
}, [sessionKey, user]);

    // Google login
    const handleLogin = () => {
        window.location.href =
            "http://localhost:3000/api/auth/google";
    };

    // Logout
    const handleLogout = async () => {
        try {
            await fetch(
                "http://localhost:3000/api/auth/logout",
                {
                    method: "POST",
                    credentials: "include",
                }
            );

            dispatch({ type: "LOGOUT" });
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const handleNavigation = (id) => {
    if (id === "new-chat") {
        dispatch(clearMessages());
        localStorage.removeItem("chatbot_messages");
    }

    setActivePage(id);
    setSidebarOpen(false);
};

const handleOpenHistory = async (sessionId) => {
    const result = await chatService.getChatHistory(sessionId);

    if (!result.success) {
        setHistoryError(result.error || "Unable to load conversation");
        return;
    }

    const formattedMessages = result.data.map((message) => ({
        id: message.id,
        sender: message.role === "user" ? "user" : "bot",
        text: message.content || "",
        timestamp: message.timestamp,
        userReaction: message.userReaction || null,
    }));

    localStorage.setItem(
        "chatbot_messages",
        JSON.stringify(formattedMessages)
    );

    dispatch({
        type: LOAD_MESSAGES_FROM_STORAGE,
        payload: formattedMessages,
    });

    setActivePage("new-chat");
    setSidebarOpen(false);
};

    
// Login screen
if (!sessionKey || !user) {
    return (
        <LoginPage>
            <LoginCard>
                <LoginVisual>
                    <div className="brand">
                        <img src="/chat-bot.png" alt="NEXORA" />
                        <span>NEXORA</span>
                    </div>

                    <div className="hero-content">
                        <h1>
                            Your next chapter
                            <br />
                            starts here.
                        </h1>

                        <p>
                            Discover a smarter way to learn, explore
                            technology and grow your skills with your
                            intelligent AI companion.
                        </p>

                        <div className="tagline">
                            LEARN. BUILD. GROW.
                        </div>
                    </div>

                    <div style={{
                        color: "#b9ccff",
                        fontSize: "12px",
                        letterSpacing: "1px"
                    }}>
                        YOUR LEARNING JOURNEY STARTS WITH NEXORA
                    </div>
                </LoginVisual>

                <LoginPanel>
                    <div className="welcome-label">
                        Welcome to NEXORA
                    </div>

                    <h2>Welcome back!</h2>

                    <p className="description">
                        Sign in to your account and continue your
                        journey towards smarter learning and
                        endless possibilities.
                    </p>

                    <LoginButton onClick={handleLogin}>
                        <span className="google-icon">G</span>
                        Continue with Google
                    </LoginButton>

                    <p className="secure-note">
                        <ShieldCheck
                            size={15}
                            style={{
                                verticalAlign: "middle",
                                marginRight: "6px"
                            }}
                        />
                        Secure authentication powered by Google.
                        <br />
                        Your account is protected.
                    </p>
                </LoginPanel>
            </LoginCard>
        </LoginPage>
    );
}

    const usage = user.monthlyUsage || {};

    const questionsUsed = usage.questionsAsked ?? 0;
    const usageLimit = usage.limit ?? 0;

    // ======================
    // PAGE CONTENT
    // ======================

    const renderPage = () => {
        switch (activePage) {
            case "dashboard":
                return (
                    <>
                        <Hero>
                            <h1>
                                Welcome back, {user.name}! 👋
                            </h1>

                            <p>
                                Welcome to your Nexora workspace.
                                Your AI assistant is ready to help you
                                with accounts, links, orders and support.
                            </p>

                            <Sparkles
                                className="hero-icon"
                                size={150}
                            />
                        </Hero>

                        <SectionTitle>
                            Account Overview
                        </SectionTitle>

                        <StatsGrid>
                            <StatCard>
                                <div className="stat-top">
                                    <span>Monthly questions used</span>
                                    <div className="stat-icon">
                                        <MessageSquare size={20} />
                                    </div>
                                </div>

                                <strong>{questionsUsed}</strong>
                            </StatCard>

                            <StatCard>
                                <div className="stat-top">
                                    <span>Monthly usage limit</span>
                                    <div className="stat-icon">
                                        <Activity size={20} />
                                    </div>
                                </div>

                                <strong>{usageLimit}</strong>
                            </StatCard>
                        </StatsGrid>

                        <SectionTitle>
                            Quick Actions
                        </SectionTitle>

                        <QuickGrid>
                            <QuickCard
                                onClick={() => handleNavigation("new-chat")}
                            >
                                <MessageSquare
                                    className="quick-icon"
                                    size={25}
                                />
                                <h3>Start a New Chat</h3>
                                <p>
                                    Get instant help from your AI assistant.
                                </p>
                            </QuickCard>

                            <QuickCard
                                onClick={() => handleNavigation("history")}
                            >
                                <History
                                    className="quick-icon"
                                    size={25}
                                />
                                <h3>Chat History</h3>
                                <p>
                                    Access your previous conversations.
                                </p>
                            </QuickCard>

                            <QuickCard
                                onClick={() => handleNavigation("resources")}
                            >
                                <BookOpen
                                    className="quick-icon"
                                    size={25}
                                />
                                <h3>Explore Resources</h3>
                                <p>
                                    Find helpful platform resources.
                                </p>
                            </QuickCard>
                        </QuickGrid>

                        <SectionTitle>
                            Your AI Assistant
                        </SectionTitle>

                        <Placeholder>
                            <InfoRow>
                                <Sparkles color="#4776e6" />
                                <strong>Nexora Assistant is ready to help.</strong>
                            </InfoRow>

                            <p>
                                Click New Conversation in the sidebar to start chatting with your AI assistant.
                            </p>
                        </Placeholder>
                    </>
                );

            case "new-chat":
                return <ChatBotWidget />;
                    

            case "history":
    return (
        <>
            <PageHeading>
                <h1>Chat History</h1>
                <p>Your previous conversations.</p>
            </PageHeading>

            <Placeholder>
                <h3>Your Conversations</h3>

                {historyLoading && <p>Loading conversations...</p>}

                {historyError && (
                    <p style={{ color: "red" }}>{historyError}</p>
                )}

                {!historyLoading &&
                    !historyError &&
                    chatSessions.length === 0 && (
                        <p>No previous conversations found.</p>
                    )}

                {chatSessions.map((session) => (
    <InfoRow
        key={session.sessionId}
        onClick={() => handleOpenHistory(session.sessionId)}
        style={{
            cursor: "pointer",
            borderRadius: "8px",
            padding: "15px 10px",
            transition: "background 0.2s ease",
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.background = "#f0f4fc";
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
        }}
    >
        <History size={20} color="#4776e6" />

        <div>
            <strong>{session.title || "New Conversation"}</strong>
            <p style={{ margin: "5px 0", fontSize: "12px" }}>
                {session.messageCount || 0} messages
            </p>
        </div>
    </InfoRow>
))}
            </Placeholder>
        </>
    );
            case "resources":
                 return <ResourcesTab />;

           case "faq":
                 return <FaqTab />;

            case "profile":
                return (
                    <>
                        <PageHeading>
                            <h1>My Profile</h1>
                            <p>
                                Your Nexora account information.
                            </p>
                        </PageHeading>

                        <Placeholder>
                            <UserRound
                                size={40}
                                color="#4776e6"
                            />

                            <h3>{user.name}</h3>

                            <InfoRow>
                                <UserRound size={18} />
                                Account name: {user.name}
                            </InfoRow>

                            <InfoRow>
                                <Mail size={18} />
                                Email: {user.email || "Not provided"}
                            </InfoRow>

                            <InfoRow>
                                <ShieldCheck size={18} />
                                Account status: Active
                            </InfoRow>
                        </Placeholder>
                    </>
                );

            case "settings":
                return (
                    <>
                        <PageHeading>
                            <h1>Settings</h1>
                            <p>
                                Manage your application preferences.
                            </p>
                        </PageHeading>

                        <Placeholder>
                            <Settings
                                size={40}
                                color="#4776e6"
                            />

                            <h3>Application Settings</h3>

                            <InfoRow>
                                <ShieldCheck size={18} />
                                Authentication: Google OAuth
                            </InfoRow>

                            <InfoRow>
                                <Activity size={18} />
                                AI Assistant: Gemini
                            </InfoRow>

                            <InfoRow>
                                <Clock3 size={18} />
                                Monthly usage: {questionsUsed} / {usageLimit}
                            </InfoRow>

                            <p>
                                Additional preferences will be implemented
                                in the next development stage.
                            </p>
                        </Placeholder>
                    </>
                );

            default:
                return null;
        }
    };

    // ======================
    // APPLICATION UI
    // ======================

    return (
        <AppLayout>
            <Overlay
                $open={sidebarOpen}
                onClick={() => setSidebarOpen(false)}
            />

            <Sidebar $open={sidebarOpen}>
                <Brand>
                    <div className="brand-icon">
  <img
    src="/chat-bot.png"
    alt="NEXORA"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "contain",
    }}
  />
</div>

                    <h2>
                        Nexora <span>Assistant</span>
                    </h2>
                </Brand>

                <NewChatButton
                    onClick={() => handleNavigation("new-chat")}
                >
                    <Plus size={18} />
                    New Conversation
                </NewChatButton>

                <NavLabel>Workspace</NavLabel>

                {navigation.map(({ id, label, icon: Icon }) => (
                    <NavButton
                        key={id}
                        $active={activePage === id}
                        onClick={() => handleNavigation(id)}
                    >
                        <Icon size={18} />
                        {label}

                        {activePage === id && (
                            <ChevronRight
                                size={16}
                                style={{ marginLeft: "auto" }}
                            />
                        )}
                    </NavButton>
                ))}

                <SidebarBottom>
                    <NavButton onClick={handleLogout}>
                        <LogOut size={18} />
                        Logout
                    </NavButton>

                    <UserCard>
                        <div className="avatar">
                            {user.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>

                        <div className="details">
                            <strong>{user.name}</strong>
                            <small>Active account</small>
                        </div>
                    </UserCard>
                </SidebarBottom>
            </Sidebar>

           <Main>
    {activePage !== "new-chat" && (
        <Topbar>
            <MenuButton
                onClick={() => setSidebarOpen(true)}
                aria-label="Open navigation"
            >
                <Menu size={21} />
            </MenuButton>

            <TopbarRight>
                <Status>● Account active</Status>

                <LogoutButton onClick={handleLogout}>
                    <LogOut
                        size={14}
                        style={{
                            verticalAlign: "middle",
                            marginRight: 5,
                        }}
                    />
                    Logout
                </LogoutButton>
            </TopbarRight>
        </Topbar>
    )}

    {renderPage()}
</Main>

           
        </AppLayout>
    );
};

export default DefaultLayout;
