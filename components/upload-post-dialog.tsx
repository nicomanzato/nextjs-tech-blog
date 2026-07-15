"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

type Step = "form" | "uploading" | "success";

const cardClassName =
  "gap-6 rounded-none border-2 border-border-inverse bg-background-brand p-8 text-text-icons-primary shadow-[8px_8px_0_var(--neutral-900)] sm:max-w-md";
const buttonFieldClassName = "h-12 rounded-none border-2 border-border-inverse bg-background-surface";

export function UploadPostDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState<Step>("form");
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (step !== "uploading") return;
    const id = setInterval(() => {
      setProgress((current) => {
        const next = current + 10;
        if (next >= 100) {
          clearInterval(id);
          setStep("success");
          return 100;
        }
        return next;
      });
    }, 200);
    return () => clearInterval(id);
  }, [step]);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) setStep("form");
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={cardClassName}>
        {step === "form" && (
          <>
            <DialogHeader className="gap-2">
              <DialogTitle className="font-heading text-2xl font-bold">
                Upload your post
              </DialogTitle>
              <DialogDescription className="text-text-icons-primary/70">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse commodo libero.
              </DialogDescription>
            </DialogHeader>
            <Input placeholder="Post Title" />
            <Button
              variant="secondary"
              className={`${buttonFieldClassName} w-full justify-between font-normal text-text-icons-primary hover:bg-background-brand`}
            >
              Upload image <ArrowUp className="size-4" />
            </Button>
            <DialogFooter className="mx-0 mb-0 justify-center border-none bg-transparent p-0">
              <Button
                variant="black"
                className="h-12 rounded-none"
                onClick={() => {
                  setProgress(0);
                  setStep("uploading");
                }}
              >
                Confirm
              </Button>
            </DialogFooter>
          </>
        )}

        {step === "uploading" && (
          <>
            <DialogHeader className="gap-2">
              <DialogTitle className="font-heading text-2xl font-bold">
                Upload your post
              </DialogTitle>
              <DialogDescription className="text-text-icons-primary/70">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse commodo libero.
              </DialogDescription>
            </DialogHeader>
            <Input placeholder="Post Title" readOnly />
            <div>
              <p className="mb-2 text-sm font-medium">
                Loading image {progress}%
              </p>
              <Progress
                value={progress}
                className="h-2 rounded-none bg-background-surface [&>div]:bg-background-inverse"
              />
              <button
                type="button"
                className="mt-2 block w-full text-right text-sm font-semibold underline"
                onClick={() => setStep("form")}
              >
                Cancel
              </button>
            </div>
            <DialogFooter className="mx-0 mb-0 justify-center border-none bg-transparent p-0">
              <Button variant="black" className="h-12 rounded-none" disabled>
                Confirm
              </Button>
            </DialogFooter>
          </>
        )}

        {step === "success" && (
          <>
            <DialogHeader>
              <DialogTitle className="font-heading text-center text-2xl font-bold">
                Your post was successfully uploaded!
              </DialogTitle>
            </DialogHeader>
            <DialogFooter className="mx-0 mb-0 justify-center border-none bg-transparent p-0">
              <Button
                variant="black"
                className="h-12 rounded-none"
                onClick={() => handleOpenChange(false)}
              >
                Done
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
