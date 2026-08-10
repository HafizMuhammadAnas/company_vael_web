/**
 * VAELKODE legal pages — Privacy Policy, Terms & Conditions, Cookie Policy.
 *
 * Website-ready draft content (approved wording). Company registration details
 * are pulled from the central COMPANY config so they stay consistent. This is
 * not a substitute for professional legal review before public launch.
 */
import { COMPANY } from "@/constants/company";

const { registeredName, companyNumber, registeredIn, registeredOffice } = COMPANY.legal;

/** Shared "last updated" date for the legal documents. */
export const LEGAL_UPDATED = "9 August 2026";

export type LegalBlock = { p: string } | { ul: string[] } | { h3: string };

export interface LegalSection {
  heading: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  seo: { title: string; description: string };
  title: string;
  lastUpdated: string;
  intro: string[];
  sections: LegalSection[];
}

export const PRIVACY_POLICY: LegalDoc = {
  seo: {
    title: "Privacy Policy | VAELKODE",
    description:
      "How VAELKODE LTD collects, uses, protects, and shares personal information provided through the VAELKODE website.",
  },
  title: "Privacy Policy",
  lastUpdated: LEGAL_UPDATED,
  intro: [
    `${registeredName} ("VAELKODE", "we", "us", or "our") respects your privacy and is committed to protecting the personal information you provide when using our website.`,
    "This Privacy Policy explains what information we collect, how we use it, how we protect it, and the choices available to you.",
  ],
  sections: [
    {
      heading: "1. Who We Are",
      blocks: [
        { p: `${registeredName} is a company registered in the ${registeredIn}.` },
        { p: `Company number: ${companyNumber}` },
        { p: `Registered office: ${registeredOffice}` },
        {
          p: "For privacy-related questions, you can contact us through the contact details provided on our website.",
        },
      ],
    },
    {
      heading: "2. Information We Collect",
      blocks: [
        { p: "Depending on how you interact with our website, we may collect information such as:" },
        {
          ul: [
            "Your name",
            "Email address",
            "Company or organisation name",
            "Phone number",
            "Country or location information that you choose to provide",
            "Information about your project, requirements, or enquiry",
            "Information included in documents or files you voluntarily submit",
            "Information you provide when requesting a consultation or proposal",
            "Technical information about your device or website visit, where applicable",
          ],
        },
        { p: "We only request information that is relevant to the purpose for which it is collected." },
      ],
    },
    {
      heading: "3. How We Use Your Information",
      blocks: [
        { p: "We may use information you provide to:" },
        {
          ul: [
            "Respond to enquiries",
            "Communicate with you about requested services",
            "Arrange consultations",
            "Understand project requirements",
            "Prepare proposals or project information",
            "Provide and improve our services",
            "Maintain and secure our website",
            "Prevent misuse, fraud, or security incidents",
            "Meet applicable legal or regulatory obligations",
          ],
        },
        {
          p: "We do not use information for purposes that are incompatible with the purpose for which it was collected.",
        },
      ],
    },
    {
      heading: "4. Information Submitted Through Forms",
      blocks: [
        {
          p: "When you submit information through our Contact, Consultation, or Request a Proposal forms, we use the information to respond to your request and evaluate the services you are asking about.",
        },
        {
          p: "Please do not submit confidential, highly sensitive, or unnecessary personal information through a public website form.",
        },
        {
          p: "If you need to share sensitive project information, we may provide an appropriate alternative method for doing so.",
        },
      ],
    },
    {
      heading: "5. Legal Basis for Processing",
      blocks: [
        {
          p: "Where UK data protection law applies, we process personal information using an appropriate lawful basis depending on the circumstances.",
        },
        { p: "This may include:" },
        {
          ul: [
            "Taking steps at your request before entering into a contract",
            "Performing a contract",
            "Complying with legal obligations",
            "Pursuing legitimate interests where appropriate",
            "Consent, where consent is required",
          ],
        },
        { p: "Where we rely on consent, you may withdraw that consent where applicable." },
      ],
    },
    {
      heading: "6. Sharing Your Information",
      blocks: [
        {
          p: "We may use trusted service providers that help us operate our website and business, such as hosting, email, form processing, security, analytics, or other technical service providers.",
        },
        {
          p: "Where third parties process information on our behalf, we take appropriate steps to ensure that information is handled appropriately.",
        },
        {
          p: "We may also disclose information where required by law, regulation, legal proceedings, or to protect our rights, users, or systems.",
        },
        { p: "We do not sell your personal information." },
      ],
    },
    {
      heading: "7. International Transfers",
      blocks: [
        { p: "Some service providers we use may process information outside the United Kingdom." },
        {
          p: "Where applicable, we will take appropriate steps to ensure that international transfers of personal information are handled in accordance with applicable data protection requirements.",
        },
      ],
    },
    {
      heading: "8. How Long We Keep Information",
      blocks: [
        {
          p: "We retain personal information only for as long as reasonably necessary for the purpose for which it was collected, including where necessary to:",
        },
        {
          ul: [
            "Respond to enquiries",
            "Manage business relationships",
            "Maintain appropriate business records",
            "Meet legal or regulatory obligations",
            "Resolve disputes",
            "Protect our legitimate interests",
          ],
        },
        { p: "Retention periods may vary depending on the type and purpose of the information." },
      ],
    },
    {
      heading: "9. Security",
      blocks: [
        {
          p: "We take reasonable technical and organisational measures to protect personal information against unauthorised access, loss, misuse, alteration, or disclosure.",
        },
        { p: "However, no internet transmission or storage system can be guaranteed to be completely secure." },
      ],
    },
    {
      heading: "10. Your Data Protection Rights",
      blocks: [
        {
          p: "Depending on the circumstances and applicable law, you may have rights relating to your personal information, including the right to:",
        },
        {
          ul: [
            "Request access to your personal information",
            "Request correction of inaccurate information",
            "Request deletion of information",
            "Request restriction of processing",
            "Object to certain processing",
            "Request data portability where applicable",
            "Withdraw consent where processing is based on consent",
          ],
        },
        { p: "You may contact us if you wish to exercise an applicable right." },
      ],
    },
    {
      heading: "11. Cookies and Similar Technologies",
      blocks: [
        { p: "Our website may use cookies and similar technologies." },
        {
          p: "Information about how these technologies are used and how you can manage your preferences is provided in our Cookie Policy.",
        },
      ],
    },
    {
      heading: "12. Third-Party Websites",
      blocks: [
        { p: "Our website may contain links to third-party websites or services." },
        {
          p: "We are not responsible for the privacy practices or content of websites that we do not operate. We recommend reviewing the privacy policy of any third-party website you visit.",
        },
      ],
    },
    {
      heading: "13. Changes to This Privacy Policy",
      blocks: [
        {
          p: "We may update this Privacy Policy when our services, website, technology, or legal requirements change.",
        },
        { p: "The latest version will be published on this page with the relevant update date." },
      ],
    },
    {
      heading: "14. Contact",
      blocks: [
        {
          p: "If you have questions about this Privacy Policy or how VAELKODE handles personal information, please contact us through our Contact page or official company contact details.",
        },
      ],
    },
  ],
};

export const TERMS_AND_CONDITIONS: LegalDoc = {
  seo: {
    title: "Terms & Conditions | VAELKODE",
    description: "The terms governing use of the VAELKODE website, operated by VAELKODE LTD.",
  },
  title: "Terms & Conditions",
  lastUpdated: LEGAL_UPDATED,
  intro: [
    "These Terms & Conditions govern your use of the VAELKODE website.",
    "By accessing or using this website, you agree to comply with these terms.",
  ],
  sections: [
    {
      heading: "1. About VAELKODE",
      blocks: [
        { p: `This website is operated by ${registeredName}, a company registered in the ${registeredIn}.` },
        { p: `Company number: ${companyNumber}` },
        { p: `Registered office: ${registeredOffice}` },
      ],
    },
    {
      heading: "2. Website Use",
      blocks: [
        { p: "You may use this website for lawful purposes and in accordance with these Terms & Conditions." },
        { p: "You must not:" },
        {
          ul: [
            "Use the website for unlawful or fraudulent purposes",
            "Attempt to gain unauthorised access to the website or its systems",
            "Interfere with the security or operation of the website",
            "Introduce malicious software or harmful code",
            "Copy or misuse website content without permission",
            "Use the website in a way that could damage VAELKODE or other users",
          ],
        },
      ],
    },
    {
      heading: "3. Website Content",
      blocks: [
        { p: "We aim to keep the information on this website accurate and useful." },
        {
          p: "However, website content is provided for general informational purposes and may change without notice.",
        },
        {
          p: "Information about our services does not constitute a binding offer or contractual commitment unless expressly agreed in a separate written agreement.",
        },
      ],
    },
    {
      heading: "4. Intellectual Property",
      blocks: [
        {
          p: `Unless otherwise stated, the content of this website, including text, branding, graphics, designs, layouts, and other materials, is owned by or licensed to ${registeredName}.`,
        },
        { p: "You may view and use the website for personal or legitimate business information purposes." },
        {
          p: "You must not reproduce, distribute, modify, republish, or commercially exploit website content without prior permission, except where permitted by applicable law.",
        },
      ],
    },
    {
      heading: "5. Services and Project Agreements",
      blocks: [
        { p: "Information about VAELKODE's services on this website is general in nature." },
        {
          p: "Any software development, consulting, design, maintenance, support, or other professional services provided to a client will be governed by separate agreements, proposals, statements of work, or other contractual documents where applicable.",
        },
        {
          p: "Those agreements will define the specific scope, deliverables, fees, responsibilities, intellectual property arrangements, timelines, and other project terms.",
        },
      ],
    },
    {
      heading: "6. User Submissions",
      blocks: [
        {
          p: "If you submit information through our website, including enquiries, project descriptions, documents, or other materials, you are responsible for ensuring that you have the right to provide that information to us.",
        },
        { p: "You should not submit information that you are prohibited from sharing." },
        { p: "Our handling of personal information is explained in our Privacy Policy." },
      ],
    },
    {
      heading: "7. Third-Party Services and Links",
      blocks: [
        { p: "The website may contain links to third-party websites, services, or platforms." },
        {
          p: "These links are provided for convenience and do not mean that VAELKODE endorses or controls those third-party services.",
        },
        { p: "Third-party services are subject to their own terms and policies." },
      ],
    },
    {
      heading: "8. Website Availability",
      blocks: [
        {
          p: "We aim to keep the website available and functioning properly, but we do not guarantee that the website will always be available, uninterrupted, secure, or error-free.",
        },
        { p: "We may modify, suspend, or discontinue parts of the website when necessary." },
      ],
    },
    {
      heading: "9. Limitation of Liability",
      blocks: [
        {
          p: "To the extent permitted by applicable law, VAELKODE will not be responsible for losses arising solely from reliance on general information published on this website.",
        },
        { p: "Nothing in these Terms & Conditions excludes or limits liability where doing so would be unlawful." },
      ],
    },
    {
      heading: "10. Privacy",
      blocks: [
        { p: "Your use of this website may involve the processing of personal information." },
        {
          p: "Please review our Privacy Policy for information about how we collect and use personal information.",
        },
      ],
    },
    {
      heading: "11. Changes to These Terms",
      blocks: [
        { p: "We may update these Terms & Conditions from time to time." },
        { p: "Changes will become effective when the updated version is published on this page." },
      ],
    },
    {
      heading: "12. Governing Law",
      blocks: [
        {
          p: "These Terms & Conditions are governed by the laws applicable in England and Wales, unless applicable law requires otherwise.",
        },
        {
          p: "Any disputes relating to the use of this website will be subject to the applicable courts and jurisdiction of England and Wales, unless applicable law provides otherwise.",
        },
      ],
    },
    {
      heading: "13. Contact",
      blocks: [
        {
          p: "If you have questions about these Terms & Conditions, please contact VAELKODE through the contact details provided on our website.",
        },
      ],
    },
  ],
};

export const COOKIE_POLICY: LegalDoc = {
  seo: {
    title: "Cookie Policy | VAELKODE",
    description: "How VAELKODE LTD uses cookies and similar technologies on the VAELKODE website.",
  },
  title: "Cookie Policy",
  lastUpdated: LEGAL_UPDATED,
  intro: [
    `This Cookie Policy explains how ${registeredName} uses cookies and similar technologies on the VAELKODE website.`,
  ],
  sections: [
    {
      heading: "1. What Are Cookies?",
      blocks: [
        {
          p: "Cookies are small files or similar technologies that may be stored on your device when you visit a website.",
        },
        {
          p: "They can be used to support essential website functionality, remember preferences, understand how a website is used, or provide other functionality depending on how they are configured.",
        },
      ],
    },
    {
      heading: "2. How We Use Cookies",
      blocks: [
        { p: "VAELKODE may use cookies and similar technologies for purposes such as:" },
        {
          ul: [
            "Providing essential website functionality",
            "Maintaining website security",
            "Remembering user preferences",
            "Understanding website usage, where analytics are enabled",
            "Supporting other website functions where applicable",
          ],
        },
        { p: "We only use categories of cookies that are actually implemented on the website." },
      ],
    },
    {
      heading: "3. Types of Cookies",
      blocks: [
        { h3: "Strictly Necessary Cookies" },
        {
          p: "These cookies are required for essential website functionality, security, or services requested by the user.",
        },
        {
          p: "Because these cookies may be necessary for the operation of the website, they may not require consent where an applicable exemption applies.",
        },
        { h3: "Analytics Cookies" },
        {
          p: "Where analytics technologies are enabled, these cookies or similar technologies help us understand how visitors use the website, such as which pages are visited and how the website performs.",
        },
        { p: "Analytics technologies will only be enabled in accordance with applicable consent requirements." },
        { h3: "Functional Cookies" },
        { p: "These may be used to remember preferences or provide functionality requested by users." },
        { h3: "Marketing or Advertising Cookies" },
        {
          p: "If VAELKODE introduces marketing or advertising technologies that use cookies or similar technologies, they will be disclosed through the cookie preference mechanism and handled in accordance with applicable consent requirements.",
        },
      ],
    },
    {
      heading: "4. Third-Party Technologies",
      blocks: [
        { p: "Some functionality may be provided by third-party services." },
        {
          p: "Where third-party services use cookies or similar technologies, the relevant service and purpose should be identified in our cookie preference interface and, where required, consent will be requested before the technology is activated.",
        },
      ],
    },
    {
      heading: "5. Managing Your Cookie Preferences",
      blocks: [
        {
          p: "Where applicable, you can manage non-essential cookie preferences through our Cookie Settings interface.",
        },
        { p: "You may also control cookies through your web browser." },
        { p: "Changing or withdrawing your preferences may affect certain website functionality." },
      ],
    },
    {
      heading: "6. Changes to This Cookie Policy",
      blocks: [
        {
          p: "We may update this Cookie Policy when our website, technologies, services, or applicable requirements change.",
        },
        { p: "The latest version will always be published on this page." },
      ],
    },
    {
      heading: "7. Contact",
      blocks: [
        {
          p: "If you have questions about our use of cookies or similar technologies, please contact VAELKODE through our Contact page or official company contact details.",
        },
      ],
    },
  ],
};
