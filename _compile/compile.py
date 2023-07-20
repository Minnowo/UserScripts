import subprocess
import time
import os
import re

DIR = ".."
COMPILE_INTO_DIR1 = "./min"
BOOKMARK_OUTPUT_FILE = "./bookmarks.html"
COMPILER = "./closure-compiler.jar"


def keep_files_predicate(path: str):

    path = os.path.basename(path)

    # if not path.endswith(".js"):
    #     return False

    return path == "readable.js"


def get_files(dir, output=None):

    if output is None:
        output = set()

    for i in os.listdir(dir):

        p = os.path.join(dir, i)

        if os.path.isdir(p):

            get_files(p, output)
            continue

        output.add(p)

    return output


def natural_sort_key(s, _nsre=re.compile("([0-9]+)")):
    return [int(text) if text.isdigit() else text.lower() for text in _nsre.split(s)]


def subprocess_communicate(process: subprocess.Popen, timeout: int = 10) -> tuple:

    while True:

        try:

            return process.communicate(timeout=timeout)

        except subprocess.TimeoutExpired:

            pass


def main():

    HTML_TEMPLATE1 = """<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!-- This is an automatically generated file.
     It will be read and overwritten.
     DO NOT EDIT! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<DL><p>
    <DT>
    <DL><p>
        <DT><H3 ADD_DATE="1655850500" LAST_MODIFIED="0">js-bookmarks</H3>
        <DL><p>
"""
    HTML_TEMPLATE2 = """</DL><p></DL><p></DL><p>"""

    HTML_TEMPLATE3 = '<DT><A HREF="{JAVASCRIPT}" ADD_DATE="{TIME}">{NAME}</A>'

    files = sorted(filter(keep_files_predicate, get_files(DIR)), key=natural_sort_key)

    os.makedirs(COMPILE_INTO_DIR1, exist_ok=True)

    with open(BOOKMARK_OUTPUT_FILE, "w") as writer:

        writer.write(HTML_TEMPLATE1)

        for file in files:

            print(file)
            dirname = os.path.dirname(file)
            filename = os.path.basename(dirname)
            filename1 = os.path.basename(dirname) + ".min.js"

            output_path1 = os.path.join(COMPILE_INTO_DIR1, filename1)
            temp_path = file

            (stdout, stderr) = subprocess_communicate(
                subprocess.Popen(
                    [
                        "java","-jar", COMPILER,
                        "--output_wrapper", "javascript:%output%",
                        "--formatting", "SINGLE_QUOTES",
                        "--js",temp_path,
                        "--js_output_file",output_path1,
                    ],
                    stderr=subprocess.PIPE,
                    stdout=subprocess.PIPE,
                )
            )

            if stderr:
                print(stderr.decode(errors="ignore"))
                return

            with open(output_path1, "r") as reader:

                writer.write(
                    HTML_TEMPLATE3.format(
                        JAVASCRIPT=reader.read()
                        .strip()
                        # for some reason the js compiler puts newlines after a certain number of chars
                        # idk how to make it not do that, so i'm just doing this stupid replace here
                        .replace("\r\n", "")
                        .replace("\n", "")
                        .replace(os.linesep, ""),
                        TIME=int(time.time()),
                        NAME=filename,
                    )
                )
                writer.write(os.linesep)

        writer.write(HTML_TEMPLATE2)


if __name__ == "__main__":
    main()
