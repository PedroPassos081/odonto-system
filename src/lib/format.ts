export function formatCurrency(value: number) {
  return `€${value.toFixed(2).replace(".", ",")}`;
}

export function formatDateBR(date: string | null | undefined) {
  if (!date) {
    return "Não informado";
  }

  const [year, month, day] = date.split("-");

  if (!year || !month || !day || [year, month, day].some((part) => Number.isNaN(Number(part)))) {
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

export function calculateAge(birthDate: string | null, referenceDate = new Date()) {
  if (!birthDate) {
    return "Idade não informada";
  }

  const birth = new Date(birthDate);

  let age = referenceDate.getFullYear() - birth.getFullYear();

  const hasBirthdayPassedThisYear =
    referenceDate.getMonth() > birth.getMonth() ||
    (referenceDate.getMonth() === birth.getMonth() &&
      referenceDate.getDate() >= birth.getDate());

  if (!hasBirthdayPassedThisYear) {
    age -= 1;
  }

  if (Number.isNaN(age)) {
    return "Idade não informada";
  }

  return `${age} anos`;
}
