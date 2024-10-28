import React from 'react';
import '../styles/PrivacyPolicy.css'; // Importing your CSS styles

const PrivacyPolicy = () => {
    return (
        <div className="privacy-policy-container">
            <h1>Privacy & Security Policy</h1>
            <p>Your privacy is of utmost importance to us. This policy outlines how we collect, use, protect, and disclose your information when you use our services.</p>
            
            <h2>1. Information We Collect</h2>
            <p>We collect various types of information to provide and improve our services:</p>
            <ul>
                <li>
                    <strong>Personal Information:</strong> 
                    <p>When you create an account or use our services, you provide us with personal information such as:</p>
                    <ul>
                        <li>Name</li>
                        <li>Email Address</li>
                        <li>Phone Number (optional)</li>
                        <li>Password</li>
                    </ul>
                </li>
                <li>
                    <strong>Usage Data:</strong> 
                    <p>We collect information about how you interact with our application, including:</p>
                    <ul>
                        <li>Access times</li>
                        <li>Pages viewed</li>
                        <li>Links clicked</li>
                        <li>Duration of sessions</li>
                    </ul>
                </li>
                <li>
                    <strong>Device Information:</strong> 
                    <p>We may collect information about the device you use to access our services, such as:</p>
                    <ul>
                        <li>IP Address</li>
                        <li>Browser Type</li>
                        <li>Operating System</li>
                        <li>Device ID</li>
                    </ul>
                </li>
            </ul>
            
            <h2>2. How We Use Your Information</h2>
            <p>Your information is used in the following ways:</p>
            <ul>
                <li>To provide, maintain, and improve our services.</li>
                <li>To personalize user experience based on preferences and feedback.</li>
                <li>To communicate with you, including sending updates, newsletters, and promotional materials.</li>
                <li>To analyze usage patterns and trends, helping us enhance our application features.</li>
                <li>To detect, prevent, and address technical issues or security threats.</li>
            </ul>
            
            <h2>3. Data Protection Measures</h2>
            <p>We implement a variety of security measures to protect your personal information:</p>
            <ul>
                <li>
                    <strong>Encryption:</strong> 
                    <p>We use SSL encryption for data transmission to ensure your information is secure during transfer.</p>
                </li>
                <li>
                    <strong>Access Controls:</strong> 
                    <p>Access to personal data is restricted to authorized personnel who require it for their job functions.</p>
                </li>
                <li>
                    <strong>Data Anonymization:</strong> 
                    <p>When possible, we anonymize or aggregate data to reduce the risk of identification.</p>
                </li>
                <li>
                    <strong>Regular Security Audits:</strong> 
                    <p>We conduct regular audits and assessments of our security practices to identify and mitigate risks.</p>
                </li>
            </ul>
            
            <h2>4. Sharing Your Information</h2>
            <p>We do not sell or trade your personal information. We may share your data with:</p>
            <ul>
                <li>
                    <strong>Service Providers:</strong> 
                    <p>We may share information with third-party vendors who assist us in operating our application, such as payment processors, hosting providers, or analytics services.</p>
                </li>
                <li>
                    <strong>Legal Requirements:</strong> 
                    <p>We may disclose your information if required by law or in response to valid legal requests, such as subpoenas or court orders.</p>
                </li>
                <li>
                    <strong>Business Transfers:</strong> 
                    <p>If we undergo a merger, acquisition, or sale of assets, your information may be transferred as part of that business transaction.</p>
                </li>
            </ul>
            
            <h2>5. Your Rights</h2>
            <p>You have certain rights regarding your personal information, including:</p>
            <ul>
                <li>
                    <strong>The Right to Access:</strong> 
                    <p>You have the right to request copies of your personal data.</p>
                </li>
                <li>
                    <strong>The Right to Rectification:</strong> 
                    <p>If you believe that any information we hold about you is inaccurate, you have the right to request corrections.</p>
                </li>
                <li>
                    <strong>The Right to Erasure:</strong> 
                    <p>You can request the deletion of your personal data under certain conditions.</p>
                </li>
                <li>
                    <strong>The Right to Withdraw Consent:</strong> 
                    <p>Where we rely on your consent to process your information, you have the right to withdraw that consent at any time.</p>
                </li>
            </ul>
            
            <h2>6. Changes to This Policy</h2>
            <p>We may update this policy from time to time. When we make changes, we will notify you by posting the new policy on our application with a revised effective date. We encourage you to review this policy periodically for any changes.</p>
            
            <h2>7. Contact Us</h2>
            <p>If you have any questions or concerns about this privacy policy or our practices regarding your personal information, please contact us at:</p>
            <p>Email: <a href="mailto:support@example.com">support@example.com</a></p>
            <p>Address: 123 Privacy St, Secure City, SC 12345</p>
            <p>Phone: +1 (123) 456-7890</p>
        </div>
    );
};

export default PrivacyPolicy;
