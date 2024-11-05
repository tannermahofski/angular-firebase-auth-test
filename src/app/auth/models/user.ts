import { User } from '@angular/fire/auth';

export class CustomUser {
  constructor(
    public displayName: string | null,
    public email: string | null,
    public phoneNumber: string | null,
    public photoUrl: string | null,
    public providerId: string | null,
    public uid: string | null
  ) {}

  static fromFirebaseUser(user: User): CustomUser {
    return new CustomUser(
      user.displayName,
      user.email,
      user.phoneNumber,
      user.photoURL,
      user.providerId,
      user.uid
    );
  }
}
