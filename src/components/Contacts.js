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
      <section className="simple-hero">
        <h1>Contact Us</h1>
        <p>For support, suggestions, or partnership requests.</p>
      </section>

      <section className="simple-card">
        <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
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

      <Footer />
    </div>
  );
}

export default Contacts;
