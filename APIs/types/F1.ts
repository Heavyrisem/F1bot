import { AxiosResponse } from "axios";

export interface F1 extends AxiosResponse {
    data: {
        MRData?: {
            xmlns?: string,
            series?: 'f1',
            url?: string,
            limit?: number,
            offset?: number,
            total?: number,

            DriverTable?: any,
            RaceTable?: any
        }
    }
}