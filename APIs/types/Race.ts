import { Circuit } from "./Circuit";
import { Constructor } from "./Constructor";
import { DriverInfo } from "./Driver";
import { F1 } from "./F1";

export interface RaceAPI extends F1 {
    data: {
        MRData: {
            xmlns: string,
            series: 'f1',
            url: string,
            limit: number,
            offset: number,
            total: number,

            RaceTable: RaceTable
        }
    }
}
export interface RaceResponse {
    Races?: Array<Race> | undefined,
    err?: string | undefined
}

export interface RaceTable {
    season?: number,
    round?: number,
    Races: Array<Race>
}

export interface Race {
    season: number,
    round: number,
    url: string,
    raceName: string,
    Circuit: Circuit,
    date: string,
    time: string,
    Results: Array<RaceResults>
}

export interface RaceResults {
    [index: string]: any,
    number: number,
    position: string,
    positionText: number,
    points: number,
    Driver: DriverInfo,
    Constructor: Constructor,
    grid: number,
    laps: number,
    status: 'Finished' | string,
    Time: { millis: number, time: string },
    FastestLap: {
        rank: number,
        lap: number,
        Time: { time: string },
        AverageSpeed: { units: 'kph' | string, speed: number }
    }
}