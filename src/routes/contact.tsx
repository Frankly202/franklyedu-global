import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, Section } from "@/components/site/Section";
import { contact, whatsappLink } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => pageMeta("Contact", "Message FranklyEdu Global on WhatsApp or email to plan your study pathway."),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero eyebrow="Contact" title="Let’s talk about your next step." subtitle="Reach us on WhatsApp for the fastest reply, or send a message below." />
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-4">
            <div className="card-navy p-6">
              <p className="eyebrow text-sky-soft">WhatsApp</p>
              <p className="mt-2 font-display text-xl font-bold">{contact.phone}</p>
              <p className="mt-1 text-xs text-navy-muted">{contact.hours}</p>
              <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn btn-primary mt-4">Chat on WhatsApp</a>
            </div>
            <div className="card-light p-6 text-sm">
              <p className="eyebrow text-sky">Email</p>
              <a href={`mailto:${contact.email}`} className="mt-1 block font-medium">{contact.email}</a>
              <p className="eyebrow mt-4 text-sky">Office</p>
              <p className="mt-1">{contact.address}</p>
            </div>
          </div>

          <form
            className="card-light grid gap-4 p-6 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            {sent ? (
              <div className="sm:col-span-2 py-10 text-center">
                <h2 className="text-xl font-semibold">Message received</h2>
                <p className="mt-2 text-sm text-muted-foreground">This is a prototype — no message was sent yet. We’ll connect this form later.</p>
                <button type="button" className="btn btn-outline-dark mt-5" onClick={() => setSent(false)}>Send another</button>
              </div>
            ) : (
              <>
                <input className="field" placeholder="Full name" required />
                <input className="field" type="email" placeholder="Email address" required />
                <input className="field" placeholder="Phone / WhatsApp number" />
                <input className="field" placeholder="Preferred destination" />
                <textarea className="field sm:col-span-2" rows={5} placeholder="Tell us about your study plans" required />
                <button type="submit" className="btn btn-primary sm:col-span-2">Send message</button>
              </>
            )}
          </form>
        </div>
      </Section>
    </>
  );
}
