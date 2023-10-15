export interface IFormValues {
  title: string;
  year: string;
  description: string;
  actors?: string[]
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