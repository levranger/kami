import type { Metadata } from "next";
import { buildPageMetadata, buildBreadcrumbSchema } from "@/lib/seo";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import TeamMemberBio from "@/components/team/TeamMemberBio";
import { buildTeamMemberProfilePageSchema } from "@/data/team/shared";
import { goldberg, GOLDBERG_PAGE_URL } from "@/data/team/goldberg";

export const metadata: Metadata = buildPageMetadata({
  title: goldberg.metaTitle,
  description: goldberg.metaDescription,
  canonical: GOLDBERG_PAGE_URL,
  ogImage: goldberg.photoUrl,
  keywords: [
    "dr paul goldberg plastic surgeon",
    "medical director aventura",
    "board certified plastic surgeon aventura",
    "kami aesthetics team",
  ],
});

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", url: "https://kamiaesthetics.com" },
  { name: "Team", url: "https://kamiaesthetics.com/team" },
  { name: goldberg.name, url: GOLDBERG_PAGE_URL },
]);

const profilePageSchema = buildTeamMemberProfilePageSchema(goldberg);

export default function GoldbergBioPage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={[breadcrumbSchema, profilePageSchema]} />

      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <AnnouncementBar />
      <Header />

      <main id="main-content" role="main">
        <TeamMemberBio member={goldberg} />
      </main>

      <Footer />
    </div>
  );
}
