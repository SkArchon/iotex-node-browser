# Initial Setup

### Creating your setup directory

Let's start by creating a directory to hold our instance data. In this case we shall name our directory iotex-var

~~~bash
mkdir -p ~/iotex-var
~~~

### Setting The IOTEX_HOME Path Variable

Next we need to setup the path variable for our home directory, we can do it using the following mechanisms
~~~bash
cd ~/iotex-var
# This is temporary
export IOTEX_HOME=$PWD
~~~

An important point to note is that if you restart your terminal IOTEX_HOME would not be present. If you wish to make this permanent you need to add it to your .bash_profile file present in your home directory. To do so simply open it up in your favourite text editor and add the following lines to the end, making sure to replace <DIRNAME>  with the directory name where iotex-var is

~~~bash
export IOTEX_HOME=<DIRNAME>
~~~

After you are done setting the IOTEX_HOME path variable, you can go ahead and run the following commands from anywhere
~~~bash
mkdir -p $IOTEX_HOME/data
mkdir -p $IOTEX_HOME/log
mkdir -p $IOTEX_HOME/etc
~~~