/* clientTcp.c - Quadratic equation client
*/
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <errno.h>
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <netdb.h>
#include <string.h>

/* error code */
extern int errno;

/* connection port */
int port;

int main(int argc, char *argv[])
{
    int sd;                    // socket descriptor
    struct sockaddr_in server; // socket descriptor
    char msg[100];             // client response

    /* exist all arguments in line? */
    if (argc != 3)
    {
        printf("Sintax: %s <server_address> <port>\n", argv[0]);
        return -1;
    }

    /* assign port */
    port = atoi(argv[2]);

    /* create socket */
    if ((sd = socket(AF_INET, SOCK_STREAM, 0)) == -1)
    {
        perror("socket() error.\n");
        return errno;
    }

    /* init struct for next connection with server */
    /* socket family */
    server.sin_family = AF_INET;
    /* server IP address */
    server.sin_addr.s_addr = inet_addr(argv[1]);
    /* connection port */
    server.sin_port = htons(port);

    /* connect to server */
    if (connect(sd, (struct sockaddr *)&server, sizeof(struct sockaddr)) == -1)
    {
        perror("[client] connect() error.\n");
        return errno;
    }

    /* message read (a)*/
    bzero(msg, 100);
    printf("[client] Equation model: ax^2+bx+c=0\n");
    printf("[client] Type value for a: ");
    fflush(stdout);
    read(0, msg, 100);

    /* send message to server */
    if (write(sd, msg, 100) <= 0)
    {
        perror("[client] Error on write() to server.\n");
        return errno;
    }
    
    /* message read(b) */
    bzero(msg, 100);
    printf("[client] Type value for b: ");
    fflush(stdout);
    read(0, msg, 100);

    /* send message to server */
    if (write(sd, msg, 100) <= 0)
    {
        perror("[client] Error on write() to server.\n");
        return errno;
    }

    /* message read(c) */
    bzero(msg, 100);
    printf("[client] Type value for c: ");
    fflush(stdout);
    read(0, msg, 100);

    /* send message to server */
    if (write(sd, msg, 100) <= 0)
    {
        perror("[client] Error on write() to server.\n");
        return errno;
    }

    /* read message from server */
    if (read(sd, msg, 100) < 0)
    {
        perror("[client] read() error from server.\n");
        return errno;
    }
    /* print message */
    printf("[client] Received message: %s\n", msg);

    /* close connection */
    close(sd);
}