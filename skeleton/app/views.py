from app import app
from flask import render_template, redirect, request, url_for, jsonify, flash, send_from_directory
from werkzeug.utils import secure_filename
import os
import datetime

@app.route('/')
def index():
    return render_template('index.html')
