from flask import Flask, render_template, request, url_for, redirect, flash

app = Flask(__name__)


@app.route("/")
def index():
    page = "index.html"
    return render_template(page)


@app.route("/skillset")
def fullskillset():
    return render_template("skillset.html")


if __name__ == "__main__":
    app.run(debug=True)
