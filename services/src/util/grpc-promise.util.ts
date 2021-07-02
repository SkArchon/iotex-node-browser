const {performance} = require('perf_hooks');

export class GrpcPromiseUtil {

  // TODO : Refactor
  public static async getServerMeta(client): Promise<any> {
    const t1 = performance.now();
    return new Promise((resolve, reject) => {
      client.getServerMeta({}, function(err, response) {
          if(err) {
            reject(err);
            return;
          }
          // We want to measure the response timing as well
          const t2 = performance.now();
          resolve({ response, requestDuration: (t2 - t1) });
      });
    });
  }

  public static async getChainMeta(client): Promise<any> {
    const t1 = performance.now();
    return new Promise((resolve, reject) => {
      client.getChainMeta({}, function(err, response) {
          if(err) {
            reject(err);
            return;
          }
          // We want to measure the response timing as well
          const t2 = performance.now();
          resolve({ response, requestDuration: (t2 - t1) });
      });
    });
  }

  
      
}