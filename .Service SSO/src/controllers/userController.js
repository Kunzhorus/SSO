import {getAllUsers, createUser, updateUser, deleteUser, getUserWithPagination} from "../services/userApiService"

const readUserController = async (req, res ) => {
    try{
        if(req.query.page && req.query.limit){
            let page = req.query.page;
            let limit = req.query.limit
            let data = await getUserWithPagination(+page, +limit);
            return res.status(200).json({
                EM : data.EM,
                EC : data.EC,
                DT : data.DT
            })

        }else{
            let data = await getAllUsers();
            return res.status(200).json({
                EM : data.EM,
                EC : data.EC,
                DT : data.DT
            })
        }
        
        
    }catch(e){
        return res.status(500).json({
            EM : 'error from server',
            EC : '-1',
            DT : ''
        })
    }
}

const createUserController = async (req, res ) => {
    try{
        let data = await createUser(req.body)
        return res.status(200).json({
            EM : data.EM,
            EC : data.EC,
            DT : data.DT
        })
    }catch(e){
        return res.status(500).json({
            EM : 'error from server',
            EC : '-1',
            DT : ''
        })
    }
}

const updateUserController = async (req, res ) => {
    try{
        let data = await updateUser(req.body)
        return res.status(200).json({
            EM : data.EM,
            EC : data.EC,
            DT : data.DT
        })
        
    }catch(e){
        return res.status(500).json({
            EM : 'error from server',
            EC : '-1',
            DT : ''
        })
    }
}

const deleteUserController = async (req, res ) => {
    try{
        let data = await deleteUser(req.body.id)
        return res.status(200).json({
            EM : data.EM,
            EC : data.EC,
            DT : data.DT
        })
    }catch(e){
        return res.status(500).json({
            EM : 'error from server',
            EC : '-1',
            DT : ''
        })
    }
}

const getUserAccount = async( req, res ) => { 
 
    return res.status(200).json({
        EM: 'Get User Information Successfully', 
        EC: 0, 
        DT: {
            access_token: req.user?.access_token,
            refresh_token: req.user?.refresh_token,
            roles: req.user?.roles,
            email: req.user?.email,
            username: req.user?.username
        }
    })
}

export {readUserController, createUserController, updateUserController, deleteUserController, getUserAccount}