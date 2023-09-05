import { Badge, Button } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs";

export const headerListPermission = [
  "#",
  "name",
  "code",
  "modules name",
  "actions",
];

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
            <Badge key={index} variant="primary">
              {item}
            </Badge>
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
