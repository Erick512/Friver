const Profile = require('../models/Profile')
const cloudinary = require('../middleware/cloudinary')

module.exports = {
    getProfile: async (req,res)=>{
        try{
            const profile = await Profile.findOne({userID:req.user.id})
            console.log(profile.userID, req.user.id)
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
        res.render('userProfile.ejs', {
            profile: profile
        })
    },
    createProfile: async (req, res) => {

        const url = `https://friver.herokuapp.com/profile/${req.user.id}`
        const qrCodeGenerated = `https://api.qrserver.com/v1/create-qr-code/?data=${url}&amp;size=100x100`
    
        try {

            const result = await cloudinary.uploader.upload(req.file.path);

            await Profile.create({
                userID: req.user.id,
                fullName: req.user.fullName,
                userName: req.user.userName,
                skills: req.body.skills.split(','),
                image: result.secure_url,
                cloudinaryId: result.public_id,
                description: req.body.description,
                email: req.body.email,
                website: req.body.website,
                phoneNumber: formatPhoneNumber(req.body.phoneNumber),
                qrCode: qrCodeGenerated
            })
 
            console.log('profile created')
            res.redirect('/profile')

        } catch(err) {
            console.log(err)
        }
    },
}

let formatPhoneNumber = (str) => {
    //Filter only numbers from the input
    let cleaned = ('' + str).replace(/\D/g, '');
    
    //Check if the input is of correct length
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    };
  
    return null
}