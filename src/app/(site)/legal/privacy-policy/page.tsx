import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Motif",
  description:
    "Read Motif's Privacy Policy to understand how we collect, use, and protect your information when using our image tools.",
  alternates: {
    canonical: "/legal/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Privacy Policy | Motif",
    description: "Learn how Motif collects, uses, stores, and protects your information.",
    type: "website",
    url: "/legal/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-28">
      <header className="border-border mb-12 border-b pb-8">
        <p className="text-muted-foreground">Legal</p>

        <h1 className="mt-3 text-4xl font-medium tracking-tight md:text-5xl">Privacy Policy</h1>

        <p className="text-muted-foreground mt-5 max-w-2xl text-[17px] leading-7">
          Your privacy is important to us. This Privacy Policy explains what information we collect, how we use it, and
          how we protect your data when you use Motif.
        </p>

        <p className="text-muted-foreground mt-6 text-sm">Last updated: July 23, 2026</p>
      </header>

      <article className="space-y-10">
        <section>
          <h2 className="text-2xl font-medium tracking-tight">Information We Collect</h2>

          <p className="text-muted-foreground mt-4 text-[17px] leading-7">
            We may collect information you provide directly, including your name, email address, uploaded images, and
            any information you submit through our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight">How We Use Information</h2>

          <p className="text-muted-foreground mt-4 text-[17px] leading-7">
            We use your information to provide our services, improve the user experience, process uploaded files,
            respond to support requests, maintain security, and comply with legal obligations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight">Uploaded Files</h2>

          <p className="text-muted-foreground mt-4 text-[17px] leading-7">
            Images and files uploaded to Motif are processed only to deliver the requested functionality. We do not
            claim ownership of your content.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight">Cookies</h2>

          <p className="text-muted-foreground mt-4 text-[17px] leading-7">
            We may use cookies and similar technologies to remember your preferences, improve performance, and
            understand how visitors use our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight">Third-Party Services</h2>

          <p className="text-muted-foreground mt-4 text-[17px] leading-7">
            We work with trusted third-party providers for services such as analytics, hosting, authentication, and
            payment processing. These providers process information according to their own privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight">Data Security</h2>

          <p className="text-muted-foreground mt-4 text-[17px] leading-7">
            We implement appropriate technical and organizational safeguards to protect your information. While no
            online service can guarantee complete security, we continually work to protect your data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight">Your Rights</h2>

          <p className="text-muted-foreground mt-4 text-[17px] leading-7">
            Depending on your location, you may have the right to access, correct, update, or request deletion of your
            personal information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight">Changes to This Policy</h2>

          <p className="text-muted-foreground mt-4 text-[17px] leading-7">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page along with the
            updated revision date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight">Contact Us</h2>

          <p className="text-muted-foreground mt-4 text-[17px] leading-7">
            If you have any questions about this Privacy Policy or how your data is handled, please contact us through
            the support channels available on our website.
          </p>
        </section>
      </article>
    </main>
  );
}
