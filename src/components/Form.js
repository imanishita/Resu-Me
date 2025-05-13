import React from 'react';
import './Form.css';

const Form = ({
    formData,
    handleChange,
    handleArrayChange,
    handleNestedArrayChange,
    handleAddBullet,
    handleDelete,
    addEducation,
    addProject,
    addCertificate,
    addSkill,
    handleSubmit
}) => {
    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2><i className="fas fa-user"></i> Personal Info</h2>
            <input
                className="form-input"
                type="text"
                name="name"
                placeholder="FULL NAME"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <input
                className="form-input"
                type="text"
                name="contact.phone"
                placeholder="Phone (e.g., +1-234-567-8900)"
                value={formData.contact.phone}
                onChange={handleChange}
                required
            />
            <input
                className="form-input"
                type="email"
                name="contact.email"
                placeholder="Email"
                value={formData.contact.email}
                onChange={handleChange}
                required
            />
            <input
                className="form-input"
                type="text"
                name="contact.website"
                placeholder="Website (e.g., yourwebsite.com)"
                value={formData.contact.website}
                onChange={handleChange}
            />
            <input
                className="form-input"
                type="text"
                name="contact.social"
                placeholder="Social Media Handles (e.g., your-profile | your-username)"
                value={formData.contact.social}
                onChange={handleChange}
            />
            <input
                className="form-input"
                type="text"
                name="contact.address"
                placeholder="Address (e.g., Your City, Your State - Your ZIP, Your Country)"
                value={formData.contact.address}
                onChange={handleChange}
            />

            {/* Removed Objective section */}

            {/* Removed Experience section */}

            <h2><i className="fas fa-graduation-cap"></i> Education</h2>
            {formData.education.map((edu, index) => (
                <div key={index} className="nested-form-group">
                    <input
                        className="form-input"
                        type="text"
                        placeholder="University Name"
                        value={edu.institution}
                        onChange={(e) => handleNestedArrayChange(e, index, 'institution', 'education')}
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Degree Name"
                        value={edu.degree}
                        onChange={(e) => handleNestedArrayChange(e, index, 'degree', 'education')}
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="GPA (e.g., X.XX/4.00)"
                        value={edu.gpa}
                        onChange={(e) => handleNestedArrayChange(e, index, 'gpa', 'education')}
                    />
                    <button type="button" className="delete-button" onClick={() => handleDelete(index, 'education')}>
                        Delete Education
                    </button>
                </div>
            ))}
            <button type="button" className="add-button" onClick={addEducation}>
                Add Education
            </button>

            <h2><i className="fas fa-tasks"></i> Projects</h2>
            {formData.projects.map((project, index) => (
                <div key={index} className="nested-form-group">
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Project Name: [Brief Description]"
                        value={project.title}
                        onChange={(e) => handleNestedArrayChange(e, index, 'title', 'projects')}
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Tools: [List of tools and technologies used]"
                        value={project.tools}
                        onChange={(e) => handleNestedArrayChange(e, index, 'tools', 'projects')}
                    />
                    {project.bullets.map((bullet, bulletIndex) => (
                        <div key={bulletIndex} className="bullet-group">
                            <input
                                className="form-input bullet-input"
                                type="text"
                                placeholder="• Bullet point (e.g., Developed [specific feature/system])"
                                value={bullet}
                                onChange={(e) => handleNestedArrayChange(e, index, bulletIndex, 'projects', 'bullets')}
                            />
                            <button 
                                type="button" 
                                className="delete-button" 
                                onClick={() => handleDelete(index, bulletIndex, 'projects', 'bullets')}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                    <button 
                        type="button" 
                        className="add-button" 
                        onClick={() => handleAddBullet(index, 'projects')}
                    >
                        Add Bullet Point
                    </button>
                    <button type="button" className="delete-button" onClick={() => handleDelete(index, 'projects')}>
                        Delete Project
                    </button>
                </div>
            ))}
            <button type="button" className="add-button" onClick={addProject}>
                Add Project
            </button>

            {/* Removed Patents and Publications section */}

            <h2><i className="fas fa-award"></i> Certifications</h2>
            {formData.certificates.map((cert, index) => (
                <div key={index} className="nested-form-group">
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Certification Name"
                        value={cert}
                        onChange={(e) => handleArrayChange(e, index, 'certificates')}
                    />
                    <button type="button" className="delete-button" onClick={() => handleDelete(index, 'certificates')}>
                        Delete Certification
                    </button>
                </div>
            ))}
            <button type="button" className="add-button" onClick={addCertificate}>
                Add Certification
            </button>

            <h2><i className="fas fa-cogs"></i> Skills</h2>
            {formData.skills.map((skill, index) => (
                <div key={index} className="nested-form-group">
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Skill (e.g., Java, React)"
                        value={skill}
                        onChange={(e) => handleArrayChange(e, index, 'skills')}
                    />
                    <button type="button" className="delete-button" onClick={() => handleDelete(index, 'skills')}>
                        Delete Skill
                    </button>
                </div>
            ))}
            <button type="button" className="add-button" onClick={addSkill}>
                Add Skill
            </button>

            <button type="submit" className="submit-button">
                Generate Resume
            </button>
        </form>
    );
};

export default Form;