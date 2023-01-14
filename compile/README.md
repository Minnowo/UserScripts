
This is a python script to compile all the bookmarks into a minified copy

This script uses and requires https://github.com/google/closure-compiler

You can download a jar from [Maven](https://mvnrepository.com/artifact/com.google.javascript/closure-compiler)

### Usage:

Set the `DIR` variable in `compile.py` to the path you want to compile bookmarks from. By default this is the parent directory of the script, which will compile the entire git repo

Then just run the script and it will compile any file named `readable.js` into a bookmark