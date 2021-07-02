### Starting The Node

In order to start the node make sure to that run the following command

~~~bash
nohup $IOTEX_HOME/iotex-server \
        -config-path=$IOTEX_HOME/etc/config.yaml \
        -genesis-path=$IOTEX_HOME/etc/genesis.yaml &
~~~

To expose the node publicly you need to make sure that the following ports are open in your firewall or load balancer.
* 4689
* 8080