import { Button } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { isPermissionActionRoomMgt, isRoleSa } from "./permissionHandle";
import { typePermissions } from "../constants/constant";

export const roomOptions = [
  {
    value: "CLASS_ROOM",
    label: "CLASS_ROOM",
  },
  {
    value: "MEETING",
    label: "MEETING",
  },
  {
    value: "GROUP_STUDY",
    label: "GROUP_STUDY",
  },
  {
    value: "LIBRARIAN",
    label: "LIBRARIAN",
  },
  {
    value: "OFFICE_DEPARTMENT",
    label: "OFFICE_DEPARTMENT",
  },
];

export const headerTable = [
  "#",
  "name",
  "type",
  "capacity",
  "description",
  "divice",
  "actions",
];

export const handleDataTable = (listRooms = []) => {
  const roleSa = isRoleSa();
  const permissionActionUpdate = isPermissionActionRoomMgt(
    typePermissions.EDIT
  );
  const permissionActionDelete = isPermissionActionRoomMgt(
    typePermissions.DELETE
  );
  const data = [];
  for (const [index, value] of listRooms.entries()) {
    const row = [];
    row.push(index + 1);
    row.push(value?.name);
    row.push(value?.type?.toLowerCase());
    row.push(value?.capacity);
    row.push(value?.description);
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
          disabled={roleSa || permissionActionUpdate ? false : true}
        >
          <BsPencilSquare />
        </Button>{" "}
        <Button
          variant="outline-danger"
          size="sm"
          disabled={roleSa || permissionActionDelete ? false : true}
        >
          <BsTrash />
        </Button>
      </>
    );
    data.push(row);
  }
  return data;
};
