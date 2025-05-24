import React from 'react';

const TermsOfService = () => {
  return (
    <div className="container py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            Welcome to Learn with Compassion LMS. By accessing or using our Learning Management System ("LMS"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our LMS.
          </p>
          <p>
            These Terms apply to all visitors, users, and others who access or use the LMS. By accessing or using the LMS, you agree to be bound by these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Account Registration</h2>
          <p className="mb-4">
            To access certain features of the LMS, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
          </p>
          <p className="mb-4">
            You are responsible for safeguarding the password that you use to access the LMS and for any activities or actions under your password. We encourage you to use a strong password and to sign out from your account at the end of each session.
          </p>
          <p>
            You agree not to share your account credentials or give others access to your account. We reserve the right to disable any user account at any time if, in our opinion, you have violated any provision of these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Intellectual Property Rights</h2>
          <p className="mb-4">
            The LMS and its original content, features, and functionality are owned by JFC TECHNOLOGIES and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
          </p>
          <p className="mb-4">
            Unless otherwise indicated, all materials, including images, text, illustrations, designs, icons, photographs, programs, and written and other materials that are part of the LMS are copyrights, trademarks, service marks, or other intellectual property owned or controlled by JFC TECHNOLOGIES.
          </p>
          <p>
            You may not copy, reproduce, republish, upload, post, transmit, distribute, modify, or create derivative works from the content without our explicit written consent.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. User Content</h2>
          <p className="mb-4">
            The LMS may allow you to post, link, store, share, and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content you post to the LMS, including its legality, reliability, and appropriateness.
          </p>
          <p className="mb-4">
            By posting content to the LMS, you grant us the right to use, reproduce, modify, perform, display, distribute, and otherwise disclose to third parties any such material according to your account settings.
          </p>
          <p>
            You represent and warrant that: (i) the content is yours or you have the right to use it and grant us the rights and license as provided in these Terms, and (ii) the posting of your content on or through the LMS does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Prohibited Uses</h2>
          <p className="mb-4">You agree not to use the LMS:</p>
          <ul className="list-disc pl-8 space-y-2">
            <li>In any way that violates any applicable federal, state, local, or international law or regulation</li>
            <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter", "spam", or any other similar solicitation</li>
            <li>To impersonate or attempt to impersonate JFC TECHNOLOGIES, a JFC TECHNOLOGIES employee, another user, or any other person or entity</li>
            <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the LMS, or which may harm JFC TECHNOLOGIES or users of the LMS</li>
            <li>To attempt to circumvent any security-related features of the LMS</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Disclaimer of Warranties</h2>
          <p className="mb-4">
            Your use of the LMS is at your sole risk. The LMS is provided on an "AS IS" and "AS AVAILABLE" basis. JFC TECHNOLOGIES expressly disclaims all warranties of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
          </p>
          <p>
            JFC TECHNOLOGIES makes no warranty that the LMS will meet your requirements, be available on an uninterrupted, secure, or error-free basis, or that the results that may be obtained from the use of the LMS will be accurate or reliable.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
          <p>
            In no event shall JFC TECHNOLOGIES, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the LMS.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Termination</h2>
          <p className="mb-4">
            We may terminate or suspend your account and access to the LMS immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>
          <p>
            All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms of Service</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">10. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at: <a href="mailto:legal@jfctechnologies.com" className="text-blue-500 hover:underline">legal@jfctechnologies.com</a>
          </p>
        </section>

        <p className="text-sm text-gray-500 mt-8">
          Last Updated: May 23, 2025
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
