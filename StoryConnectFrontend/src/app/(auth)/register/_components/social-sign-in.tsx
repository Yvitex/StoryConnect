import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/ui/icons/github-icon";
import { GoogleIcon } from "@/components/ui/icons/google-icon";

export function SocialSignIn() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button variant="secondary">
        <GoogleIcon className="size-[18px]" />
        Google
      </Button>
      <Button variant="secondary">
        <GithubIcon className="size-[18px]" />
        GitHub
      </Button>
    </div>
  );
}
