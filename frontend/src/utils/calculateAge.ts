const calculateAge = (birthdate: string): number => {
  try {
    const [year, month, day] = birthdate.split("/").map(Number);
    const birthDate = new Date(year, month - 1, day);
    if (isNaN(birthDate.getTime())) throw new Error("Invalid Date");
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  } catch (error) {
    return NaN;
  }
};

export default calculateAge;
