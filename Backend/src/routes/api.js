import express from "express";
import { RegisterController, LoginController, LogoutController } from "../controllers/loginRegisterController";
import {readUserController, createUserController, updateUserController, deleteUserController, getUserAccount} from "../controllers/userController"
import { checkUserJWT, checkUserPermission } from "../middleware/JWTAction";
import {readGroupController} from "../controllers/groupController"
import { assignToGroupController, getRoleByGroupController ,readRoleController, createRoleController, updateRoleController, deleteRoleController } from "../controllers/roleController";
const router = express.Router();

const initApiRoutes = (app) => { 
    router.all('*',  checkUserJWT,checkUserPermission);
    
    router.post("/register", RegisterController)
    router.post("/login", LoginController)
    router.get("/logout", LogoutController)
    
    //user routes
    router.get("/user/read", readUserController)
    router.post("/user/create",createUserController)
    router.put("/user/update", updateUserController)
    router.delete("/user/delete",deleteUserController)
    router.get("/account", getUserAccount)

    //roles routes
    router.get("/role/read", readRoleController)
    router.post("/role/create",createRoleController)
    router.put("/role/update", updateRoleController)
    router.delete("/role/delete",deleteRoleController)
    router.post("/role/by-group",getRoleByGroupController)
    router.post("/role/assigned-to-group", assignToGroupController)


    //group routes
    router.get("/group/read",readGroupController)

    return app.use('/api', router)
}

export default initApiRoutes