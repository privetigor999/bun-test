import { IFormValues } from "@/components/Header/ModalWithAddMovie/interface";

export interface IMovie extends IFormValues {
  id: string;
  comments: IComment[];
}

export interface IComment {
  name: string;
  text: string;
  photoUrl: string;
  timestamp: string;
  id: string;
  message: string;
}