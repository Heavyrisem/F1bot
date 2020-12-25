import Axios from 'axios';
import * as Config from './config.json';
import './types/Driver';
import * as Driver from './types/Driver';



export function GetAllDrivers(Year: number): Promise<Driver.DriverListResponse> {
    return new Promise(async (resolve) => {

        const URL: string = `${Config.APIs}/${Year}/drivers.json`;
        let APIresponse: Driver.DriverAPI = await Axios.get(URL);
        let Res: Driver.DriverListResponse;

        if (APIresponse.data) {
            return resolve({ Seasons: APIresponse.data.MRData.DriverTable.season, Drivers: APIresponse.data.MRData.DriverTable.Drivers });
        } else {
            return resolve({ err: "NO_DATA" });
        }
    })
}

export async function GetDriverInfo(DriverID: string) {
    const URL: string = `${Config.APIs}/drivers/${DriverID}.json`;
    let APIresponse: Driver.DriverAPI = await Axios.get(URL);
    console.log(APIresponse.data.MRData.DriverTable);
}

