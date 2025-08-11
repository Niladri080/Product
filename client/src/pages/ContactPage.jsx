import { Mail, Phone, MapPin } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import axios from "axios";
const ContactPage = () => {
  const [loading,setloading]=useState(false);
  const form = useRef(null);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setloading(true);
      const formData = new FormData(form.current);
      const name = formData.get("name");
      const email = formData.get("email");
      const title = formData.get("title");
      const message = formData.get("message");
      await emailjs.sendForm(
        "service_g414sl8",
        "template_ybthpyi",
        form.current,
        "Hs6V8RXJKxGqEZc0f"
      );
      axios
        .post("http://localhost:4000/api/contact", {
          name,
          email,
          title,
          message,
        })
        .then((res) => {
          setloading(false);
          alert("Your response submitted successfully");
          form.current.reset();
        }).catch((err)=>{
          setloading(false);
          console.log(err.meesage);
          alert("Something went wrong")})
    } catch (error) {
      setloading(false);
      console.log(error.message);
      alert("Something went wrong");
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600">
            Get in touch with our team. We're here to help with any questions or
            concerns.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Get In Touch
            </h2>
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <span className="text-gray-600">nilmandal098@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-600" />
                <span className="text-gray-600">+91 7439301473</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="text-gray-600">
                  123 Business Ave, Suite 100, INDIA, IN 700001
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Business Hours
              </h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>

          <form
            ref={form}
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Send Message
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="How can we help?"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows="4"
                  name="message"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Your message..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className={`w-full ${!loading && 'bg-blue-600'} ${loading && 'bg-blue-500'} ${!loading && 'text-white'} ${loading && 'text-gray-400'} py-2 px-4 rounded-md ${!loading && 'hover:bg-blue-700'} transition-colors duration-200`}
              >
                {!loading && 'Send Message'} {loading && 'Sending....'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ContactPage;
