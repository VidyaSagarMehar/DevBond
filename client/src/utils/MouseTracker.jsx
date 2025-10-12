import React, { useEffect, useState } from 'react';

export default function MouseTracker() {
	const [pos, setPos] = useState({ x: 0, y: 0 });
	const [followerPos, setFollowerPos] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (e) => {
			setPos({ x: e.clientX, y: e.clientY });
		};
		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, []);

	useEffect(() => {
		let animationFrame;
		const animate = () => {
			setFollowerPos((prev) => ({
				x: prev.x + (pos.x - prev.x) * 0.1, // delay
				y: prev.y + (pos.y - prev.y) * 0.1,
			}));
			animationFrame = requestAnimationFrame(animate);
		};
		animate();
		return () => cancelAnimationFrame(animationFrame);
	}, [pos]);

	return (
		<div
			className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
			style={{ overflow: 'hidden' }}
		>
			<div
				className="absolute w-96 h-96 rounded-full bg-[#FF0066]/14 blur-3xl"
				style={{
					left: `${followerPos.x - 110}px`,
					top: `${followerPos.y - 110}px`,
				}}
			></div>
		</div>
	);
}
