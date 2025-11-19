export const UserStatus = {
  Active: 0,
  Inactive: 1,
  Suspended: 2
} as const;
export type UserStatus = typeof UserStatus[keyof typeof UserStatus];

export const NotificationPreference = {
  Email: 0,
  SMS: 1,
  Both: 2,
  None: 3
} as const;
export type NotificationPreference = typeof NotificationPreference[keyof typeof NotificationPreference];

export const LibraryCardStatus = {
  Active: 0,
  Expired: 1,
  Blocked: 2
} as const;
export type LibraryCardStatus = typeof LibraryCardStatus[keyof typeof LibraryCardStatus];

export const DebtStatus = {
  Pending: 0,
  Paid: 1,
  Overdue: 2
} as const;
export type DebtStatus = typeof DebtStatus[keyof typeof DebtStatus];  

export const DebtType = {
  LateFee: 0,
  LostItem: 1,
  DamagedItem: 2
} as const;
export type DebtType = typeof DebtType[keyof typeof DebtType];