export interface Blog {
  image?: string;
  title: string;
  content: string;
  userId: string;
  userName: string;
  userEmail: string;
  comments?: Comment[];
}

export interface BlogResponse {
  id: string;
  image?: string;
  title: string;
  content: string;
  userId: string;
  userName: string;
  userEmail: string;
  comments?: Comment[];
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

export interface Comment {
  username: string;
  comment: string;
}
