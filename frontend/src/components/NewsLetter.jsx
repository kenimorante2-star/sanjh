import React, { useState } from 'react'; // Import useState
import { assets } from '../assets/assets';
import Title from './Title';

const NewsLetter = () => {
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [subscriptionMessage, setSubscriptionMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'

    // Handler for the email input field
    const handleEmailChange = (e) => {
        setNewsletterEmail(e.target.value);
    };

    // Handler for the subscribe button
    const handleSubscribe = async () => {
        // Basic email validation (you'd want more robust validation on the backend)
        if (!newsletterEmail || !newsletterEmail.includes('@') || !newsletterEmail.includes('.')) {
            setSubscriptionMessage('Please enter a valid email address.');
            setMessageType('error');
            return;
        }

        setSubscriptionMessage('Subscribing...');
        setMessageType('');

        try {
            // In a real application, you would send this email to your backend API
            // Example:
            // const response = await axios.post('/api/subscribe-newsletter', { email: newsletterEmail });
            // if (response.status === 200) {
            //     setSubscriptionMessage('Subscribed successfully! Thank you.');
            //     setMessageType('success');
            //     setNewsletterEmail(''); // Clear input after successful subscription
            // } else {
            //     setSubscriptionMessage('Subscription failed. Please try again.');
            //     setMessageType('error');
            // }

            // Simulate a successful subscription after a delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log(`Subscribing email from NewsLetter component: ${newsletterEmail}`);
            setSubscriptionMessage('Subscribed successfully! Thank you for joining.');
            setMessageType('success');
            setNewsletterEmail(''); // Clear the input field

        } catch (error) {
            console.error('Error during newsletter subscription from NewsLetter component:', error);
            setSubscriptionMessage('Failed to subscribe. Please try again later.');
            setMessageType('error');
        } finally {
            // Clear the message after some time
            setTimeout(() => {
                setSubscriptionMessage('');
                setMessageType('');
            }, 5000); // Message disappears after 5 seconds
        }
    };

    return (
        <div className="flex flex-col items-center max-w-5xl lg:w-full rounded-2xl px-4 py-12 md:py-16 mx-2 lg:mx-auto my-30 bg-gray-900 text-white">

            <Title title="Stay Inspired" subTitle="Join our newsletter and be the first to discover new destinations, exclusive offers, and travel inspiration." />

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
                <input
                    type="email" // Changed to type="email"
                    className="bg-white/10 px-4 py-2.5 border border-white/20 rounded outline-none max-w-66 w-full focus:border-blue-500"
                    placeholder="Enter your email"
                    value={newsletterEmail} // Controlled component
                    onChange={handleEmailChange} // Add change handler
                    aria-label="Enter your email for newsletter"
                />
                <button
                    className="flex items-center justify-center gap-2 group bg-black px-4 md:px-7 py-2.5 rounded active:scale-95 transition-all hover:bg-gray-800"
                    onClick={handleSubscribe} // Add click handler
                    aria-label="Subscribe to newsletter"
                >
                    Subscribe
                    <img
                        src={assets.arrowIcon}
                        alt="arrow-icon"
                        className='w-3.5 invert group-hover:translate-x-1 transition-all'
                    />
                </button>
            </div>
            {/* Subscription message display */}
            {subscriptionMessage && (
                <p className={`mt-4 text-sm text-center ${messageType === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                    {subscriptionMessage}
                </p>
            )}
            <p className="text-gray-500 mt-6 text-xs text-center">By subscribing, you agree to our Privacy Policy and consent to receive updates.</p>
        </div>
    );
};

export default NewsLetter;