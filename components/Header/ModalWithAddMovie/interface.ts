export interface IFormValues {
  title: string;
  year: string;
  description: string;
  poster: string;
  transliterate: string;
  actors?: string[],
  countRate: number,
  rate: number
}

export interface IFile {
  uid: string;
  lastModified: number;
  lastModifiedDate: string;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}