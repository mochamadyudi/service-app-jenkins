import AuthController  from './auth.controller';
import CategoryController from "./category.controller";
import {RoleController} from "./role.controller";
import {PermissionController} from "./permission.controller";
import {OptionsController} from "./options.controller";

const Controllers = {
    Auth: AuthController,
    Category: CategoryController,
    Role:RoleController,
    Permission:PermissionController,
    Options:OptionsController,
}

export default Controllers