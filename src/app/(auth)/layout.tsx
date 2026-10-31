export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-full flex-1 items-center justify-center p-6">
      {children}
    </div>
  );
}
