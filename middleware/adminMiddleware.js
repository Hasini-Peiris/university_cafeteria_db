export const isAdmin = (req, res, next) => {
    try {
        const role = req.headers.role;

        if (!role || role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admin only."
            });
        }

        next();
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};