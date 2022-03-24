import User from "../models/user";

export const register = async (req, res) => {
    const { email, name, password } = req.body
    try {
        const existUser = await User.findOne({ email }).exec();
        if (existUser) {
            res.json({
                message: "Email to be in being"
            })
        };
        const user = await new User({ email, name, password }).save();
        res.json({
            user: {
                _id: user._id,
                email: user.email,
                name: user.name
            }
        });
    } catch (error) {
        res.status(400).json({
            message: "Fail register"
        })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email }).exec();
        if (!user) {
            res.status(400).json({
                message: "Email doesn't exist"
            })
        };
        if (!user.authenticate(password)) {
            res.status(400).json({
                message: "Incorrect password"
            })
        }
        res.json({
            user: {
                _id: user._id,
                email: user.email,
                name: user.name
            }
        })
    } catch (error) {
        res.status(400).json({
            message: "Fail login"
        })
    }
}