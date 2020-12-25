import Axios from 'axios';
import { resolve } from 'path';
import * as Config from './config.json';
import { Race, RaceAPI, RaceResponse, RaceResults, RaceTable } from './types/Race';


export function GetLastRace(): Promise<RaceResponse> {
    return new Promise(async (resolve) => {
        const URL: string = `${Config.APIs}/current/last/results.json`;
        let APIresponse: RaceAPI = await Axios.get(URL);
        let Res: RaceResponse = {};
    
        if (APIresponse.data) {
            Res.Races = APIresponse.data.MRData.RaceTable.Races;
        } else {
            Res.err = "NO_DATA";
        }

        return resolve(Res);
    })
}

export function GetRace(Year: number, Round: number): Promise<RaceResponse> {
    return new Promise(async (resolve) => {
        const URL: string = `${Config.APIs}/${Year}/${Round}/results.json`;
        let APIresponse: RaceAPI = await Axios.get(URL);
        let Res: RaceResponse = {};
    
        if (APIresponse.data) {
            Res.Races = APIresponse.data.MRData.RaceTable.Races;
        } else {
            Res.err = "NO_DATA";
        }

        return resolve(Res);
    })
}

export function GetSchedules(Year: number): Promise<RaceResponse> {
    return new Promise(async (resolve) => {
        const URL: string = `${Config.APIs}/${Year}.json`;
        let APIresponse: RaceAPI = await Axios.get(URL);
        let Res: RaceResponse = {};
    
        if (APIresponse.data) {
            Res.Races = APIresponse.data.MRData.RaceTable.Races;
        } else {
            Res.err = "NO_DATA";
        }

        return resolve(Res);
    })
}

export function SortByPosition(Results: Array<RaceResults>): Array<RaceResults> {
    
    Results.sort((a, b) => {
        return parseInt(a.position) < parseInt(b.position)? -1 : parseInt(a.position) > parseInt(b.position)? 1 : 0;
    })

    return Results;
}