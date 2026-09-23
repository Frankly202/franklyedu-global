import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { brand } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/login")({
  head: () =>
    pageMeta(
      "Login",
      "Sign in to your FranklyEdu student account to track applications and saved universities.",
    ),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  return (
    <section className="bg-navy-deep py-16 text-navy-foreground sm:py-24">
      <div className="container-site max-w-2xl text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">Welcome back</h1>
        <p className="mt-4 text-navy-muted">
          Student account access will be connected here when the application system is ready.
        </p>
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
          <input className="field-dark" type="email" placeholder="Email address" />
          <input className="field-dark" type="password" placeholder="Password" />
          <button type="button" className="text-left text-sm hover:underline">
            Forgot password?
          </button>
          <button type="submit" className="btn btn-primary btn-lg">
            Log in (integration ready)
          </button>
          <p className="text-sm">
            New to {brand.shortName}?{" "}
            <Link to="/signup" className="font-semibold hover:underline">
              Create your account
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
