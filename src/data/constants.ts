export const toastErrorMessages = {
  emptyFile:
    "At least one image is required to post a project, please try again.",
  tokenLost: "Project create fail due to login status lost.",
  uploadIssue: "File upload failed, contact technical support.",
  deleteIssue: "File delete failed, contact technical support.",
  requiredFields: "Fields marked with * are required!",
};

export enum Roles {
  CLIENT = 1,
  MAKER = 2,
  ADMIN = 3,
  DEVELOPER = 4,
  CEO = 5,
}