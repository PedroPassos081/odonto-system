export function formatCurrency(value: number) {
  return `€${value.toFixed(2).replace(".", ",")}`;
}

export function formatDateBR(date: string | null | undefined) {
  if (!date) {
    return "Não informado";
  }

  const [year, month, day] = date.split("-");

  if (!year || !month || !day) {
    return "Não informado";
  }

  return `${day}/${month}/${year}`;
}

export function formatIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
