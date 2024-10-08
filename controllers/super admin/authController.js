const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'cityelectrics2019@gmail.com',
        pass: 'Citymax@2019',
    }
});
module.exports = function (models) {

    var module = {}

    module.signin = (req, res) => {
        const postURL = '/superAdmin/checkUser';
        const username = 'Super Admin';
        const forgotUrl = '/superAdmin/forgotpassword';
        res.render('backend/auth/login.html', {
            postURL,
            username,
            forgotUrl,
        });
    }

    module.signinCheck = async (req, res) => {
        try {
            const { email, password } = req.body;
            const verifySAdmin = await models.userModel.findOne({
                email: email,
                user_type: 'super admin',
            });
            if (verifySAdmin) {
                const comparePassword = await bcrypt.compare(password, verifySAdmin.password);
                if (comparePassword) {
                    req.session.super_admin = verifySAdmin
                    res.redirect('/superAdmin/dashboard');
                } else {
                    res.send('<script>alert("Invalid password!");history.back();</script>');
                }
            }
            else {
                res.send('<script>alert("Invalid Email and Password!");history.back();</script>');
            }
        } catch (error) {
            res.send('<script>alert("' + error.message + '");history.back();</script>');
        }
    }

    module.signOut = function (req, res) {
        try {
            req.session.super_admin = null;
            res.redirect('/superAdmin/login');
        } catch (error) {
            res.send(error.message);
        }
    }

    module.forgot = function (req, res) {
        try {
            const backUrl = '/superAdmin/login';
            const postURL = '/superAdmin/forgotPassword';
            res.render('backend/auth/forgot_password.html', {
                backUrl,
                postURL,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.forgotPasswordPost = async function (req, res) {
        try {
            const email = req.body.email;
            const verifyEmail = await models.userModel.findOne({
                email: email,
                user_type: 'super admin',
            });
            if (verifyEmail) {
                var mailOption = {
                    to: email,
                    subject: 'Super Admin Forgot Password testing',
                    text: 'Forgot password link is here',
                }
                transporter.sendMail(mailOption);
                res.send('<script>alert("Mail send to your gmail account...");history.back();</script>');
            } else {
                res.send('<script>alert("Invalid Email..!Please Enter Valid Email");history.back();</script>');
            }
        } catch (error) {
            res.send(error.message);
        }
    }

    module.profile = async function (req, res) {
        try {
            const userInfo = req.session.super_admin;
            // console.log('SuperAdmin Session Details:-----' + userInfo.phone);
            res.render('backend/auth/profile.html', {
                userInfo,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.editProfile = async function (req, res) {
        try {
            const id = req.params.id;
            const { first_name, last_name, email, phone } = req.body;
            if (req.file && req.file.filename) {
                let updateProfile = await models.userModel.updateOne({ _id: id }, {
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    phone: phone,
                    profile: req.file.filename,
                });
                if (updateProfile) {
                    req.session.super_admin.first_name = first_name;
                    req.session.super_admin.last_name = last_name;
                    req.session.super_admin.email = email;
                    req.session.super_admin.phone = phone;
                    req.session.super_admin.profile = req.file.filename;
                    res.send('<script>alert("Profile successfully updated");history.back();</script>');
                }
                else {
                    res.send('<script>alert("Oops! Something went wrong!");history.back();</script>');
                }
            }
            else {
                let updateProfile = await models.userModel.updateOne({ _id: id }, {
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    phone: phone,
                });
                if (updateProfile) {
                    req.session.super_admin.first_name = first_name;
                    req.session.super_admin.last_name = last_name;
                    req.session.super_admin.email = email;
                    req.session.super_admin.phone = phone;
                    res.send('<script>alert("Profile successfully updated");history.back();</script>');
                }
                else {
                    res.send('<script>alert("Oops! Something went wrong!");history.back();</script>');
                }
            }
        } catch (error) {
            res.send(error.message);
        }
    }

    return module;

}