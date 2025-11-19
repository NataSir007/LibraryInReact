
import { UserStatus, NotificationPreference, LibraryCardStatus, DebtStatus, DebtType } from './enums';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  status: UserStatus;
  notificationPreference: NotificationPreference;
  libraryCards: LibraryCard[];
  debtRecords: DebtRecord[];
}

export interface LibraryCard {
  id: string;
  userId: string;
  cardNumber: string;
  status: LibraryCardStatus;
  issueDate: Date;
  expiryDate?: Date;
  user?: User;
  debtRecords: DebtRecord[];
}

export interface DebtRecord {
  id: string;
  userId: string;
  libraryCardId: string;
  amount: number;
  status: DebtStatus;
  type: DebtType;
  dueDate?: Date;
  user?: User;
  libraryCard?: LibraryCard;
}
