import { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
};

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="rounded-3xl border border-[#D8EDF8] bg-white p-7 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-[#60758A]">
            {title}
          </p>

          <p className="mt-6 text-4xl font-light text-[#0F2F44]">{value}</p>

          <p className="mt-2 text-sm text-[#60758A]">{description}</p>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#B5E0FB] text-[#2E91BD]">
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}