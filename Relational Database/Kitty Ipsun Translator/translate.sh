#!/bin/bash

cat $1 | sed 's/catnip/dogchow/g; s/cat/dog/g; s/meow|meowzer/woof/g' -E
