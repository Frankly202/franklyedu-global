import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { useTranslations } from "@/data/translations";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/login")({
  head: () =>
    pageMeta(
      "Login",
      "Sign in to your Frankedu student account to track applications and saved universities.",
    ),
  component: LoginPage,
});

function LoginPage() {
  const { common, portal } = useTranslations();
  const navigate = useNavigate();

  return (
    <section className="bg-navy py-14 text-navy-foreground sm:py-20">
      <div className="container-site max-w-2xl">
        <Breadcrumbs items={[{ label: common.nav.login }]} />
        <div className="text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">{portal.login.title}</h1>
          <p className="mt-4 text-navy-muted">{portal.login.subtitle}</p>
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
          <p className="eyebrow text-sky">{portal.login.readyNotice}</p>
          <input className="field" type="email" placeholder={portal.login.emailPlaceholder} />
          <input className="field" type="password" placeholder={portal.login.passwordPlaceholder} />
          <button
            type="button"
            className="text-left text-sm text-muted-foreground hover:text-navy hover:underline"
          >
            {portal.login.forgotPassword}
          </button>
          <button type="submit" className="btn btn-primary btn-lg">
            {portal.login.submitBtn}
          </button>
          <p className="text-sm text-muted-foreground">
            {portal.login.newToBrand}{" "}
            <Link to="/signup" className="font-semibold text-navy hover:underline">
              {portal.login.createAccount}
            </Link>
          </p>
          <Link to="/student" className="text-sm font-semibold text-sky hover:underline">
            {portal.login.previewDashboard}
          </Link>
        </div>
      </form>
    </section>
  );
}
