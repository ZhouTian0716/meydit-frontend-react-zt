import { ICategory } from "../api/resTypes";

export interface IProjectCardProps {
  id: number;
  slug: string;
  title: string;
  description?: string;
  startPrice: number;
  category: ICategory;
  client: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  maker?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  status: string;
  images: IImage[];
  tags: ITag[];
  createdAt: Date;
  updatedAt: Date;
}

interface IImage {
  url: string;
  fileName: string;
}

interface ITag {
  id: number;
  name: string;
}
