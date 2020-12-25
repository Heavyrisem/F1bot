export interface Circuit {
    circuitId: string,
    url: string,
    circuitName: string,
    Location: {
        lat: number,
        long: number,
        locality: string,
        country: string
    }
}