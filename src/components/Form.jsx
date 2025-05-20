import React from 'react';
import './Form.css';

const Form = ({
    formData,
    handleChange,
    handleNestedArrayChange,
    handleArrayChange,
    handleBulletChange,
    addEducation,
    addProject,
    addCertificate,
    addSkill,
    handleAddBullet,
    handleDelete,
    handleSubmit
}) => {
    return (
        <form onSubmit={handleSubmit} className="form-container">
            {/* Personal Info (No changes) */}
            <section>
                <h2>Personal Info</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    className="form-input"
                />
                <input
                    type="text"
                    name="contact.phone"
                    placeholder="Phone Number"
                    value={formData.contact?.phone || ''}
                    onChange={handleChange}
                    className="form-input"
                />
                <input
                    type="email"
                    name="contact.email"
                    placeholder="Email"
                    value={formData.contact?.email || ''}
                    onChange={handleChange}
                    className="form-input"
                />
                <input
                    type="text"
                    name="contact.website"
                    placeholder="Website URL"
                    value={formData.contact?.website || ''}
                    onChange={handleChange}
                    className="form-input"
                />
                <input
                    type="text"
                    name="contact.social"
                    placeholder="Social Links"
                    value={formData.contact?.social || ''}
                    onChange={handleChange}
                    className="form-input"
                />
                <input
                    type="text"
                    name="contact.address"
                    placeholder="Address"
                    value={formData.contact?.address || ''}
                    onChange={handleChange}
                    className="form-input"
                />
            </section>

            {/* Education Section (No changes) */}
            <section>
                <h2>Education</h2>
                {formData.education && formData.education.map((edu, index) => (
                    <div key={index} className="nested-form-group">
                        <input
                            type="text"
                            placeholder="Institution Name"
                            value={edu.institution || ''}
                            onChange={(e) => handleNestedArrayChange(e, index, 'institution', 'education')}
                            className="form-input"
                        />
                        <input
                            type="text"
                            placeholder="Degree"
                            value={edu.degree || ''}
                            onChange={(e) => handleNestedArrayChange(e, index, 'degree', 'education')}
                            className="form-input"
                        />
                        <input
                            type="text"
                            placeholder="GPA/Percentage"
                            value={edu.gpa || ''}
                            onChange={(e) => handleNestedArrayChange(e, index, 'gpa', 'education')}
                            className="form-input"
                        />
                        <button
                            type="button"
                            className="delete-button"
                            onClick={() => handleDelete(index, 'education')}
                        >
                            Delete Education
                        </button>
                    </div>
                ))}
                <button type="button" className="add-button" onClick={addEducation}>
                    Add Education
                </button>
            </section>

            {/* Projects Section (Updated Structure) */}
            <section className="projects-section">
                <h2>Projects</h2>
                {formData.projects && formData.projects.map((project, projectIndex) => (
                    <div key={projectIndex} className="nested-form-group project-item">
                        <div className="project-inputs">
                            <input
                                type="text"
                                placeholder="Project Name"
                                value={project.title || ''}
                                onChange={(e) => handleNestedArrayChange(e, projectIndex, 'title', 'projects')}
                                className="form-input project-name-input"
                            />
                            <input
                                type="text"
                                placeholder="Tools Used"
                                value={project.tools || ''}
                                onChange={(e) => handleNestedArrayChange(e, projectIndex, 'tools', 'projects')}
                                className="form-input project-tools-input"
                            />
                        </div>

                        <div className="bullet-point-area">
                            <h4>Bullet Points:</h4>
                            {project.bullets && project.bullets.map((bullet, bulletIndex) => (
                                <div key={bulletIndex} className="bullet-item-controls">
                                    <input
                                        type="text"
                                        className="bullet-input"
                                        value={bullet || ''}
                                        placeholder="Bullet point"
                                        onChange={(e) => handleBulletChange(e, projectIndex, bulletIndex)}
                                    />
                                    <button
                                        type="button"
                                        className="delete-button bullet-delete-button"
                                        onClick={() => handleDelete(projectIndex, 'projects', bulletIndex)}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="add-button add-bullet-point-button"
                                onClick={() => handleAddBullet(projectIndex)}
                            >
                                Add Bullet Point
                            </button>
                        </div>

                        <button
                            type="button"
                            className="delete-button delete-project-button"
                            onClick={() => handleDelete(projectIndex, 'projects')}
                        >
                            Delete Project
                        </button>
                    </div>
                ))}
                <button type="button" className="add-button add-project-button" onClick={addProject}>
                    Add Project
                </button>
            </section>

            {/* Certificates Section (No changes) */}
            <section>
                <h2>Certificates</h2>
                {formData.certificates && formData.certificates.map((cert, index) => (
                    <div key={index} className="nested-form-group">
                        <input
                            type="text"
                            placeholder="Certificate"
                            value={cert || ''}
                            onChange={(e) => handleArrayChange(e, index, 'certificates')}
                            className="form-input"
                        />
                        <button
                            type="button"
                            className="delete-button"
                            onClick={() => handleDelete(index, 'certificates')}
                        >
                            Delete Certificate
                        </button>
                    </div>
                ))}
                <button type="button" className="add-button" onClick={addCertificate}>
                    Add Certificate
                </button>
            </section>

            {/* Skills Section (No changes) */}
            <section>
                <h2>Skills</h2>
                {formData.skills && formData.skills.map((skill, index) => (
                    <div key={index} className="nested-form-group">
                        <input
                            type="text"
                            placeholder="Skill"
                            value={skill || ''}
                            onChange={(e) => handleArrayChange(e, index, 'skills')}
                            className="form-input"
                        />
                        <button
                            type="button"
                            className="delete-button"
                            onClick={() => handleDelete(index, 'skills')}
                        >
                            Delete Skill
                        </button>
                    </div>
                ))}
                <button type="button" className="add-button" onClick={addSkill}>
                    Add Skill
                </button>
            </section>

            <button type="submit" className="submit-button">
                Submit Resume
            </button>
        </form>
    );
};

export default Form;