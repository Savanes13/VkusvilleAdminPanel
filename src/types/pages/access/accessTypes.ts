export type TAdminRole = "expert1" | "expert2" | "manager";

type Admin = {
  name: string;
  phone: string;
  role: TAdminRole;
};

export type TDataAdmins = Admin[];

type AdminAccess = {
  name: string;
  email: string;
  role: TAdminRole;
};

export type TDataAdminsAccess = AdminAccess[];

type TokenItem = {
  id: number;
  token: string;
  is_used: boolean;
  created_at: string;
  role: string;
};

export type TDataTokenAccess = TokenItem[];

type AdminAdminsAccess = {
  id: number;
  email: string;
  role: string;
  display_name: string;
};

export type TDataAdminAdminsAccess = AdminAdminsAccess[];