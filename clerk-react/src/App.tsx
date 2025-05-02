import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

export default function App() {
  return (
    <div className="navbar">
      <div className="nav-content">
        <div className="logo">
          <h1>MetaRealFi</h1>
        </div>
        <div className="auth-buttons">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  )
}