import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Input from "./ui/Input";
import Button from "./ui/Button";
import Footer from "./Footer";

function Contacts() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (payload) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    toast.success("Message sent successfully.");
    reset(payload);
  };

  return (
    <div className="simple-page">
      <div className="page-bg page-bg-clouds" aria-hidden="true">
        <span className="page-cloud page-cloud-two" />
        <span className="page-drop page-drop-one" />
        <span className="page-sun page-sun-one" />
      </div>
      <section className="simple-hero">
        <h1>Contact Us</h1>
        <p>For support, suggestions, or partnership requests.</p>
      </section>

      <section className="contact-layout">
        <aside className="contact-side">
          <h2>Support Form</h2>
          <p>Share your issue with city/date context for faster troubleshooting.</p>
          <ul>
            <li>Include city name used</li>
            <li>Mention selected date</li>
            <li>Attach expected vs actual result</li>
          </ul>
        </aside>
        <form className="contact-form contact-main" onSubmit={handleSubmit(onSubmit)}>
          <label>
            Name
            <Input {...register("name", { required: "Name is required" })} />
            {errors.name && <span className="field-error">{errors.name.message}</span>}
          </label>
          <label>
            Email
            <Input type="email" {...register("email", { required: "Email is required" })} />
            {errors.email && <span className="field-error">{errors.email.message}</span>}
          </label>
          <label>
            Message
            <textarea className="ui-input textarea" rows="6" {...register("message", { required: "Message is required" })} />
            {errors.message && <span className="field-error">{errors.message.message}</span>}
          </label>
          <Button type="submit" loading={isSubmitting}>Send Message</Button>
        </form>
      </section>
      <section className="contact-meta">
        <article className="contact-meta-item">
          <h4>Response Time</h4>
          <p>Most product questions receive a response within one business day.</p>
        </article>
        <article className="contact-meta-item">
          <h4>Best Message Format</h4>
          <p>Include searched city, selected date, and what you expected vs what you saw.</p>
        </article>
        <article className="contact-meta-item">
          <h4>Partnerships</h4>
          <p>For integrations or collaboration requests, include your organization and use case.</p>
        </article>
      </section>

      <Footer />
    </div>
  );
}

export default Contacts;
