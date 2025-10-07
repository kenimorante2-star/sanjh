import React, { useState } from 'react'; // Import useState
import { assets } from '../assets/assets'; // Make sure this path is correct

const Footer = () => {
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
            console.log(`Subscribing email: ${newsletterEmail}`);
            setSubscriptionMessage('Subscribed successfully! Thank you for joining.');
            setMessageType('success');
            setNewsletterEmail(''); // Clear the input field

        } catch (error) {
            console.error('Error during newsletter subscription:', error);
            setSubscriptionMessage('Failed to subscribe. Please try again later.');
            setMessageType('error');
        } finally {
            // Clear the message after some time
            setTimeout(() => {
                setSubscriptionMessage('');
                setMessageType('');
            }, 5000);
        }
    };

    return (
        <div className='bg-[#F6F9FC] text-gray-500/80 pt-8 px-6 md:px-16 lg:px-24 xl:px-32'>
            <div className='flex flex-wrap justify-between gap-12 md:gap-6'>
                <div className='max-w-80'>
                    <img src={assets.sanjhf} alt="logo" className='mb-4 h-9 md:h-10 invert opacity-80' />
                    <p className='text-sm'>
                        Discover the world's most extraordinary places to stay, from boutique hotels to luxury villas and private islands.
                    </p>
                    <div className='flex items-center gap-3 mt-4'>
                        {/* Facebook Link */}
                        <a href="https://www.facebook.com/SANJH.IslandHotel" target="_blank" rel="noopener noreferrer">
                            <img src={assets.facebookIcon} alt="facebook-icon" className='w-6 hover:opacity-75 transition-opacity duration-200' />
                        </a>
                        
                    </div>
                </div>

                <div>
                    <p className='font-playfair text-lg text-gray-800'>COMPANY</p>
                    <ul className='mt-3 flex flex-col gap-2 text-sm'>
                        <li><a href="/about" className='hover:text-gray-700 transition-colors'>About</a></li>
                        <li><a href="/careers" className='hover:text-gray-700 transition-colors'>Careers</a></li>
                        <li><a href="/press" className='hover:text-gray-700 transition-colors'>Press</a></li>
                        <li><a href="/blog" className='hover:text-gray-700 transition-colors'>Blog</a></li>
                        <li><a href="/partners" className='hover:text-gray-700 transition-colors'>Partners</a></li>
                    </ul>
                </div>

                <div>
                    <p className='font-playfair text-lg text-gray-800'>SUPPORT</p>
                    <ul className='mt-3 flex flex-col gap-2 text-sm'>
                        <li><a href="/help" className='hover:text-gray-700 transition-colors'>Help Center</a></li>
                        <li><a href="/safety" className='hover:text-gray-700 transition-colors'>Safety Information</a></li>
                        <li><a href="/cancellations" className='hover:text-gray-700 transition-colors'>Cancellation Options</a></li>
                        <li><a href="/contact" className='hover:text-gray-700 transition-colors'>Contact Us</a></li>
                        <li><a href="/accessibility" className='hover:text-gray-700 transition-colors'>Accessibility</a></li>
                    </ul>
                </div>

                <div className='max-w-80'>
                    <p className='font-playfair text-lg text-gray-800'>STAY UPDATED</p>
                    <p className='mt-3 text-sm'>
                        Subscribe to our newsletter for inspiration and special offers.
                    </p>
                    <div className='flex items-center mt-4'>
                        <input
                            type="email" // Changed to type="email" for better browser support
                            className='bg-white rounded-l border border-gray-300 h-9 px-3 outline-none focus:border-blue-500 flex-grow' // Added flex-grow
                            placeholder='Your email'
                            value={newsletterEmail} // Controlled component
                            onChange={handleEmailChange}
                            aria-label="Your email for newsletter"
                        />
                        <button
                            className='flex items-center justify-center bg-black h-9 w-9 aspect-square rounded-r hover:bg-gray-800 transition-colors'
                            onClick={handleSubscribe} // Add onClick handler
                            aria-label="Subscribe to newsletter"
                        >
                            <img src={assets.arrowIcon} alt="arrow-icon" className='w-3.5 invert' />
                        </button>
                    </div>
                    {/* Subscription message display */}
                    {subscriptionMessage && (
                        <p className={`mt-2 text-sm ${messageType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                            {subscriptionMessage}
                        </p>
                    )}
                </div>
            </div>
            <hr className='border-gray-300 mt-8' />
            <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>© {new Date().getFullYear()} Sanjh Island Hotel. All rights reserved.</p> {/* Dynamic year */}
                <ul className='flex items-center gap-4'>
                    <li><a href="/privacy" className='hover:text-gray-700 transition-colors'>Privacy</a></li>
                    <li><a href="/terms" className='hover:text-gray-700 transition-colors'>Terms</a></li>
                    <li><a href="/sitemap" className='hover:text-gray-700 transition-colors'>Sitemap</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Footer;