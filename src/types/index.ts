export interface HeaderContentType {
  main: string;
  sub: string;
}

export interface TabType {
  tab: string;
  path: string;
}

export interface UploadedFileType {
  file: File;
  name: string;
}

export type CategoryType = '퀴즈' | '요약';

export interface CategoryInfoType {
  id: number;
  name: string;
}
