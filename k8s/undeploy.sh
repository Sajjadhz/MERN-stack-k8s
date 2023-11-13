#!/usr/bin/env bash

kubectl delete -f configmap.yml
kubectl delete -f secret.yml
kubectl delete -f mongo.yml
kubectl delete -f mongodb-express.yml
kubectl delete -f cloudl-server-deployment.yml

kubectl get pods