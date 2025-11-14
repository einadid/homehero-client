export default function Contact() {
  const submit = (e) => e.preventDefault();
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="section-title mb-4">Contact Support</h1>
      <p className="opacity-80 text-sm mb-4">
        Have a question? Send us a message—we usually reply within 24 hours.
      </p>
      <form onSubmit={submit} className="space-y-3" name="contact" method="POST" data-netlify="true">
        <input type="hidden" name="form-name" value="contact"/>
        <input className="input input-bordered w-full" name="name" placeholder="Your name" required />
        <input className="input input-bordered w-full" name="email" type="email" placeholder="Your email" required />
        <textarea className="textarea textarea-bordered w-full" name="message" placeholder="Your message" required />
        <div className="flex gap-2">
          <button className="btn btn-primary">Send</button>
          <a className="btn" href="mailto:support@homehero.local">Email us</a>
        </div>
      </form>
    </div>
  );
}