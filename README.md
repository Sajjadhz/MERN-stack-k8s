# MERN Stack deployment on kubernetes cluster

In this repository we are going to deploy MERN stack on kubernetes cluster.

### How to go through with this repository

Clone this git repository and switch to the back-end branch, build the docker image and push the image to your docker registry by running following commands:

```
git clone https://github.com/Sajjadhz/MERN-stack-k8s.git
cd MERN-stack-k8s
git checkout badk-end
docker build -t sajjadhz/cloudl-server:v1 .
docker push sajjadhz/cloudl-server:v1
cd k8s
chmod +x deploy.sh
./deploy.sh
```

Now the back-end deployments icluding back-end service, mongoDB and mongoDB-express are deploying on kubernetes cluster.
After the end of deployment process you can go to the mongoDB-express UI by going to the [Any Node]:30008 address in your browser.

Now you can go to deploy the front-end.

### How to deploy the front-end part of the MERN stack in this repository

Checkout the front-end branch, build docker image, push the image to your docker registry and deploy the image on kubernetes cluster as follows:

```
git checkout front-end
docker build -t sajjadhz/cloudl-client:v1 .
docker push sajjadhz/cloudl-client:v1
cd k8s
chmod +x deploy.sh
./deploy.sh
```

After end of deployment you can go to the [Any Node]:30007 address in your browser to see the front-end UI.

### How to integrate front-end with back-end?

It is very important to know how to integrate front-end with back-end, the front-end does not know where our back-end is. In order to communicate with the back-end, we need middleware to catch the requests originating from the front-end and redirect them to where back-end lives and then deliver the responses from the back-end, back to the front-end. We are using Nginx for that. Go to the nginx directory in fron-end branch and check how we configured the nginx for this part.

We have created a template for nginx config as `nginx-default.conf.template` like:

```
    location /api/users {
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_pass http://${API_HOST}:${API_PORT}/api/users;
    }
```

this is a section of nginx config template, as you can see here we set proxy_pass which is the address of back-end that nginx will redirect the requests comming to the /api/users path to back-end service. At the `docker-entrypoint.sh` file we are using `envsubst` to substitute API_HOST and API_PORT in nginx template config with the values we set in environmetal variables and finally we put the final result into the `/etc/nginx/conf.d/default.conf`. 

```
envsubst '${API_HOST} ${API_PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
```
