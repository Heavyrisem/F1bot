import { AxiosResponse } from "axios";
import { F1 } from "./F1";

export interface DriverAPI extends AxiosResponse {
    data: {
        MRData: {
            xmlns: string,
            series: 'f1',
            url: string,
            limit: number,
            offset: number,
            total: number,
            DriverTable: {
                season?: number,
                Drivers: Array<Driver>
            }
        }
    }
}
export interface Driver {
    [index: string]: any,
    driverId: string,
    permanentNumber: number,
    code: string,
    givenName: string,
    familyName: string,
    dateOfBirth: string,
    nationality: string
}

export interface DriverListResponse {
    Seasons?: number,
    Drivers?: Array<Driver>,
    err?: string
}

export interface DriverInfo extends Driver{
    url: string
}

export interface DriverInfoResponse {
}