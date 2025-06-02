"use client"

import { Link } from "react-router-dom"
import MainLayout from "../modules/landing/components/layout/components/MainLayout"
import { ChevronRight } from "lucide-react"

export default function PrivacyPolicy() {
  return (
    <MainLayout>
      {/* Green Header */}
      <div className="bg-[#2a9f47] text-white py-12 text-center">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm">Nigeria Customs Services - Customs Verification Management System (NCS-CVMS)</p>
        <p className="text-xs mt-1">Latest Update: 15 May, 2025</p>
      </div>

      <div className="container mx-auto max-w-6xl px-4 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 py-8 pr-8">
          <nav className="space-y-3">
            <div className="text-sm font-semibold text-gray-700 mb-4">Table of Contents</div>
            <div className="space-y-2 text-sm">
              <a href="#about" className="block pl-4 text-gray-600 hover:text-[#2a9f47] hover:underline">1. About this Policy</a>
              <a href="#data-collect" className="block pl-4 text-gray-600 hover:text-[#2a9f47] hover:underline">2. Data We Collect</a>
              <a href="#why-need" className="block pl-4 text-gray-600 hover:text-[#2a9f47] hover:underline">3. Why We Need Your Data</a>
              <a href="#how-use" className="block pl-4 text-gray-600 hover:text-[#2a9f47] hover:underline">4. How We Use Your Data</a>
              <a href="#cookies" className="block pl-4 text-gray-600 hover:text-[#2a9f47] hover:underline">5. Cookies</a>
              <a href="#sharing" className="block pl-4 text-gray-600 hover:text-[#2a9f47] hover:underline">6. How We Share Data</a>
              <a href="#transfers" className="block pl-4 text-gray-600 hover:text-[#2a9f47] hover:underline">7. Cross-Border Transfers</a>
              <a href="#security" className="block pl-4 text-gray-600 hover:text-[#2a9f47] hover:underline">8. Data Protection</a>
              <a href="#retention" className="block pl-4 text-gray-600 hover:text-[#2a9f47] hover:underline">9. Data Retention</a>
              <a href="#rights" className="block pl-4 text-gray-600 hover:text-[#2a9f47] hover:underline">10. Your Legal Rights</a>
              <a href="#updates" className="block pl-4 text-gray-600 hover:text-[#2a9f47] hover:underline">11. Policy Updates</a>
              <a href="#contact" className="block pl-4 text-gray-600 hover:text-[#2a9f47] hover:underline">12. Contact Information</a>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 py-8">
          <div className="mb-6 flex items-center text-sm text-[#667085]">
            <Link to="#" className="hover:underline">
              Resources
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span>Privacy Policy</span>
          </div>

          <div className="prose max-w-none space-y-8">
            {/* About this Privacy Policy */}
            <section id="about">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. About this Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                The Nigeria Customs Services (NCS), through the Customs Verification Management Systems (CVMS) ("we", "us", "our"), 
                seeks to collect, use, store, and protect your personal data. This policy applies to customers, corporations, and 
                individual users of our website, mobile applications, and related services (the "Services"). By using our Services, 
                you consent to the collection and use of your personal data in accordance with this Privacy Notice and the relevant 
                laws, including the Nigerian Data Protection Regulation (NDPR) and the Nigerian Data Protection Act (NDPA) 2023.
              </p>
            </section>

            {/* The Data We Collect */}
            <section id="data-collect">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. The Data We Collect About You</h2>
              <p className="text-gray-700 mb-4">
                In the course of using the CVMS platform services provided to you by NCS and/or Subsidiaries to meet your needs, 
                through this and other channels available, we collect the information you provide us via consent forms, phone calls, 
                and correspondence by mail or emails, service point interfaces, and any other channels as listed below, which we may 
                make available to you from time to time.
              </p>
              <p className="text-gray-700 mb-6">
                We collect a variety of personal data when you interact with our Services. The types of data we collect include:
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">2.1 Information You Provide to Us</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                <li><strong>Contact Data:</strong> Email address, phone number, postal address.</li>
                <li><strong>Account Information:</strong> User ID, password, purchase history, and transaction details.</li>
                <li><strong>Address:</strong> Office address or home address (preferably).</li>
                <li><strong>Business Information:</strong> CAC Incorporation Certificate, Address verification (utility bill, bank account information, vehicle information), this is especially applicable to third-party vendors.</li>
                <li><strong>Declarant Information:</strong> Declarant codes from customs agents and other possible qualifications.</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">2.2 Information We Collect Automatically</h3>
              <p className="text-gray-700 mb-3">We may automatically collect certain data through our website or mobile platforms, including:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                <li>Device information (IP address, browser type, operating system).</li>
                <li>Usage data (pages visited, products viewed, and time spent).</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">2.3 Information from Third Parties</h3>
              <p className="text-gray-700 mb-3">We may receive personal data from third parties such as:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Business partners (e.g., payment processors, delivery partners).</li>
                <li>Service providers (e.g., marketing agencies, customer feedback platforms).</li>
                <li>Public sources (e.g., social media or online profiles).</li>
              </ul>
            </section>

            {/* Why We Need Your Personal Data */}
            <section id="why-need">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Why We Need Your Personal Data</h2>
              <p className="text-gray-700 mb-6">
                The NCS ensures that the personal data collected and processed is necessary for the purpose of collection, and the 
                NCS shall not collect or process more data than is reasonably required for a particular processing activity. In 
                addition, every processing purpose has at least one lawful basis for processing to safeguard the rights of the data 
                subjects, as provided below:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-[#f6fff8]">
                      <th className="border border-gray-300 p-4 text-left text-[#2a9f47] font-semibold">Purpose of Processing</th>
                      <th className="border border-gray-300 p-4 text-left text-[#2a9f47] font-semibold">Lawful Basis of Processing</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr>
                      <td className="border border-gray-300 p-4">
                        <strong>Provision of Services:</strong> To verify vehicles and goods information, process payments and deliver services.
                      </td>
                      <td className="border border-gray-300 p-4">
                        <strong>Performance of a Contract:</strong> Processing personal data is necessary for the performance of contracts to which the data subject is a party (e.g., opening and maintaining a profile on the CVMS platform).
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 p-4">
                        <strong>Fraud Prevention:</strong> Detecting, preventing, and investigating fraudulent activities to protect Users and the Nigerian Customs Services - CVMS operations.
                      </td>
                      <td className="border border-gray-300 p-4 rowspan-3">
                        <strong>Legitimate interests:</strong> Processing personal data is necessary for the legitimate interests pursued by NCS or its subsidiaries, except where such interests are overridden by the interests or fundamental rights and freedoms of the data subject.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-4">
                        <strong>Customer Support:</strong> Addressing inquiries, resolving complaints, and providing support services to customers.
                      </td>
                      <td className="border border-gray-300 p-4"></td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 p-4">
                        <strong>Internal Reporting and Analysis:</strong> Generating reports, conducting analysis, and making strategic decisions based on aggregated and anonymized data.
                      </td>
                      <td className="border border-gray-300 p-4"></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-4">
                        <strong>Business Development:</strong> Identifying market trends, developing new products or services, and improving overall business operations.
                      </td>
                      <td className="border border-gray-300 p-4"></td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 p-4">
                        <strong>Compliance with Legal Obligations:</strong> Fulfilling legal and regulatory requirements imposed on the Company, such as anti-money laundering (AML) and know your customer (KYC) regulations.
                      </td>
                      <td className="border border-gray-300 p-4">
                        <strong>Legal obligation:</strong> Processing personal data is necessary for compliance with a legal obligation to which the NCS is subject (e.g., reporting suspicious transactions to regulatory authorities).
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-4">
                        <strong>Marketing and Promotions:</strong> Providing information about products, services, and promotional offers to customers, subject to their consent and preferences.
                      </td>
                      <td className="border border-gray-300 p-4">
                        <strong>Consent:</strong> Processing personal data is based on the data subject's consent, which must be freely given, specific, informed, and unambiguous. Data subjects have the right to withdraw consent at any time.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* How We Use Your Data */}
            <section id="how-use">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. How We Use Your Data</h2>
              <p className="text-gray-700 mb-4">
                The NCS, and/or Subsidiaries, through the CVMS platform, will process your personal information for the following purposes:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700 mb-6">
                <li>To offer and provide our Products and Services tailored to meet your needs.</li>
                <li>To fulfill the terms of any service contract(s) you might have with us.</li>
                <li>To improve your service experience with us.</li>
                <li>To conduct our business.</li>
                <li>To manage our relationship with you.</li>
                <li>To comply with extant Laws and Regulations.</li>
                <li>To provide information to Credit Agencies.</li>
                <li>To update your records.</li>
                <li>To develop statistics as may be required.</li>
                <li>To comply with our Internal Policies.</li>
                <li>To communicate with you when necessary.</li>
              </ol>
              <p className="text-gray-700 mb-6">
                The NCS and/or Subsidiaries will limit and/or exclude the collection and use of your personal information for all other purposes not stated above.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">4.1 Consent</h3>
              <p className="text-gray-700 mb-4">
                We don't ask for your personal information unless we need it to provide or improve our products and services for you. 
                We want to be sure we have your consent to collect, use, and, where necessary, share your information with our partners 
                and suppliers that help us serve you. Whenever we introduce new services and technologies, we'll ensure you understand 
                and agree to any new ways in which your information is handled.
              </p>
              <p className="text-gray-700 mb-3">
                You will be considered to have given your consent to the NCS and/or Subsidiaries for the processing of your personal data when:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                <li>You complete any form, brochure, or material issued under this CVMS platform and/or Subsidiaries at any of our service points (mobile, online, in-branch, etc.), requesting such personal information.</li>
                <li>You register, check, or tick the acceptance box on any of our electronic platforms (Online or Mobile) relating to the terms and conditions of any service or product offered by NCS and/or Subsidiaries.</li>
                <li>You send a request, complaint, or other communication to the CVMS platform and/or Subsidiaries.</li>
                <li>You use any service or product offered by NCS and/or Subsidiaries.</li>
              </ol>
            </section>

            {/* Cookies */}
            <section id="cookies">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies</h2>
              <p className="text-gray-700 mb-4">
                Cookies are small files stored on your hard drive that assist us in providing services customized to your requirements 
                and tastes. We use data collection devices such as 'cookies' in certain areas of the platform. We also use cookies to 
                optimize your user experience when you browse our website, which would not have been possible otherwise.
              </p>
              <p className="text-gray-700 mb-4">
                Cookies may be used whether you choose to register with us or not. However, when you register a profile with us, we will 
                use cookies to manage the signup process and general administration, as well as manage your browser session while you are logged in.
              </p>
              <p className="text-gray-700 mb-4">
                Additionally, we use cookies to allow you to enter your password less frequently during a session. Most cookies are 
                'session cookies', meaning that they are automatically deleted from your hard drive at the end of a session.
              </p>
              <p className="text-gray-700">
                You are always free to decline our cookies if your browser permits, although in that case, you may not be able to use 
                certain features on the platform, and you may be required to re-enter your password more frequently. It is imperative 
                to note that cookies cannot read data off your hard disk or read cookie files created by other sites.
              </p>
            </section>

            {/* How We Share Your Personal Data */}
            <section id="sharing">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. How We Share Your Personal Data</h2>
              <p className="text-gray-700 mb-4">
                CVMS will not sell or rent your personally identifiable information to anyone. CVMS may share or disclose your personal 
                data with third parties in the following circumstances:
              </p>
              <ol className="list-decimal pl-6 space-y-3 text-gray-700 mb-6">
                <li><strong>Consent:</strong> Where we have your consent to share or disclose such personal information.</li>
                <li><strong>Service Providers:</strong> Where we engage third-party vendors and service providers (e.g., payment processors, and delivery services) to aid us in facilitating and providing our services.</li>
                <li><strong>Legal Requirements:</strong> We may disclose your personal data to comply with legal obligations, regulations, or government orders, such as requests from law enforcement or regulatory agencies through subpoenas, court orders, or other legal processes.</li>
                <li><strong>Violation of Policies:</strong> Where we find that your actions on our platforms violate any of our Policies, we may disclose information for the purpose of investigations, reporting, and enforcing any of our rights.</li>
                <li><strong>Audit Purposes:</strong> Where it is required for audit purposes.</li>
                <li><strong>Affiliated Entities:</strong> We may share your data with entities within our group for business purposes, provided they adhere to the same privacy standards.</li>
              </ol>
              <p className="text-gray-700">
                The NCS and/or Subsidiaries may use and share your personal information with its affiliates and members of our group 
                for business purposes and service-related activities for such services, notifying or contacting you regarding any problem 
                with, or the expiration of such services. In this regard, the Affiliates shall process the information as provided in this Privacy Policy.
              </p>
            </section>

            {/* Cross Border Data Transfers */}
            <section id="transfers">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cross Border Data Transfers</h2>
              <p className="text-gray-700">
                Your personal data may be transferred to and processed in countries outside Nigeria where our service providers or 
                affiliates operate in those regions. If this happens, we will ensure that appropriate safeguards are in place, such 
                as data processing agreements, to protect your personal data in line with applicable data protection laws in those regions.
              </p>
            </section>

            {/* Data Protection and Security */}
            <section id="security">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Protection and Security</h2>
              <p className="text-gray-700">
                CVMS takes the security of your personal data seriously and implements appropriate technical and organizational measures 
                to protect it from unauthorized access, loss, or alteration. These measures include encryption, secure data storage, 
                access controls, and regular audits. However, no data transmission over the internet or storage system can be guaranteed 
                to be hundred percent (100%) secure, and while we strive to protect your personal data against unauthorized or unlawful 
                processing, accidental loss, destruction, or damage, including encryption where appropriate, we cannot guarantee its absolute security.
              </p>
            </section>

            {/* Data Retention */}
            <section id="retention">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Data Retention</h2>
              <p className="text-gray-700">
                We retain your personal data for as long as necessary to fulfill the purposes for which it was collected, including to 
                comply with legal, accounting, reporting, and internal policy requirements. If you wish to have your personal data deleted 
                or if you no longer wish to engage with our Services, please contact us, and we will take steps to erase your personal 
                data, subject to any legal retention obligations.
              </p>
            </section>

            {/* Your Legal Rights */}
            <section id="rights">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Your Legal Rights Under this Policy</h2>
              <p className="text-gray-700 mb-4">
                Under the Nigerian Data Protection Act (NDPA) 2023 and the Nigerian Data Protection Regulation (NDPR), you have the 
                following rights concerning your personal data:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-gray-700">
                <li><strong>Right to Access:</strong> You have the right to request access to your personal data that we hold.</li>
                <li><strong>Right to Rectification:</strong> You have the right to correct any inaccuracies or updates in your personal data.</li>
                <li><strong>Right to Withdrawal of Consent:</strong> You may elect to withdraw your consent for the continuous processing of your personal data with us.</li>
                <li><strong>Right to Erasure:</strong> You have the right to request the deletion of your personal data, subject to certain conditions. We may continue to retain such personal information as may be required for compliance with legal, regulatory or policy requirements.</li>
                <li><strong>Right to Object and restrict:</strong> Your right to withdraw your consent extends to object or restrict our processing of your personal data in certain circumstances.</li>
                <li><strong>Right to Data Portability:</strong> You can request a copy of your personal data in a structured, commonly used format.</li>
              </ul>
            </section>

            {/* Updates to Privacy Policy */}
            <section id="updates">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Updates to this Privacy Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this policy from time to time. Where there are changes in the way we use your personal information, we 
                will notify you by posting a prominent notice on our website.
              </p>
              <p className="text-gray-700">
                By providing your personal data, you acknowledge that you have read and understood this Privacy Policy.
              </p>
            </section>

            {/* Contact Information */}
            <section id="contact">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Further Details</h2>
              <p className="text-gray-700 mb-4">
                If you require more information on how we process your personal data or wish to exercise your rights, please contact 
                the designated support channels:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg space-y-2">
                <div><strong>Email:</strong> cvmsproject@afripointgroup.com</div>
                <div><strong>Phone:</strong> 09076603819</div>
                <div><strong>Address:</strong> National Customs Headquarters, Tafawa Balewa Way, Central Business District, Abuja, Nigeria</div>
              </div>
              <p className="text-gray-700 mt-4">
                We will respond to your request promptly and in accordance with applicable data protection laws.
              </p>
            </section>
          </div>
        </main>
      </div>
    </MainLayout>
  )
}