module.exports = function (models) {

    var module = {};

    module.branch = async function (req, res) {
        try {
            const userInfo = req.session.super_admin;
            const branchInfo = await models.branchSchema.find().populate(['state_id', 'city_id']);
            res.render('backend/branch/branch.html', {
                userInfo,
                branchInfo,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.addBranch = async function (req, res) {
        try {
            const userInfo = req.session.super_admin;
            const stateInfo = await models.stateSchema.find();
            res.render('backend/branch/add.html', {
                userInfo,
                stateInfo,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.fetchCity = async function (req, res) {
        try {
            const stateId = req.query.state_id;
            const city = await models.citySchema.find({ state_id: stateId });
            res.send(city);
        } catch (error) {
            res.send(error.message);
        }
    }

    module.saveBranch = async function (req, res) {
        try {
            const { selectState, selectCity, address, phone } = req.body;
            var currDate = new Date();
            var forDate = currDate.getDate() + "/" + (currDate.getMonth() + 1) + "/" + currDate.getFullYear();
            const saveBranch = await models.branchSchema.create({
                state_id: selectState,
                city_id: selectCity,
                address: address,
                phone: phone,
                created_date: forDate,
            });
            if (saveBranch) {
                res.redirect('/superAdmin/branch');
            }
        } catch (error) {
            res.send(error.message);
        }
    }

    module.edit = async function (req, res) {
        try {
            const bid = req.params.bid;
            const userInfo = req.session.super_admin;
            const [branchInfo, stateInfo] = await Promise.all([
                models.branchSchema.findOne({ _id: bid }),
                models.stateSchema.find({}),
            ]);
            res.render('backend/branch/edit.html', {
                userInfo,
                branchInfo,
                stateInfo,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.editBranch = async function (req, res) {
        try {
            const { branch_id, selectState, selectCity, address, phone } = req.body;
            const updateBranch = await models.branchSchema.updateOne({ _id: branch_id }, {
                state_id: selectState,
                city_id: selectCity,
                address: address,
                phone: phone,
            });
            if (updateBranch) {
                res.redirect('/superAdmin/branch');
            }
        } catch (error) {
            res.send(error.message);
        }
    }

    module.getCity = async function (req, res) {
        try {
            const state_id = req.query.state_id;
            const cityInfo = await models.citySchema.find({ state_id: state_id });
            res.send(cityInfo);
        } catch (error) {
            res.send(error.message);
        }
    }

    return module;

}