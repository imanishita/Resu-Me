import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './components/Form';
import Resume from './components/Resume';
import Form2 from './components/Form2';
import Resume2 from './components/Resume2';
import Preloader from './components/Preloader';
import Home from './components/Home';
import useFormHandlers from './components/Handler';
import useFormHandlers2 from './components/Handler2';
import ATSChecker from './components/ATSChecker';
import AnimatedBG from './components/AnimatedBG'; 
import Footer from './components/Footer';
import './App.css';

const App = () => {
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);

    const {
        formData: formData1,
        handleChange: handleChange1,
        handleArrayChange: handleArrayChange1,
        handleNestedArrayChange: handleNestedArrayChange1,
        handleBulletChange: handleBulletChange1,
        addSkill: addSkill1,
        addEducation: addEducation1,
        addCertificate: addCertificate1,
        addProject: addProject1,
        addLanguage: addLanguage1,
        handleAddExperience: handleAddExperience1,
        handleDelete: handleDelete1,
        handleSubmit: handleSubmit1,
        handleAddBullet: handleAddBullet1,
    } = useFormHandlers();

    const {
        formData: formData2,
        handleChange: handleChange2,
        handleArrayChange: handleArrayChange2,
        handleNestedArrayChange: handleNestedArrayChange2,
        addSkill: addSkill2,
        addEducation: addEducation2,
        addCertificate: addCertificate2,
        addLanguage: addLanguage2,
        handleAddExperience: handleAddExperience2,
        handleDelete: handleDelete2,
        handleSubmit: handleSubmit2,
        handleFileChange: handleFileChange2
    } = useFormHandlers2();

    useEffect(() => {
        const timeout1 = setTimeout(() => {
            setLoading1(false);
        }, 2000);

        const timeout2 = setTimeout(() => {
            setLoading2(false);
        }, 2000);

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
        };
    }, []);

    if (loading1 || loading2) {
        return <Preloader />;
    }

    return (
        <Router>
            <div className="app-container">
                <AnimatedBG />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />

                        <Route path="/resume/1" element={
                            <div className="form-and-resume">
                                <div className="form-wrapper">
                                    <Form
                                        formData={formData1}
                                        handleChange={handleChange1}
                                        handleNestedArrayChange={handleNestedArrayChange1}
                                        handleArrayChange={handleArrayChange1}
                                        handleBulletChange={handleBulletChange1}
                                        handleAddBullet={handleAddBullet1}
                                        handleDelete={handleDelete1}
                                        addEducation={addEducation1}
                                        addCertificate={addCertificate1}
                                        addSkill={addSkill1}
                                        addProject={addProject1} 
                                        handleSubmit={handleSubmit1}
                                    />
                                </div>
                                <div className="resume-wrapper">
                                    <Resume resumeData={formData1} />
                                </div>
                            </div>
                        } />

                        <Route path="/resume/2" element={
                            <div className="form-and-resume">
                                <div className="form-wrapper">
                                    <Form2
                                        formData={formData2}
                                        handleChange={handleChange2}
                                        handleArrayChange={handleArrayChange2}
                                        addSkill={addSkill2}
                                        addEducation={addEducation2}
                                        addCertificate={addCertificate2}
                                        addLanguage={addLanguage2}
                                        handleAddExperience={handleAddExperience2}
                                        handleNestedArrayChange={handleNestedArrayChange2}
                                        handleSubmit={handleSubmit2}
                                        handleDelete={handleDelete2}
                                        handleFileChange={handleFileChange2}
                                    />
                                </div>
                                <div className="resume-wrapper">
                                    <Resume2 resumeData={formData2} />
                                </div>
                            </div>
                        } />

                        <Route path="/ats-checker" element={
                            <div className="ats-checker-wrapper">
                                <ATSChecker resumeText={formData1} />
                            </div>
                        } />
                    </Routes>
                </div>

                <Footer />
            </div>
        </Router>
    );
};

export default App;