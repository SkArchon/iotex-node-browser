# Build Configuration

Before we can deploy, we need to build our node manually to get our deployment binaries. For the purposes of running the git clone mentioned below, make sure to use an empty directly which is completely different from your $IOTEX_HOME directory.

~~~bash
mkdir iotex-build-dir
cd iotex-build-dir
git clone https://github.com/iotexproject/iotex-core.git
cd iotex-core
git checkout checkout v1.2.0

// optional
export GOPROXY=https://goproxy.io
go mod download
make clean build-all
cp ./bin/server $IOTEX_HOME/iotex-server
~~~