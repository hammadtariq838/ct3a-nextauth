import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

export default function Home() {
  return (
    <LoginButton asChild>
      <Button variant="secondary" size="lg">
        Sign in
      </Button>
    </LoginButton>
  )
}
