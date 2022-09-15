const Profile = require('../models/Profile')

module.exports = {
    getQRCode: async (req, res) => {
        try {
            const profile = await Profile.findOne({userID: req.user.id})
            console.log(profile)
            res.render('qrCode.ejs', {
                profile: profile
            })
        }catch(err){
            console.log('error here')
            console.log(err)
        }
    }
}