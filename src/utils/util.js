export const calculateAge = (birthday) => {
    let ageDifMs = Date.now() - Date.parse(birthday);
    let ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}