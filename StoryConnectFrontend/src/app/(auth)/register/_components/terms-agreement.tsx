import { Checkbox } from "@/components/ui/checkbox";
import { TextLink } from "@/components/ui/text-link";

export function TermsAgreement() {
  return (
    <div className="pb-1.5">
      <Checkbox
        name="terms"
        required
        label={
          <span>
            I agree to the{" "}
            <TextLink href="/terms" tone="ink">
              Terms
            </TextLink>{" "}
            and{" "}
            <TextLink href="/privacy" tone="ink">
              Privacy Policy
            </TextLink>
          </span>
        }
      />
    </div>
  );
}
