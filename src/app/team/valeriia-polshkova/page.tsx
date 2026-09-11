import type { Metadata } from "next";
import { buildPageMetadata, buildBreadcrumbSchema } from "@/lib/seo";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import TeamMemberBio from "@/components/team/TeamMemberBio";
import { buildTeamMemberProfilePageSchema } from "@/data/team/shared";
import { polshkova, POLSHKOVA_PAGE_URL } from "@/data/team/polshkova";

export const metadata: Metadata = buildPageMetadata({
  title: polshkova.metaTitle,
  description: polshkova.metaDescription,
  canonical: POLSHKOVA_PAGE_URL,
  ogImage: polshkova.photoUrl,
  keywords: [
    "valeriia polshkova",
    "laser hair removal specialist aventura",
    "electrolysis aventura",
    "kami aesthetics aesthetic specialist",
    "kami aesthetics team",
  ],
});

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", url: "https://kamiaesthetics.com" },
  { name: "Team", url: "https://kamiaesthetics.com/team" },
  { name: polshkova.name, url: POLSHKOVA_PAGE_URL },
]);

const profilePageSchema = buildTeamMemberProfilePageSchema(polshkova);

export default function PolshkovaBioPage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={[breadcrumbSchema, profilePageSchema]} />

      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <AnnouncementBar />
      <Header />

      <main id="main-content" role="main">
        <TeamMemberBio member={polshkova} />
      </main>

      <Footer />
    </div>
  );
}
