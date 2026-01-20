import React from 'react';
import { Heart, Code2, Github, Twitter, Linkedin, Mail, X } from 'lucide-react';

const Footer = () => {
	return (
		<footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-100 dark:border-gray-700 mt-auto transition-colors duration-300">
			<div className="container mx-auto px-4 py-8">
				<div className="text-center">
					{/* Logo */}
					<div className="flex items-center justify-center space-x-2 mb-4">
						<div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
							<Code2 className="w-5 h-5 text-white" />
						</div>
						<span className="text-xl font-bold text-gray-800 dark:text-gray-100">
							DevBond
						</span>
					</div>

					{/* Tagline */}
					<p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
						Connecting developers worldwide, one swipe at a time
					</p>

					{/* Social Links */}
					<div className="flex items-center justify-center space-x-4 mb-6">
						<a
							href="https://github.com/VidyaSagarMehar"
							target="blank"
							className="w-10 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-full flex items-center justify-center transition-colors group"
						>
							<Github className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-600" />
						</a>
						<a
							href="https://x.com/VidyaSagarMehar"
							target="blank"
							className="w-10 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-full flex items-center justify-center transition-colors group"
						>
							<X className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-600" />
						</a>
						<a
							href="https://www.linkedin.com/in/vidya-sagar-mehar-bb576814a/"
							target="blank"
							className="w-10 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-full flex items-center justify-center transition-colors group"
						>
							<Linkedin className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-600" />
						</a>
						{/* <a
							href="mailto:vidyasagarmehar@gmail.com?subject=Hello&body=How are you?"
							className="w-10 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-full flex items-center justify-center transition-colors group"
						>
							<Mail className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-600" />
						</a> */}
					</div>

					{/* Copyright */}
					<div className="flex items-center justify-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
						<span>Made with</span>
						<Heart className="w-4 h-4 text-red-500 fill-current" />
						<span>for developers by a developer</span>
					</div>

					<div className="mt-2 text-xs text-gray-400 dark:text-gray-500">
						© {new Date().getFullYear()} DevBond. All rights reserved.
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
