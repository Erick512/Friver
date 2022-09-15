const Profile = require('../models/Profile')
// const cloudinary = require('../middleware/cloudinary')

module.exports = {
    getProfile: async (req,res)=>{
        try{
            const profile = await Profile.findOne({userID:req.user.id})
            // console.log(profile)
            res.render('profile.ejs', {
                user: req.user,
                profile: profile
            })
        }catch(err){
            console.log(err)
        }
    },
    getUserProfile: async (req, res) => {
        const profile = await Profile.findOne({userID: req.params.id})
        res.render('profile.ejs', {
            user: req.user,
            profile: profile
        })
    },
    createProfile: async (req, res) => {

        const url = `https://friver.netlify.app/profile/${req.user.id}`
        const qrCodeGenerated = `https://api.qrserver.com/v1/create-qr-code/?data=${url}&amp;size=100x100`
    
        try {
            // const result = await cloudinary.uploader.upload(req.file.path);

            await Profile.create({
                userID: req.user.id,
                skills: req.body.skills.split(' '),
                description: req.body.description,
                email: req.body.email,
                // website: req.body.website || '',
                // phoneNumber: req.body.phoneNumber || 0,
                qrCode: qrCodeGenerated
            })

            console.log('profile created')
            res.redirect('/profile')

        } catch(err) {
            console.log(err)
        }
    }
}