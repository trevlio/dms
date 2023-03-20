import { SignedIn, SignedOut, currentUser } from '@clerk/nextjs/app-beta';
import ManageAccountButton from './components/ManageAccountButton';
import SignInBtn from './components/SignInBtn';

export default async function Home() {
  const user = await currentUser();
  const fullName = `${user?.firstName} ${user?.lastName}`;
  return (
    <div>
      <h1 className="p-6">My name is Josh</h1>
      <h1>I like puppies!</h1>
      <SignedIn>
        <h1>You are currently signed in as {fullName}!</h1>
        <ManageAccountButton />
      </SignedIn>
      <SignedOut>
        <SignInBtn />
        <h1>You are currently signed out!</h1>
      </SignedOut>
    </div>
  );
}
