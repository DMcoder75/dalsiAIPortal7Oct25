import { Card, CardContent } from './ui/card'
import Navigation from './Navigation'
import Footer from './Footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-primary/10 via-background to-accent/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Terms and Conditions
            </h1>
            <p className="text-lg text-muted-foreground">
              Last updated: January 1, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-8 prose prose-gray max-w-none">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing and using the Dalsi AI platform and services ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">2. Description of Service</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Dalsi AI provides artificial intelligence solutions including but not limited to:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>DalSiAI: Text-based AI assistant for healthcare and education</li>
                    <li>DalSiAIVi: Multimodal AI platform for image and video analysis</li>
                    <li>API access for integration with third-party applications</li>
                    <li>Educational and healthcare-specific AI tools and resources</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">3. User Accounts and Registration</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    To access certain features of our Service, you must register for an account. When you register, you agree to:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Provide accurate, current, and complete information</li>
                    <li>Maintain and update your information to keep it accurate</li>
                    <li>Maintain the security of your password and account</li>
                    <li>Accept responsibility for all activities under your account</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">4. Acceptable Use Policy</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    You agree not to use the Service to:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe upon the rights of others</li>
                    <li>Generate harmful, offensive, or inappropriate content</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Use the service for any illegal or unauthorized purpose</li>
                    <li>Interfere with or disrupt the service or servers</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">5. Medical Disclaimer</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong>IMPORTANT:</strong> The AI-generated content provided by our healthcare-related services is for informational purposes only and is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read through our Service.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">6. Educational Content Disclaimer</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Educational content generated by our AI is intended to supplement, not replace, formal education and professional instruction. Users should verify information independently and consult with qualified educators or subject matter experts for critical educational decisions.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">7. Subscription and Billing</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Our Service offers various subscription plans:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Subscription fees are billed in advance on a monthly or annual basis</li>
                    <li>All fees are non-refundable except as required by law</li>
                    <li>We reserve the right to change our pricing with 30 days notice</li>
                    <li>Failure to pay fees may result in service suspension or termination</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">8. Intellectual Property Rights</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    The Service and its original content, features, and functionality are and will remain the exclusive property of Dalsi AI and its licensors. The Service is protected by copyright, trademark, and other laws. You may not:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Copy, modify, or distribute our proprietary content</li>
                    <li>Reverse engineer or attempt to extract source code</li>
                    <li>Use our trademarks without written permission</li>
                    <li>Create derivative works based on our Service</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">9. Privacy and Data Protection</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our Service. By using our Service, you agree to the collection and use of information in accordance with our Privacy Policy.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">10. Limitation of Liability</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, DALSI AI SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">11. Termination</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">12. Changes to Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">13. Governing Law</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    These Terms shall be interpreted and governed by the laws of the State of California, United States, without regard to its conflict of law provisions. Any disputes arising from these Terms will be resolved in the courts of California.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">14. Contact Information</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about these Terms and Conditions, please contact us at:
                  </p>
                  <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                    <p className="text-muted-foreground">
                      <strong>Email:</strong> legal@neodalsi.com<br />
                      <strong>Address:</strong> 123 AI Innovation Drive, San Francisco, CA 94105<br />
                      <strong>Phone:</strong> +1 (555) 123-4567
                    </p>
                  </div>
                </div>

                <div className="border-t border-border pt-8">
                  <p className="text-sm text-muted-foreground">
                    By using our Service, you acknowledge that you have read and understood these Terms and Conditions and agree to be bound by them.
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
