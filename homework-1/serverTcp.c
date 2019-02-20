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
#include <math.h>

/* port */
#define PORT 20213

/* error code returned */
extern int errno;

int main()
{
  struct sockaddr_in server; // struct used by server
  struct sockaddr_in from;
  char msg[100]; //message received from client
  double a;
  double b;
  double c;
  double d;
  double x1;
  double x2;
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

    /* read message from client [A]*/
    if (read(client, msg, 100) <= 0)
    {
      perror("[server] read() error from client.\n");
      fflush(stdout);
      close(client); /* close client connection */
      continue;      /* listen next */
    }

    a = atof(msg);
    printf("[server] Input received...%s\n", msg);

    /* connection , waiting user input for b*/
    bzero(msg, 5);
    printf("[server] Waiting message...\n");
    fflush(stdout);

    /* read message from client[B] */
    if (read(client, msg, 100) <= 0)
    {
      perror("[server] read() error from client.\n");
      fflush(stdout);
      close(client); /* close client connection */
      continue;      /* listen next */
    }

    b = atof(msg);
    printf("[server] Input received...%s\n", msg);

    /* connection , waiting user input for c */
    bzero(msg, 5);
    printf("[server] Waiting message...\n");
    fflush(stdout);

    /* read message from client[C] */
    if (read(client, msg, 100) <= 0)
    {
      perror("[server] read() error from client.\n");
      fflush(stdout);
      close(client); /* close client connection */
      continue;      /* listen next */
    }

    c = atof(msg);
    printf("[server] Input received...%s\n", msg);

    printf("[server] %fx^2+ %fx + %f =0",a,b,c);

    /*prepare respons */
    bzero(msgrasp, 100);

    d = (b*b) - (4*a*c);

    if(d>0)
    {
      double root = sqrt(d);
      x1 = (-b + root)/(2*a); 
      x2 = (-b - root)/(2*a); 

      sprintf(msgrasp,"equation have two distinct roots \n x1=%f; \n x2=%f",x1,x2);
    }
    else if(d==0)
    {
      x1 = -b/(2*a);

      sprintf(msgrasp,"there are exactly one real root \n x1=x2=%f",x1);
    }
    else
    {
      sprintf(msgrasp, "there are no real roots \n");
    }
    
    

    ///////////////////////////////////////////////////////////////////////////
  
    printf("[server] Send response to client...%a\n", a);

    /* send response */
    if (write(client, msgrasp, 100) <= 0)
    {
      perror("[server] write() error.\n");
      continue; /* listen next */
    }
    else
      printf("[server] Response was send succesful.\n");
    /* close connection */
    close(client);
  } /* while */
} /* main */