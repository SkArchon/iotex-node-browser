### Checking Node log

Container logs can be accessed with the following command. 

~~~bash
docker logs iotex
~~~

Content can be filtered with:

~~~bash
docker logs -f --tail 100 iotex |grep --color -E "epoch|height|error|rolldposctx"
~~~

### Stop and remove container

When starting the container with `--name=iotex`, you must remove the old container before a new build.

~~~bash
docker stop iotex
docker rm iotex
~~~

### Pause and Restarting container

Container can be "stopped" and "restarted" with:

~~~bash
docker stop iotex
docker start iotex
~~~