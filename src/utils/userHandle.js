import { Button } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { moduleNames, typePermissions } from "../constants/constant";
import { isPermissionActionMgt } from "./permissionHandle";

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

export const userStatusOption = [
  {
    value: "ACTIVE",
    label: "ACTIVE",
  },
  {
    value: "INACTIVE",
    label: "INACTIVE",
  },
];

export const headerTable = [
  "#",
  "name",
  "email",
  "code",
  "status",
  "role",
  "award",
  "actions",
];

export const handleDataTable = (listUsers = [], updateFc, deleteFc) => {
  const data = [];
  for (const [index, value] of listUsers.entries()) {
    const row = [];
    const name = `${value?.profile?.lastName} ${value?.profile?.middleName} ${value?.profile?.firstName}`;
    row.push(index + 1);
    row.push(name);
    row.push(value?.email);
    row.push(value?.profile?.code);
    row.push(value?.status?.toLowerCase());
    row.push(value?.role?.toLowerCase());
    row.push(
      <Button variant="outline-primary" size="sm">
        View
      </Button>
    );
    row.push(
      <>
        <Button
          variant="outline-primary"
          size="sm"
          disabled={
            isPermissionActionMgt(
              typePermissions.EDIT,
              moduleNames.USER_MANAGEMENT
            )
              ? false
              : true
          }
          onClick={() => updateFc(value)}
        >
          <BsPencilSquare />
        </Button>{" "}
        <Button
          variant="outline-danger"
          size="sm"
          disabled={
            isPermissionActionMgt(
              typePermissions.DELETE,
              moduleNames.USER_MANAGEMENT
            )
              ? false
              : true
          }
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
