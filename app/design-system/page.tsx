import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputWithButton } from "@/components/ui/input-with-button";
import { TextField } from "@/components/ui/text-field";
import { UploadPostDialog } from "@/components/upload-post-dialog";
import { CardBlock } from "@/components/card-block";
import type { CardProps } from "@/components/ui/card";
import { HeaderPlaceholder } from "@/components/header-placeholder";

const variants = ["primary", "secondary", "black", "green-outline"] as const;

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
      <main className="mx-auto flex max-w-5xl flex-col gap-12 p-10 bg-white w-full">
        <section>
          <h1 className="mb-6 text-xl font-bold">Buttons</h1>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {variants.map((variant) => (
              <div key={variant} className="flex flex-col gap-2">
                <span className="text-xs text-muted-foreground">{variant}</span>
                <Button variant={variant}>Large</Button>
                <Button variant={variant} disabled>
                  Large
                </Button>
              </div>
            ))}
          </div>
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
