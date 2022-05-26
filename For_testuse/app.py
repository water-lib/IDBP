from flask import Flask, render_template, jsonify
import pymysql

app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('test.html')


@app.route('/templates/test_echarts.html')
def no1():
    return render_template('test_echarts.html')


@app.route('/setData/')
def setData():
    conn = pymysql.connect(host='127.0.0.1', user='root', password='123456', db='threephase', charset='utf8')
    cur = conn.cursor()
    sql = "SELECT P FROM test_computer_yangxu"
    cur.execute(sql)
    u = cur.fetchall()
    conn.close()
    u = jsonify(u)
    return u


if __name__ == '__main__':
    app.run()
