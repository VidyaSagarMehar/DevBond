import React from 'react';
import { motion } from 'framer-motion';
import {
	Code2,
	Users,
	Sparkles,
	MessageSquare,
	Moon,
	Sun,
	ArrowRight,
	Crown,
	Zap,
	Shield,
	Star,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { useTheme } from '../contexts/ThemeContext';

const LandingPage = () => {
	const navigate = useNavigate();
	const { theme, toggleTheme } = useTheme();

	// Mock chat messages for animation
	const chatMessages = [
		{ user: 'Sarah', msg: 'Hey! Looking for a React dev?', avatar: '👩‍💻' },
		{ user: 'Alex', msg: 'Yes! Need help with state management', avatar: '🧑‍💻' },
		{ user: 'Sarah', msg: 'I specialize in Redux & Context API', avatar: '👩‍💻' },
		{ user: 'Alex', msg: 'Perfect! When can we start?', avatar: '🧑‍💻' },
	];
	const stats = [
		{ number: '10K+', label: 'Active Developers' },
		{ number: '5K+', label: 'Projects Built' },
		{ number: '50+', label: 'Countries' },
		{ number: '98%', label: 'Success Rate' },
	];
	const premiumFeatures = [
		{ icon: <Crown className="w-5 h-5" />, text: 'Unlimited connections' },
		{ icon: <Zap className="w-5 h-5" />, text: 'Priority matching' },
		{ icon: <Shield className="w-5 h-5" />, text: 'Verified badge' },
		{ icon: <Star className="w-5 h-5" />, text: 'Featured profile' },
	];

	return (
		<div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-300">
			{/* Navbar */}
			<header className="fixed top-0 left-0 w-full z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-white/10 dark:border-gray-800">
				<div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">
							<Code2 className="w-6 h-6 text-white" />
						</div>
						<h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400 cursor-pointer">
							DevBond
						</h1>
					</div>

					<div className="flex gap-2">
						<button
							onClick={() => navigate('/login')}
							className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg transition-all duration-300 cursor-pointer"
						>
							Login
						</button>
						<button
							onClick={toggleTheme}
							className="flex w-full items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-900 dark:hover:bg-gray-200 transition cursor-pointer rounded-full "
						>
							{theme === 'light' ? (
								<>
									<Moon className="w-4 h-4" />
								</>
							) : (
								<>
									<Sun className="w-4 h-4 text-white hover:text-yellow-400" />
								</>
							)}
						</button>
					</div>
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
						onClick={() => {
							navigate('/login');
							console.log('clicked');
						}}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer"
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

			{/* Chat Animation Section */}
			<section className="pt-32 pb-20 px-6">
				<div className="max-w-7xl mx-auto">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div className="space-y-8">
							<div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-800">
								<Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
								<span className="text-sm font-medium text-blue-700 dark:text-blue-300">
									AI-Powered Developer Networking
								</span>
							</div>

							<h1 className="text-5xl lg:text-7xl font-extrabold leading-tight text-gray-900 dark:text-white">
								Build Your Next
								<span className="block bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
									Dream Project
								</span>
							</h1>

							<p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
								Connect with talented developers worldwide. Share ideas,
								collaborate on projects, and turn your vision into reality with
								DevBond's intelligent matching system.
							</p>

							<div className="flex flex-wrap gap-4">
								<button
									onClick={() => navigate('/login')}
									className="group px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer"
								>
									Get Started Free
									<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
								</button>
							</div>
							<div className="flex items-center gap-6 pt-4">
								{stats.slice(0, 2).map((stat, idx) => (
									<div key={idx} className="text-center">
										<div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
											{stat.number}
										</div>
										<div className="text-sm text-gray-600 dark:text-gray-400">
											{stat.label}
										</div>
									</div>
								))}
							</div>
						</div>
						{/* Animated Chat Preview */}
						<div className="relative">
							<div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-3xl opacity-20"></div>
							<div className="relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 p-6 space-y-4">
								<div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-800">
									<div className="w-3 h-3 rounded-full bg-red-500"></div>
									<div className="w-3 h-3 rounded-full bg-yellow-500"></div>
									<div className="w-3 h-3 rounded-full bg-green-500"></div>
									<span className="ml-auto text-sm font-medium text-gray-700 dark:text-gray-300">
										DevBond Chat
									</span>
								</div>

								{chatMessages.map((msg, idx) => (
									<div
										key={idx}
										className={`flex items-start gap-3 animate-slide-up`}
										style={{
											animationDelay: `${idx * 0.5}s`,
											animationFillMode: 'backwards',
										}}
									>
										<div className="text-2xl">{msg.avatar}</div>
										<div className="flex-1">
											<div className="text-sm font-semibold text-gray-900 dark:text-white">
												{msg.user}
											</div>
											<div className="mt-1 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-2xl rounded-tl-none">
												<p className="text-sm text-gray-700 dark:text-gray-300">
													{msg.msg}
												</p>
											</div>
										</div>
									</div>
								))}

								<div className="flex items-center gap-2 pt-2">
									<div className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full">
										<span className="text-sm text-gray-500">
											Type a message...
										</span>
									</div>
									<button className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
										<MessageSquare className="w-5 h-5 text-white" />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<style>{`
				@keyframes slide-up {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
				.animate-slide-up {
					animation: slide-up 0.5s ease-out;
				}
			`}</style>

			{/* Features Section */}
			<section className="py-20 bg-white/60 dark:bg-gray-950/50 backdrop-blur-sm  border-white/20 dark:border-gray-800 overflow-hidden">
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

			{/* Premium Section */}
			<section className="relative py-24 px-6 bg-gradient-to-br from-blue-900 to-purple-900 dark:from-gray-950 dark:to-gray-900 overflow-hidden">
				<div className="absolute inset-0 opacity-10 pointer-events-none">
					<div
						className="absolute inset-0"
						style={{
							backgroundImage:
								'radial-gradient(circle, white 1px, transparent 1px)',
							backgroundSize: '50px 50px',
						}}
					></div>
				</div>
				<div className="max-w-4xl mx-auto text-center relative z-10">
					<Crown className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
					<h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
						Unlock Premium Features
					</h2>
					<p className="text-xl text-blue-100 mb-12">
						Take your collaboration to the next level with exclusive benefits
					</p>

					<div className="grid md:grid-cols-2 gap-6 mb-12">
						{premiumFeatures.map((feature, idx) => (
							<div
								key={idx}
								className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-left"
							>
								<div className="p-2 bg-yellow-400/20 rounded-lg text-yellow-400">
									{feature.icon}
								</div>
								<span className="text-white font-medium">{feature.text}</span>
							</div>
						))}
					</div>

					<div className="flex flex-wrap justify-center gap-4">
						<button
							onClick={() => navigate('/login')}
							className="px-8 py-4 bg-yellow-400 text-gray-900 font-bold rounded-2xl hover:bg-yellow-300 transition-all hover:scale-105 shadow-lg cursor-pointer"
						>
							Go Premium - ₹199/mo
						</button>
						<button
							onClick={() => navigate('/login')}
							className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl border-2 border-white/20 hover:bg-white/20 transition-all cursor-pointer"
						>
							Compare Plans
						</button>
					</div>
				</div>
			</section>

			{/* Footer */}
			<Footer />
		</div>
	);
};

export default LandingPage;
