import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const footerLinks = {
    platform: [
        { name: 'Find Jobs', href: '/jobs' },
        { name: 'Post a Job', href: '/jobs/create' },
        { name: 'How It Works', href: '/how-it-works' },
        { name: 'Pricing', href: '/pricing' },
    ],
    company: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
    ],
    legal: [
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'Refund Policy', href: '/refunds' },
    ],
    support: [
        { name: 'Help Center', href: '/help' },
        { name: 'Documentation', href: '/docs' },
        { name: 'API Reference', href: '/api' },
        { name: 'Status', href: '/status' },
    ],
};

const socialLinks = [
    { name: 'GitHub', href: 'https://github.com', icon: Github },
    { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
    { name: 'Email', href: 'mailto:hello@voulence.com', icon: Mail },
];

export function Footer() {
    return (
        <footer className="bg-[rgb(var(--card))] border-t border-[rgb(var(--border))]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">V</span>
                            </div>
                            <span className="text-xl font-bold gradient-primary-text">
                                Voulence
                            </span>
                        </Link>
                        <p className="text-sm text-[rgb(var(--muted-foreground))] mb-4">
                            Secure escrow payments for freelancers, powered by Stellar blockchain.
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="h-10 w-10 rounded-full bg-[rgb(var(--secondary))] flex items-center justify-center text-[rgb(var(--muted-foreground))] hover:text-primary-500 hover:bg-primary-500/10 transition-colors"
                                    aria-label={link.name}
                                >
                                    <link.icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Platform */}
                    <div>
                        <h3 className="font-semibold text-sm mb-4">Platform</h3>
                        <ul className="space-y-3">
                            {footerLinks.platform.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[rgb(var(--muted-foreground))] hover:text-primary-500 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-semibold text-sm mb-4">Company</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[rgb(var(--muted-foreground))] hover:text-primary-500 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-semibold text-sm mb-4">Legal</h3>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[rgb(var(--muted-foreground))] hover:text-primary-500 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-semibold text-sm mb-4">Support</h3>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[rgb(var(--muted-foreground))] hover:text-primary-500 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-6 border-t border-[rgb(var(--border))] flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-[rgb(var(--muted-foreground))]">
                        © {new Date().getFullYear()} Voulence. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-[rgb(var(--muted-foreground))]">
                        <span>Powered by</span>
                        <span className="font-semibold text-primary-500">Stellar</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
