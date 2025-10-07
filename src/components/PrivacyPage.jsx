import { Card, CardContent } from './ui/card'
import Navigation from './Navigation'
import Footer from './Footer'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-primary/10 via-background to-accent/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              Last updated: January 1, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-8 prose prose-gray max-w-none">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    At Dalsi AI ("we," "our," or "us"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our artificial intelligence platform and services.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3">2.1 Personal Information</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We may collect the following personal information:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-6">
                    <li>Name, email address, and contact information</li>
                    <li>Company or organization details</li>
                    <li>Account credentials and authentication information</li>
                    <li>Billing and payment information</li>
                    <li>Professional credentials and qualifications (for healthcare users)</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-foreground mb-3">2.2 Usage Information</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-6">
                    <li>AI interactions and conversation history</li>
                    <li>Feature usage patterns and preferences</li>
                    <li>Device information and technical specifications</li>
                    <li>IP address, browser type, and operating system</li>
                    <li>Log files and analytics data</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-foreground mb-3">2.3 Content Data</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Text inputs and AI-generated responses</li>
                    <li>Uploaded files and documents (when applicable)</li>
                    <li>Images and multimedia content for analysis</li>
                    <li>Feedback and ratings on AI responses</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We use your information for the following purposes:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Providing and improving our AI services</li>
                    <li>Personalizing your user experience</li>
                    <li>Processing payments and managing subscriptions</li>
                    <li>Communicating with you about our services</li>
                    <li>Ensuring platform security and preventing fraud</li>
                    <li>Complying with legal obligations</li>
                    <li>Training and improving our AI models (with appropriate safeguards)</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Sharing and Disclosure</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We do not sell your personal information. We may share your information in the following circumstances:
                  </p>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3">4.1 Service Providers</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We may share information with trusted third-party service providers who assist us in operating our platform, including cloud hosting, payment processing, and analytics services.
                  </p>

                  <h3 className="text-xl font-semibold text-foreground mb-3">4.2 Legal Requirements</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We may disclose information when required by law, court order, or government regulation, or to protect our rights, property, or safety.
                  </p>

                  <h3 className="text-xl font-semibold text-foreground mb-3">4.3 Business Transfers</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the business transaction.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">5. Data Security</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We implement industry-standard security measures to protect your information:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>End-to-end encryption for data transmission</li>
                    <li>Encrypted storage of sensitive information</li>
                    <li>Regular security audits and penetration testing</li>
                    <li>Access controls and authentication protocols</li>
                    <li>HIPAA, SOC 2, and GDPR compliance measures</li>
                    <li>Regular backup and disaster recovery procedures</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">6. Healthcare Data Protection</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    For healthcare-related services, we implement additional protections:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>HIPAA compliance for protected health information (PHI)</li>
                    <li>Business Associate Agreements (BAAs) when required</li>
                    <li>De-identification of health data for AI training</li>
                    <li>Strict access controls for healthcare professionals</li>
                    <li>Audit trails for all PHI access and modifications</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">7. Your Rights and Choices</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    You have the following rights regarding your personal information:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li><strong>Access:</strong> Request a copy of your personal information</li>
                    <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                    <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                    <li><strong>Portability:</strong> Receive your data in a portable format</li>
                    <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                    <li><strong>Restriction:</strong> Limit how we process your information</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">8. Data Retention</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We retain your information for as long as necessary to provide our services and comply with legal obligations:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Account information: Until account deletion or 7 years after last activity</li>
                    <li>Conversation history: 2 years or until user deletion</li>
                    <li>Billing records: 7 years for tax and legal compliance</li>
                    <li>Analytics data: 3 years in aggregated, anonymized form</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">9. International Data Transfers</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place, including Standard Contractual Clauses and adequacy decisions, to protect your information during international transfers.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">10. Children's Privacy</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it promptly.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">11. Cookies and Tracking Technologies</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We use cookies and similar technologies to:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Maintain your session and preferences</li>
                    <li>Analyze usage patterns and improve our services</li>
                    <li>Provide personalized content and recommendations</li>
                    <li>Ensure security and prevent fraud</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    You can control cookie settings through your browser preferences.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">12. AI Model Training</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may use aggregated, anonymized data to improve our AI models. This process involves removing all personally identifiable information and ensuring that individual users cannot be identified from the training data. You can opt out of this use by contacting us.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">13. Changes to This Privacy Policy</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">14. Contact Us</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-muted-foreground">
                      <strong>Privacy Officer</strong><br />
                      <strong>Email:</strong> privacy@neodalsi.com<br />
                      <strong>Address:</strong> 123 AI Innovation Drive, San Francisco, CA 94105<br />
                      <strong>Phone:</strong> +1 (555) 123-4567
                    </p>
                  </div>
                </div>

                <div className="border-t border-border pt-8">
                  <p className="text-sm text-muted-foreground">
                    This Privacy Policy is effective as of the date stated at the top of this page. Your continued use of our services after any changes indicates your acceptance of the updated Privacy Policy.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
