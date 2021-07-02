## Upgrade Your Node

Make sure you have `$IOTEX_HOME` already set up, and all the files(configs, dbs etc) are placed in the right locations (Please refer to the Join MainNet section).

To upgrade mainnet node, use following command. By default, it will upgrade to latest mainnet version.
```bash
sudo bash # If your docker requires root privilege
bash <(curl -s https://raw.githubusercontent.com/iotexproject/iotex-bootstrap/master/scripts/setup_fullnode.sh)
```

To enable gateway on mainnet
```bash
sudo bash # If your docker requires root privilege
bash <(curl -s https://raw.githubusercontent.com/iotexproject/iotex-bootstrap/master/scripts/setup_fullnode.sh) plugin=gateway
```

Currently, auto upgrade is turned on by default. To disable this feature, enter `N` when asked following question:
```bash
Do you want to auto update the node [Y/N] (Default: Y)? N
```

To stop auto upgdrade cron job and iotex server program, you can run
```bash
sudo bash # If your docker requires root privilege
bash <(curl -s https://raw.githubusercontent.com/iotexproject/iotex-bootstrap/master/scripts/stop_fullnode.sh)
```