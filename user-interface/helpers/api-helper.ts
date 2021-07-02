import { usePersistentStorage } from "../hooks/use-local-storage.hooks";

const Web3 = require("web3");

export class ApiHelper {

    static async signAndProcessRequestData(request: any, userAddress: string) {
        try {
            if(!userAddress) {
                throw "There was no user signed in";
            }

            // TODO : Share web3 instance
            const signedData = JSON.stringify(request);
            const web3 = new Web3((window as any).ethereum);
            const signedResult = await web3.eth.personal.sign(signedData, userAddress);
            
            return {
              signedResult,
              signedData,
              rawData: request,
            };
        } catch (error) {
            throw error;
        }
    }

    static getSignedPayload(signedData, signedResult, request: any) {
        return {
            signedResult,
            signedData,
            rawData: request,
        };
    }

}
