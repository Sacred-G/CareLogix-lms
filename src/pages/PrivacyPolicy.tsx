import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            Welcome to the Learn with Compassion JFC TECHNOLOGIES Learning Management System ("LMS"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our LMS.
          </p>
          <p>
            We take your privacy seriously and are committed to protecting your personal information. Please read this policy carefully to understand our practices regarding your data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
          <p className="mb-4">We may collect the following types of information:</p>
          <ul className="list-disc pl-8 space-y-2">
            <li><strong>Personal Information:</strong> Name, email address, organization affiliation, and professional credentials.</li>
            <li><strong>Learning Data:</strong> Course progress, quiz results, certificates earned, and interaction with course materials.</li>
            <li><strong>Technical Data:</strong> IP address, browser type, device information, and cookies.</li>
            <li><strong>Usage Data:</strong> How you interact with our LMS, including features accessed and time spent.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <p className="mb-4">We use your information for the following purposes:</p>
          <ul className="list-disc pl-8 space-y-2">
            <li>Providing access to courses and learning materials</li>
            <li>Tracking and certifying course completion</li>
            <li>Improving our educational content and user experience</li>
            <li>Communicating important updates about courses or the platform</li>
            <li>Analyzing usage patterns to enhance our services</li>
            <li>Complying with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Information Sharing</h2>
          <p className="mb-4">We may share your information with:</p>
          <ul className="list-disc pl-8 space-y-2">
            <li><strong>Your Organization:</strong> If you access our LMS through an organizational license, we may share your learning progress with authorized administrators.</li>
            <li><strong>Service Providers:</strong> Third-party vendors who help us operate our LMS and provide related services.</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights.</li>
          </ul>
          <p>We will never sell your personal information to third parties.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
          <p className="mb-4">
            We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
          </p>
          <p>
            While we strive to use commercially acceptable means to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
          <p className="mb-4">Depending on your location, you may have the right to:</p>
          <ul className="list-disc pl-8 space-y-2">
            <li>Access the personal information we hold about you</li>
            <li>Correct inaccurate or incomplete information</li>
            <li>Request deletion of your personal information</li>
            <li>Restrict or object to certain processing of your data</li>
            <li>Request transfer of your personal information</li>
            <li>Withdraw consent where applicable</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Cookies and Tracking Technologies</h2>
          <p className="mb-4">
            We use cookies and similar tracking technologies to track activity on our LMS and to hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.
          </p>
          <p>
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our LMS.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
          <p>
            Our LMS is not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18. If we discover that a child under 18 has provided us with personal information, we will promptly delete it.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:privacy@jfctechnologies.com" className="text-blue-500 hover:underline">privacy@jfctechnologies.com</a>
          </p>
        </section>

        <p className="text-sm text-gray-500 mt-8">
          Last Updated: May 23, 2025
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
