import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, Section } from "@/components/site/Section";
import { courses, destinations, universities } from "@/data/content";
import { useTranslations } from "@/data/translations";
import { pageMeta } from "@/lib/seo";

type Search = { university?: string | undefined; course?: string | undefined };

export const Route = createFileRoute("/application")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    university: typeof s["university"] === "string" ? s["university"] : undefined,
    course: typeof s["course"] === "string" ? s["course"] : undefined,
  }),
  head: () =>
    pageMeta(
      "Start Your Application",
      "A guided, step-by-step application form for your chosen university and programme.",
    ),
  component: ApplicationPage,
});

function ApplicationPage() {
  const { common, portal } = useTranslations();
  const search = Route.useSearch();
  const presetCourse = courses.find((c) => c.slug === search.course);
  const presetUni = universities.find(
    (u) => u.slug === (search.university ?? presetCourse?.universitySlug),
  );

  const steps = [
    portal.application.steps.details,
    portal.application.steps.studyPlan,
    portal.application.steps.documents,
    portal.application.steps.review,
  ];

  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    nationality: "",
    destination: presetUni?.countrySlug ?? "",
    university: presetUni?.slug ?? "",
    course: presetCourse?.slug ?? "",
    intake: "",
    level: presetCourse?.level ?? "",
  });
  const set =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const uniOptions = universities.filter(
    (u) => !form.destination || u.countrySlug === form.destination,
  );
  const courseOptions = courses.filter(
    (c) => !form.university || c.universitySlug === form.university,
  );

  const requiredDocuments = [
    portal.application.form.documentsList.passport,
    portal.application.form.documentsList.transcripts,
    portal.application.form.documentsList.englishProficiency,
    portal.application.form.documentsList.sop,
  ];

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: common.footer.startApplication }]}
        eyebrow={portal.application.eyebrow}
        title={portal.application.defaultTitle}
        subtitle={
          presetUni
            ? `${portal.application.applyingTo} ${presetUni.name}${presetCourse ? ` — ${presetCourse.title}` : ""}.`
            : portal.application.defaultSubtitle
        }
      />
      <Section>
        <div className="mx-auto max-w-3xl">
          <ol className="mb-8 grid grid-cols-4 gap-2">
            {steps.map((s, i) => (
              <li key={s} className="text-center">
                <div className={`h-1.5 rounded-full ${i <= step ? "bg-sky" : "bg-border"}`} />
                <p
                  className={`mt-2 text-xs font-medium sm:text-sm ${i === step ? "text-navy" : "text-muted-foreground"}`}
                >
                  {s}
                </p>
              </li>
            ))}
          </ol>

          <form
            className="card-light p-6 sm:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              if (step < steps.length - 1) setStep(step + 1);
              else setDone(true);
            }}
          >
            {done ? (
              <div className="py-8 text-center">
                <p className="eyebrow text-sky">{portal.application.done.eyebrow}</p>
                <h2 className="mt-2 text-2xl font-bold">{portal.application.done.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{portal.application.done.desc}</p>
                <div className="mt-6 flex justify-center gap-2">
                  <Link to="/student" className="btn btn-primary">
                    {portal.application.done.dashboardBtn}
                  </Link>
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={() => {
                      setDone(false);
                      setStep(0);
                    }}
                  >
                    {portal.application.done.startOverBtn}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold">{steps[step]}</h2>

                {step === 0 && (
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <input
                      className="field"
                      placeholder={portal.application.form.fullNamePlaceholder}
                      value={form.name}
                      onChange={set("name")}
                      required
                    />
                    <input
                      className="field"
                      type="email"
                      placeholder={portal.application.form.emailPlaceholder}
                      value={form.email}
                      onChange={set("email")}
                      required
                    />
                    <input
                      className="field"
                      placeholder={portal.application.form.phonePlaceholder}
                      value={form.phone}
                      onChange={set("phone")}
                    />
                    <input
                      className="field"
                      placeholder={portal.application.form.nationalityPlaceholder}
                      value={form.nationality}
                      onChange={set("nationality")}
                    />
                  </div>
                )}

                {step === 1 && (
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <select
                      className="field"
                      value={form.destination}
                      onChange={set("destination")}
                      required
                    >
                      <option value="">{portal.application.form.destinationOption}</option>
                      {destinations.map((d) => (
                        <option key={d.slug} value={d.slug}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                    <select className="field" value={form.university} onChange={set("university")}>
                      <option value="">{portal.application.form.universityOption}</option>
                      {uniOptions.map((u) => (
                        <option key={u.slug} value={u.slug}>
                          {u.name}
                        </option>
                      ))}
                    </select>
                    <select className="field" value={form.course} onChange={set("course")}>
                      <option value="">{portal.application.form.courseOption}</option>
                      {courseOptions.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                    <select className="field" value={form.intake} onChange={set("intake")} required>
                      <option value="">{portal.application.form.intakeOption}</option>
                      <option value="January 2027">
                        {portal.application.form.intakeOptions.jan2027}
                      </option>
                      <option value="September 2026">
                        {portal.application.form.intakeOptions.sep2026}
                      </option>
                      <option value="February 2027">
                        {portal.application.form.intakeOptions.feb2027}
                      </option>
                    </select>
                  </div>
                )}

                {step === 2 && (
                  <div className="mt-5 grid gap-3">
                    {requiredDocuments.map((d) => (
                      <label
                        key={d}
                        className="flex items-center justify-between gap-4 rounded-lg border border-border p-3 text-sm"
                      >
                        <span>{d}</span>
                        <input
                          type="file"
                          className="max-w-[10rem] text-xs text-muted-foreground"
                        />
                      </label>
                    ))}
                    <p className="text-xs text-muted-foreground">
                      {portal.application.form.uploadsNotice}
                    </p>
                  </div>
                )}

                {step === 3 && (
                  <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                    {[
                      [portal.application.form.summaryLabels.name, form.name],
                      [portal.application.form.summaryLabels.email, form.email],
                      [portal.application.form.summaryLabels.phone, form.phone],
                      [portal.application.form.summaryLabels.nationality, form.nationality],
                      [
                        portal.application.form.summaryLabels.destination,
                        destinations.find((d) => d.slug === form.destination)?.name,
                      ],
                      [
                        portal.application.form.summaryLabels.university,
                        universities.find((u) => u.slug === form.university)?.name,
                      ],
                      [
                        portal.application.form.summaryLabels.programme,
                        courses.find((c) => c.slug === form.course)?.title,
                      ],
                      [portal.application.form.summaryLabels.intake, form.intake],
                    ].map(([k, v]) => (
                      <div key={String(k)} className="rounded-lg bg-muted p-3">
                        <dt className="text-xs text-muted-foreground">{k}</dt>
                        <dd className="font-medium">{v || "—"}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                <div className="mt-6 flex items-center justify-between">
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    disabled={step === 0}
                    onClick={() => setStep(step - 1)}
                  >
                    {portal.application.form.backBtn}
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {step === steps.length - 1
                      ? portal.application.form.submitBtn
                      : portal.application.form.continueBtn}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </Section>
    </>
  );
}
