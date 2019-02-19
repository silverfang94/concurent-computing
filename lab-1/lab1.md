# fisier folosit pentru compilarea serverului&clientului TCP iterativ

```bash
all:
gcc servTcpIt.c -o servTcpIt
gcc cliTcpIt.c -o cliTcpIt
clean:
rm -f \*~cliTcpIt servTcpIt
```
