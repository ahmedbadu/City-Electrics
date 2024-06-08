module.exports = function (models) {
    var module = {};

    module.city = async function (req, res) {
        try {
            const userInfo = req.session.super_admin;
            const cityData = await models.citySchema.find({}).populate('state_id');
            res.render('backend/city/city.html', {
                userInfo,
                cityData,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.addCity = async function (req, res) {
        try {
            const userInfo = req.session.super_admin;
            const stateInfo = await models.stateSchema.find();
            res.render('backend/city/add.html', {
                userInfo,
                stateInfo,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.saveAddCity = async function (req, res) {
        try {
            const { stateId, cityName } = req.body;
            var currDate = new Date();
            var forDate = currDate.getDate() + "/" + (currDate.getMonth() + 1) + "/" + currDate.getFullYear();
            const saveResult = await models.citySchema.create({
                state_id: stateId,
                city_name: cityName,
                created_date: forDate,
            });
            if (saveResult) {
                res.send('City added successfully...!');
            }
            else {
                res.send('Something went wrong');
            }
        } catch (error) {
            res.send(error.message);
        }
    }

    module.editCity = async function (req, res) {
        try {
            const cid = req.params.cid;
            const userInfo = req.session.super_admin;
            const [StateData, cityInfo] = await Promise.all([
                models.stateSchema.find(),
                models.citySchema.findOne({ _id: cid }),
            ]);
            res.render('backend/city/edit.html', {
                userInfo,
                StateData,
                cityInfo,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.saveEditCity = async function (req, res) {
        try {
            const { city_id, state_id, city_name } = req.body;
            const saveResult = await models.citySchema.updateOne({ _id: city_id }, {
                state_id: state_id, city_name: city_name,
            });
            if(saveResult){
                res.send('City updated successfully...!');
            }
            else{
                res.send('Something went wrong');
            }
        } catch (error) {
            res.send(error.message);
        }
    }

    return module;
}