import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/signup")({
  head: () =>
    pageMeta(
      "Sign Up",
      "Create your FranklyEdu profile to save opportunities and begin an application.",
    ),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  return (
    <section className="bg-navy-deep py-14 text-navy-foreground sm:py-20">
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
        <div className="card-navy grid gap-3 p-6">
          <p className="eyebrow text-gold">Ready for authentication integration</p>
          <input className="field-dark" placeholder="Full name" />
          <input className="field-dark" type="email" placeholder="Email address" />
          <input className="field-dark" placeholder="Phone / WhatsApp number" />
          <input className="field-dark" placeholder="Nationality" />
          <input className="field-dark" placeholder="Country of residence" />
          <input className="field-dark" type="password" placeholder="Password" />
          <input className="field-dark" type="password" placeholder="Confirm password" />
          <button type="submit" className="btn btn-primary btn-lg">
            Create account (integration ready)
          </button>
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold hover:underline">
              Log in
            </Link>
          </p>
          <Link to="/student" className="text-sm font-semibold hover:underline">
            Preview student dashboard →
          </Link>
        </div>
      </form>
    </section>
  );
}
