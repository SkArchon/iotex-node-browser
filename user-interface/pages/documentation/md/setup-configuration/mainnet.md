# Setup Configuration


Next you need to setup the configuration for the IOTEX node, you have the choice of either connecting it to the mainnet or testnet.

To Connect To Mainnet, run the following
~~~bash
curl https://raw.githubusercontent.com/iotexproject/iotex-bootstrap/v1.2.0/config_mainnet.yaml > $IOTEX_HOME/etc/config.yaml
curl https://raw.githubusercontent.com/iotexproject/iotex-bootstrap/v1.2.0/genesis_mainnet.yaml > $IOTEX_HOME/etc/genesis.yaml
~~~

We need to find your public IP address, for which you could use one of the two ways.
Method 1
Run the following command, which will print your public ip address to the terminal (you need to use the bottom most ip address)
~~~bash
nslookup myip.opendns.com resolver1.opendns.com
~~~

Method 2
Visit the following webpage to get your public ip address https://www.whatismyip.com

Once you have learnt the IP Address, make sure to copy it and keep it somewhere.

Next we need to create a private key for yourself, you can do this by going to the following site.
Enter some text which will give you the output of your private key.
https://passwordsgenerator.net/sha256-hash-generator/

Open up the following config file located at `$IOTEX_HOME/etc/config.yaml`.

You should see the following highlighted sections, which you need to fill using the values you got above. Make sure to copy your public ip address and your private key and paste it in the following sections (and uncomment them).

`externalHost -> public IP`  
`producerPrivKey -> private key`
