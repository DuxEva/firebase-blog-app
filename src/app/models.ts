export interface Blog {
  image?: string;
  title: string;
  content: string;
  user_id: string;
}

export interface BlogResponse {
  id: string;
  image?: string;
  title: string;
  content: string;
  user_id: string;
}

export interface CurrentUser {
  name: string;
  email: string;
  uid: string;
}

export interface UserInfo {
  email: string;
  password: string;
  name: string;
}
