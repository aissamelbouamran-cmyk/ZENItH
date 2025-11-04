
import React from 'react';

const TermsView: React.FC = () => {
  return (
    <div>
      <header className="pb-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Terms of Service</h1>
        <p className="text-md text-gray-500 dark:text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
      </header>

      <article className="mt-6 prose dark:prose-invert lg:prose-xl max-w-none">
        <h2>1. Introduction</h2>
        <p>
          Welcome to Zenith Social! These Terms of Service ("Terms") govern your use of our website and services. By accessing or using Zenith Social, you agree to be bound by these Terms.
        </p>
        
        <h2>2. Use of Our Service</h2>
        <p>
          You must be at least 18 years old to use our service. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer.
        </p>
        
        <h2>3. User Content</h2>
        <p>
          You retain all rights to the content you post, schedule, or otherwise make available through Zenith Social. By using our service, you grant us a limited license to store, process, and display your content as necessary to provide the service.
        </p>
        
        <h2>4. Prohibited Activities</h2>
        <p>
          You agree not to engage in any of the following prohibited activities: (i) copying, distributing, or disclosing any part of the service in any medium; (ii) using any automated system, including "robots," "spiders," "offline readers," etc., to access the service; (iii) transmitting spam, chain letters, or other unsolicited email.
        </p>
        
        <h2>5. Termination</h2>
        <p>
          We may terminate or suspend your access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
        </p>
        
        <h2>6. Changes to Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide at least 30 days' notice before any new terms take effect.
        </p>
        
        <p>
            <em>This is a template and not legal advice. Consult with a legal professional to create your own terms of service.</em>
        </p>
      </article>
    </div>
  );
};

export default TermsView;
