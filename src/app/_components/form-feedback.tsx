type FormFeedbackProps = {
  state: { success: boolean; message: string } | null;
  // "default": light background (contact form errors)
  // "inverted": dark background (freebie/signup forms)
  variant?: "default" | "inverted";
};

export function FormFeedback({ state, variant = "default" }: FormFeedbackProps) {
  if (!state?.message) return null;

  if (state.success) {
    const className =
      variant === "inverted"
        ? "text-white bg-white/10 rounded-xs px-6 py-4 text-center"
        : "bg-green-50 border border-green-200 rounded-xs p-4 text-green-700 text-sm text-center";
    return <p className={className}>{state.message}</p>;
  }

  const className =
    variant === "inverted"
      ? "text-red-300 text-sm text-center"
      : "bg-red-50 border border-red-200 rounded-xs p-4 text-red-700 text-sm";
  return <p className={className}>{state.message}</p>;
}
