export type TAdminRole = "expert1" | "expert2" | "manager";

type Admin = {
  name: string;
  phone: string;
  role: TAdminRole;
};

export type TDataAdmins = Admin[];

