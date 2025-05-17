import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Link } from 'react-router-dom';
import './Resume.css';

const Resume = ({ resumeData = {} }) => {
    const resumeRef = useRef();

    // Safely structure the resume data with defaults
    const data = {
        name: resumeData.name || 'Your Name',
        contact: {
            phone: resumeData.contact?.phone || '(123) 456-7890',
            email: resumeData.contact?.email || 'your.email@example.com',
            social: resumeData.contact?.website || 'abc.com',
            address: resumeData.contact?.address || 'City, Country'
        },
        education: Array.isArray(resumeData.education) ? resumeData.education : [{
            institution: 'Your University',
            degree: 'Your Degree',
            gpa: 'X.X GPA'
        }],
        projects: Array.isArray(resumeData.projects) ? resumeData.projects : [{
            title: 'Project Name',
            tools: 'Tools Used',
            bullets: ['Project description point 1', 'Project description point 2']
        }],
        certificates: Array.isArray(resumeData.certificates) ? resumeData.certificates : ['Certificate 1'],
        skills: Array.isArray(resumeData.skills) ? resumeData.skills : ['Skill 1', 'Skill 2']
    };

    const handleDownload = () => {
        const input = resumeRef.current;
        html2canvas(input, { scale: 2 }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('resume.pdf');
        });
    };

    return (
        <div className="resume-page">
            <div className="button-container">
                <Link to="/">
                    <button className="home-button">
                        <i className="fas fa-arrow-left" style={{marginRight: "10px"}}></i> Home 
                    </button>
                </Link>
            </div>

            <div id="resume" className="resume-container" ref={resumeRef}>
                {/* Header Section */}
                <div className="header-section">
                    <h1 className="name">{data.name}</h1>
                    <div className="contact-line">
                        {data.contact.phone} | {data.contact.email} | {data.contact.social}
                    </div>
                    <div className="address">{data.contact.address}</div>
                </div>

                {/* Education Section */}
                <div className="section">
                    <h2 className="section-title">EDUCATION</h2>
                    <ul className="education-list">
                        {data.education.map((edu, index) => (
                            <li key={index} className="education-item">
                                <div className="institution-name">{edu.institution}</div>
                                <div className="degree-info">{edu.degree}</div>
                                {edu.gpa && <div className="gpa">{edu.gpa}</div>}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Projects Section */}
                <div className="section">
                    <h2 className="section-title">PROJECTS</h2>
                    {data.projects.map((project, index) => (
                        <div key={index} className="project-item">
                            <div className="project-name">{project.title}</div>
                            <div className="project-tools">{project.tools}</div>
                            <ul className="project-description">
                                {project.bullets.map((bullet, bulletIndex) => (
                                    <li key={bulletIndex}>{bullet}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Certifications Section */}
                <div className="section">
                    <h2 className="section-title">CERTIFICATIONS</h2>
                    <ul className="certification-list">
                        {data.certificates.map((cert, index) => (
                            <li key={index} className="certification-item">{cert}</li>
                        ))}
                    </ul>
                </div>

                {/* Skills Section */}
                <div className="section">
                    <h2 className="section-title">SKILLS</h2>
                    <div className="skills-section">
                        {data.skills.map((skill, index) => (
                            <span key={index} className="skill-item">{skill}</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="download-button-container">
                <button className="download-button" onClick={handleDownload}>
                    <i className="fas fa-download"></i> Download Resume
                </button>
            </div>
        </div>
    );
};

export default Resume;
