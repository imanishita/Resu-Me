import React, { useState } from 'react';
import './Footer.css';
import { FaGithub, FaLinkedin, FaEnvelope, FaGlobe } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Footer = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('message', formData.message);

    try {
      const response = await fetch('https://formsubmit.co/ajax/imanishita17@gmail.com', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      });

      const result = await response.json();

      if (response.ok) {
        setFormData({ name: '', email: '', message: '' });
        Swal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: 'Thanks for contacting me. I’ll get back to you soon.',
          confirmButtonColor: '#3085d6'
        });
      } else {
        throw new Error(result.message || 'Failed to send message.');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message || 'Something went wrong! Please try again later.',
        confirmButtonColor: '#d33'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* About Section */}
        <div className="footer-about">
          <h3>About</h3>
          <p>
            Created this platform to help you edit and customize your resume quickly and effortlessly. 
            I'm continuously working to add more templates and features to enhance your experience.
            <br /><br />
            Stay tuned for exciting updates coming soon!
          </p>
        </div>

        {/* Contact Form */}
        <div className="footer-form">
          <h3>Contact Me</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="spinner"></span> Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>

        {/* Social Links */}
        <div className="footer-social">
          <h3>Connect With Me</h3>
          <div className="social-links">
            <a
              href="https://github.com/imanishita"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/imanishita"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="mailto:imanishita17@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email"
            >
              <FaEnvelope />
            </a>
            <a
              href="https://imanishita.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Website"
            >
              <FaGlobe />
            </a>
          </div>
          <p style={{ marginTop: '20px', color: '#bbb', fontSize: '0.9rem' }}>
            Let's build something amazing together!
          </p>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Manishita Biswas. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
