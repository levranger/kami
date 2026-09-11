import type { Metadata } from "next";
import { buildPageMetadata, buildBreadcrumbSchema } from "@/lib/seo";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import TeamMemberBio from "@/components/team/TeamMemberBio";
import { buildTeamMemberProfilePageSchema } from "@/data/team/shared";
import { yeva, YEVA_PAGE_URL } from "@/data/team/yeva";

export const metadata: Metadata = buildPageMetadata({
  title: yeva.metaTitle,
  description: yeva.metaDescription,
  canonical: YEVA_PAGE_URL,
  ogImage: yeva.photoUrl,
  keywords: [
    "yeva polshkova",
    "kami aesthetics operations manager",
    "kami aesthetics aventura",
    "kami aesthetics team",
  ],
});

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", url: "https://kamiaesthetics.com" },
  { name: "Team", url: "https://kamiaesthetics.com/team" },
  { name: yeva.name, url: YEVA_PAGE_URL },
]);

const profilePageSchema = buildTeamMemberProfilePageSchema(yeva);

export default function YevaBioPage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={[breadcrumbSchema, profilePageSchema]} />

      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <AnnouncementBar />
      <Header />

      <main id="main-content" role="main">
        <TeamMemberBio member={yeva} />
      </main>

      <Footer />
    </div>
  );
}
