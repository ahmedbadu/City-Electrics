module.exports = function (models) {

    var module = {};

    module.state = async function (req, res) {
        try {
            const userInfo = req.session.super_admin;
            var stateData = await models.stateSchema.find();
            res.render('backend/state/state.html', {
                userInfo,
                stateData,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.addState = function (req, res) {
        try {
            const userInfo = req.session.super_admin;
            res.render('backend/state/add.html', {
                userInfo,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.saveState = async function (req, res) {
        try {
            const stateName = req.body.stateName;
            const currDate = new Date();
            var forDate = currDate.getDate() + "/" + (currDate.getMonth()+1) + "/" + currDate.getFullYear(); 
            const addState = await models.stateSchema.create({
                state_name: stateName,
                created_date: forDate,
            });
            if(addState){
                res.send('State added successfully');
            }
            else{
                res.send('Something went wrong');
            }
        } catch (error) {
            res.send(error.message);
        }
    }

    module.editState = async function(req,res){
        try {
            const sid = req.params.sid;
            const userInfo = req.session.super_admin;
            var stateData = await models.stateSchema.findOne({_id:sid});
            res.render('backend/state/edit.html',{
                userInfo,
                stateData,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.SaveEditState = async function(req,res){
        try {
            const {sid,state_name} = req.body;
            const editResult = await models.stateSchema.updateOne({_id:sid},{
                state_name:state_name,
            });
            if(editResult){
                res.send('State updated successfully...!');
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