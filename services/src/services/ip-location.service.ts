import { Injectable } from '@nestjs/common';
import { IPGEOLOCATION_KEY, IPSTACK_KEY } from 'src/app.constants';
const IPGeolocationAPI = require('ip-geolocation-api-javascript-sdk/IPGeolocationAPI');
const GeolocationParams = require('ip-geolocation-api-javascript-sdk/GeolocationParams.js');
const http = require('http')
const util = require('util');
const lookup = util.promisify(require('dns').lookup);
const isIp = require('is-ip');

@Injectable()
export class IpLocationService {
  // Taken from a node module
  private ipstack(ip, callback) {
    const token = IPSTACK_KEY;

    if(callback === null){
      console.error("Please provide a callback!")
      return
    }
    http.get({
      hostname: 'api.ipstack.com',
      port: 80,
      path: `/${ip}?access_key=${token}`,
      agent: false  
    }, (res) => {
      try {
        var body: any = ""
        res.on('data', data => {
          body +=data
        })
        res.on('end', () => {
          try {
            body = JSON.parse(body)
            let {error} = body
            if(error !== undefined){
              callback(error, null)
            } else {
              callback(null, body)
            }
          }
          catch(e) {
            callback(e, null);
          }
        })
        res.on('error', err => {
          callback(err, null)
        })
      }
      catch(e) {
        console.error(e);
        callback(e, null);
      }
      
    });
  }
      
  private processIpStack(ipAddress) {
    return new Promise((resolve, reject) => {
        try {
            this.ipstack(ipAddress, (err, response) => {
                if(err) {
                    reject(err);
                }
                resolve(response);
            });
        }
        catch(e) {
            reject(e);
        }
    });
}

  // Create IPGeolocationAPI object, passing your valid API key (optional) and async requests mode (optional, default: true)
  private processIpGeolocationApi(ipAddress) {
    const ipgeolocationApi = new IPGeolocationAPI(IPGEOLOCATION_KEY);

    return new Promise((resolve, reject) => {
        try {
            // Query geolocation for an IP address "1.1.1.1" and all fields
            var geolocationParams = new GeolocationParams();
            geolocationParams.setIPAddress(ipAddress);
            
            const handleResponse = (response) => {
                if(response.country_code2) {
                    resolve(response);
                    return;                
                }
                reject(response);
            };
            ipgeolocationApi.getGeolocation(handleResponse, geolocationParams);
        }
        catch(e) {
            reject(e);
        }
    });
  }

  private async ipstackValue(ipAddress) {
    try {
        const ipStack: any = await this.processIpStack(ipAddress);

        if(ipStack.country_code == null) { return null; }

        return {
            countryCode: ipStack.country_code,
            regionName: ipStack.region_name
        };
    }
    catch(e) {
        console.log("Error on ipstack");
        console.error(e);
        return null;
    }
  }

  private async ipgeolocationValue(ipAddress) {
    try {
        // The api require to be paid to do dns lookups
        // so we do it ourselves
        const result = (isIp(ipAddress))
            ? { address: ipAddress }
            : await lookup(ipAddress);

        console.log(result);
        const ipGeolocation: any = await this.processIpGeolocationApi(result.address);
        
        if (ipGeolocation.country_code2 == null) { return null };

        return {
            countryCode: ipGeolocation.country_code2,
            regionName: ipGeolocation.state_prov
        };
    }
    catch(e) {
        console.log("Error on ipgeolocation");
        console.error(e);
        return null;
    }
  }

  public async getIpAddressLocationFromMultipleSources(ipAddress) {
    const addressAsUrl = new URL(ipAddress);
    const result = await this.ipstackValue(addressAsUrl.hostname);
    if(result != null) {
        return result;
    }
    return await this.ipgeolocationValue(addressAsUrl.hostname);
  }
  
}






