import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { brand } from "@/data/site";
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
  const navigate = useNavigate();
  return (
    <section className="bg-navy py-14 text-navy-foreground sm:py-20">
      <div className="container-site max-w-2xl">
        <Breadcrumbs items={[{ label: "Login" }]} />
        <div className="text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">Welcome back</h1>
          <p className="mt-4 text-navy-muted">
            Student account access will be connected here when the application system is ready.
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
          <input className="field" type="email" placeholder="Email address" />
          <input className="field" type="password" placeholder="Password" />
          <button
            type="button"
            className="text-left text-sm text-muted-foreground hover:text-navy hover:underline"
          >
            Forgot password?
          </button>
          <button type="submit" className="btn btn-primary btn-lg">
            Log in (integration ready)
          </button>
          <p className="text-sm text-muted-foreground">
            New to {brand.shortName}?{" "}
            <Link to="/signup" className="font-semibold text-navy hover:underline">
              Create your account
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
