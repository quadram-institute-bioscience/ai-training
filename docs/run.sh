#!/bin/bash
docker run --rm -it -p 9876:9876 -v "$(pwd)":/site jekyll/jekyll:latest sh -c "cd /site && bundle install && bundle exec jekyll serve --host 0.0.0.0 --port 9876"
