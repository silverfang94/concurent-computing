/* serverTcp.c - Quadratic equation function
  return result of equation after user input 3 variables
*/

#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <errno.h>
#include <unistd.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

/* port */
#define PORT 20213

/* error code returned */
extern int errno;

int main()
{
  struct sockaddr_in server; // struct used by server
  struct sockaddr_in from;
  char msg[100]; //message received from client
  int a, b, c;
  int d, x1, x2;
  char msgrasp[100] = " "; //response for client
  int sd;                  //socket descript

  /* socket creation */
  if ((sd = socket(AF_INET, SOCK_STREAM, 0)) == -1)
  {
    perror("[server] socket() error.\n");
    return errno;
  }

  /* prepare data struct */
  bzero(&server, sizeof(server));
  bzero(&from, sizeof(from));

  /* init structs used by server */
  /* socket family */
  server.sin_family = AF_INET;
  /* accept all address */
  server.sin_addr.s_addr = htonl(INADDR_ANY);
  /* use port for user */
  server.sin_port = htons(PORT);

  /* atach socket */
  if (bind(sd, (struct sockaddr *)&server, sizeof(struct sockaddr)) == -1)
  {
    perror("[server] bind() error.\n");
    return errno;
  }

  /* server listen launch */
  if (listen(sd, 5) == -1)
  {
    perror("[server] listen() error.\n");
    return errno;
  }

  /* serve all clients */
  while (1)
  {
    int client;
    int length = sizeof(from);

    printf("[server] Listen on port %d...\n", PORT);
    fflush(stdout);

    /* accept client (block until conexion is created) */
    client = accept(sd, (struct sockaddr *)&from, &length);

    /* eroar on client accept */
    if (client < 0)
    {
      perror("[server] accept() error.\n");
      continue;
    }

    /* connection , waiting user input for a*/
    bzero(msg, 5);
    printf("[server] Waiting message...\n");
    fflush(stdout);

    /* read message from client */
    if (read(client, msg, 100) <= 0)
    {
      perror("[server] read() error from client.\n");

      a = (int)msg;

      fflush(stdout);

      close(client); /* close client connection */
      continue;      /* listen next */
    }

    //printf("[server]Mesajul a fost receptionat...%s\n", msg);

    /*prepare respons */
    bzero(msgrasp, 100);
    //strcat(msgrasp, "A = ");
    strcat(msgrasp, a);

    printf("[server] Send response to client...%s\n", msgrasp);

    /* send response */
    if (write(client, msgrasp, 100) <= 0)
    {
      perror("[server] write() error.\n");
      continue; /* listen next */
    }
    else
      printf("[server]Response was send succesful.\n");
    /* close connection */
    close(client);
  } /* while */
} /* main */