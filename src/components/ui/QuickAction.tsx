import { LucideIcon } from "lucide-react";

type QuickActionProps = {
  label: string;
  icon: LucideIcon;
  active?: boolean;
};

export function QuickAction({ label, icon: Icon, active }: QuickActionProps) {
  return (
    <button
      className={`flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left text-sm transition ${
        active
          ? "bg-[#E8F5FB] text-[#2E91BD]"
          : "bg-white text-[#12384D] hover:bg-[#F0FAFE]"
      }`}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#B5E0FB] text-[#2E91BD]">
        <Icon size={20} />
      </span>

      {label}
    </button>
  );
}