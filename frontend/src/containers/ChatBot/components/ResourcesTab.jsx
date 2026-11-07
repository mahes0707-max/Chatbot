
import React from "react";
import { ResourcesContainer } from "../ChatBotWidget.styles";

const resourceCategories = [
    {
        title: "Programming & DSA",
        description:
            "Learn C, C++, Java, Python, problem-solving and coding practice.",
        links: [
            { name: "LeetCode", url: "https://leetcode.com/" },
            { name: "HackerRank", url: "https://www.hackerrank.com/" },
            { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/" },
        ],
    },
    {
        title: "AI, ML & Data Science",
        description:
            "Explore machine learning, deep learning, datasets and AI tools.",
        links: [
            { name: "Kaggle", url: "https://www.kaggle.com/" },
            {
                name: "Google ML Crash Course",
                url: "https://developers.google.com/machine-learning/crash-course",
            },
            { name: "Hugging Face", url: "https://huggingface.co/" },
        ],
    },
    {
        title: "Computer Science Fundamentals",
        description:
            "Study DBMS, Operating Systems, Computer Networks, OOPS and software engineering.",
        links: [
            { name: "NPTEL", url: "https://nptel.ac.in/" },
            { name: "roadmap.sh", url: "https://roadmap.sh/" },
        ],
    },
    {
        title: "Web & Software Development",
        description:
            "Learn HTML, CSS, JavaScript, React, backend development and APIs.",
        links: [
            { name: "freeCodeCamp", url: "https://www.freecodecamp.org/" },
            { name: "MDN Web Docs", url: "https://developer.mozilla.org/" },
            { name: "GitHub", url: "https://github.com/" },
        ],
    },
    {
        title: "Engineering Learning",
        description:
            "Access online courses, technical subjects and university learning materials.",
        links: [
            { name: "SWAYAM", url: "https://swayam.gov.in/" },
            { name: "MIT OpenCourseWare", url: "https://ocw.mit.edu/" },
        ],
    },
    {
        title: "Career & Placement",
        description:
            "Prepare for aptitude tests, interviews, resume building and internships.",
        links: [
            { name: "IndiaBIX", url: "https://www.indiabix.com/" },
            { name: "Internshala", url: "https://internshala.com/" },
            { name: "LinkedIn Jobs", url: "https://www.linkedin.com/jobs/" },
        ],
    },
];

const ResourcesTab = () => {
    return (
        <ResourcesContainer
  style={{
    display: "block",
    width: "100%",
    minHeight: "calc(100vh - 100px)",
    height: "auto",
    maxWidth: "none",
    maxHeight: "none",
    padding: "32px 40px",
    overflow: "visible",
    boxSizing: "border-box",
  }}
>
            <div style={{ marginBottom: "28px" }}>
                <h2 style={{ color: "#202b50", marginBottom: "8px" }}>
                    Student Learning Resources
                </h2>
                <p style={{ color: "#7b849b", lineHeight: 1.7 }}>
                    Explore useful learning platforms and websites for CSE,
                    AI & Data Science and other engineering students.
                </p>
            </div>

            {resourceCategories.map((category, index) => (
                <section
                    key={category.title}
                    style={{
                        padding: "20px 0",
                        borderBottom:
                            index !== resourceCategories.length - 1
                                ? "1px solid #e9edf5"
                                : "none",
                    }}
                >
                    <h3
                        style={{
                            color: "#263b78",
                            fontSize: "17px",
                            marginBottom: "8px",
                        }}
                    >
                        {index + 1}. {category.title}
                    </h3>

                    <p
                        style={{
                            color: "#68738a",
                            fontSize: "14px",
                            lineHeight: 1.7,
                            marginBottom: "12px",
                        }}
                    >
                        {category.description}
                    </p>

                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "8px 18px",
                        }}
                    >
                        {category.links.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    color: "#4776e6",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    textDecoration: "none",
                                }}
                            >
                                {link.name} ↗
                            </a>
                        ))}
                    </div>
                </section>
            ))}
        </ResourcesContainer>
    );
};

export default ResourcesTab;
