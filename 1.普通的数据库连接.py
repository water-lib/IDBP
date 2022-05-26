import pymysql
from flask import Flask,render_template,request,jsonify

app = Flask(__name__)

CONN = pymysql.connect(host='localhost', port=3306, user='root', passwd='lfyx199702134232', db='dashujupintai')

def fetchall(sql):
    cursor = CONN.cursor()
    cursor.execute(sql)
    result = cursor.fetchall()
    cursor.close()
    return result

@app.route('/login')
def index():
    return render_template('login.html')



@app.route('/order')
def order():
    result = fetchall('select * from user')
    return 'xxx'


if __name__ == '__main__':
    app.run()
