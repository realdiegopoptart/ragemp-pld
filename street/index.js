let street = mp.browsers.new("package://street/index.html");
let player = mp.players.local;
const updateInterval = 500; // milliseconds, lower value = more accurate, at the cost of performance

let getStreet;
let streetName;
let crossingName;
let zoneName;
let direction;

setInterval(() => {
    getStreet = mp.game.pathfind.getStreetNameAtCoord(player.position.x, player.position.y, player.position.z, 0, 0);
    // Returns obj {"streetName": hash, crossingRoad: hash}

    streetName = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);
    crossingName = mp.game.ui.getStreetNameFromHashKey(getStreet.crossingRoad);
    // Returns string, if exist

    zoneName = mp.game.gxt.get(mp.game.zone.getNameOfZone(player.position.x, player.position.y, player.position.z));

    let heading = player.getHeading();
    if(player.heading != 0)
    {
        if(heading < 45 || heading > 315)
        {
            direction = "N";
        }
        if(heading > 45 && heading < 135)
        {
            direction = "W";
        }
        if(heading > 135 && heading < 225)
        {
            direction = "S";
        }
        if(heading > 225 && heading < 315)
        {
            direction = "E";
        }
    }
}, updateInterval);

mp.events.add('render', () => {
    let crossing;
    if(crossingName != "") { crossing = `/ ${crossingName}`; } else { crossing = ""; }
    street.execute(`update('${streetName}', '${crossing}', '${zoneName}', '${direction}');`);
});