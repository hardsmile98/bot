interface IUser {
  userId: string
  firstName: string
  lastName?: string
  userName?: string
  chatId: string
}

interface ICheckPaid {
  isPaid: boolean
}

interface IFile {
  title: string
  price: string
  downloadUrl: string
}

export type {
  IUser,
  ICheckPaid,
  IFile
}
