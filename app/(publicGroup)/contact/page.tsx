import ContactForm from "../_components/contactForm";


export default function ContactPage() {
  return (
    <section className="container py-16 w-11/12 mx-auto">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Contact Us
          </h1>

          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Have questions about renting a property or listing your home?
            We'd love to hear from you. Fill out the form below and our
            team will get back to you as soon as possible.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Contact Info */}
          <div className="space-y-6 lg:col-span-2 rounded-xl border p-6">
            <h2 className="text-2xl font-semibold">
              Get in Touch
            </h2>

            <p className="text-muted-foreground">
              Our support team is available to answer your questions.
            </p>

            <div className="space-y-5">
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-muted-foreground">
                  support@rentnest.com
                </p>
              </div>

              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-muted-foreground">
                  +880 1782421132
                </p>
              </div>

              <div>
                <h3 className="font-medium">Office</h3>
                <p className="text-muted-foreground">
                  Dhaka, Bangladesh
                </p>
              </div>

              <div>
                <h3 className="font-medium">Working Hours</h3>
                <p className="text-muted-foreground">
                  Sunday - Thursday
                  <br />
                  9:00 AM - 6:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}