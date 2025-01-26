#!/bin/bash
protoc -I=./ \
       --js_out=import_style=commonjs,binary:./src/protos \
       --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./src/protos \
       ./anagram.proto

