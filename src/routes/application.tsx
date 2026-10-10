import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, Section } from "@/components/site/Section";
import { courses, destinations, universities } from "@/data/content";
import { whatsappLink } from "@/data/site";
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
  const requestedCourse = courses.find((c) => c.slug === search.course);
  const requestedUniversity = universities.find((u) => u.slug === search.university);
  const presetCourse =
    requestedCourse &&
    (!requestedUniversity || requestedCourse.universitySlug === requestedUniversity.slug)
      ? requestedCourse
      : undefined;
  const presetUni =
    requestedUniversity ?? universities.find((u) => u.slug === presetCourse?.universitySlug);

  const steps = [
    portal.application.steps.details,
    portal.application.steps.studyPlan,
    portal.application.steps.documents,
    portal.application.steps.review,
  ];

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    nationality: "",
    destination: presetUni?.countrySlug ?? "",
    university: presetUni?.slug ?? "",
    course: presetCourse?.slug ?? "",
    intake: "",
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
  const selectedCourse = courses.find((c) => c.slug === form.course);
  const selectedUniversity = universities.find(
    (u) => u.slug === (form.university || selectedCourse?.universitySlug),
  );
  const selectedIntake =
    form.intake === "January 2027"
      ? portal.application.form.intakeOptions.jan2027
      : form.intake === "September 2026"
        ? portal.application.form.intakeOptions.sep2026
        : form.intake === "February 2027"
          ? portal.application.form.intakeOptions.feb2027
          : form.intake;

  const createApplicationMessage = () => {
    const labels = portal.application.form.summaryLabels;
    const details: Array<[string, string | undefined]> = [
      [labels.name, form.name.trim()],
      [labels.email, form.email.trim()],
      [labels.phone, form.phone.trim() || undefined],
      [labels.nationality, form.nationality.trim() || undefined],
      [labels.destination, destinations.find((d) => d.slug === form.destination)?.name],
      [labels.university, selectedUniversity?.name],
      [labels.programme, selectedCourse?.title],
      [labels.studyLevel, selectedCourse?.level],
      [labels.intake, selectedIntake],
    ];

    return `${portal.application.whatsappIntro}\n\n${details
      .filter(([, value]) => value)
      .map(([label, value]) => `${label}: ${value}`)
      .join("\n")}`;
  };

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
              else window.location.href = whatsappLink(createApplicationMessage());
            }}
          >
            <>
              <h2 className="text-xl font-semibold">{steps[step]}</h2>

              {step === 0 && (
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <input
                    className="field"
                    aria-label={portal.application.form.fullNamePlaceholder}
                    autoComplete="name"
                    placeholder={portal.application.form.fullNamePlaceholder}
                    value={form.name}
                    onChange={set("name")}
                    required
                  />
                  <input
                    className="field"
                    type="email"
                    aria-label={portal.application.form.emailPlaceholder}
                    autoComplete="email"
                    placeholder={portal.application.form.emailPlaceholder}
                    value={form.email}
                    onChange={set("email")}
                    required
                  />
                  <input
                    className="field"
                    type="tel"
                    aria-label={portal.application.form.phonePlaceholder}
                    autoComplete="tel"
                    placeholder={portal.application.form.phonePlaceholder}
                    value={form.phone}
                    onChange={set("phone")}
                  />
                  <input
                    className="field"
                    aria-label={portal.application.form.nationalityPlaceholder}
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
                    aria-label={portal.application.form.destinationOption}
                    value={form.destination}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        destination: e.target.value,
                        university: "",
                        course: "",
                      }))
                    }
                    required
                  >
                    <option value="">{portal.application.form.destinationOption}</option>
                    {destinations.map((d) => (
                      <option key={d.slug} value={d.slug}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                  <select
                    className="field"
                    aria-label={portal.application.form.universityOption}
                    value={form.university}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        university: e.target.value,
                        course: "",
                      }))
                    }
                  >
                    <option value="">{portal.application.form.universityOption}</option>
                    {uniOptions.map((u) => (
                      <option key={u.slug} value={u.slug}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                  <select
                    className="field"
                    aria-label={portal.application.form.courseOption}
                    value={form.course}
                    onChange={set("course")}
                  >
                    <option value="">{portal.application.form.courseOption}</option>
                    {courseOptions.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                  <select
                    className="field"
                    aria-label={portal.application.form.intakeOption}
                    value={form.intake}
                    onChange={set("intake")}
                    required
                  >
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
                    <label key={d} className="rounded-lg border border-border p-3 text-sm">
                      <span>{d}</span>
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
                    [portal.application.form.summaryLabels.university, selectedUniversity?.name],
                    [portal.application.form.summaryLabels.programme, selectedCourse?.title],
                    [portal.application.form.summaryLabels.studyLevel, selectedCourse?.level],
                    [portal.application.form.summaryLabels.intake, selectedIntake],
                  ].map(([k, v]) => (
                    <div key={String(k)} className="rounded-lg bg-muted p-3">
                      <dt className="text-xs text-muted-foreground">{k}</dt>
                      <dd className="font-medium">{v || "—"}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {step === 3 && (
                <p className="mt-4 text-xs text-muted-foreground">
                  {portal.application.whatsappNotice}
                </p>
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
          </form>
        </div>
      </Section>
    </>
  );
}
