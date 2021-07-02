# Setting Up A Snapshot

A snapshot is essentially the IOTEX blockchain database, which you download and setup to speed up the process of synchronizing your node to the current block.

Recommended Method

The main recommented way of setting up a snapshot is the following

~~~bash
curl -L https://t.iotex.me/mainnet-data-latest > $IOTEX_HOME/data.tar.gz
tar -xzf data.tar.gz
~~~

