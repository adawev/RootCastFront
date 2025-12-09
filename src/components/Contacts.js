import {useForm} from "react-hook-form";
import {useState} from "react";
import {toast} from "sonner";
import Footer from "./Footer";

function Contacts() {
    const {handleSubmit, register, reset, formState: {errors}} = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            console.log("Contact form data:", data);
            toast.success("Message sent successfully! We'll get back to you soon.");
            reset();
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <div className="contacts-page">
            <section className="heros">
                <h1>Get in Touch</h1>
                <p>Have questions or feedback? We'd love to hear from you. Send us a message and we'll respond as soon
                    as possible.</p>
            </section>

            <section className="contacts-content">
                <div className="contact-container">
                    {/* Contact Information */}
                    <div className="contact-info">
                        <h2>Contact Information</h2>
                        <p>Feel free to reach out through any of these channels</p>

                        <div className="contact-methods">
                            <div className="contact-method">
                                <div className="contact-icon">
                                    <i className="fas fa-envelope"></i>
                                </div>
                                <div className="contact-details">
                                    <h3>Email</h3>
                                    <a href="mailto:info@rootcast.com">info@rootcast.com</a>
                                </div>
                            </div>

                            <div className="contact-method">
                                <div className="contact-icon">
                                    <i className="fas fa-phone"></i>
                                </div>
                                <div className="contact-details">
                                    <h3>Phone</h3>
                                    <a href="tel:+1234567890">+998 (93) 239-00-02</a>
                                </div>
                            </div>

                            <div className="contact-method">
                                <div className="contact-icon">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                                <div className="contact-details">
                                    <h3>Address</h3>
                                    <p>Tashkent, Uzbekistan</p>
                                </div>
                            </div>
                        </div>

                        <div className="social-links">
                            <h3>Follow Us</h3>
                            <div className="social-icons">
                                <a href="https://github.com/adawev" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                    <i className="fab fa-github"></i>
                                </a>
                                <a href="https://linkedin.com/in/adawev" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                    <i className="fab fa-linkedin"></i>
                                </a>
                                <a href="https://t.me/adawev" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                                    <i className="fab fa-telegram"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="contact-form-wrapper">
                        <h2>Send us a Message</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
                            <div className="form-group">
                                <label htmlFor="name">Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    {...register("name", {
                                        required: "Name is required",
                                        minLength: {value: 2, message: "Name must be at least 2 characters"}
                                    })}
                                    placeholder="Your name"
                                    aria-invalid={errors.name ? "true" : "false"}
                                />
                                {errors.name && <span className="error-message">{errors.name.message}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email *</label>
                                <input
                                    type="email"
                                    id="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                    placeholder="your@email.com"
                                    aria-invalid={errors.email ? "true" : "false"}
                                />
                                {errors.email && <span className="error-message">{errors.email.message}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Subject *</label>
                                <input
                                    type="text"
                                    id="subject"
                                    {...register("subject", {
                                        required: "Subject is required",
                                        minLength: {value: 3, message: "Subject must be at least 3 characters"}
                                    })}
                                    placeholder="Message subject"
                                    aria-invalid={errors.subject ? "true" : "false"}
                                />
                                {errors.subject && <span className="error-message">{errors.subject.message}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message *</label>
                                <textarea
                                    id="message"
                                    rows="6"
                                    {...register("message", {
                                        required: "Message is required",
                                        minLength: {value: 10, message: "Message must be at least 10 characters"}
                                    })}
                                    placeholder="Your message..."
                                    aria-invalid={errors.message ? "true" : "false"}
                                ></textarea>
                                {errors.message && <span className="error-message">{errors.message.message}</span>}
                            </div>

                            <button type="submit" className="submit-btn" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin"></i> Sending...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-paper-plane"></i> Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
}

export default Contacts;
