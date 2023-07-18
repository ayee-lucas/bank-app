import { Diamond } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen grid place-items-center">
      <Diamond
        className="animate-spin duration-[3s] text-violet-400"
        size={48}
      />
    </div>
  );
}
