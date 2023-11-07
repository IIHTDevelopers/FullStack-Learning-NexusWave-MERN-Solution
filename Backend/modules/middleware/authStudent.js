function authStudent(req, res, next) {
    try {
        if (req.user.userType && req.user.userType=='Student') {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = authStudent;