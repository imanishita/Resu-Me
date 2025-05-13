// resume.js
import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Link } from 'react-router-dom';
import './Resume.css';

const Resume = ({ resumeData }) => {
    const resumeRef = useRef();

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
        <div>
            <div className="button-container">
                <Link to="/">
                    <button className="home-button">
                        <i className="fas fa-arrow-left" style={{marginRight: "10px"}}></i> Home 
                    </button>
                </Link>
            </div>
            <div id="resume" className="resume-container" ref={resumeRef}>
                <div className="header-section">
                    <h1 className="name">{resumeData.name || 'FULL NAME'}</h1>
                    <div className="contact-line">
                        {resumeData.contact?.phone} | {resumeData.contact?.email} | {resumeData.contact?.social}
                    </div>
                    <div className="address">
                        {resumeData.contact?.address}
                    </div>
                </div>

                <div className="section">
                    <h2 className="section-title">EDUCATION</h2>
                    <ul className="education-list">
                        {resumeData.education?.map((edu, index) => (
                            <li key={index} className="education-item">
                                <div className="institution-name">{edu.institution}</div>
                                <div className="degree-info">{edu.degree}</div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="section">
                    <h2 className="section-title">PROJECTS</h2>
                    {resumeData.projects?.map((project, index) => (
                        <div key={index} className="project-item">
                            <div className="project-name">{project.title}</div>
                            <div className="project-tools">{project.tools}</div>
                            <ul className="project-description">
                                {project.bullets?.map((bullet, bulletIndex) => (
                                    <li key={bulletIndex}>{bullet}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="section">
                    <h2 className="section-title">CERTIFICATIONS</h2>
                    <ul className="certification-list">
                        {resumeData.certificates?.map((cert, index) => (
                            <li key={index} className="certification-item">{cert}</li>
                        ))}
                    </ul>
                </div>

                <div className="section">
                    <h2 className="section-title">SKILLS</h2>
                    <div className="skills-section">
                        {resumeData.skills?.map((skill, index) => (
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