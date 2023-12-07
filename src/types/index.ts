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

export interface CreateUserQuizInput {
  input: string;
  check: boolean;
}
