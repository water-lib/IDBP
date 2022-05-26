import os

from sqlalchemy.dialects import mysql


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'hard to guess string'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI') or 'mysql://root:123456@127.0.0.1:3306/loginfo'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
