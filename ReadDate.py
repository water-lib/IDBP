import pymysql
import datetime

# conn = pymysql.connect(host="127.0.0.1",port=3306,user="root",password="123456",db="threephase",)


# 定义字段
# num 行数
# P S PF F =公率  视在功率 功率因素 频率
# ua ub uc 三相电压
# ia ib ic 三相电流
# Pa Pc Pc 三项功率、
# Sa Sb Sc 三相视在功率
# PFa PFb PFc 三相功率因素
# max min avg=最大 最小 平均
key1 = (
"num", "time", 'ua', 'ub', 'uc', 'ia', 'ib', 'ic', 'P', 'S', 'PF', 'F', 'Pa', 'Pb', 'Pc', 'Sa', 'Sb', 'Sc', 'PFa',
'PFb', 'PFc')
key2 = (
"num", "max_ua", "min_ua", "avg_ua", "max_ub", "min_ub", "avg_ub", "max_uc", "min_uc", "avg_uc", "max_ia", "min_ia",
"avg_ia", "max_ib", "min_ib", "avg_ib", "max_ic", "min_ic", "avg_ic", "max_P", "min_P", "avg_P", "max_S", "min_S",
"avg_S", "max_PF", "min_PF", "avg_PF", "max_F", "min_F", "avg_F", "max_Pa", "min_Pa", "avg_Pa", "max_Pb", "min_Pb",
"avg_Pb", "max_Pc", "min_Pc", "avg_Pc", "max_Sa", "min_Sa", "avg_Sa", "max_Sb", "min_Sb", "avg_Sb", "max_Sc", "min_Sc",
"avg_Sc", "max_PFa", "min_PFa", "avg_PFa", "max_PFb", "min_PFb", "avg_PFb", "max_PFc", "min_PFc", "avg_PFc")
key3 = ("id", "question")
key4 = ("id", "machine", "xinghao")


# 连接数据库threephase
def connect(host="127.0.0.1", port=3306, user="root", password="123456", db="threephase"):
    conn = pymysql.connect(host=host, port=port, user=user, password=password, db=db)
    print("连接服务器成功!")
    return conn


# 连接数据库index
def connect1(host="127.0.0.1", port=3306, user="root", password="123456", db="index"):
    conn1 = pymysql.connect(host=host, port=port, user=user, password=password, db=db)
    print("连接服务器成功！！")
    return conn1


# 连接数据库skxc
def connect2(host="127.0.0.1", port=3306, user="root", password="123456", db="skxc"):
    conn2 = pymysql.connect(host=host, port=port, user=user, password=password, db=db)
    print("连接服务器成功！！")
    return conn2


def connecttion(db, host="127.0.0.1", port=3306, user="root", password="123456"):
    con = pymysql.connect(host=host, port=port, user=user, password=password, db=db)
    print("连接服务器成功！！")
    return con


def readlast(conn, table):
    cmd = "select * from %s order by num desc limit 0,1" % (table)
    cursor = conn.cursor()
    cursor.execute(cmd)
    return dict(zip(key1, cursor.fetchall()[0]))


def readone(conn, table, num):
    cmd = "select * from %s where num=%d" % (table, num)
    cursor = conn.cursor()
    cursor.execute(cmd)
    return dict(zip(key1, cursor.fetchall()[0]))


def readstats(conn, table, num):
    cmd = "select * from %s where num=%d" % (table, num)
    cursor = conn.cursor()
    cursor.execute(cmd)
    return dict(zip(key2, cursor.fetchall()[0]))


def count(conn, table):
    cmd = "select count(*) from %s" % (table)
    cursor = conn.cursor()
    cursor.execute(cmd)
    conn.commit()
    return cursor.fetchall()[0][0]


def searchByNum(conn, table, min, max):
    cmd = "select * from %s where num>=%d and num<=%d" % (table, min, max)
    cursor = conn.cursor()
    cursor.execute(cmd)
    return cursor.fetchall()


def readlastn(conn, table, n):
    data_list = []
    cmd = "(select * from %s order by num desc limit %d) order by num" % (table, n)
    cursor = conn.cursor()
    cursor.execute(cmd)
    for item in cursor.fetchall():
        data_list.append(dict(zip(key1, item)))
    return data_list


def readsearch(conn, na):
    cmd = "(select db from first where machine regexp '%s')" % (na)
    cursor = conn.cursor()
    cursor.execute(cmd)
    return cursor.fetchall()


def machinedata(conn):
    cmd = "(select * from test order by num desc limit 1)"
    cursor = conn.cursor()
    cursor.execute(cmd)
    return dict(zip(key1, cursor.fetchall()[0]))


def questiondata(conn):
    cmd = "(select * from question order by id desc limit 1)"
    cursor = conn.cursor()
    cursor.execute(cmd)
    return dict(zip(key3, cursor.fetchall()[0]))


def leidata(conn):
    cmd = "(select * from lei order by id desc limit 1)"
    cursor = conn.cursor()
    cursor.execute(cmd)
    return dict(zip(key4, cursor.fetchall()[0]))
