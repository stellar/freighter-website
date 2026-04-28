import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Freighter Privacy Policy.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-semibold text-text-primary tracking-tight">
            Freighter Privacy Policy
          </h1>
          <p className="text-sm text-text-tertiary mt-2">
            Last Updated: August 19, 2025 &middot; Version 1.0
          </p>

          <article className="prose prose-invert prose-lg mt-12 max-w-none">
            <p>
              <strong>Welcome to the Freighter</strong>
            </p>
            <p>
              The Freighter Services, or Services, include the Freighter browser
              extension, mobile application, website, and related user interfaces
              that enable you to create and manage a Freighter Wallet. Your
              Freighter Wallet is an access-controlled instance of the Services
              that allows you to generate and control cryptographic keys for an
              underlying Stellar Account. You control your crypto—we don&apos;t hold
              your keys. Your privacy comes first.
            </p>
            <p>
              This Privacy Policy explains how we handle your information (or
              more importantly, how we don&apos;t).
            </p>

            <h2>Scope of This Policy</h2>
            <p>This Privacy Policy applies when you:</p>
            <ul>
              <li>Use the Freighter Services — a user interface</li>
              <li>
                Visit our website at{" "}
                <a href="https://www.freighter.app">
                  https://www.freighter.app/
                </a>
              </li>
              <li>Use any services that link to this Privacy Policy</li>
              <li>
                Contact our team or engage with us on social media
              </li>
            </ul>

            <h3>Your Consent</h3>
            <p>
              By using the Services provided by Stellar Development Foundation
              (SDF), you agree to these privacy practices.
            </p>

            <h3>If You Don&apos;t Agree</h3>
            <p>
              <strong>
                If these terms don&apos;t work for you, please don&apos;t use the
                Services.
              </strong>
            </p>

            <h2>1. Content</h2>
            <ul>
              <li>The Basics</li>
              <li>The Stellar Network</li>
              <li>What Information We Don&apos;t Collect</li>
              <li>The Information We Do Collect</li>
              <li>Analytics, Security and Third-Party Services</li>
              <li>When We Share Information</li>
              <li>International Transfer(s)</li>
              <li>Your Privacy Rights</li>
              <li>Security</li>
              <li>Policy Update(s)</li>
              <li>Contact Us</li>
            </ul>

            <h2>2. The Basics - What You Should Know</h2>
            <p>
              <strong>You&apos;re in control.</strong> The Services provide a
              non-custodial wallet, which means:
            </p>
            <ul>
              <li>
                You control your assets - we don&apos;t hold or have access to your
                crypto
              </li>
              <li>
                We don&apos;t actively collect your information like name, email
                address, phone number, etc.
              </li>
              <li>Your seed phrase stays with you - we never see it</li>
              <li>Your private key is stored only on your device</li>
            </ul>
            <p>
              <strong>Blockchain transparency.</strong> While we prioritize your
              privacy, blockchain technology is inherently transparent:
            </p>
            <ul>
              <li>
                Your Stellar Account address on the Stellar Network, transaction
                history, balances, and other on-chain activities <em>may</em> be
                visible on public blockchains
              </li>
              <li>
                This information cannot be hidden, changed, or deleted —{" "}
                <strong>it&apos;s immutable</strong>
              </li>
              <li>
                Your transaction patterns might reveal information about your
                activities
              </li>
              <li>
                This information could potentially be connected to your real
                identity by others
              </li>
            </ul>
            <p>
              <strong>
                Be mindful of transaction patterns that might identify you.
              </strong>
            </p>

            <h2>3. The Stellar Network</h2>
            <p>
              The Services allow you to generate, authorize, submit and broadcast
              transactions on the &quot;Stellar Network,&quot; a distributed ledger
              network powered by an open-source protocol found at:{" "}
              <a href="https://github.com/stellar/">
                https://github.com/stellar/
              </a>
              . This Privacy Policy does not apply to any information stored on
              the Stellar Network.
            </p>
            <p>
              <strong>
                Important to understand - When you use the Stellar Network:
              </strong>
            </p>
            <ul>
              <li>
                Information transmitted to the Stellar Network is public and
                permanent
              </li>
              <li>
                This includes transaction details like public addresses and/or
                the public key information of the receiver, currency sent or
                exchanged, time and date of the transaction, amounts and any
                other data you may choose to include
              </li>
              <li>This information cannot be hidden, amended, or deleted</li>
              <li>
                Your transactions may reveal information about you and those you
                transact with. Such information can potentially be correlated
                with you and others now, or in the future, by any party who
                chooses to do so, including law enforcement
              </li>
            </ul>

            <h2>4. Information We Don&apos;t Collect</h2>
            <p>
              Unlike many other services, applications or custodial wallets, the
              Services are designed with privacy in mind and do not collect:
            </p>
            <ul>
              <li>Private key(s)</li>
              <li>Names</li>
              <li>Email addresses</li>
              <li>Phone numbers</li>
              <li>Seed phrases</li>
              <li>Password(s)</li>
              <li>Profile photos</li>
              <li>Date of birth</li>
              <li>
                Official ID documents (passport, driver&apos;s license, etc.)
              </li>
            </ul>
            <p>
              <strong>Exception:</strong> We may collect some limited information
              such as name, email address or phone number only when you
              voluntarily share it with our support team for assistance purposes.
            </p>
            <p>
              The Services may add or enable extra features like fiat onramps or
              cloud backup in the future. If we do, you will always be notified
              and given a choice before any additional data is collected.{" "}
              <strong>
                If a feature involves a third-party provider, their privacy
                practices will apply.
              </strong>
            </p>

            <h2>5. Information We Collect and How it is Used</h2>

            <h3>5.1 Device and Usage Information</h3>
            <ul>
              <li>
                <strong>Device &amp; Usage Information:</strong> We and our
                service providers may collect limited data to provide and protect
                our services, including your device details (model, operating
                system, identifiers), browsing activity (pages viewed, links
                clicked, referring sites, wallet connections), IP address, and
                error reports. We only use your IP address for security purposes,
                analytics, establishing connections, approximate location
                detection, and legal compliance—
                <strong>
                  not for marketing or advertising purposes
                </strong>
                . This device &amp; usage information data helps us optimize
                performance, prevent attacks, troubleshoot issues, and improve
                our services through analytics. We retain this information only
                as long as necessary for these purposes and to meet legal
                obligations. You can opt out of non-essential data analytics
                collection by toggling this feature off in Preferences, though
                some basic data collection remains necessary for the Services to
                function properly.
              </li>
              <li>
                <strong>Public Key / Addresses:</strong> We may collect the
                public key that is generated when you create your Freighter
                account. We may also collect other public blockchain addresses
                associated with your public key. We do not use these keys or
                addresses for tracking purposes.
              </li>
              <li>
                <strong>Crash Reports:</strong> We collect crash reports and
                error logs to help identify and fix bugs.
              </li>
              <li>
                <strong>On-Chain Transactional Information:</strong> When you
                submit transactions on the Stellar Network using the Services,
                we may collect information about those transactions (sender,
                recipient, asset type, amount, timestamp, and date) for support
                and analytics purposes.
              </li>
            </ul>

            <h3>5.2 Biometric Data - For Authentication Only</h3>
            <p>
              We may use biometric data (such as fingerprints or facial
              recognition) in future versions of the app to authenticate your
              identity and unlock your wallet interface.
            </p>
            <p>
              <strong>Important privacy protections:</strong>
            </p>
            <ul>
              <li>
                Biometric data is stored locally on your device and managed by
                your device&apos;s operating system
              </li>
              <li>
                The Services do not access, receive, or process your actual
                biometric information; authentication is handled entirely by your
                device&apos;s biometric API
              </li>
              <li>
                By using biometric authentication features, you consent to the
                use of your biometric data as described here. You may withdraw
                consent at any time by disabling this feature in your device
                settings. Disabling biometric authentication will not affect your
                ability to use other features of the Services
              </li>
              <li>
                Our practices are designed to comply with applicable biometric
                privacy laws, such as the Illinois Biometric Information Privacy
                Act (BIPA)
              </li>
            </ul>

            <h2>6. Analytics, Security and Third-Party Services</h2>

            <h3>6.1 Analytics</h3>
            <p>
              The Services collect limited usage information about how you use
              our Services, either directly or through trusted Third-Party
              Services. This data helps us improve the app&apos;s performance and
              features.{" "}
              <strong>
                This information will not be connected to any personal identity
              </strong>{" "}
              and we may keep it for as long as needed. You can stop this
              anonymous data collection at any time by toggling off the
              &apos;Anonymous Data Sharing&apos; option in Preferences.
            </p>

            <h3>6.2 Crash Reporting</h3>
            <p>
              We use Third-Party Services to collect crash reports and error logs
              for bug identification and resolution. This data is stored for
              30-90 days.
            </p>

            <h3>6.3 Third-Party Integrations</h3>
            <p>
              The Services integrate with some of the following Third-Party
              Services:
            </p>
            <ul>
              <li>
                <strong>Blockaid:</strong> For security purposes
              </li>
              <li>
                <strong>Stellar.expert:</strong> For blockchain data
              </li>
              <li>
                <strong>Coinbase:</strong> For on-ramping
              </li>
            </ul>
            <p>When you use these integrations:</p>
            <ul>
              <li>
                Your public key may be shared with applications you connect with
              </li>
              <li>
                Your public key may be shared with Third-Party Services so it
                can send assets to it
              </li>
              <li>All data transfers use HTTPS for security</li>
            </ul>

            <h3>6.4 Understanding Ramps</h3>
            <p>
              The Services may allow you to interact with specialized Third-Party
              Services on the Stellar Network called &quot;Ramps&quot; that provide
              conversion between fiat currencies and digital assets. Ramps
              provide &quot;on-ramp&quot; functionality (converting fiat money to digital
              assets) and &quot;off-ramp&quot; functionality (converting digital assets
              back to fiat money).
            </p>
            <p>
              These Ramps operate as independent Third-Party Services. SDF does
              not provide these services. Your use of any Ramp is governed by
              that Ramp&apos;s respective terms and conditions and privacy policy, not
              ours. SDF makes no representations, warranties, or endorsements
              about any Ramp&apos;s services.
            </p>
            <p>
              <strong>
                When you use features powered by our partners, Third-Party
                Services or Ramps, they may need or collect some of your personal
                information to provide their services to you.
              </strong>
            </p>

            <h2>7. When We Share Information</h2>
            <p>
              We share limited information in the following circumstances or as
              otherwise described in this policy:
            </p>
            <ul>
              <li>
                <strong>Stellar Network:</strong> In connection with your use of
                the Services, we share information with the Stellar Network,
                including publicly and permanently, as described in The Stellar
                Network section above.
              </li>
              <li>
                <strong>Third-Party Services:</strong> We share information with
                Third-Party Service providers, vendors, consultants, or
                organizations that need access to your information to provide
                services you request through the application (such as Ramps,
                analytics, fraud prevention, aid organizations or customer
                support). These providers may have their own privacy practices,
                which you are responsible for reviewing separately.
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may use or disclose your
                information to detect, prevent, or address fraud or if we
                believe that disclosure is in accordance with, or required by,
                any applicable law or legal process, including lawful requests by
                public authorities to meet national security or law enforcement
                requirements.
              </li>
              <li>
                <strong>Protection of Rights:</strong> We may use or share
                information if we believe that your actions are inconsistent with
                our Terms of Service, if we believe that you have violated the
                law, or if we believe it is necessary to protect the rights,
                property, and safety of SDF, our users, the public, or others.
              </li>
              <li>
                <strong>Professional Advisors:</strong> We share information with
                our lawyers and other professional advisors where necessary to
                obtain advice or otherwise protect and manage our business
                interests.
              </li>
              <li>
                <strong>Business Transfers:</strong> We may share information in
                connection with, or during negotiations concerning, any merger,
                sale of company assets, financing, or acquisition of all or a
                portion of our business by another company.
              </li>
              <li>
                <strong>With Your Consent:</strong> We share information with
                your consent or at your direction.
              </li>
              <li>
                <strong>Aggregated Data:</strong> We also share aggregated or
                de-identified information that cannot <em>reasonably</em> be used
                to identify you.
              </li>
            </ul>

            <h2>
              8. Transfer Of Information To The United States &amp; Other
              Countries
            </h2>
            <p>
              We are headquartered in the United States and we have operations
              and service providers and third-party partners in the United States
              and other countries. Therefore, we and our service providers and
              third-party partners may transfer your personal information to, or
              store or access it in, jurisdictions that may not provide levels of
              data protection that are equivalent to those of your home
              jurisdiction. Where required by law, we provide adequate protection
              for the transfer of personal data in accordance with applicable
              law, such as by obtaining your consent, relying on the European
              Commission&apos;s adequacy decisions, or executing Standard Contractual
              Clauses. Where relevant, you may request a copy of these Standard
              Contractual Clauses by contacting us at{" "}
              <a href="mailto:help@freighter.app">help@freighter.app</a>.
            </p>

            <h2>9. Your Privacy Rights</h2>
            <p>You maintain complete control over your information.</p>
            <p>
              <strong>Your rights include:</strong>
            </p>
            <ul>
              <li>
                <strong>Opt-out of data collection:</strong> You can opt-out of
                certain sharing in-app events
              </li>
              <li>
                <strong>Data deletion:</strong> You can remove device data by
                logging out of the app
              </li>
            </ul>
            <p>
              Note that data collected is anonymous and cannot be tracked to a
              specific user.
            </p>

            <h3>9.1 Cookies</h3>
            <p>
              Our website uses small text files called cookies to help the site
              work better for you. Here&apos;s what you need to know:
            </p>
            <p>
              <strong>What cookies do for you:</strong>
            </p>
            <ul>
              <li>
                Essential cookies: These help our website function properly and
                remember if you&apos;ve visited before.
              </li>
              <li>
                Analytics cookies: These help us understand how visitors use our
                site so we can make improvements.
              </li>
            </ul>
            <p>
              <strong>Our cookies:</strong> We primarily use Google Analytics
              cookies to count visitors and see how people navigate our site.
            </p>
            <p>
              <strong>Your control:</strong> Most browsers accept cookies
              automatically, but you can change your browser settings to remove
              or block them. Keep in mind that some parts of our website might
              not work properly without cookies.
            </p>
            <p>
              <strong>Want more details?</strong> For specific information about
              our Google Analytics cookies, please contact us at{" "}
              <a href="mailto:help@freighter.app">help@freighter.app</a>.
            </p>

            <h3>9.2 Mobile Push Notifications</h3>
            <p>
              We may send push notifications to your mobile device. You can
              deactivate these messages at any time by changing the notification
              settings on your mobile device.
            </p>

            <h2>10. Security</h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect the limited information we process.
            </p>
            <p>
              <strong>Security measures for your wallet:</strong>
            </p>
            <ul>
              <li>Private key is stored only on your device</li>
              <li>
                Private key and seed phrases are securely stored using encryption
              </li>
            </ul>
            <p>
              <strong>
                However, no system is 100% secure, so we encourage you to:
              </strong>
            </p>
            <ul>
              <li>Keep your device secure</li>
              <li>Never share your seed phrase</li>
              <li>Be cautious about connecting to Third-Party Services</li>
              <li>Report any security concerns immediately</li>
            </ul>

            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this policy occasionally. When we do, we&apos;ll change
              the date at the top of this page. For significant changes, we may
              notify you through our website or app. We recommend checking this
              policy periodically to stay informed.
            </p>

            <h2>12. How to Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us
              at:
            </p>
            <ul>
              <li>
                Email:{" "}
                <a href="mailto:help@freighter.app">help@freighter.app</a>
              </li>
              <li>
                Website:{" "}
                <a href="https://www.freighter.app">www.freighter.app</a>
              </li>
            </ul>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
