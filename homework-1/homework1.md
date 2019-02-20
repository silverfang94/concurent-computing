# fisier folosit pentru compilarea serverului&clientului TCP iterativ

```bash
all:
rm -f \*~ server client
gcc serverTcp.c -o server -lm -ggdb
gcc clientTcp.c -o client -ggdb
clean:
rm -f \*~ server client
client run:
./client 127.0.0.1 20213
server run:
./server
```
