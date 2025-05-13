import { useState, useEffect } from 'react';

const useFormHandlers = () => {
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        contact: {
            phone: '',
            email: '',
            social: '',
            website: '',
            address: ''
        },
        education: [{
            institution: '',
            degree: '',
            gpa: ''
        }],
        projects: [{
            title: '',
            tools: '',
            bullets: ['']
        }],
        certificates: [''],
        skills: []
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const keys = name.split('.');
        
        if (keys.length > 1) {
            setFormData(prevState => ({
                ...prevState,
                [keys[0]]: {
                    ...prevState[keys[0]],
                    [keys[1]]: value
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleArrayChange = (e, index, field) => {
        const newValue = e.target.value;
        setFormData(prev => {
            const newArray = [...prev[field]];
            newArray[index] = newValue;
            return { ...prev, [field]: newArray };
        });
    };

    const handleNestedArrayChange = (e, index, field, parentField, subField = null) => {
        const newValue = e.target.value;
        setFormData(prev => {
            const newArray = [...prev[parentField]];
            if (subField) {
                newArray[index] = {
                    ...newArray[index],
                    [subField]: newValue
                };
            } else {
                newArray[index] = {
                    ...newArray[index],
                    [field]: newValue
                };
            }
            return { ...prev, [parentField]: newArray };
        });
    };

    const handleBulletChange = (e, parentIndex, bulletIndex, parentField) => {
        const newValue = e.target.value;
        setFormData(prev => {
            const newArray = [...prev[parentField]];
            newArray[parentIndex] = {
                ...newArray[parentIndex],
                bullets: newArray[parentIndex].bullets.map((bullet, idx) => 
                    idx === bulletIndex ? newValue : bullet
                )
            };
            return { ...prev, [parentField]: newArray };
        });
    };

    const handleAddBullet = (parentIndex, parentField) => {
        setFormData(prev => {
            const newArray = [...prev[parentField]];
            newArray[parentIndex] = {
                ...newArray[parentIndex],
                bullets: [...newArray[parentIndex].bullets, '']
            };
            return { ...prev, [parentField]: newArray };
        });
    };

    const handleDelete = (index, parentField, subField = null, subIndex = null) => {
        setFormData(prev => {
            if (subField && subIndex !== null) {
                // Delete bullet point
                const newArray = [...prev[parentField]];
                newArray[index] = {
                    ...newArray[index],
                    [subField]: newArray[index][subField].filter((_, i) => i !== subIndex)
                };
                return { ...prev, [parentField]: newArray };
            } else {
                // Delete entire item
                const newArray = prev[parentField].filter((_, i) => i !== index);
                return { ...prev, [parentField]: newArray };
            }
        });
    };

    // Add functions
    const addSkill = () => {
        setFormData(prev => ({
            ...prev,
            skills: [...prev.skills, '']
        }));
    };

    const addEducation = () => {
        setFormData(prev => ({
            ...prev,
            education: [...prev.education, { institution: '', degree: '' }]
        }));
    };

    const addProject = () => {
        setFormData(prev => ({
            ...prev,
            projects: [...prev.projects, { title: '', tools: '', bullets: [''] }]
        }));
    };

    const addCertificate = () => {
        setFormData(prev => ({
            ...prev,
            certificates: [...prev.certificates, '']
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted', formData);
        // Here you would typically send the data to an API
    };

    return {
        loading,
        formData,
        setFormData,
        handleChange,
        handleArrayChange,
        handleNestedArrayChange,
        handleBulletChange,
        handleAddBullet,
        handleDelete,
        addSkill,
        addEducation,
        addProject,
        addCertificate,
        handleSubmit
    };
};

export default useFormHandlers;