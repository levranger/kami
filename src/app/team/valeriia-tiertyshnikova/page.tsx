import type { Metadata } from "next";
import { buildPageMetadata, buildBreadcrumbSchema } from "@/lib/seo";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import TeamMemberBio from "@/components/team/TeamMemberBio";
import { buildTeamMemberProfilePageSchema } from "@/data/team/shared";
import { valeriia, VALERIIA_PAGE_URL } from "@/data/team/valeriia";

export const metadata: Metadata = buildPageMetadata({
  title: valeriia.metaTitle,
  description: valeriia.metaDescription,
  canonical: VALERIIA_PAGE_URL,
  ogImage: valeriia.photoUrl,
  keywords: [
    "valeriia tiertyshnikova aprn",
    "nurse practitioner aventura",
    "aesthetic nurse practitioner miami",
    "botox provider aventura",
    "kami aesthetics team",
  ],
});

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", url: "https://kamiaesthetics.com" },
  { name: "Team", url: "https://kamiaesthetics.com/team" },
  { name: valeriia.name, url: VALERIIA_PAGE_URL },
]);

const profilePageSchema = buildTeamMemberProfilePageSchema(valeriia);

export default function ValeriiaBioPage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={[breadcrumbSchema, profilePageSchema]} />

      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <AnnouncementBar />
      <Header />

      <main id="main-content" role="main">
        <TeamMemberBio member={valeriia} />
      </main>

      <Footer />
    </div>
  );
}
