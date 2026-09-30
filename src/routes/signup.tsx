import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
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
  const navigate = useNavigate();
  return (
    <section className="bg-navy py-14 text-navy-foreground sm:py-20">
      <div className="container-site max-w-2xl">
        <Breadcrumbs items={[{ label: "Sign Up" }]} />
        <div className="text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">Start your global study journey</h1>
          <p className="mt-4 text-navy-muted">
            Create your profile when you’re ready to save opportunities and begin an application.
          </p>
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
          <p className="eyebrow text-sky">Ready for authentication integration</p>
          <input className="field" placeholder="Full name" />
          <input className="field" type="email" placeholder="Email address" />
          <input className="field" placeholder="Phone / WhatsApp number" />
          <input className="field" placeholder="Nationality" />
          <input className="field" placeholder="Country of residence" />
          <input className="field" type="password" placeholder="Password" />
          <input className="field" type="password" placeholder="Confirm password" />
          <button type="submit" className="btn btn-primary btn-lg">
            Create account (integration ready)
          </button>
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-navy hover:underline">
              Log in
            </Link>
          </p>
          <Link to="/student" className="text-sm font-semibold text-sky hover:underline">
            Preview student dashboard →
          </Link>
        </div>
      </form>
    </section>
  );
}
