### Start Node

In order to start the gateway node make sure to run the following command

~~~bash
nohup $IOTEX_HOME/iotex-server \
        -config-path=$IOTEX_HOME/etc/config.yaml \
        -genesis-path=$IOTEX_HOME/etc/genesis.yaml \
        -plugin=gateway &
~~~

To expose the node publicly you need to make sure that the following ports are open in your firewall or load balancer.
* 4689
* 8080
* 14014