export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-20">{children}</div>;
}
