import { Button } from "react-bootstrap";
import { BsPlusCircle, BsPencilSquare, BsTrash } from "react-icons/bs";
import { getCurrentUser, getPermission } from "../services/authService";
import { moduleNames, typePermissions, userRoles } from "../constants/constant";

export const optionGender = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
];

export const userRoleOption = [
  {
    value: "ADMIN",
    label: "ADMIN",
  },
  {
    value: "STUDENT",
    label: "STUDENT",
  },
  {
    value: "LECTURER",
    label: "LECTURER",
  },
  {
    value: "LIBRARIAN",
    label: "LIBRARIAN",
  },
  {
    value: "ACCOUNTANT",
    label: "ACCOUNTANT",
  },
  {
    value: "STAFF",
    label: "STAFF",
  },
];

export const headerTable = [
  "#",
  "name",
  "email",
  "code",
  "role",
  "award",
  "actions",
];

export const handleDataTable = (listUsers = []) => {
  const currentUser = getCurrentUser();
  const permissionList = getPermission();
  const permissionOfModule = permissionList?.find(
    (per) => per?.moduleName === moduleNames.USER_MANAGEMENT
  );
  const { permission = [] } = permissionOfModule;
  const checkRoleSA = currentUser?.role === userRoles.SUPPER_ADMIN;
  const data = [];
  for (const [index, value] of listUsers.entries()) {
    const row = [];
    const name = `${value?.profile?.lastName} ${value?.profile?.middleName} ${value?.profile?.firstName}`;
    row.push(index + 1);
    row.push(name);
    row.push(value?.email);
    row.push(value?.profile?.code);
    row.push(value?.role);
    row.push("no");
    row.push(
      <>
        <Button
          variant="outline-primary"
          size="sm"
          disabled={
            checkRoleSA || permission?.includes(typePermissions.ADD)
              ? false
              : true
          }
        >
          <BsPlusCircle />
        </Button>{" "}
        <Button
          variant="outline-primary"
          size="sm"
          disabled={
            checkRoleSA || permission?.includes(typePermissions.EDIT)
              ? false
              : true
          }
        >
          <BsPencilSquare />
        </Button>{" "}
        <Button
          variant="outline-danger"
          size="sm"
          disabled={
            checkRoleSA || permission?.includes(typePermissions.DELETE)
              ? false
              : true
          }
        >
          <BsTrash />
        </Button>
      </>
    );
    data.push(row);
  }
  return data;
};
