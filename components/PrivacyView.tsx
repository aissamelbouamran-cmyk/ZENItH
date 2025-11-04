
import React from 'react';

const PrivacyView: React.FC = () => {
  return (
    <div>
      <header className="pb-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
        <p className="text-md text-gray-500 dark:text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
      </header>

      <article className="mt-6 prose dark:prose-invert lg:prose-xl max-w-none">
        <h2>1. Information We Collect</h2>
        <p>
          We collect information you provide directly to us, such as when you create an account, connect your social media profiles, and schedule content. This may include your name, email address, and social media credentials (via OAuth).
        </p>
        
        <h2>2. How We Use Your Information</h2>
        <p>
          We use the information we collect to:
          </p>
          <ul>
            <li>Provide, maintain, and improve our services.</li>
            <li>Process transactions and send you related information.</li>
            <li>Communicate with you about products, services, offers, and events.</li>
            <li>Monitor and analyze trends, usage, and activities in connection with our services.</li>
          </ul>
        
        
        <h2>3. Information Sharing</h2>
        <p>
          We do not share your personal information with third parties except as described in this Privacy Policy. We may share information with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.
        </p>
        
        <h2>4. Data Security</h2>
        <p>
          We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
        </p>
        
        <p>
            <em>This is a template and not legal advice. Consult with a legal professional to create your own privacy policy.</em>
        </p>
      </article>
    </div>
  );
};

export default PrivacyView;
