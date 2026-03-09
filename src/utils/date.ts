export const formatDate = (iso: string | Date) =>
    new Date(iso).toLocaleDateString("he-IL", { day: "numeric", month: "numeric", year: "numeric" });