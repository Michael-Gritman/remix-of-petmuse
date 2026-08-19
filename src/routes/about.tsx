import { createFileRoute } from "@tanstack/react-router";
import { InfoPageLayout, InfoSection } from "@/components/pet/InfoPageLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — PetMuse" },
      {
        name: "description",
        content:
          "PetMuse is a photo-led way to explore companion animals, understand daily life with them, and compare options that may fit your lifestyle.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <InfoPageLayout title="About PetMuse">
      <InfoSection title="What this site is for">
        <p>
          PetMuse helps you explore companion animals through photography and plain-language
          profiles. The aim is to understand what life with a dog, cat, rabbit, small pet or bird
          can look like before you commit — not to sell animals or replace a conversation with a
          vet, rescue or other professional.
        </p>
      </InfoSection>

      <InfoSection title="What you can do here">
        <p>
          Browse a photo wall of companions, open a profile to read typical care needs, save
          profiles on this device, and compare a few side by side. A short quiz can suggest
          animals that line up with the lifestyle you describe. Matching is based on breed-typical
          profiles in this site, not on an assessment of any individual animal.
        </p>
      </InfoSection>

      <InfoSection title="How to use it">
        <p>
          Treat PetMuse as general education and lifestyle orientation. Typical traits, energy and
          care notes describe a breed or type in broad terms. They cannot tell you how a specific
          animal will behave, what health issues it may have, or whether it is legal or suitable
          where you live. Meet animals in person, and take professional advice before deciding.
        </p>
      </InfoSection>
    </InfoPageLayout>
  );
}
