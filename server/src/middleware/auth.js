const adminAuth = (req, res, next) => {
	console.log('Admin auth is getting checked!!');
	const token = 'xyz';
	const isAdminAUthorized = token === 'xyz';
	if (!isAdminAUthorized) {
		res.status(401).send('Unauthorized Request');
	} else {
		next();
	}
};

module.exports = { adminAuth };
