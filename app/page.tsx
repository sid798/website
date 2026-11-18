import { Columns } from "@/components/columns";
import { siteDescription, siteUrl } from "@/lib/site";

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Siddharth Thorat",
  alternateName: "siddharththorat",
  url: siteUrl,
  jobTitle: "Brand and Product Designer",
  description: siteDescription,
  email: "mailto:siddharththorat96@gmail.com",
  address: { "@type": "PostalAddress", addressLocality: "Pune", addressCountry: "IN" },
  sameAs: ["https://www.instagram.com/_siddharth_thorat/"],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
      />
      <Columns />
    </>
  );
}
