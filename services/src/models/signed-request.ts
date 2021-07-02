export interface SignedRequest<T> {
    signedResult: string;
    signedData: string;
    rawData: T;
}