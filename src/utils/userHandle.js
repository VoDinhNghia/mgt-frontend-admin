import { Button } from "react-bootstrap";
import { BsPlusCircle, BsPencilSquare, BsTrash } from "react-icons/bs";

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
        <Button variant="outline-primary" size="sm">
          <BsPlusCircle />
        </Button>{" "}
        <Button variant="outline-primary" size="sm">
          <BsPencilSquare />
        </Button>{" "}
        <Button variant="outline-danger" size="sm">
          <BsTrash />
        </Button>
      </>
    );
    data.push(row);
  }
  return data;
};
