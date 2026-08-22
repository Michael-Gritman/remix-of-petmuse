import { createFileRoute, Link } from "@tanstack/react-router";
import { InfoPageLayout, InfoSection } from "@/components/pet/InfoPageLayout";

/**
 * TODO: add a real, monitored contact channel and update this policy so users
 * can reach us. Do not invent an email, form, or phone number until one exists.
 */

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — PetMuse" },
      {
        name: "description",
        content:
          "How PetMuse handles quiz answers, saved profiles, hosting, advertising, and third-party content. Last updated August 22, 2026.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <InfoPageLayout title="Privacy Policy" lastUpdated="August 22, 2026">
      <InfoSection title="What this policy covers">
        <p>
          This page describes how PetMuse works today. It is written to match the site’s actual
          behaviour, not a generic template. PetMuse does process some technical and on-device
          information in order to load pages and remember choices you make in the browser. It also
          uses Google AdSense, which may set cookies and collect technical data as described below.
        </p>
      </InfoSection>

      <InfoSection title="Quiz answers">
        <p>
          The lifestyle quiz runs entirely in your current browser session. Answers are held in
          memory on this page so the site can calculate a match, then discarded when you leave the
          quiz or close the tab. PetMuse does not save quiz answers to your device, does not upload
          them, and does not use them to create an account or profile.
        </p>
      </InfoSection>

      <InfoSection title="Saved and Compare">
        <p>
          If you save a companion or add one to Compare, PetMuse stores only that pet’s profile ID
          in your browser’s localStorage (keys named petmuse:saved and petmuse:compare). Those IDs
          stay on this device. They are not synced across phones, computers or browsers, and they
          are not sent to a PetMuse account — the site does not offer accounts.
        </p>
        <p>
          You can remove saved or compared pets in the site, or clear this site’s stored data in
          your browser settings (often under cookies and site data, or by using the browser’s clear
          storage tools for this website). That deletes the local ID lists from this device.
        </p>
      </InfoSection>

      <InfoSection title="What PetMuse does not collect">
        <p>
          PetMuse does not provide user accounts, does not keep a user database of quiz answers or
          saved lists on our servers, does not take payments, and does not collect your location
          through the site. Adoption and other external tools may ask for a location after you leave
          PetMuse; that is governed by those sites, not by this policy.
        </p>
      </InfoSection>

      <InfoSection title="Hosting and technical request data">
        <p>
          The site is hosted on Cloudflare. When you load PetMuse, Cloudflare may process technical
          data that comes with the request — such as IP address, timestamps, and browser information
          — in order to operate the site, keep it secure, and diagnose problems. That processing is
          part of hosting, not a PetMuse user profile.
        </p>
      </InfoSection>

      <InfoSection title="Fonts, photographs and other websites">
        <p>
          Pages load typefaces from Google Fonts and many photographs from Unsplash. Your browser
          requests those files directly from those providers, which may process the technical data
          involved in serving them, under their own privacy policies.
        </p>
        <p>
          Profile pages can also link out to adoption search, educational guides and supply sites.
          Those destinations have their own privacy policies and terms. PetMuse does not control
          what they collect after you click through.
        </p>
      </InfoSection>

      <InfoSection title="Advertising and analytics">
        <p>
          PetMuse uses Google AdSense to show ads. Google’s AdSense script is included between the
          head tags on every page so ads can be verified, measured and displayed.
        </p>
        <p>
          Google and its partners may use cookies and similar technologies to serve ads based on
          your visits to this site and other sites. You can opt out of personalised advertising in{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-4"
          >
            Google Ads Settings
          </a>
          . Google also explains how it uses information from sites that use its services at{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-4"
          >
            How Google uses information from sites or apps that use our services
          </a>
          .
        </p>
        <p>
          PetMuse does not currently use a separate third-party analytics product. If that changes,
          we will update this policy first.
        </p>
      </InfoSection>

      <InfoSection title="Reaching us">
        <p>
          PetMuse does not currently publish an email address, contact form or other contact channel
          on this website. This policy does not offer a way to send us a message. If that changes,
          we will say so here.
        </p>
      </InfoSection>

      <p>
        Related:{" "}
        <Link to="/terms" className="text-foreground underline underline-offset-4">
          Terms of Use
        </Link>
        {" · "}
        <Link to="/about" className="text-foreground underline underline-offset-4">
          About
        </Link>
      </p>
    </InfoPageLayout>
  );
}
