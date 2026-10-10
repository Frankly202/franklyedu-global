import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { useTranslations } from "@/data/translations";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/signup")({
  head: () =>
    pageMeta(
      "Sign Up",
      "Create your Frankedu profile to save opportunities and begin an application.",
    ),
  component: SignupPage,
});

function SignupPage() {
  const { common, portal } = useTranslations();
  const navigate = useNavigate();

  return (
    <section className="bg-navy py-14 text-navy-foreground sm:py-20">
      <div className="container-site max-w-2xl">
        <Breadcrumbs items={[{ label: common.nav.signup }]} />
        <div className="text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">{portal.signup.title}</h1>
          <p className="mt-4 text-navy-muted">{portal.signup.subtitle}</p>
        </div>
      </div>
      <form
        className="container-site mt-12 max-w-md"
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/student" });
        }}
      >
        <div className="card-light grid gap-3.5 p-6 sm:p-8 text-foreground">
          <p className="eyebrow text-sky">{portal.signup.readyNotice}</p>
          <input className="field" placeholder={portal.signup.fullNamePlaceholder} />
          <input className="field" type="email" placeholder={portal.signup.emailPlaceholder} />
          <input className="field" placeholder={portal.signup.phonePlaceholder} />
          <input className="field" placeholder={portal.signup.nationalityPlaceholder} />
          <input className="field" placeholder={portal.signup.residencePlaceholder} />
          <input
            className="field"
            type="password"
            placeholder={portal.signup.passwordPlaceholder}
          />
          <input
            className="field"
            type="password"
            placeholder={portal.signup.confirmPasswordPlaceholder}
          />
          <button type="submit" className="btn btn-primary btn-lg">
            {portal.signup.submitBtn}
          </button>
          <p className="text-sm text-muted-foreground">
            {portal.signup.alreadyHaveAccount}{" "}
            <Link
              to="/login"
              className="inline-flex min-h-11 items-center font-semibold text-navy hover:underline"
            >
              {portal.signup.logInLink}
            </Link>
          </p>
          <Link
            to="/student"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-sky hover:underline"
          >
            {portal.signup.previewDashboard}
          </Link>
        </div>
      </form>
    </section>
  );
}
