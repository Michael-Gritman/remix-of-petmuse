import { createFileRoute, Link } from "@tanstack/react-router";
import { InfoPageLayout, InfoSection } from "@/components/pet/InfoPageLayout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — PetMuse" },
      {
        name: "description",
        content:
          "Terms for using PetMuse. Content and the quiz are general education and lifestyle information, not professional advice. Last updated August 19, 2026.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <InfoPageLayout title="Terms of Use">
      <InfoSection title="Using PetMuse">
        <p>
          These terms apply to the PetMuse website. By using the site you agree to them. If you do
          not agree, please do not use PetMuse.
        </p>
      </InfoSection>

      <InfoSection title="Not professional advice">
        <p>
          PetMuse content and the lifestyle quiz are for general education and lifestyle
          orientation only. They do not constitute veterinary, behavioural, legal or other
          professional advice. Do not rely on this site alone when choosing, acquiring or caring
          for an animal.
        </p>
      </InfoSection>

      <InfoSection title="Breed information is typical, not a guarantee">
        <p>
          Profiles describe typical traits, care needs and lifestyle fit for a breed or type.
          Individual animals vary. Nothing on PetMuse guarantees how a specific animal will behave,
          its health, temperament, or whether it is permitted where you live. Always meet the
          animal and take qualified advice before you decide.
        </p>
      </InfoSection>

      <InfoSection title="Quiz, Saved and Compare">
        <p>
          Quiz suggestions are calculated from the answers you give in that browser session and
          from the profiles published on this site. Saved and Compare lists live only on your
          device. They are convenience tools, not a record we keep for you, and they are not a
          substitute for research or professional guidance.
        </p>
      </InfoSection>

      <InfoSection title="External websites">
        <p>
          Links to adoption search, educational material and supply sites are provided for
          convenience. Those websites have their own terms and privacy policies. PetMuse is not
          responsible for their content, availability or practices.
        </p>
      </InfoSection>

      <InfoSection title="Changes">
        <p>
          We may update these terms as the site changes. The date at the top of this page shows
          when they were last revised. Continued use after an update means you accept the revised
          terms.
        </p>
      </InfoSection>

      <p>
        Related:{" "}
        <Link to="/privacy" className="text-foreground underline underline-offset-4">
          Privacy Policy
        </Link>
        {" · "}
        <Link to="/about" className="text-foreground underline underline-offset-4">
          About
        </Link>
      </p>
    </InfoPageLayout>
  );
}
