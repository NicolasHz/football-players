export const calculateAge = (birthday) => {
    let ageDifMs = Date.now() - Date.parse(birthday);
    let ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export const findPlayers = (players, player) => {
    return players.filter(x => {
        return (calculateAge(x.dateOfBirth).toString() === player.age 
        && new RegExp('/' + player.name + '/gmi').test(x.name))
        || x.position === player.position;
    });
}