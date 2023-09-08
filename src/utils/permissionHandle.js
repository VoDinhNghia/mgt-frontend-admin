import { Badge, Button } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { getCurrentUser, getPermission } from "../services/authService";
import { moduleNames, userRoles } from "../constants/constant";

export const isRoleSa = () => {
  const currentUser = getCurrentUser();
  const checkRole = currentUser?.role === userRoles.SUPPER_ADMIN;
  return checkRole;
}

export const isPermissionActionUserMgt = (action) => {
  const roleSa = isRoleSa();
  const permissionOfModule = isPermissionModule(moduleNames.USER_MANAGEMENT);
  const { permission = [] } = permissionOfModule;
  const isPermission = permission?.includes(action);
  return roleSa || isPermission;
};

export const isPermissionModule = (moduleName) => {
  const permissionList = getPermission();
  const existedModule = permissionList?.find((per) => per?.moduleName === moduleName);
  return existedModule;
}

export const isPermissionActionRoomMgt = (action) => {
  const roleSa = isRoleSa();
  const permissionOfModule = isPermissionModule(moduleNames.ROOM_MANAGEMENT);
  const { permission = [] } = permissionOfModule;
  const isPermission = permission?.includes(action);
  return roleSa || isPermission;
}

export const headerListPermission = [
  "#",
  "name",
  "code",
  "modules name",
  "actions",
];

export const colors = ["primary", "success", "warning", "danger", "info"];

export const handleDataPermission = (users = [], addFc, deleteFc) => {
  const data = [];
  for (const [index, value] of users.entries()) {
    const userName = `${value?.profile?.lastName} ${value?.profile?.middleName} ${value?.profile?.firstName}`;
    const permissions = value?.permissions?.map((per) => {
      return per?.moduleName;
    });
    const row = [];
    row.push(index + 1);
    row.push(userName);
    row.push(value?.profile?.code);
    row.push(
      <>
        {permissions?.map((item, index) => {
          return (
            <span key={index}>
              <Badge
                bg={colors[Math.floor(Math.random() * colors.length)]}
                className="text-black"
              >
                {item}
              </Badge>{" "}
            </span>
          );
        })}
      </>
    );
    row.push(
      <>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => addFc(value)}
        >
          <BsPencilSquare />
        </Button>{" "}
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => deleteFc(value)}
        >
          <BsTrash />
        </Button>
      </>
    );
    data.push(row);
  }
  return data;
};
