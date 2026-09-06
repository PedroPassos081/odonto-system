"use client";

import { Trash2 } from "lucide-react";
import { deletePatient } from "@/app/pacientes/actions";

type DeletePatientButtonProps = {
  id: string;
  patientName: string;
  className?: string;
};

export function DeletePatientButton({
  id,
  patientName,
  className,
}: DeletePatientButtonProps) {
  return (
    <form
      action={deletePatient.bind(null, id)}
      onSubmit={(event) => {
        if (
          !window.confirm(
            `Tem a certeza que quer excluir ${patientName}? Esta ação não pode ser desfeita.`
          )
        ) {
          event.preventDefault();
        }
      }}
    >
      <button type="submit" className={className}>
        <Trash2 size={15} />
        Excluir
      </button>
    </form>
  );
}
