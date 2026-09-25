import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, Section } from "@/components/site/Section";
import { WhatsAppCta } from "@/components/site/WhatsAppCta";
import { marketplaceItems } from "@/data/content";
import { whatsappLink } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/marketplace")({
  head: () =>
    pageMeta(
      "Student Marketplace",
      "Accommodation, real estate, essentials and services for students settling in.",
    ),
  component: MarketplacePage,
});

const categories = ["All", ...Array.from(new Set(marketplaceItems.map((m) => m.category)))];

function MarketplacePage() {
  const [cat, setCat] = useState("All");
  const items = marketplaceItems.filter((m) => cat === "All" || m.category === cat);

  return (
    <>
      <PageHero
        eyebrow="Marketplace"
        title="Everything you need to settle in."
        subtitle="Housing, essentials and trusted services from the FranklyEdu community."
      />
      <Section>
        <div className="mb-10 grid gap-4 md:grid-cols-2">
          <Link
            to="/accommodation"
            className="card-navy group p-6 transition-transform hover:-translate-y-0.5"
          >
            <p className="eyebrow text-sky-soft">Housing</p>
            <h2 className="mt-2 text-2xl font-bold">Accommodation</h2>
            <p className="mt-2 text-sm text-navy-muted">
              Dormitories, shared flats and private apartments near campus.
            </p>
            <span className="mt-4 inline-block text-sm font-semibold">Browse accommodation →</span>
          </Link>
          <Link
            to="/real-estate"
            className="card-navy group p-6 transition-transform hover:-translate-y-0.5"
          >
            <p className="eyebrow text-sky-soft">Property</p>
            <h2 className="mt-2 text-2xl font-bold">Real Estate</h2>
            <p className="mt-2 text-sm text-navy-muted">
              Buy or rent long-term — including student investment properties.
            </p>
            <span className="mt-4 inline-block text-sm font-semibold">Browse real estate →</span>
          </Link>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={c === cat ? "btn btn-primary btn-sm" : "btn btn-outline-dark btn-sm"}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((m) => (
            <article key={m.slug} className="card-light flex flex-col p-5 sm:p-6">
              <span className="self-start rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-navy">
                {m.category}
              </span>
              <h3 className="mt-3 text-lg font-semibold">{m.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{m.location}</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{m.description}</p>
              <div className="mt-auto flex items-center justify-between pt-5">
                <span className="font-display text-xl font-bold">{m.price}</span>
                <a
                  href={whatsappLink(`Hi, I'm interested in "${m.title}" on the marketplace.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  Enquire
                </a>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <WhatsAppCta />
    </>
  );
}
