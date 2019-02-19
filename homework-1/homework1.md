# fisier folosit pentru compilarea serverului&clientului TCP iterativ

```bash
all:
gcc serverTcp.c -o server
gcc clientTcp.c -o client
clean:
rm -f \*~server client
```
