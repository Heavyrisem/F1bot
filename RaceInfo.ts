import * as Race from './APIs/Race';

interface Table {
    [index: string]: number,
    position: number,
    DriverName: number,
    Constructor: number,
    Time: number,
    points: number,
}

function Padding(string: string, num: number) {
    for (let i = string.length + 1; i < num; i++)
        string += " ";
    return string;
}

export function RaceInfo(Year?: number, Round?: number): Promise<string> {
    return new Promise(async (resolve, reject) => {
        let result;
        if (Year && Round) {
            result = await Race.GetRace(Year, Round);
        } else {
            result = await Race.GetLastRace();
        }
        
        if (result.Races?.length) {
            result.Races[0].Results = Race.SortByPosition(result.Races[0].Results);
            let tableShc: Table = { position: 10, DriverName: 25, Constructor: 20, Time: 15, points: 6 }
            let msg = '```swift\n';
            msg += `${result.Races[0].season} ${result.Races[0].raceName} (${result.Races[0].round} R) [${result.Races[0].date} ${result.Races[0].time.replace("Z","")}]\n`;
            msg += `${result.Races[0].Circuit.circuitName} ${(result.Races[0].Circuit.circuitName.indexOf("Circuit")==-1)? "Circuit": ""}\n\n`;
    
            let keys = Object.keys(tableShc);
            keys.forEach(key => {
                switch (key) {
                    case "position":
                        msg += Padding("Position", tableShc[key]);
                        break;
                    case "points":
                        msg += Padding("Points", tableShc[key]);
                        break;
                    default:
                        msg += Padding(key, tableShc[key]);
                }
            })
            msg += '\n\n';
    
    
            result.Races[0].Results.forEach(DriverRes => {
                keys.forEach(key => {
                    switch (key) {
                        case "DriverName":
                            msg += Padding(`${DriverRes.Driver.givenName} ${DriverRes.Driver.familyName}`, tableShc[key]);
                            break;
                        case "Constructor":
                            msg += Padding(DriverRes.Constructor.name, tableShc[key]);
                            break;
                        case "Time":
                            msg += Padding((DriverRes.Time) ? DriverRes.Time.time : DriverRes.status, tableShc[key]);
                            break;
                        default:
                            msg += Padding(DriverRes[key], tableShc[key]);
                    }
                })
                msg += '\n';
            });
            msg += '```';
            return resolve(msg);
        } else {
            return resolve(`\`\`데이터가 없습니다.\`\``);
        }
    })
}