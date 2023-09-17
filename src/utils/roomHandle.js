import { Button } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { isPermissionActionMgt, isRoleSa } from "./permissionHandle";
import { moduleNames, typePermissions } from "../constants/constant";

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

export const handleDataTable = (
  listRooms = [],
  updateFc,
  deleteFc,
  diviceFc
) => {
  const roleSa = isRoleSa();
  const permissionActionUpdate = isPermissionActionMgt(
    typePermissions.EDIT,
    moduleNames.ROOM_MANAGEMENT
  );
  const permissionActionDelete = isPermissionActionMgt(
    typePermissions.DELETE,
    moduleNames.ROOM_MANAGEMENT
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
      <Button
        variant="outline-primary"
        size="sm"
        onClick={() => diviceFc(value)}
      >
        View
      </Button>
    );
    row.push(
      <>
        <Button
          variant="outline-primary"
          size="sm"
          disabled={roleSa || permissionActionUpdate ? false : true}
          onClick={() => updateFc(value)}
        >
          <BsPencilSquare />
        </Button>{" "}
        <Button
          variant="outline-danger"
          size="sm"
          disabled={roleSa || permissionActionDelete ? false : true}
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
