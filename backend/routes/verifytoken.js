import jwt from "jsonwebtoken"


export function vali(req, res, next) {

    try {

        if (req.cookies.access_token) {
            console.log("ko")


            const token = req.cookies.access_token

            let decode = jwt.verify(token, process.env.SECRET_KEY)
            if (decode) {
                console.log(decode)
                req.user = decode.user_data
                next()
            } else {
                return res.status(401).json({
                    message: "invalid token"

                })
            }
        } else {
            return res.status(401).json({
                message: "unauthorized"
            })
        }
    } catch (err) {
        return res.status(500).json(
            { message: err.message }
        )
    }
}
export function valiToken(req, res, next) {

    vali(req, res, () => {
        try {
            if (req.user._id === req.params.id || req.user.isAdmin) {
                next()
            } else {
                return json({
                    message: "you are not allowed to do changes",

                })
            }


        } catch (err) {
            return res.status(500).json(
                { message: err.message }
            )
        }
    })

}
export function valiTokenAdmin(req, res, next) {

    vali(req, res, () => {
        try {
            if (req.user.isAdmin) {
                next()
            } else {
                return res.json({
                    message: "you are not allowed to do that"
                })
            }


        } catch (err) {
            return res.status(500).json(
                { message: err.message }
            )
        }
    })
}

