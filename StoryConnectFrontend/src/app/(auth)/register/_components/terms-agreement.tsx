import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

const LINK_CLASSES =
  "text-ink underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-accent";

export function TermsAgreement() {
  return (
    <div className="pb-1.5">
      <Checkbox
        name="terms"
        required
        label={
          <span>
            I agree to the{" "}
            <Link href="/terms" className={LINK_CLASSES}>
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className={LINK_CLASSES}>
              Privacy Policy
            </Link>
          </span>
        }
      />
    </div>
  );
}
