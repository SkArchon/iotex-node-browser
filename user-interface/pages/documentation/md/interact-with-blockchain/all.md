# Interact With The Blockchain

You can install ioctl (a command-line interface for interacting with IoTeX blockchain)

~~~bash
curl https://raw.githubusercontent.com/iotexproject/iotex-core/master/install-cli.sh | sh
~~~

You can point ioctl to your node (if you enable the gateway plugin):

~~~bash
ioctl config set endpoint localhost:14014 --insecure
~~~

Or you can point it to our nodes:

`MainNet secure: api.iotex.one:443`  
`MainNet insecure: api.iotex.one:80`  
`TestNet secure: api.testnet.iotex.one:443`  
`TestNet insecure: api.testnet.iotex.one:80`  

If you want to set an insecure endpoint, you need to add --insecure option.

Generate key:
~~~bash
ioctl account create
~~~

Get consensus delegates of current epoch:
~~~bash
ioctl node delegate
~~~

Refer to CLI document for more details.

Other Commonly Used Commands
Claim reward:
~~~bash
ioctl action claim ${amountInIOTX} -l 10000 -p 1 -s ${ioAddress|alias}
~~~

Exchange IoTeX native token to ERC20 token on Ethereum via Tube service:
~~~bash
ioctl action invoke io1p99pprm79rftj4r6kenfjcp8jkp6zc6mytuah5 ${amountInIOTX} -s ${ioAddress|alias} -l 400000 -p 1 -b d0e30db0
~~~

Checkout the IoTeX Tube docs for detailed documentation of the tube service.

