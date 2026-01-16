type Role = "expert1" | "expert2" | "manager";

type Admin = {
  name: string;
  phone: string;
  role: Role;
};

export type TDataAdmins = Admin[];

