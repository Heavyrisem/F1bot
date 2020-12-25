import * as Driver from './APIs/Driver';
import { DriverListResponse } from './APIs/types/Driver';

interface Table {
    [index: string]: number,

}

function Padding(string: string, num: number) {
    if (!string) string = "";
    for (let i = string.length + 1; i < num; i++)
        string += " ";
    return string;
}

export function GetDriverList(Year?: number): Promise<string> {
    return new Promise(async (resolve) => {
        let result: DriverListResponse = {};
        if (Year) {
            result = await Driver.GetAllDrivers(Year);
        } else {
            result = await Driver.GetAllDrivers(new Date().getFullYear());
        }
        
        if (result.Drivers?.length) {
            let tableShc: Table = { permanentNumber: 20, DriverName: 25, nationality: 15 }
            let msg = '```swift\n';
        //     msg += `${result.Races[0].season} ${result.Races[0].raceName} (${result.Races} R) [${result.Races[0].date} ${result.Races[0].time.replace("Z","")}]\n`;
        //     msg += `${result.Races[0].Circuit.circuitName} Circuit\n\n`;
            msg += `Driver List in ${result.Seasons} Season\n\n`;
    
            let keys = Object.keys(tableShc);
            keys.forEach(key => {
                switch (key) {
                    case "DriverName":
                        msg += Padding("DriverName", tableShc[key]);
                        break;
                    case "nationality":
                        msg += Padding("Nationality", tableShc[key]);
                        break;
                    case "permanentNumber":
                        msg += Padding("PermanentNumber", tableShc[key]);
                        break;
                    default:
                        msg += Padding(key, tableShc[key]);
                }
            })
            msg += '\n\n';
    
    
            result.Drivers.forEach(driver => {
                keys.forEach(key => {
                    switch (key) {
                        case "DriverName":
                            msg += Padding(`${driver.givenName} ${driver.familyName}`, tableShc[key]);
                            break;
                        case "Nationality":
                            msg += Padding(`${driver.nationality}`, tableShc[key]);
                            break;
                        case "PermanentNumber":
                            msg += Padding(`${driver.permanentNumber}`, tableShc[key]);
                            break;
                        default:
                            msg += Padding(driver[key], tableShc[key]);
                    }
                })
                msg += '\n';
            })
            msg += '```';
            return resolve(msg);
        } else {
            return resolve(`\`\`데이터가 없습니다.\`\``);
        }
    });
}