export const userRoles = {
  SUPPER_ADMIN: "SUPPER_ADMIN",
  ADMIN: "ADMIN",
};

export const routes = {
  home: "/home",
  login: "/login",
  blogMgt: "/blog-mgt",
  userMgt: "/user-mgt",
  permissionMgt: "/permission-mgt",
  roomMgt: "/room-mgt",
};

export const sessionFields = {
  user: "user",
  permissons: "permissions",
};

export const URL_STUDENT_SERVER = process.env.REACT_APP_API_STUDENT_URL;

export const moduleNames = {
  USER_MANAGEMENT: "Users Management",
  ROOM_MANAGEMENT: "Rooms Management",
  FACULTIES_MANAGEMENT: "Faculties Management",
  PERMISSION_MANAGEMENT: "Permission Management",
  SETTINGS: "Settings",
  AWARDS_MANAGEMENT: "Awards Management",
  BRANCH_MANAGEMENT: "Branch Management",
};

export const listModuleName = [
  {
    value: "Users Management",
    label: "Users Management",
  },
  {
    value: "Rooms Management",
    label: "Rooms Management",
  },
  {
    value: "Faculties Management",
    label: "Faculties Management",
  },
  {
    value: "Permission Management",
    label: "Permission Management",
  },
  {
    value: "Settings",
    label: "Settings",
  },
  {
    value: "Awards Management",
    label: "Awards Management",
  },
  {
    value: "Branch Management",
    label: "Branch Management",
  },
];

export const typeModals = {
  UPDATE_GENERAL: "UPDATE_GENERAL",
  UPDATE_PROFILE: "UPDATE_PROFILE",
  UPDATE_PASSWORD: "UPDATE_PASSWORD",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  ADD: "ADD",
  VIEW: "VIEW",
  IMPORT: "IMPORT",
  FILTER: "FILTER",
};

export const typePermissions = {
  ONLY_VIEW: "ONLY_VIEW",
  EDIT: "EDIT",
  DELETE: "DELETE",
  ADD: "ADD",
};

export const optionPermission = [
  {
    value: "ONLY_VIEW",
    label: "ONLY_VIEW",
  },
  {
    value: "EDIT",
    label: "EDIT",
  },
  {
    value: "DELETE",
    label: "DELETE",
  },
  {
    value: "ADD",
    label: "ADD",
  },
];
