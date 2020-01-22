export interface User {
  uid: string;
  displayName: string;
  photoURL: string;
}
export interface Message {
  displayName: string;
  message: string;
  id: string;
  imageUrl: string;
  uid: string;
  timeStamp: string;
  isAuthor: boolean;
}
