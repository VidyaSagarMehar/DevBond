import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Users, Sparkles, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-300">
			{/* Navbar */}
			<header className="fixed top-0 left-0 w-full z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-white/10 dark:border-gray-800">
				<div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">
							<Code2 className="w-6 h-6 text-white" />
						</div>
						<h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
							DevBond
						</h1>
					</div>

					<button
						onClick={() => navigate('/login')}
						className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg transition-all duration-300"
					>
						Login
					</button>
				</div>
			</header>

			{/* Hero Section */}
			<main className="flex-1 flex flex-col justify-center items-center text-center px-6 pt-32 pb-20">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="max-w-3xl"
				>
					<h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6 text-gray-900 dark:text-white">
						Connect. Collaborate. <br />{' '}
						<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
							Build Together.
						</span>
					</h1>
					<p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
						DevBond helps developers find collaborators, chat seamlessly, and
						build amazing projects together, faster and smarter.
					</p>

					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => navigate('/login')}
						className="px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
					>
						Get Started
					</motion.button>
				</motion.div>

				{/* Floating Icons Animation */}
				<div className="relative mt-20 w-full flex justify-center">
					<motion.div
						animate={{ y: [0, -15, 0] }}
						transition={{ duration: 3, repeat: Infinity }}
						className="absolute left-1/4 top-0"
					>
						<Users className="w-10 h-10 text-blue-500 dark:text-blue-400 opacity-80" />
					</motion.div>
					<motion.div
						animate={{ y: [0, 15, 0] }}
						transition={{ duration: 3, repeat: Infinity, delay: 0.6 }}
						className="absolute right-1/4 top-0"
					>
						<MessageSquare className="w-10 h-10 text-purple-500 dark:text-purple-400 opacity-80" />
					</motion.div>
					<motion.div
						animate={{ y: [0, -20, 0] }}
						transition={{ duration: 3, repeat: Infinity, delay: 1.2 }}
						className="absolute top-10"
					>
						<Sparkles className="w-10 h-10 text-pink-500 dark:text-pink-400 opacity-80" />
					</motion.div>
				</div>
			</main>

			{/* Features Section */}
			<section className="py-20 bg-white/60 dark:bg-gray-950/50 backdrop-blur-sm border-t border-white/20 dark:border-gray-800">
				<div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
					{[
						{
							icon: (
								<Users className="w-10 h-10 mx-auto text-blue-500 dark:text-blue-400" />
							),
							title: 'Find Developers',
							desc: 'Discover talented developers who share your vision and goals.',
						},
						{
							icon: (
								<MessageSquare className="w-10 h-10 mx-auto text-purple-500 dark:text-purple-400" />
							),
							title: 'Seamless Chat',
							desc: 'Stay connected with instant, responsive, and real-time messaging.',
						},
						{
							icon: (
								<Code2 className="w-10 h-10 mx-auto text-pink-500 dark:text-pink-400" />
							),
							title: 'Collaborate on Projects',
							desc: 'Team up on ideas, share progress, and ship code together.',
						},
					].map((f, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: idx * 0.2 }}
							className="p-8 rounded-3xl bg-white dark:bg-gray-900 shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300"
						>
							{f.icon}
							<h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900 dark:text-white">
								{f.title}
							</h3>
							<p className="text-gray-600 dark:text-gray-400">{f.desc}</p>
						</motion.div>
					))}
				</div>
			</section>

			{/* Footer */}
			<footer className="py-6 text-center text-gray-600 dark:text-gray-400 border-t border-white/20 dark:border-gray-800">
				<p>© {new Date().getFullYear()} DevBond. All rights reserved.</p>
			</footer>
		</div>
	);
};

export default LandingPage;
