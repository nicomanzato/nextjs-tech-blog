import * as React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputWithButton } from "@/components/ui/input-with-button";
import { TextField } from "@/components/ui/text-field";
import { UploadPostDialog } from "@/components/upload-post-dialog";
import { CardBlock } from "@/components/card-block";
import type { CardProps } from "@/components/ui/card";
import { HeaderPlaceholder } from "@/components/header-placeholder";
import { cn } from "@/lib/utils";

const variants = ["primary", "secondary", "black", "green-outline"] as const;

const variantLabels: Record<(typeof variants)[number], string> = {
  primary: "Primary",
  secondary: "Secondary",
  black: "Black",
  "green-outline": "Green outline",
};

const STATE_PREFIXES = {
  hover: "hover:",
  focus: "focus-visible:",
  active: "active:",
  disabled: "disabled:",
} as const;

// Static (non-pseudo) classes from buttonVariants — every hover:/focus-visible:/
// active:/disabled: class stripped out, so the swatch below has nothing for a
// real hover/click to trigger.
const baseClassName = (variant: (typeof variants)[number]) =>
  buttonVariants({ variant })
    .split(/\s+/)
    .filter((cls) => !/^[a-z-]+:/.test(cls))
    .join(" ");

// Forces a state to render without real interaction by pulling the matching
// hover:/focus-visible:/active:/disabled: classes straight out of
// buttonVariants (components/ui/button.tsx) and stripping the prefix — so
// this table can never drift out of sync with the component's real styles.
const forcedStateClassName = (
  variant: (typeof variants)[number],
  state: "hover" | "focus" | "active" | "disabled",
) => {
  const prefix = STATE_PREFIXES[state];
  return buttonVariants({ variant })
    .split(/\s+/)
    .filter((cls) => cls.startsWith(prefix))
    .map((cls) => cls.slice(prefix.length))
    .join(" ");
};

const states = ["default", "hover", "focus", "active", "disabled"] as const;

// Hover/focus require a pointer device, so they don't apply on mobile/touch.
const appliesOnMobile = (state: (typeof states)[number]) =>
  state !== "hover" && state !== "focus";

// Renders a static look-alike (not a real <button>) so viewing this table and
// actually hovering/clicking a swatch can't change it off its labeled state.
const ButtonSwatch = ({
  variant,
  state,
}: {
  variant: (typeof variants)[number];
  state: (typeof states)[number];
}) => {
  const stateClasses =
    state === "default" ? "" : forcedStateClassName(variant, state);
  return (
    <span className={cn(baseClassName(variant), stateClasses)}>Large</span>
  );
};

const sampleCard: CardProps = {
  image: "/placeholder-card.svg",
  imageAlt: "Security operation",
  badge: "Security",
  title: "A Global Police Operation Just Took Down the Notorious LockBit",
  meta: "6 mins",
  href: "#",
};

const DesignSystem = () => {
  return (
    <>
      <HeaderPlaceholder />
      <main className="mx-auto flex max-w-[1600px] flex-col gap-12 p-10 bg-white w-full">
        <section>
          <h1 className="mb-6 text-xl font-bold">Buttons</h1>
          <table className="border-separate border-spacing-4 text-center">
            <thead>
              <tr>
                <th />
                {variants.map((variant) => (
                  <th
                    key={variant}
                    colSpan={2}
                    className="border-b pb-2 text-xs font-normal text-muted-foreground"
                  >
                    {variantLabels[variant]} Variant
                  </th>
                ))}
              </tr>
              <tr>
                <th />
                {variants.map((variant) => (
                  <React.Fragment key={variant}>
                    <th className="pb-2 text-xs font-normal text-muted-foreground">
                      Desktop
                    </th>
                    <th className="pb-2 text-xs font-normal text-muted-foreground">
                      Mobile
                    </th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody>
              {states.map((state) => (
                <tr key={state}>
                  <td className="pr-4 text-left text-xs capitalize text-muted-foreground">
                    {state}
                  </td>
                  {variants.map((variant) => (
                    <React.Fragment key={variant}>
                      <td>
                        <ButtonSwatch variant={variant} state={state} />
                      </td>
                      <td>
                        {appliesOnMobile(state) && (
                          <ButtonSwatch variant={variant} state={state} />
                        )}
                      </td>
                    </React.Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h1 className="mb-6 text-xl font-bold">Text inputs</h1>
          <div className="grid max-w-md gap-4">
            <Input placeholder="Placeholder" />
            <TextField label="Label" defaultValue="Pla" />
            <TextField
              label="Label"
              error="Help Text"
              defaultValue="Placeholder"
            />
            <Input placeholder="Placeholder" disabled />
            <InputWithButton placeholder="Placeholder" buttonText="Large" />
          </div>
        </section>

        <section>
          <h1 className="mb-6 text-xl font-bold">Card block</h1>
          <CardBlock cards={[sampleCard, sampleCard, sampleCard]} />
        </section>

        <section>
          <h1 className="mb-6 text-xl font-bold">Upload post dialog</h1>
          <UploadPostDialog>
            <Button variant="primary">Upload your post</Button>
          </UploadPostDialog>
        </section>
      </main>
    </>
  );
};

export default DesignSystem;
