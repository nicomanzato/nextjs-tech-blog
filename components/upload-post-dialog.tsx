"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { ArrowUpIcon } from "@/components/icons/arrow-up";
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
import { createRelatedPost } from "@/lib/api";
import { cn } from "@/lib/utils";

type Step = "form" | "uploading" | "success";

const formSchema = z.object({
  title: z.string().min(1, "Post title is required"),
  fileName: z.string().min(1, "Please upload an image"),
});
type FormValues = z.infer<typeof formSchema>;

const UploadPostDialog = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState<Step>("form");
  const [progress, setProgress] = React.useState(0);
  const [uploadError, setUploadError] = React.useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const fileRef = React.useRef<File | null>(null);
  const attemptRef = React.useRef(0);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", fileName: "" },
  });
  const fileName = watch("fileName");

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      attemptRef.current++;
      setStep("form");
      setUploadError("");
      fileRef.current = null;
      reset();
    }
  };

  const handleCancel = () => {
    attemptRef.current++;
    setStep("form");
    setUploadError("");
  };

  const onSubmit = async (values: FormValues) => {
    const attempt = ++attemptRef.current;
    setProgress(0);
    setUploadError("");
    setStep("uploading");

    const formData = new FormData();
    formData.append("title", values.title);
    if (fileRef.current) formData.append("image", fileRef.current);

    try {
      await createRelatedPost(formData, (percent) => {
        if (attemptRef.current === attempt) setProgress(percent);
      });
      if (attemptRef.current === attempt) setStep("success");
    } catch (err) {
      if (attemptRef.current === attempt) {
        setUploadError(err instanceof Error ? err.message : "Upload failed");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={cn("min-w-160")}>
        <div className="flex flex-col gap-6">
          {(step === "form" || step === "uploading") && (
            <>
              <DialogHeader className="gap-2 text-center">
                <DialogTitle className="font-heading text-[35px]">
                  Upload your post
                </DialogTitle>
                <DialogDescription className="text-text-icons-secondary text-lg pb-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse commodo libero.
                </DialogDescription>
              </DialogHeader>

              <div className="max-w-100 mx-auto w-full">
                <Input
                  placeholder="Post Title"
                  aria-invalid={!!errors.title}
                  {...register("title")}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div className="max-w-100 mx-auto w-full">
                {step === "form" ? (
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0] ?? null;
                      fileRef.current = file;
                      setValue("fileName", file?.name ?? "", {
                        shouldValidate: true,
                      });
                    }}
                  />
                ) : (
                  <div className="max-w-100 mx-auto w-full">
                    <p className="mb-2 text-sm font-medium">
                      {uploadError
                        ? "Failed to upload your file"
                        : `Loading image ${progress}%`}
                    </p>
                    <Progress
                      value={uploadError ? 100 : progress}
                      className={cn(
                        "h-2 rounded-none bg-text-icons-disabled",
                        uploadError
                          ? "[&>div]:bg-[#FF2F2F]"
                          : "[&>div]:bg-background-inverse",
                      )}
                    />
                    <button
                      type="button"
                      className="mt-2 block w-full text-right text-sm font-semibold underline"
                      onClick={
                        uploadError ? handleSubmit(onSubmit) : handleCancel
                      }
                    >
                      {uploadError ? "Retry" : "Cancel"}
                    </button>
                  </div>
                )}

                <Button
                  type="button"
                  variant="green-outline"
                  aria-invalid={!!errors.fileName}
                  className="w-full justify-center gap-2 aria-invalid:border-destructive"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {fileName || "Upload image"}{" "}
                  <ArrowUpIcon className="size-6" />
                </Button>
                {errors.fileName && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.fileName.message}
                  </p>
                )}
              </div>
              <DialogFooter className="mx-0 mb-0 justify-center border-none bg-transparent p-0 pt-6">
                <Button
                  variant="black"
                  className="mx-auto px-8.5"
                  disabled={step === "uploading"}
                  onClick={handleSubmit(onSubmit)}
                >
                  Confirm
                </Button>
              </DialogFooter>
            </>
          )}
        </div>

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
                className="h-12 rounded-none mx-auto"
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
};

export { UploadPostDialog };
