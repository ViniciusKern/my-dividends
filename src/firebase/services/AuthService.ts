import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateCurrentUser,
  updateProfile,
  User,
} from 'firebase/auth';
import { auth } from '../firebase-config';

const ERROR_MESSAGES: { [key: string]: string } = {
  'auth/user-not-found': 'User not found!',
  'auth/email-already-in-use': 'Email already in use!',
  'auth/wrong-password': 'Incorrect email or password',
};

class AuthService {
  async login(email: string, password: string): Promise<User | undefined> {
    try {
      return (await signInWithEmailAndPassword(auth, email, password)).user;
    } catch (error) {
      this.handleError(error);
    }
  }

  async registerNewUser(name: string, email: string, password: string): Promise<User | undefined> {
    try {
      const newUser = (await createUserWithEmailAndPassword(auth, email, password)).user;
      await updateProfile(newUser, { displayName: name });
      await updateCurrentUser(auth, newUser);

      return newUser;
    } catch (error) {
      this.handleError(error);
    }
  }

  async logout() {
    await signOut(auth);
  }

  onLoggedUserChange(setUser: (user: User | null) => void) {
    return onAuthStateChanged(auth, currentUser => setUser(currentUser));
  }

  private handleError(error: any) {
    let message = 'Unknown Error';

    if (error instanceof FirebaseError) {
      message = ERROR_MESSAGES[(error as FirebaseError).code] || String(error);
    }

    throw new Error(message);
  }
}

export default new AuthService();
