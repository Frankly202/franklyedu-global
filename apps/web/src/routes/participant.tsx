import { createFileRoute, redirect } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { useTranslations } from "@/data/translations";
import { getParticipantFoundation } from "@/lib/referral-auth.functions";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/participant")({
  loader: async () => {
    const state = await getParticipantFoundation();
    if (state === "signed-out") throw redirect({ to: "/login" });
    return state;
  },
  head: () =>
    pageMeta("Participant account", "Protected participant account access.", {
      noindex: true,
    }),
  component: ParticipantPage,
});

function ParticipantPage() {
  const state = Route.useLoaderData();
  const { referral } = useTranslations();
  const available = state === "signed-in";

  return (
    <>
      <PageHero
        title={referral.participant.title}
        subtitle={referral.participant.subtitle}
        eyebrow={referral.landing.eyebrow}
      />
      <Section className="py-8 sm:py-12">
        <div
          data-referral-panel
          className="mx-auto w-full max-w-4xl rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-8"
        >
          <p
            role={available ? "status" : "alert"}
            className="text-sm leading-relaxed text-muted-foreground"
          >
            {available ? referral.participant.ready : referral.participant.unavailable}
          </p>
        </div>
      </Section>
    </>
  );
}
