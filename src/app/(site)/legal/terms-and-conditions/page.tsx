import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Motif",
  description:
    "Read the Terms & Conditions for using Motif's AI-powered image editing and creative tools.",
  alternates: {
    canonical: "/legal/terms-and-conditions",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Terms & Conditions | Motif",
    description:
      "Read the Terms & Conditions governing your use of Motif and its creative tools.",
    type: "website",
    url: "/legal/terms-and-conditions",
  },
};

export default function TermsAndConditionsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-28">
      <header className="border-border mb-12 border-b pb-8">
        <p className="text-muted-foreground">
          Legal
        </p>

        <h1 className="mt-3 text-4xl font-medium tracking-tight md:text-5xl">
          Terms &amp; Conditions
        </h1>

        <p className="text-muted-foreground mt-5 max-w-2xl text-[17px] leading-7">
          These Terms &amp; Conditions govern your access to and use of Motif.
          By using our website and services, you agree to comply with these
          terms.
        </p>

        <p className="text-muted-foreground mt-6 text-sm">
          Last updated: July 23, 2026
        </p>
      </header>

      <article className="space-y-10">
        <section>
          <h2 className="text-2xl font-medium tracking-tight">
            Acceptance of Terms
          </h2>

          <p className="text-muted-foreground mt-4 text-[17px] leading-7">
            By accessing or using Motif, you acknowledge that you have read,
            understood, and agreed to be bound by these Terms &amp; Conditions.
            If you do not agree with any part of these terms, you should not use
            our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight">
            Use of Our Services
          </h2>

          <p className="text-muted-foreground mt-4 text-[17px] leading-7">
            You may use our services only for lawful purposes. You agree not to
            misuse, interfere with, or attempt to gain unauthorized access to
            our systems, services, or other users&lsquo; accounts.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight">
            User Content
          </h2>

          <p className="text-muted-foreground mt-4 text-[17px] leading-7">
            You retain ownership of any images, files, or other content you
            upload. By using our services, you grant us only the limited rights
            necessary to process your content and provide the requested
            functionality.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight">
            Intellectual Property
          </h2>

          <p className="text-muted-foreground mt-4 text-[17px] leading-7">
            All website content, including branding, logos, graphics, software,
            and design elements, is owned by or licensed to Motif and is
            protected by applicable intellectual property laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight">
            Prohibited Activities
          </h2>

          <p className="text-muted-foreground mt-4 text-[17px] leading-7">
            You agree not to use our services to distribute malicious software,
            violate applicable laws, infringe intellectual property rights,
            attempt unauthorized access, or engage in activities that could harm
            our platform or other users.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight">
            Service Availability
          </h2>

          <p className="text-muted-foreground mt-4 text-[17px] leading-7">
            We strive to keep our services available at all times, but we do not
            guarantee uninterrupted access. Maintenance, updates, or unforeseen
            technical issues may temporarily affect availability.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight">
            Limitation of Liability
          </h2>

          <p className="text-muted-foreground mt-4 text-[17px] leading-7">
            To the maximum extent permitted by law, Motif shall not be liable
            for any indirect, incidental, special, or consequential damages
            arising from your use of our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight">
            Termination
          </h2>

          <p className="text-muted-foreground mt-4 text-[17px] leading-7">
            We reserve the right to suspend or terminate access to our services
            at any time if these Terms &amp; Conditions are violated or if
            necessary to protect the platform and its users.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight">
            Changes to These Terms
          </h2>

          <p className="text-muted-foreground mt-4 text-[17px] leading-7">
            We may update these Terms &amp; Conditions from time to time. Any
            changes will become effective once published on this page. Continued
            use of our services after changes are posted constitutes acceptance
            of the revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight">
            Contact Us
          </h2>

          <p className="text-muted-foreground mt-4 text-[17px] leading-7">
            If you have any questions regarding these Terms &amp; Conditions,
            please contact us through the support channels available on our
            website.
          </p>
        </section>
      </article>
    </main>
  );
}