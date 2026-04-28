import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Freighter Terms of Service.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-semibold text-text-primary tracking-tight">
            Freighter Terms of Service
          </h1>
          <p className="text-sm text-text-tertiary mt-2">
            Last Updated: August 15, 2025 &middot; Version 1.0
          </p>

          <article className="prose prose-invert prose-lg mt-12 max-w-none">
            <p>
              This User Agreement (&quot;Agreement&quot;) is between you and the Stellar
              Development Foundation (&quot;SDF,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). It governs
              your use of the Freighter Services, which include the Freighter
              browser extension, mobile application, website, and related user
              interfaces that enable you to create and manage a Freighter Wallet.
              Your Freighter Wallet is an access-controlled instance of the
              Freighter Services that allows you to generate and control
              cryptographic keys for an underlying Stellar Account (e.g., a G or
              C address) on the Stellar Network. This Agreement also applies to
              any related current or future services, including customer support
              and communications (collectively, the &quot;Services&quot;).
            </p>
            <p>
              The Services exclude any and all Third-Party Services or Ramps (as
              defined in section 3 below).
            </p>
            <p>
              By clicking &quot;I Agree&quot; or using the Services in any form, you accept
              all terms in this Agreement. This includes accessing the Services
              through freighter.app,{" "}
              <a href="https://www.freighter.app">www.freighter.app</a>, any
              related websites, APIs, applications, or browser extensions,
              regardless of how you access them or which device you use.
            </p>
            <p>
              <strong>IMPORTANT NOTICE REGARDING DISPUTE RESOLUTION</strong>
            </p>
            <p>
              PLEASE READ THIS USER AGREEMENT CAREFULLY. IF YOU ARE LOCATED IN
              CERTAIN JURISDICTIONS, YOU AGREE THAT DISPUTES BETWEEN YOU AND SDF
              WILL BE RESOLVED BY BINDING, INDIVIDUAL ARBITRATION, AND YOU ARE
              WAIVING YOUR RIGHT TO A TRIAL BY JURY OR TO PARTICIPATE AS A
              PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS ACTION OR
              REPRESENTATIVE PROCEEDING.
            </p>
            <p>
              For information about how we collect, use, share, and otherwise
              process information about you, please see our{" "}
              <Link href="/privacy">Privacy Policy</Link>.
            </p>

            <h2>1. GENERAL USE</h2>

            <h3>1.1 Eligibility - A little Bit About You First.</h3>
            <p>
              By using the Services, you represent and warrant that you:
            </p>
            <ol>
              <li>are 18 years of age or older;</li>
              <li>
                have the capacity to enter into this Agreement and agree to be
                legally bound by the terms and conditions of this Agreement, as
                amended from time to time and are not barred from using the
                Services under any applicable law;
              </li>
              <li>
                are not located in, under the control of, or a resident of any
                country to which the United States has embargoed goods or
                services, including but not limited to Cuba, Iran, North Korea,
                Syria or Russian controlled areas of Ukraine (such as, Republic
                of Crimea, Donetsk People&apos;s Republic, Luhansk People&apos;s
                Republic).
              </li>
              <li>
                are not identified as a Specially Designated National (&quot;SDN&quot;) by
                the U.S. Department of the Treasury Office of Foreign Assets
                Control (&quot;OFAC&quot;) or placed on the U.S. Department of
                Commerce&apos;s Denied Persons List;
              </li>
              <li>
                are either (a) using the Services only for your own personal
                use, or (b) using the Services for another entity with
                authorization from such entity, and you have authority to agree
                to and do agree to the terms of this Agreement on behalf of such
                entity; and
              </li>
              <li>
                you will comply with this Agreement and all applicable local,
                state, national, and international laws, rules, and regulations
                in your usage of the Services.
              </li>
              <li>
                If you do not meet all of these requirements, you must not
                access or use the Services.
              </li>
            </ol>

            <h3>1.2 Changes To Our Services: How &amp; When We Update Things.</h3>
            <p>
              We may update this Agreement or change, suspend, or limit features
              of our Services at any time.
            </p>
            <p>Here&apos;s what you need to know:</p>
            <ul>
              <li>
                <strong>
                  You&apos;re responsible for checking this Agreement regularly
                </strong>{" "}
                for any changes or updates.
              </li>
              <li>
                For significant changes we&apos;ll try to give you reasonable advance
                notice.
              </li>
              <li>
                For urgent changes related to security, safety, legal or
                regulatory requirements, we might not be able to notify you
                beforehand, but we&apos;ll let you know as soon as we can.
              </li>
              <li>
                If you don&apos;t agree with any changes, your only option is to
                stop using our Services.
              </li>
              <li>
                <strong>
                  By continuing to use our Services after changes take effect,
                  you&apos;re accepting those changes
                </strong>
                .
              </li>
            </ul>

            <h3>1.3 Setting Up Your Freighter Wallet: What You Need to Know.</h3>
            <p>
              To use the Services, you&apos;ll need to set up a Freighter Wallet.
              Here&apos;s what this means:
            </p>
            <ul>
              <li>
                <strong>
                  You&apos;re using this for yourself or an authorized entity
                </strong>
                . By setting up your Freighter Wallet, you confirm you&apos;re either
                using it for yourself or you have permission to act on behalf of
                the entity you represent.
              </li>
              <li>
                <strong>
                  We do not require your name, email, or other directly
                  identifying information to use the Services
                </strong>
                . However, when you use the Freighter App, certain technical
                information—such as your Stellar Account, device information, and
                blockchain transaction data—may be collected. While we do not
                link this information to your real-world identity, your Stellar
                Account on the Stellar Network and related blockchain activity
                may be considered personal data under some privacy laws because
                it could potentially be linked to you through external means. For
                more details, please see our{" "}
                <Link href="/privacy">Privacy Policy</Link>.
              </li>
              <li>
                <strong>Your access may depend on additional steps</strong>. We
                might ask for more information during our onboarding process, and
                your ability to use certain services depends on providing it.
              </li>
              <li>
                <strong>Keep your Services credentials secure</strong>. Don&apos;t
                share your private keys, seed phrase, or access credentials with
                anyone. If you notice any unauthorized use, tell us immediately.
              </li>
              <li>
                <strong>
                  You&apos;re responsible for all Freighter Wallet activity
                </strong>
                . Any actions taken through your Freighter Wallet are your
                responsibility, whether you knew about them or not.
              </li>
              <li>
                <strong>We have some discretion about your access</strong>. We
                can refuse to provide Services, limit how many Freighter Wallets
                you can create, or restrict your access to certain features.
              </li>
              <li>
                <strong>
                  We may suspend or limit access to your Freighter Wallet if
                </strong>
                :
                <ul>
                  <li>You provide false or incomplete information</li>
                  <li>
                    We suspect your Freighter App or Freighter Wallet is being
                    used to violate this Agreement
                  </li>
                  <li>You don&apos;t meet our requirements</li>
                </ul>
              </li>
            </ul>

            <h3>1.4 Accessing Our Services: What You Need &amp; What To Expect.</h3>
            <p>To use the Services, you&apos;ll need:</p>
            <ul>
              <li>
                <strong>Your own devices connected to the internet</strong>.
                You&apos;re responsible for having the necessary equipment (like a
                smartphone) and internet connection. We don&apos;t cover any internet
                fees or data charges you might incur while using our Services.
              </li>
              <li>
                <strong>Access to the Services</strong> through our browser
                extension, mobile application, or website.
              </li>
              <li>
                <strong>Understanding about service availability</strong>. While
                we work hard to provide reliable service, sometimes the Services
                might be unavailable due to:
                <ul>
                  <li>Technical problems with equipment or technology</li>
                  <li>Scheduled maintenance or repairs</li>
                  <li>Circumstances beyond our control</li>
                </ul>
              </li>
              <li>
                <strong>Acceptance of occasional downtime</strong>. If for any
                reason the Services are inaccessible or inoperable, you agree to
                hold harmless SDF for any impact this inaccessibility or
                inoperability may have upon you or your use of the Services.
              </li>
            </ul>

            <h2>2. FREIGHTER SERVICES</h2>

            <h3>2.1 Digital Interface.</h3>
            <p>
              The Services allow you to create a Freighter Wallet, which
              generates and manages cryptographic keys for your Stellar Account
              on the Stellar Network. The Services provide a graphical user
              interface to view your information and create transactions on the
              Stellar Network. While the Stellar Network itself is not part of
              our Services, the Services enable you to interact with it.
            </p>

            <h3>2.2 Use of the Stellar Network and Its Limitations.</h3>
            <p>
              The Services enable you to view, hold and transfer digital asset
              balances, undertake certain transactions, interact with smart
              contracts, and otherwise transact through the Stellar Network.
              Activities on the Stellar Network are powered by a network of
              independent servers and are not controlled by us or any other
              single entity.{" "}
              <strong>
                We do not and cannot guarantee the successful operation,
                up-time, security, or functioning of the Stellar Network. We
                cannot control the activities of you or third parties who may
                develop or transact on the network, validate transactions on the
                network, or use the network because we do not control the
                Stellar Network and cannot control activity and data on the
                network.
              </strong>{" "}
              We cannot prevent, erase, reverse, hide, fix, or otherwise change
              any transaction submitted on the Stellar Network. All activity and
              data on the Stellar Network are permanent and public.
            </p>
            <p>
              <strong>
                You agree and acknowledge that any access or use by you of the
                Stellar Network is made solely at your own risk
              </strong>{" "}
              and that we bear no responsibility or liability for your use of
              the Stellar Network, including, without limitation, for any harm,
              loss, or damages arising from transactions sent to wrong
              addresses, incorrectly constructed transactions, software and
              network problems, technical failures, unauthorized access to any
              accounts, legal and regulatory matters and consequences, or fraud
              conducted by third parties.
            </p>

            <h3>2.3 Your Digital Assets: Important to Know.</h3>
            <p>
              The Services help you manage your digital assets on the Stellar
              Network, but here are some important things to understand:
            </p>
            <ul>
              <li>
                <strong>These aren&apos;t traditional currencies</strong>. Lumens
                (XLM) and other digital assets accessed through the Services:
                <ul>
                  <li>Are not legal tender</li>
                  <li>Are not backed by any government</li>
                  <li>
                    Are not protected by the Federal Deposit Insurance
                    Corporation (&quot;FDIC&quot;) or the Securities Investor Protection
                    Corporation (&quot;SIPC&quot;)
                  </li>
                </ul>
              </li>
              <li>
                <strong>Values can change dramatically</strong>. The value of
                your digital assets can be highly volatile and could potentially
                drop to zero, even for assets designed to track real-world
                currencies.
              </li>
              <li>
                <strong>We don&apos;t control or guarantee values</strong>. The
                Services or SDF aren&apos;t responsible for the value of any digital
                assets shown in your app and make no claims about their worth.
              </li>
              <li>
                <strong>Do your own research</strong>. You agree to investigate
                any digital assets before acquiring them. Any digital asset you
                may acquire using the Services is made voluntarily.
              </li>
              <li>
                <strong>You accept the risks</strong>. Any purchases you make
                are voluntary and entirely at your own risk.
              </li>
            </ul>

            <h3>2.4 Your Key, Your Responsibility.</h3>
            <p>
              When setting up your Freighter Wallet, the Services generate
              cryptographic private and public key pairs for your Stellar
              Account on the Stellar Network.
            </p>
            <p>
              You agree to store, outside of the Services, a backup of your
              private key and all related Services credentials, including any
              passphrases, mnemonic phrases, identifiers, backup phrases, and
              network addresses.{" "}
              <strong>
                If you do not maintain a backup of your private key and data
                outside of the Services, you will not be able to access the
                digital asset balance in your account
              </strong>{" "}
              on the Stellar Network that are accessed through the Services in
              the event that the Services or the Freighter Wallet are disrupted
              or we discontinue or no longer offer some or all of the Services.{" "}
              <strong>
                We will not maintain nor are we responsible for maintaining any
                data on your behalf.
              </strong>
            </p>
            <p>
              You agree and acknowledge that you are solely responsible for the
              secure storage of any digital assets accessed through your
              Freighter App, your user key, and any other related private keys
              in your possession.{" "}
              <strong>
                You agree that in no event will SDF be liable for the security
                or control of any digital assets, user keys, recovery keys, or
                other credentials held in or related to the Services
              </strong>
              .
            </p>
            <p>
              <strong>Don&apos;t lose your key(s)!</strong>
            </p>

            <h3>2.5 How Your Transactions Work.</h3>
            <p>
              Your Freighter Wallet, via the Services, allows you to create,
              sign, and submit transactions from your Stellar Account to the
              Stellar Network. Here&apos;s how it works:
            </p>
            <ul>
              <li>
                <strong>Your device handles the signing</strong>. The Services
                use private key information stored on your device to sign
                transactions you initiate.
              </li>
              <li>
                <strong>Transactions need proper authorization</strong>. On the
                Stellar Network, all transactions need to be authorized by your
                private key.
              </li>
              <li>
                <strong>Transactions can&apos;t be undone by you</strong>. Once a
                transaction is signed and submitted to the Stellar Network, you
                cannot cancel, reverse, or change it.
              </li>
              <li>
                <strong>The network might affect your transaction</strong>. A
                transaction may fail to execute or be delayed if, for example,
                it does not meet network requirements, is invalid, or encounters
                other technical issues beyond our control.
              </li>
              <li>
                <strong>We&apos;re not responsible for network actions</strong>. Our
                Services or SDF won&apos;t be responsible for any consequences if
                the Stellar Network affects your transaction in any way.
              </li>
            </ul>

            <h3>2.6 Fees: The Services are Free For Now, May Change Later.</h3>
            <p>
              <strong>Network Requirements</strong>
            </p>
            <p>
              You&apos;re responsible for maintaining the minimum XLM balance (&quot;XLM
              Reserve&quot;) required by the Stellar Network for your account&apos;s
              trustlines and signers. This reserve can only be used for
              maintaining your account on the Stellar Network and cannot be
              withdrawn. You&apos;re also responsible for any transaction fees
              charged by the Stellar Network.
            </p>
            <p>
              <strong>Freighter Fees</strong>
            </p>
            <p>Currently, SDF does not charge fees for use of the Services. However:</p>
            <ul>
              <li>Third-party services and ramps may charge their own fees</li>
              <li>We may introduce fees in the future</li>
              <li>
                If we add fees, we&apos;ll clearly display them before you incur any
                charges
              </li>
            </ul>
            <p>
              <strong>Third-Party Fees</strong>
            </p>
            <p>
              Issuers of non-XLM digital assets may charge their own fees for
              deposits, withdrawals, or other services when you use them through
              the Services.
            </p>

            <h2>3. THIRD-PARTY SERVICES</h2>

            <h3>3.1 Third-Party Services &amp; Your Responsibilities.</h3>
            <p>
              The Service may provide links, integrations with or access to
              third-party websites, applications, content, or resources
              (&quot;Third-Party Services&quot;). Please understand the following:
            </p>
            <ul>
              <li>
                <strong>Access to Third Party Services for convenience only</strong>.
                We provide access to these Third Party Services solely as a
                convenience and do not exercise control over their content or
                operations.
              </li>
              <li>
                <strong>No warranties or endorsements</strong>. We do not
                warrant, endorse, or assume responsibility for the availability,
                legitimacy, content, products, or services offered by these
                Third-Party Services.
              </li>
              <li>
                <strong>Assumption of risk</strong>. You acknowledge sole
                responsibility for and assume all risk arising from your use of
                any Third-Party Services. Your interactions with such services
                are solely between you and the third party.
              </li>
              <li>
                <strong>Separate terms apply</strong>. Your use of Third-Party
                Services is governed by separate terms and conditions between you
                and the third-party provider identified in the Freighter App.
              </li>
              <li>
                <strong>Duty to review terms</strong>. You are responsible for
                reviewing and understanding the applicable terms and conditions
                before engaging with any Third-Party Service.
              </li>
            </ul>

            <h3>3.2 Understanding Ramps: Functions &amp; Limitations.</h3>
            <p>
              The Services may allow you to interact with specialized
              third-party services on the Stellar Network called &quot;Ramps&quot; that
              provide conversion between traditional currencies and digital
              assets:
            </p>
            <ul>
              <li>
                <strong>What Ramps do</strong>: Ramps provide &quot;on-ramp&quot;
                functionality (converting traditional money to digital assets)
                and &quot;off-ramp&quot; functionality (converting digital assets back to
                traditional money).
              </li>
              <li>
                <strong>Independent status</strong>: Ramps operate as independent
                Third-Party Services subject to Section 3.1. SDF does not
                provide these services.
              </li>
              <li>
                <strong>Terms and governance</strong>: Your use of any Ramp is
                governed by that Ramp&apos;s own terms and conditions, not ours. SDF
                makes no representations, warranties, or endorsements about any
                Ramp&apos;s services.
              </li>
              <li>
                <strong>Risks involved</strong>: Using Ramp services involves
                various risks, including:
                <ul>
                  <li>Potential loss of funds</li>
                  <li>Loss of access to your digital assets</li>
                  <li>Unavailability of the Stellar Network</li>
                  <li>Software bugs or errors in the Ramp&apos;s services</li>
                  <li>
                    Inability to purchase, redeem, or convert digital assets
                  </li>
                  <li>Risks related to sharing your data with the Ramp</li>
                </ul>
              </li>
              <li>
                <strong>Limitation of liability</strong>: SDF is not responsible
                for any loss or delay in accessing your digital assets when
                issues occur in connection with a Ramp&apos;s services.
              </li>
              <li>
                <strong>Conversion limits</strong>: We or the Ramp may set
                maximum amounts of currency or digital assets you can convert
                through Ramp services. These limits may change at any time
                without notice.
              </li>
            </ul>

            <h3>
              3.3 Using the Stellar Network&apos;s Built-in Decentralized Exchange.
            </h3>
            <p>
              The Stellar Network includes a built-in decentralized exchange (the
              &quot;DEX&quot;), which is a permissionless, non-custodial protocol feature
              of the network. You may choose to access the DEX through the
              Services, for example to post offers or trade assets available on
              the Stellar Network. The DEX is not operated or controlled by the
              Services, and no guarantees are made about its functionality,
              reliability, or security. All DEX activity occurs directly on the
              Stellar Network according to its consensus protocol, without the
              Services or any other off-ledger third party acting as an
              intermediary or custodian.
            </p>

            <h2>4. REPRESENTATIONS, WARRANTIES, and RISKS</h2>

            <h3>4.1 Warranty Disclaimers.</h3>
            <p>
              YOUR USE OF THE SERVICES IS AT YOUR OWN RISK. THE SERVICES, ALL
              SUBPARTS THEREOF, INCLUDING ALL TOOLS, APPLICATIONS, AND OTHER
              CONTENT ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS
              WITHOUT ANY REPRESENTATION OR WARRANTY, WHETHER EXPRESS, IMPLIED,
              OR STATUTORY. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW,
              SDF SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTIES OF TITLE,
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND/OR
              NON-INFRINGEMENT AS TO THE SERVICES AND THE INFORMATION, CONTENT,
              TOOLS, AND MATERIALS CONTAINED THEREIN. SOME JURISDICTIONS DO NOT
              ALLOW THE EXCLUSION OF IMPLIED WARRANTIES, SO THE ABOVE EXCLUSIONS
              MAY NOT APPLY TO YOU. SDF DOES NOT MAKE ANY REPRESENTATIONS OR
              WARRANTIES THAT (I) ACCESS TO THE SERVICES OR ANY PART THEREOF
              WILL BE CONTINUOUS, UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE;
              (II) THAT THE SERVICES OR ANY MATERIALS CONTAINED THEREIN ARE
              ACCURATE, COMPLETE, RELIABLE, OR CURRENT; (III) THAT THE SERVICES
              ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS; OR (IV) THAT THE
              SERVICES OR ANY OF THE MATERIALS CONTAINED THEREIN WILL MEET YOUR
              REQUIREMENTS, NEEDS, OR EXPECTATIONS. ADDITIONALLY, SDF DOES NOT
              MAKE ANY REPRESENTATIONS OR WARRANTIES WITH RESPECT TO THE
              LEGALITY OF THE SERVICES FOR ANY USE CASE, OR THAT THE SERVICES
              MAY MEET ANY REGULATORY AND COMPLIANCE NEEDS. YOU ARE SOLELY
              RESPONSIBLE FOR DETERMINING AND COMPLYING WITH ALL APPLICABLE
              LEGAL AND REGULATORY RESTRICTIONS, REPORTING OBLIGATIONS AND OTHER
              REQUIREMENTS THAT MAY GOVERN YOUR USE OF THE SERVICES. EXCEPT FOR
              THE EXPRESS STATEMENTS SET FORTH IN THIS AGREEMENT, YOU HEREBY
              ACKNOWLEDGE AND AGREE THAT YOU HAVE NOT RELIED UPON ANY OTHER
              STATEMENT OR UNDERSTANDING, WHETHER WRITTEN OR ORAL, WITH RESPECT
              TO YOUR ACCESS AND USE OF THE SERVICES. SDF IS NOT ACTING AND
              CANNOT ACT AS YOUR ADVISOR WITH RESPECT TO ANY FINANCIAL, LEGAL,
              INVESTMENT, OR TAX MATTERS. ANY INFORMATION PROVIDED BY THE
              COMPANY IS FOR GENERAL INFORMATION ONLY, AND YOU ARE SOLELY
              RESPONSIBLE FOR DETERMINING WHETHER OR NOT TO USE THE SERVICES. YOU
              ACKNOWLEDGE THAT THE SERVICE MAY BE SUBJECT TO EXPORT RESTRICTIONS
              AND ECONOMIC SANCTIONS IMPOSED BY U.S. LAW.
            </p>

            <h3>4.2 Technology Disclosures &amp; Disclaimers.</h3>
            <p>
              WITHOUT LIMITING THE GENERALITY OF SECTION 4.1: YOU ACKNOWLEDGE
              THAT THE STELLAR NETWORK IS A DECENTRALIZED NETWORK THAT IS NOT
              OPERATED OR CONTROLLED BY THE STELLAR DEVELOPMENT FOUNDATION, OR
              ANY THIRD PARTY ENTITY. NO ENTITY CONTROLS THE FUNCTIONALITY OR
              ACTIVITY OF THE STELLAR NETWORK OR THE VALUE OR ACTIVITY OF XLM.
              ALL TECHNOLOGY, SERVICES, AND INFORMATION RELATED TO THE STELLAR
              SOFTWARE AND THE STELLAR NETWORK ARE PROVIDED ON AN &quot;AS IS&quot; BASIS.
              SDF EXPRESSLY DISCLAIMS ANY AND ALL WARRANTIES, SERVICE LEVELS, AND
              INDEMNITIES, EXPRESS OR IMPLIED, RELATED TO THE STELLAR NETWORK,
              STELLAR SOFTWARE, AND DIGITAL ASSETS, INCLUDING ANY FAILURE OF THE
              STELLAR NETWORK, ANY LOSS OF VALUE OR ACCESS RELATED TO DIGITAL
              ASSETS, OR ANY TECHNOLOGICAL DISRUPTIONS OR FAILURES, INCLUDING
              WITHOUT LIMITATION ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
              PARTICULAR PURPOSE, TITLE, OR NON-INFRINGEMENT AND ANY WARRANTIES
              ARISING FROM COURSE OF PERFORMANCE, COURSE OF DEALING, OR USAGE OF
              TRADE.
            </p>

            <h3>4.3 Regulatory Disclosures &amp; Disclaimers.</h3>
            <p>
              You acknowledge that: (i) SDF does not offer securities-related
              services in the United States or to U.S. persons and is not
              registered with the U.S. Securities and Exchange Commission; (ii)
              SDF does not possess sufficient credentials to conduct transactions
              from any User&apos;s account on the Stellar Network in any digital
              asset; (iii) SDF is not a money transmitter or money service
              business and does not convert or transmit digital assets or any
              other thing of value on anyone&apos;s behalf; and (iv) SDF does not
              provide investment, financial, tax, or legal advice. The
              information and applications provided in connection with the
              Services do not constitute investment advice, financial advice,
              trading advice, or any other sort of advice, and should not be
              treated by any user as such. SDF makes no recommendation, and does
              not provide any advice about the value of any digital asset.
              Additionally, SDF and digital assets using the Stellar Network
              could be affected by one or more regulatory inquiries or regulatory
              action, which could impede or limit the ability of SDF to continue
              to develop, or which could impede or limit your ability to access
              or use the Services or the Stellar Network.
            </p>

            <h3>4.4 Cryptographic Risks &amp; Acknowledgements.</h3>
            <p>
              When you use our Services, you confirm the following:
            </p>
            <ol>
              <li>
                You understand the risks of cryptographic systems. You represent
                that you have sufficient knowledge of native cryptographic tokens
                (like XLM), how to manage public and private keys, and how
                blockchain-based software works.
              </li>
              <li>
                You recognize that cryptography constantly evolves. New
                developments in code cracking or technologies like quantum
                computing could threaten digital assets and potentially lead to
                theft or loss of your tokens or property.
              </li>
              <li>
                You understand that digital assets can be extremely volatile in
                value due to many factors including adoption rates, market
                speculation, technological changes, and security concerns. You
                acknowledge you could potentially lose your entire investment in
                digital assets.
              </li>
              <li>
                You recognize that transaction costs on the Stellar Network may
                change and increase over time, affecting your activities.
              </li>
              <li>
                You acknowledge that while we strive to update our Services with
                improved security measures as cryptography advances, we cannot
                guarantee complete security.
              </li>
            </ol>
            <p>By using our Services, you accept these inherent risks.</p>

            <h3>4.5 Third-Party Risks.</h3>
            <p>
              You understand that conducting transactions that involve the DEX,
              or any third-party will inherently carry risks associated with
              third parties that SDF does not and cannot control. You understand
              and acknowledge that the ability to transact with the DEX, with any
              Ramp, or with any other third-party via the Services does not mean
              that SDF endorses, supports, recommends, or makes any other
              representation regarding such Ramp, the DEX, or other such third
              party. Unless expressly stated otherwise in this Agreement, SDF
              disclaims any and all liability arising from your use of
              Third-Party Services, your interaction with third parties, or any
              transactions you may conduct with third parties, whether via the
              Freighter App, the Services, or otherwise.
            </p>

            <h3>4.6 Application Security.</h3>
            <p>
              You acknowledge that Stellar Network applications are code subject
              to flaws and you acknowledge that you are solely responsible for
              evaluating any code provided by the Services and the
              trustworthiness of any third-party websites, products,
              smart-contracts, or content you access or use through the Services.
              You further expressly acknowledge and represent that Stellar
              Network applications can be written maliciously or negligently,
              that SDF cannot be held liable for your interaction with such
              applications through the Services, and that such applications may
              cause the loss of property or even identity. This warning and
              others provided by SDF in no way evidence or represent an ongoing
              duty to alert you to all of the potential risks of utilizing the
              Services.
            </p>

            <h3>4.7 Network Disruption.</h3>
            <p>
              In the event of a network disruption of the Stellar Network or any
              other applicable network, SDF or the Services may not be able to
              support activity related to your account on the Stellar Network. In
              the event of a network disruption, transactions may not be
              completed, or they may be partially completed, incorrectly
              completed, or substantially delayed. SDF is not responsible for any
              loss incurred by you, caused in whole or in part, directly or
              indirectly, by a fork or other network disruption.
            </p>

            <h2>5. INDEMNITY</h2>
            <p>
              You agree to defend, indemnify, and hold harmless SDF, its
              independent contractors, service providers, advisors, and
              consultants, and their respective directors, employees, and agents
              (altogether, the &quot;Indemnitees&quot;), from and against any Claims,
              damages, costs, liabilities, and expenses (including, without
              limitation, reasonable attorneys&apos; fees) arising out of or related
              to: (i) your use of the Services; (ii) your violation of the terms
              of this Agreement; (iii) your violation of any rights of another;
              (iv) your conduct in connection with the Services; or (v) your use
              of the Stellar Network, or any digital asset. Some jurisdictions
              limit consumer indemnities, so some or all of the indemnity
              provisions above may not apply to you. If you are obligated to
              indemnify any of the Indemnitees, we reserve the right, in our
              sole discretion, to control any action or proceeding and to
              determine whether to settle and on what terms.
            </p>

            <h2>6. LIMITATION ON LIABILITY</h2>
            <p>
              YOU AGREE THAT IN NO EVENT WILL YOU SEEK TO HOLD SDF, NOR WILL SDF
              BE LIABLE FOR, ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL,
              EXEMPLARY, OR PUNITIVE DAMAGES ARISING OUT OF OR IN CONNECTION WITH
              THESE TERMS OF SERVICE, THE SERVICES, THE STELLAR NETWORK OR ANY
              DIGITAL ASSETS ASSOCIATED WITH THE SERVICES, INCLUDING, WITHOUT
              LIMITATION, YOUR USE OR INABILITY TO USE THE SERVICES; THE SECURE
              STORAGE OF YOUR PRIVATE KEYS OR OTHER RELEVANT CREDENTIALS; ANY
              CHANGES TO OR INACCESSIBILITY OR TERMINATION OF THE SERVICES; ANY
              DELAY, FAILURE, UNAUTHORIZED ACCESS TO, OR ALTERATION OF ANY
              TRANSMISSION OR DATA; ANY TRANSACTION OR AGREEMENT ENTERED INTO
              THROUGH THE SERVICES; ANY ACTIVITIES OR COMMUNICATIONS OF THIRD
              PARTIES; ANY LOSS OF VALUE FOR ANY DIGITAL ASSET; OR ANY DATA OR
              MATERIAL FROM A THIRD PERSON ACCESSED ON OR THROUGH THE SERVICES,
              WHETHER SUCH LIABILITY IS ASSERTED ON THE BASIS OF TORT OR
              OTHERWISE, AND WHETHER OR NOT SDF HAS BEEN ADVISED OF THE
              POSSIBILITY OF SUCH DAMAGES. SUCH LIMITATION OF LIABILITY SHALL
              APPLY WHETHER THE DAMAGES ARISE FROM USE OR MISUSE OF AND RELIANCE
              ON SDF OR THE SERVICES, NOTWITHSTANDING ANY FAILURE OF ESSENTIAL
              PURPOSE OF ANY LIMITED REMEDY AND TO THE FULLEST EXTENT PERMITTED
              BY LAW. IF YOU ARE DISSATISFIED WITH THE SERVICES, YOU AGREE THAT
              YOUR SOLE AND EXCLUSIVE REMEDY WILL BE FOR YOU TO DISCONTINUE YOUR
              USE OF THE SERVICES. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION
              OR LIMITATION OF INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE
              LIMITATION AND EXCLUSIONS MAY NOT APPLY TO YOU.
            </p>

            <h2>7. INTELLECTUAL PROPERTY</h2>

            <h3>7.1 Our Creation, Our Proprietary Rights.</h3>
            <p>In simple terms:</p>
            <p>
              The Services are built on open source software, but our specific
              version of it belongs to us (SDF). Here&apos;s what that means:
            </p>
            <ul>
              <li>
                <strong>What we own</strong>: Our specific implementation of the
                Freighter App, including how we&apos;ve configured it, how we host
                it, and any unique elements we&apos;ve added.
              </li>
              <li>
                <strong>What&apos;s open source</strong>: The underlying software
                components that follow their own open source licenses.
              </li>
              <li>
                <strong>What&apos;s protected</strong>: Our version of the Services,
                including our implementation, design, interface, and all content
                (text, images, videos, etc.).
              </li>
              <li>
                <strong>What you can do</strong>: Use our Services for your
                personal, non-commercial purposes.
              </li>
              <li>
                <strong>What you can&apos;t do</strong>: Modify, copy, display,
                distribute, sell, or create new versions of our Services for
                commercial or public purposes without our permission.
              </li>
              <li>
                <strong>Exceptions</strong>: Any rights specifically granted to
                you by applicable copyright/trademark law or by the open source
                licenses that apply to certain components.
              </li>
            </ul>
            <p>
              By using our Services, you agree to respect these ownership rights
              and follow all applicable laws.
            </p>

            <h3>7.2 Trademarks.</h3>
            <p>
              The Freighter name and design are trademarks or service marks of
              SDF and may not be copied, imitated, or used, in whole or in part,
              except as expressly permitted in this Agreement or with the prior
              written permission of SDF. All other trademarks, names, or logos
              mentioned in connection with the Services are the property of their
              respective owners and may not be copied, imitated, or used, in
              whole or in part, without the written permission of the applicable
              trademark holder. The inclusion of any such reference does not
              constitute an approval, endorsement, or recommendation by us.
            </p>

            <h3>7.3 Limited License.</h3>
            <p>In simple terms:</p>
            <ul>
              <li>
                <strong>Open Source Code</strong>: We acknowledge that the
                underlying source code is open source software (OSS) available
                on GitHub, which has its own open source license terms.
              </li>
              <li>
                <strong>What we&apos;re licensing to you</strong>: We (SDF) grant you
                a limited, nonexclusive, nontransferable license to use our
                specific implementation of the Services as we provide them.
              </li>
              <li>
                <strong>What you can do</strong>: You can use the Services for
                personal, non-commercial purposes approved by SDF.
              </li>
              <li>
                <strong>What you can&apos;t do with our implementation</strong>: You
                cannot copy, sell, license, reverse engineer, or create
                derivative works from our specific implementation of the
                Services for commercial purposes without our written permission.
              </li>
              <li>
                <strong>Who owns what</strong>: While the underlying code is open
                source, our specific implementation, configuration, and
                deployment of the Services remains our property. When you
                download or access our implementation, you&apos;re getting a license
                to use it, not ownership of it.
              </li>
            </ul>

            <h2>8. PROHIBITED ACTIVITIES</h2>

            <h3>8.1 Using Our Services Lawfully.</h3>
            <p>
              You agree to use our Services for lawful purposes and in accordance
              with this Agreement or any user guidelines. You are solely
              responsible for determining which laws apply to your use of the
              Services and for complying with all applicable laws, regulations,
              and reporting requirements.{" "}
              <strong>
                You agree not to engage in prohibited use of the Services
              </strong>
              . You will not, under any circumstances, do any of the following:
            </p>
            <ol>
              <li>
                <strong>Use the Services to harm others</strong> - This includes:
                to defraud, threaten, harass, stalk, spam, abuse, or otherwise
                violate the legal rights (including rights of privacy and
                publicity) of others;
              </li>
              <li>
                <strong>Break the law</strong> - act, or fail to act, in your use
                of Services, in a manner that violates any applicable federal,
                state, local, or international law or regulation (including,
                without limitation, any laws regarding the export restrictions or
                economic sanctions);
              </li>
              <li>
                <strong>Provide false information</strong> - All information you
                give us must be accurate and truthful;
              </li>
              <li>
                <strong>Share inappropriate content</strong> - Don&apos;t send,
                upload, or use, or re-use any material which, in SDF&apos;s
                discretion, is abusive or does not comply with these terms;
              </li>
              <li>
                <strong>Collect data without permission</strong> - Don&apos;t scrape
                or collect information from the Services, including about others,
                without our written consent;
              </li>
              <li>
                <strong>Disrupt our Services</strong> - Don&apos;t attempt to
                disrupt, interfere, damage, or gain unauthorized access to any
                parts of the Services or any other computer network, server,
                computer, or database connected to the Services, including
                without limitation the Stellar Network;
              </li>
              <li>
                <strong>Pretend to be someone else</strong> - Don&apos;t impersonate
                other users, our company, or our team members;
              </li>
              <li>
                <strong>Spread harmful code</strong> - Don&apos;t transmit viruses,
                malware, or other malicious program;
              </li>
              <li>
                <strong>Engage in phishing, spoofing or similar attacks</strong>{" "}
                - Don&apos;t use our Services for any deceptive activities;
              </li>
              <li>
                <strong>Support illegal activity</strong> - Don&apos;t use the
                Services to engage in, fund or otherwise support fraudulent or
                unlawful activity including but not limited to funding terrorism,
                money laundering or unlawful money transmission or currency
                exchanging;
              </li>
              <li>
                <strong>Abuse the system</strong> - Don&apos;t engage in activities
                such as farming accounts, digital assets, etc.;
              </li>
              <li>
                <strong>Disrupt other users</strong> - Don&apos;t interfere with
                others&apos; ability to use our Services;
              </li>
              <li>
                <strong>Act against these terms</strong> - Don&apos;t engage in any
                other activity deemed by SDF to be in conflict with the spirit
                or intent of the terms of this Agreement or that, as determined
                by us, may harm SDF or users of the Services, or may expose them
                to liability.
              </li>
            </ol>

            <h3>8.2 U.S. Sanctions and Export Controls</h3>
            <p>
              The Services are subject to U.S. export control and economic
              sanctions laws. You may not use, export, re-export, transfer, or
              otherwise make available the Freighter App or Services:
            </p>
            <p>
              (a) to any person or entity on the U.S. Treasury Department&apos;s List
              of Specially Designated Nationals or other U.S. sanctions lists,
            </p>
            <p>
              (b) in, to, or for the benefit of any country or territory subject
              to comprehensive U.S. sanctions (including, but not limited to,
              Cuba, Iran, North Korea, Syria, or Russian-controlled regions of
              Ukraine), or
            </p>
            <p>
              (c) for any transaction or activity prohibited by U.S. sanctions or
              export control laws.
            </p>
            <p>
              By using the Services, you represent and warrant that you are not
              on any such list, are not located in any such country or territory,
              and will not use or transfer the Services for any prohibited
              transactions.
            </p>

            <h2>9. DISPUTE RESOLUTION</h2>

            <h3>9.1 Governing Law &amp; Where Disputes are Resolved.</h3>
            <p>
              This Agreement and any action related to it will be governed by the
              laws of the state of California in the United States, without
              regard to its conflict of laws provisions. If you are located in
              the United States or Canada, the terms in the &quot;Special Arbitration
              Provision for United States or Canada Users&quot; section below apply to
              you. If you&apos;re located elsewhere, you agree that you will resolve
              any claim you have with us relating to, arising out of, or in any
              way in connection with this Agreement, us, or our Services
              exclusively in the state courts located in the City and County of
              San Francisco, California, or federal court for the Northern
              District of California, and you agree to submit to the personal
              jurisdiction of such courts for the purpose of litigating all such
              grievances.
            </p>

            <h3>
              9.2 Special Arbitration Provision for United States or Canada
              Users.
            </h3>
            <p>
              If you are a user located in the United States or Canada, you and
              SDF agree to arbitrate any disputes, controversies, or claims (any
              of the foregoing, a &quot;Claim&quot;) arising from this Agreement or
              relating to the Services. ARBITRATION PREVENTS YOU FROM SUING IN
              COURT OR FROM HAVING A JURY TRIAL. You and SDF agree to the
              following:
            </p>
            <ol>
              <li>
                NEITHER YOU NOR SDF WILL HAVE THE RIGHT TO LITIGATE A CLAIM IN
                COURT OR TO HAVE A JURY TRIAL ON A CLAIM, OR TO ENGAGE IN
                PRE-ARBITRATION DISCOVERY;
              </li>
              <li>
                Arbitration will only decide any Claim between you and us, and
                you may not consolidate or join the Claims of other persons who
                have similar Claims. YOU AGREE THAT YOU WILL NOT HAVE THE RIGHT
                TO PARTICIPATE AS A REPRESENTATIVE OR MEMBER OF ANY CLASS OF
                CLAIMANTS, OR AS A PRIVATE ATTORNEY GENERAL, PERTAINING TO ANY
                CLAIM COVERED OR ARISING FROM THESE TERMS OF SERVICE OR YOUR USE
                OF THE SERVICES;
              </li>
              <li>
                Each party will notify the other of any dispute within thirty
                (30) days of when the cause of dispute arises; and
              </li>
              <li>
                Each party will attempt informal resolution prior to any demand
                for arbitration.
              </li>
            </ol>
            <p>
              If arbitration is chosen by any party, the following will apply:
            </p>
            <ol>
              <li>
                Arbitration will be conducted confidentially by a single
                arbitrator in accordance with the JAMS Streamlined Arbitration
                Rules, unless your aggregated Claims are for $250,000 or more,
                in which case its Comprehensive Arbitration Rules shall apply;
              </li>
              <li>
                Arbitration will occur in San Francisco, California, and the
                arbitrator will apply applicable substantive law consistent with
                the Federal Arbitration Act, 9 U.S.C. &sect;&sect; 1 through 16,
                including but not limited to applicable statutes of limitation,
                and will honor claims of privilege recognized at law;
              </li>
              <li>
                The state or federal courts in San Francisco County, California
                have exclusive jurisdiction over any appeals of an arbitration
                award and over any suit between the parties not subject to
                arbitration;
              </li>
              <li>
                In any arbitration, the parties will not seek discovery from each
                other, and the arbitrator will not allow parties to engage in
                discovery; rather, each party will disclose the evidence
                supporting their positions at a mutually agreeable time and date
                prior to the final hearing;
              </li>
              <li>
                At the request of either party, all arbitration proceedings will
                be conducted in the utmost secrecy and, in such case, all
                documents, testimony, and records will be received, heard, and
                maintained by the arbitrators in secrecy under seal, available
                for inspection only by the parties, their respective attorneys,
                and their respective experts, consultants, or witnesses who have
                agreed, in advance and in writing, to receive all such
                information as confidential to be used solely for purposes of
                the arbitration; and
              </li>
              <li>
                Other than class procedures and remedies discussed herein, the
                arbitrator has the authority to grant any remedy that would
                otherwise be available in court.
              </li>
            </ol>
            <p>
              If the requirement to arbitrate and/or the prohibition against
              class actions and other Claims brought on behalf of third parties
              contained above is found to be unenforceable, then that language
              will be deemed to have been removed from this Agreement and the
              remaining obligations relating to arbitration will continue in full
              force and effect.
            </p>

            <h2>10. MISCELLANEOUS</h2>

            <h3>10.1 No Third-Party Beneficiaries.</h3>
            <p>
              No provision of this Agreement is intended, nor will be
              interpreted, to provide or create any third party beneficiary
              rights or any other rights of any kind in any user, client,
              customer, affiliate, or any party hereto or any other person unless
              specifically provided otherwise herein, and except as so provided,
              all provisions hereof will be personal solely between you and SDF.
            </p>

            <h3>10.2 Assignment.</h3>
            <p>
              This Agreement will be binding on your successors, heirs, personal
              representatives, and assigns. You may not assign, delegate, or
              transfer any of your rights or obligations under this Agreement
              without prior written consent of SDF, which may be withheld in
              SDF&apos;s sole discretion for any reason or no reason. SDF may assign
              its rights and duties under this Agreement to any party at any
              time, in our sole discretion, without notice to you.
            </p>

            <h3>10.3 Waiver.</h3>
            <p>
              No waiver by SDF, whether by conduct or otherwise, of any term,
              provision, or condition set forth in this Agreement will be deemed a
              further or continuing waiver of such term, provision, or condition
              or a waiver of any other term, provision, or condition. Any failure
              or delay of SDF to assert a right or provision under this Agreement
              will not constitute a waiver of such right or provision.
            </p>

            <h3>10.4 Severability.</h3>
            <p>
              If any provision of this Agreement is deemed unlawful, invalid, or
              otherwise unenforceable, then that provision, to the minimum extent
              necessary, will be eliminated and deemed severable from this
              Agreement and will not affect the validity and enforceability of
              any remaining provisions.
            </p>

            <h3>10.5 Entire Agreement.</h3>
            <p>
              This Agreement constitutes the complete and exclusive statement of
              the agreement between you and SDF with respect to the Services and
              supersedes all prior and contemporaneous understandings, agreements,
              representations, and warranties, both written and oral, concerning
              the Services.
            </p>

            <h3>10.6 Termination, Suspension, and Survival.</h3>
            <p>
              <strong>
                You agree and understand that we reserve the right, in our sole
                discretion, to immediately suspend, freeze, or terminate your
                access to the Services
              </strong>{" "}
              in the event that you are suspected of having violated any
              provision of this agreement, believed to be in violation of
              applicable law, or are believed to be involved in activities or
              conduct detrimental to the Services.
            </p>

            <h3>10.7 Your Right To Disconnect From the Services.</h3>
            <p>
              You may disconnect from the Services at any time by following the
              disconnection process in the Services interface. Upon
              disconnection:
            </p>
            <ul>
              <li>You remain responsible for any pending transactions</li>
              <li>
                You should transfer any digital assets to another wallet before
                disconnecting from the Services
              </li>
              <li>You will no longer have access to the Services</li>
            </ul>
            <p>
              Note that disconnecting from the Services does not affect your
              assets on the Stellar Network, which will remain accessible with
              your private keys.
            </p>

            <h3>10.8 Events Beyond Our Control (Force Majeure Events).</h3>
            <p>
              <strong>Sometimes things happen that we can&apos;t control</strong>. If
              SDF can&apos;t fulfill parts of this Agreement due to events beyond our
              reasonable control, we won&apos;t be considered in breach of this
              Agreement, and you can&apos;t claim damages from us.
            </p>
            <p>
              <strong>What counts as &quot;beyond our control&quot;?</strong> These events
              may include floods, extreme weather, earthquakes, other natural
              disasters, fires, wars, disease outbreaks, pandemics, riots, labor
              disputes, accidents, government actions, communication failures,
              power outages, banking system failures, network problems, equipment
              or software malfunctions, and blockchain-specific issues like
              network splits or &quot;forks&quot; or unexpected changes to networks that
              our Services rely on.
            </p>
            <p>
              In the event of a force majeure event affecting the Services, we
              will:
            </p>
            <ol>
              <li>Attempt to notify you promptly of the situation</li>
              <li>
                Take reasonable steps to restore Services as soon as practicable
              </li>
              <li>
                Maintain security measures to protect your data during the
                disruption
              </li>
            </ol>

            <h3>10.9 Taxes Are Your Responsibility.</h3>
            <p>
              You&apos;re responsible for determining what taxes apply to your use of
              our Services and for reporting and paying those taxes to the
              appropriate authorities. We don&apos;t determine, collect, report, or
              remit any taxes related to your transactions.
            </p>

            <h3>10.10 Our Relationship With You.</h3>
            <p>
              This Agreement doesn&apos;t create any special legal relationship
              between us:
            </p>
            <ul>
              <li>
                <strong>What we&apos;re not</strong>: Nothing in this Agreement
                creates a custodial arrangement, agency relationship, or
                trusteeship. We don&apos;t hold your assets or act as your agent or
                trustee.
              </li>
            </ul>

            <h3>10.11 How We&apos;ll Communicate With You.</h3>
            <p>
              <strong>We&apos;ll send you everything electronically</strong>. You
              agree that we can provide all communications, agreements,
              documents, receipts, notices, and disclosures to you
              electronically. We&apos;ll do this by posting them through our
              Services, or by sending them to the email address you&apos;ve given us
              via technical support or feedback (see below).
            </p>
            <p>
              <strong>Keep copies for your records</strong>. We recommend you
              save copies of our communications by printing them or saving them
              electronically.
            </p>
            <p>
              <strong>Questions about electronic communications?</strong> Contact
              our support team at{" "}
              <a href="mailto:help@freighter.app">help@freighter.app</a>.
            </p>

            <h3>10.12 How to Contact Us.</h3>
            <p>Here&apos;s how to reach us:</p>
            <ul>
              <li>
                <strong>For most inquiries</strong>: Contact us by registered
                post or courier at: Stellar Development Foundation, 475 Brannan
                Street, Suite 400, San Francisco, CA 94107
              </li>
              <li>
                <strong>For technical support</strong>: Email us at{" "}
                <a href="mailto:help@freighter.app">help@freighter.app</a>.
              </li>
              <li>
                <strong>For feedback</strong>: We appreciate your suggestions for
                improving our Services. By sending feedback to{" "}
                <a href="mailto:help@freighter.app">help@freighter.app</a>, you
                give us complete permission to use your ideas however we need to.
                This means we can use, modify, build upon, and share your
                feedback without restrictions or payment. This permission applies
                worldwide, never expires, and can&apos;t be revoked.
              </li>
            </ul>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
