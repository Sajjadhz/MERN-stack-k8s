#!/usr/bin/env bash
kubectl apply -f configmap.yml
kubectl apply -f secret.yml
kubectl apply -f mongo.yml
kubectl apply -f mongodb-express.yml
kubectl apply -f cloudl-server-deployment.yml

kubectl get pods
kubectl get svc