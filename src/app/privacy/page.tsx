"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium mb-6 transition-colors">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">Privacy Policy</h1>
          <p className="text-gray-500 dark:text-gray-400">Last Updated: January 2026</p>
        </div>

        {/* Content */}
        <div className="prose dark:prose-invert max-w-none space-y-8 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          
          <section>
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">1. Introduction</h2>
            <p className="leading-relaxed">
              Welcome to CareerSathi ("we," "our," or "us"). We respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and safeguard your data when you use our AI Career Mentorship application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">2. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-2 leading-relaxed">
              <li>
                <strong>Account Information (Google Login):</strong> When you sign in using Google, we collect your name, email address, and profile picture provided by Google. We do not access your contacts, Google Drive, or other private Google data.
              </li>
              <li>
                <strong>Chat Data:</strong> We collect the text messages, career questions, and inputs you send to our AI mentor to generate relevant responses and save your conversation history.
              </li>
              <li>
                <strong>Usage Data:</strong> We may collect anonymous data regarding how you interact with our interface (e.g., session duration, features used) to improve user experience.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">3. How We Use Your Information</h2>
            <p className="leading-relaxed">We use your data for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-2 leading-relaxed mt-2">
              <li>To provide and maintain the Service (authenticating you via Google).</li>
              <li>To generate personalized career advice and roadmap suggestions via our AI provider.</li>
              <li>To save your chat history so you can resume conversations later.</li>
              <li>To improve our AI models and application performance.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">4. Artificial Intelligence & Third Parties</h2>
            <p className="leading-relaxed">
              Our service utilizes Large Language Models (LLMs) (e.g., Google Gemini) to process your queries. When you send a message:
            </p>
            <ul className="list-disc pl-5 space-y-2 leading-relaxed mt-2">
              <li>The text of your message is sent to the AI provider to generate a response.</li>
              <li>We advise <strong>not to share sensitive personal identifiable information (PII)</strong> like social security numbers, financial data, or passwords in the chat interactions.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">5. Data Sharing and Disclosure</h2>
            <p className="leading-relaxed">
              We do not sell your personal data. We may share data only in the following circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-2 leading-relaxed mt-2">
              <li><strong>Service Providers:</strong> With cloud providers (e.g., Database hosting, AI API providers) strictly to enable the app's functionality.</li>
              <li><strong>Legal Requirements:</strong> If required by law or to protect our rights.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">6. Data Security</h2>
            <p className="leading-relaxed">
              We implement industry-standard security measures, including encryption in transit (HTTPS) and secure database storage (Vector DB), to protect your information. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">7. Your Rights</h2>
            <p className="leading-relaxed">
              Depending on your location, you may have the right to access, correct, or delete your personal data. You can request the deletion of your account and chat history by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">8. Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:support@zelphine.com" className="text-blue-600 hover:underline">support@zelphine.com</a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}