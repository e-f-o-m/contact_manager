export interface User {
  user_id?: number;
  username?: string;
  email?: string;
  password?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Contact {
  contact_id?: number;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  email?: string;
  address?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
  user_id?: number;
  tags?: Tag[];
  groups?: Group[];
}

export interface Group {
  group_id?: number;
  group_name?: string;
  created_at?: string;
  updated_at?: string;
  user_id?: number;
}

export interface Tag {
  tag_id?: number;
  tag_name?: string;
  created_at?: string;
  updated_at?: string;
}
