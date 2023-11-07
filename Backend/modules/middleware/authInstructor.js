function authInstructor(req, res, next) {
    try {
        if (req.user.userType && req.user.userType == 'Instructor') {
            next();
        } else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = authInstructor;