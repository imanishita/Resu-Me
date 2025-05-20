import { useState } from 'react';

const initialFormData = {
  name: '',
  contact: { phone: '', email: '', website: '', address: '', social: '' },
  education: [{ institution: '', degree: '', gpa: '' }],
  projects: [{ title: '', tools: '', bullets: [''] }],
  certificates: [''],
  skills: [''],
};

const Handler = () => {
  const [formData, setFormData] = useState(initialFormData);

  // For flat and nested fields like "contact.phone"
  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');

    setFormData((prev) => {
      const newData = { ...prev };

      if (keys.length === 2) {
        const [parent, child] = keys;
        newData[parent] = {
          ...newData[parent],
          [child]: value,
        };
      } else {
        newData[name] = value;
      }

      return newData;
    });
  };

  // For nested arrays of objects like education, projects
  const handleNestedArrayChange = (e, parentIndex, fieldName, section) => {
    const { value } = e.target;

    setFormData((prev) => {
      const updated = [...prev[section]];
      updated[parentIndex] = {
        ...updated[parentIndex],
        [fieldName]: value,
      };

      return {
        ...prev,
        [section]: updated,
      };
    });
  };

  // Specific handler for bullet points
  const handleBulletChange = (e, projectIndex, bulletIndex) => {
    const { value } = e.target;

    setFormData((prev) => {
      const updatedProjects = [...prev.projects];
      const updatedBullets = [...updatedProjects[projectIndex].bullets];
      updatedBullets[bulletIndex] = value;
      
      updatedProjects[projectIndex] = {
        ...updatedProjects[projectIndex],
        bullets: updatedBullets,
      };

      return {
        ...prev,
        projects: updatedProjects,
      };
    });
  };

  // For simple arrays like certificates, skills
  const handleArrayChange = (e, index, section) => {
    const { value } = e.target;

    setFormData((prev) => {
      const updated = [...prev[section]];
      updated[index] = value;

      return {
        ...prev,
        [section]: updated,
      };
    });
  };

  // Add new entries to array sections
  const addEducation = () => {
    setFormData((prev) => {
      return {
        ...prev,
        education: [...prev.education, { institution: '', degree: '', gpa: '' }],
      };
    });
  };

  // Function to add a new project
  const addProject = () => {
    console.log("Adding project");
    setFormData((prevState) => {
      console.log("Previous state:", prevState);
      const newProjects = [...prevState.projects, { title: '', tools: '', bullets: [''] }];
      console.log("New projects array:", newProjects);
      return {
        ...prevState,
        projects: newProjects
      };
    });
  };

  const addCertificate = () => {
    setFormData((prev) => {
      return {
        ...prev,
        certificates: [...prev.certificates, ''],
      };
    });
  };

  const addSkill = () => {
    setFormData((prev) => {
      return {
        ...prev,
        skills: [...prev.skills, ''],
      };
    });
  };

  // Add bullet to a project
  const handleAddBullet = (projectIndex) => {
    setFormData((prev) => {
      const updatedProjects = [...prev.projects];
      updatedProjects[projectIndex] = {
        ...updatedProjects[projectIndex],
        bullets: [...updatedProjects[projectIndex].bullets, ''],
      };
      return {
        ...prev,
        projects: updatedProjects,
      };
    });
  };

  // Delete item from arrays or nested arrays
  const handleDelete = (index, section, bulletIndex = null) => {
    setFormData((prev) => {
      // If we're deleting a bullet point
      if (bulletIndex !== null && section === 'projects') {
        const updatedProjects = [...prev.projects];
        const project = {...updatedProjects[index]};
        const updatedBullets = [...project.bullets];
        
        // Remove the bullet at bulletIndex
        updatedBullets.splice(bulletIndex, 1);
        
        // If there are no bullets left, add an empty one
        if (updatedBullets.length === 0) {
          updatedBullets.push('');
        }
        
        project.bullets = updatedBullets;
        updatedProjects[index] = project;
        
        return {
          ...prev,
          projects: updatedProjects
        };
      } 
      // If we're deleting a whole section item
      else {
        const updated = [...prev[section]];
        updated.splice(index, 1);
        
        // If the array becomes empty, ensure there's at least one empty item
        if (updated.length === 0) {
          if (section === 'education') {
            updated.push({ institution: '', degree: '', gpa: '' });
          } else if (section === 'projects') {
            updated.push({ title: '', tools: '', bullets: [''] });
          } else {
            updated.push('');
          }
        }
        
        return {
          ...prev,
          [section]: updated,
        };
      }
    });
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted form data:', formData);
    alert('Resume data submitted! (Check console)');
  };

  return {
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
    handleSubmit,
  };
};

export default Handler;