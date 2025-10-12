import { useLocation } from 'react-router-dom';
import MouseTracker from './MouseTracker';

const BackgroundEffects = () => {
	const location = useLocation();
	const allowedPaths = ['/welcome', '/login', '/signup'];

	if (!allowedPaths.includes(location.pathname)) return null;
	return <MouseTracker />;
};

export default BackgroundEffects;
