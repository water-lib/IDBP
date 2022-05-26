import socket
import datetime
import time
import json
import sys
import struct
import pymysql
import math


# 连接threephase数据库
def connect(host="127.0.0.1", port=3306, user="root", password="123456", db="threephase"):
    conn = pymysql.connect(host=host, port=port, user=user, password=password, db=db)
    print("连接服务器成功!")
    return conn


# 插入数据
def addstats(conn):
    cmd = "insert into cac (max_ua,min_ua,avg_ua,max_ub,min_ub,avg_ub,max_uc,min_uc,avg_uc,max_ia,min_ia,avg_ia,max_ib,min_ib,avg_ib,max_ic,min_ic,avg_ic,max_P,min_P,avg_P,max_S,min_S,avg_S,max_PF,min_PF,avg_PF,max_F,min_F,avg_F,max_Pa,min_Pa,avg_Pa,max_Pb,min_Pb,avg_Pb,max_Pc,min_Pc,avg_Pc,max_Sa,min_Sa,avg_Sa,max_Sb,min_Sb,avg_Sb,max_Sc,min_Sc,avg_Sc,max_PFa,min_PFa,avg_PFa,max_PFb,min_PFb,avg_PFb,max_PFc,min_PFc,avg_PFc) select max(ua),min(ua),avg(ua),max(ub),min(ub),avg(ub),max(uc),min(uc),avg(uc),max(ia),min(ia),avg(ia),max(ib),min(ib),avg(ib),max(ic),min(ic),avg(ic),max(P),min(P),avg(P),max(S),min(S),avg(S),max(PF),min(PF),avg(PF),max(F),min(F),avg(F),max(Pa),min(Pa),avg(Pa),max(Pb),min(Pb),avg(Pb),max(Pc),min(Pc),avg(Pc),max(Sa),min(Sa),avg(Sa),max(Sb),min(Sb),avg(Sb),max(Sc),min(Sc),avg(Sc),max(PFa),min(PFa),avg(PFa),max(PFb),min(PFb),avg(PFb),max(PFc),min(PFc),avg(PFc) from test"
    cursor = conn.cursor()
    cursor.execute(cmd)
    conn.commit()


# 解析报文获得数据并保存数据
def save(conn, m):
    timesamp = time.time()
    str_time = time.strftime("%Y-%m-%d %H:%M:%S.", time.localtime(timesamp)) + str(int(math.modf(timesamp)[0] * 1000))
    try:
        ua = int(m[34:38], 16) / 100.0
        ub = int(m[38:42], 16) / 100.0
        uc = int(m[42:46], 16) / 100.0
        ia = int(m[46:50], 16) / 1000.0
        ib = int(m[50:54], 16) / 1000.0
        ic = int(m[54:58], 16) / 1000.0
        P = int(m[58:62], 16)
        S = int(m[62:66], 16)
        PF = int(m[66:70], 16) / 1000.0
        F = int(m[70:74], 16) / 100.0
        Pa = int(m[74:78], 16)
        Pb = int(m[78:82], 16)
        Pc = int(m[82:86], 16)
        Sa = int(m[86:90], 16)
        Sb = int(m[90:94], 16)
        Sc = int(m[94:98], 16)
        PFa = int(m[98:102], 16) / 1000.0
        PFb = int(m[102:104], 16) / 1000.0
        PFc = int(m[104:108], 16) / 1000.0
        cmd = "insert into test_yangxu(time,ua,ub,uc,ia,ib,ic,P,S,PF,F,Pa,Pb,Pc,Sa,Sb,Sc,PFa,PFb,PFc) values ('%s',%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)" % \
              (str_time, ua, ub, uc, ia, ib, ic, P, S, PF, F, Pa, Pb, Pc, Sa, Sb, Sc, PFa, PFb, PFc)
        cursor = conn.cursor()
        cursor.execute(cmd)
        conn.commit()
    except ValueError as e:
        print("解析错误")
        pass


def save2(conn, m):
    timesamp = time.time()
    str_time = time.strftime("%Y-%m-%d %H:%M:%S.", time.localtime(timesamp)) + str(int(math.modf(timesamp)[0] * 1000))
    ua = int(m[34:38], 16) / 100.0
    ub = int(m[38:42], 16) / 100.0
    uc = int(m[42:46], 16) / 100.0
    ia = int(m[46:50], 16) / 1000.0
    ib = int(m[50:54], 16) / 1000.0
    ic = int(m[54:58], 16) / 1000.0
    P = int(m[58:62], 16)
    S = int(m[62:66], 16)
    PF = int(m[66:70], 16) / 1000.0
    F = int(m[70:74], 16) / 100.0
    Pa = int(m[74:78], 16)
    Pb = int(m[78:82], 16)
    Pc = int(m[82:86], 16)
    Sa = int(m[86:90], 16)
    Sb = int(m[90:94], 16)
    Sc = int(m[94:98], 16)
    PFa = int(m[98:102], 16) / 1000.0
    PFb = int(m[102:104], 16) / 1000.0
    PFc = int(m[104:108], 16) / 1000.0
    cmd = "insert into test_yangxu_copy1(time,ua,ub,uc,ia,ib,ic,P,S,PF,F,Pa,Pb,Pc,Sa,Sb,Sc,PFa,PFb,PFc) values ('%s',%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)" % \
          (str_time, ua, ub, uc, ia, ib, ic, P, S, PF, F, Pa, Pb, Pc, Sa, Sb, Sc, PFa, PFb, PFc)
    cursor = conn.cursor()
    cursor.execute(cmd)
    conn.commit()


def liuhui_jiguang(con, m):
    timesamp = time.time()
    str_time = time.strftime("%Y-%m-%d %H:%M:%S.", time.localtime(timesamp)) + str(
        int(math.modf(timesamp)[0] * 1000))
    try:
        ua = int(m[34:38], 16) / 100.0
        ub = int(m[38:42], 16) / 100.0
        uc = int(m[42:46], 16) / 100.0
        ia = int(m[46:50], 16) / 1000.0
        ib = int(m[50:54], 16) / 1000.0
        ic = int(m[54:58], 16) / 1000.0
        P = int(m[58:62], 16)
        S = int(m[62:66], 16)
        PF = int(m[66:70], 16) / 1000.0
        F = int(m[70:74], 16) / 100.0
        Pa = int(m[74:78], 16)
        Pb = int(m[78:82], 16)
        Pc = int(m[82:86], 16)
        Sa = int(m[86:90], 16)
        Sb = int(m[90:94], 16)
        Sc = int(m[94:98], 16)
        PFa = int(m[98:102], 16) / 1000.0
        PFb = int(m[102:104], 16) / 1000.0
        PFc = int(m[104:108], 16) / 1000.0
        cmd = "insert into liuhui_jiguang(time,ua,ub,uc,ia,ib,ic,P,S,PF,F,Pa,Pb,Pc,Sa,Sb,Sc,PFa,PFb,PFc) values ('%s',%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)" % \
              (str_time, ua, ub, uc, ia, ib, ic, P, S, PF, F, Pa, Pb, Pc, Sa, Sb, Sc, PFa, PFb, PFc)
        cursor = conn.cursor()
        cursor.execute(cmd)
        conn.commit()
    except ValueError as e:
        print("解析错误")
        pass


def save_computer_yangxu(con, m):
    timesamp = time.time()
    str_time = time.strftime("%Y-%m-%d %H:%M:%S.", time.localtime(timesamp)) + str(int(math.modf(timesamp)[0] * 1000))
    try:
        U = int(m[34:38], 16) / 100 if m[34:38] else 0
        I = int(m[38:42], 16) / 1000
        P = int(m[42:46], 16)
        V = int(m[54:58], 16) / 1000
        cmd = "insert into test_computer_yangxu(time,U,I,P,V) values ('%s',%s,%s,%s,%s)" % \
              (str_time, U, I, P, V)
        cursor = conn.cursor()
        cursor.execute(cmd)
        conn.commit()
    except ValueError as e:
        print("解析错误")
        pass


def save_computer_shengjie(con, m):
    timesamp = time.time()
    str_time = time.strftime("%Y-%m-%d %H:%M:%S.", time.localtime(timesamp)) + str(int(math.modf(timesamp)[0] * 1000))
    U = int(m[34:38], 16) / 100
    I = int(m[38:42], 16) / 1000
    P = int(m[42:46], 16)
    V = int(m[54:58], 16) / 1000
    cmd = "insert into test_computer_shengjie(time,U,I,P,V) values ('%s',%s,%s,%s,%s)" % \
          (str_time, U, I, P, V)
    cursor = conn.cursor()
    cursor.execute(cmd)
    conn.commit()


def save_xiaochechuang(con, m):
    timesamp = time.time()
    str_time = time.strftime("%Y-%m-%d %H:%M:%S.", time.localtime(timesamp)) + str(int(math.modf(timesamp)[0] * 1000))
    U = int(m[34:38], 16) / 100
    I = int(m[38:42], 16) / 1000
    P = int(m[42:46], 16)
    V = int(m[54:58], 16) / 1000
    cmd = "insert into xiaochechuang(time,U,I,P,V) values ('%s',%s,%s,%s,%s)" % \
          (str_time, U, I, P, V)
    cursor = conn.cursor()
    cursor.execute(cmd)
    conn.commit()


def save_xiaoxichuang(con, m):
    timesamp = time.time()
    str_time = time.strftime("%Y-%m-%d %H:%M:%S.", time.localtime(timesamp)) + str(int(math.modf(timesamp)[0] * 1000))
    U = int(m[34:38], 16) / 100
    I = int(m[38:42], 16) / 1000
    P = int(m[42:46], 16)
    V = int(m[54:58], 16) / 1000
    cmd = "insert into xiaoxichuang(time,U,I,P,V) values ('%s',%s,%s,%s,%s)" % \
          (str_time, U, I, P, V)
    cursor = conn.cursor()
    cursor.execute(cmd)
    conn.commit()

def save_jixiebi(con, m):
    timesamp = time.time()
    str_time = time.strftime("%Y-%m-%d %H:%M:%S.", time.localtime(timesamp)) + str(int(math.modf(timesamp)[0] * 1000))
    U = int(m[34:38], 16) / 100
    I = int(m[38:42], 16) / 1000
    P = int(m[42:46], 16)
    V = int(m[54:58], 16) / 1000
    cmd = "insert into jixiebi(time,U,I,P,V) values ('%s',%s,%s,%s,%s)" % \
          (str_time, U, I, P, V)
    cursor = conn.cursor()
    cursor.execute(cmd)
    conn.commit()
# a=struct.pack('<BBBBBBBBBBBBBBB',254,165,0,10,30,255,255,255,255,255,255,255,255,0,32)

# 建立套接字连接
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(("192.168.0.178", 4001))
print("111")
conn = connect()
# 定义报文（进制透传，读取地址，读取数据）
ban = 'FEA5000A1EFFFFFFFFFFFFFFFF0020'
read_address = 'FEA500010C0D'
read_data2 = 'FEA501121600124B001527A4780001030048000A45DB54'  # 老网关1采朱电脑 data2
read_data = 'FEA501121600124B001527A4780003030300001305A1A0'  # 老网关3采铣床
# read_data1 = 'FEA501121600124B001527A4780001030048000A45DB54'#新网关1网关采阳电脑 data1
read_data1 = 'FEA501121600124B0022FFD0FF0001030048000A45DBEC'  # 新网关1网关采阳电脑 data1
# read_data3 = 'FEA501121600124B0022FFD0FF00020303000013047005'小型铣床三相
read_data3 = 'FEA501121600124B0022FFD0FF0002030048000A45E8FA'  # 新网关2采机械臂
read_data4 = 'FEA501121600124B0022FFD0FF0003030048000A44394B'  # 新网关3采集小铣床
#  FEA501121600124B0022FFD0FF0002030052000265E91D
# 字符串转16进制
ban = bytes.fromhex(ban)
read_address = bytes.fromhex(read_address)
read_data = bytes.fromhex(read_data)
read_data1 = bytes.fromhex(read_data1)
read_data2 = bytes.fromhex(read_data2)
read_data3 = bytes.fromhex(read_data3)
read_data4 = bytes.fromhex(read_data4)
# print(read_address)


# 发送
s.send(ban)
# 接收
s.recv(1024).hex()
s.send(read_address)
try:
    s.recv(1024).hex()
except socket.timeout as e:
    pass
    print('ok')
    time.sleep(1)

# 读取100次数据 采集铣床 不采集就注释掉 老网关节点3采集
# for i in range(0, 100000):
#     s.send(read_data)
#     try:
#         m = s.recv(58).hex()
#         print("接收成功")
#         save(conn, m)
#         # addstats(conn)
#         print(i + 1)
#         time.sleep(1)
#     except socket.timeout as e:
#         print("超时待机")
#         pass

# 采集小型车床/换成机械臂 2021/10/11 新网关节点2
for i in range(0, 100000):
    s.send(read_data3)
    try:
        m = s.recv(1024).hex()
        save_jixiebi(conn, m)
        print("采集到了机械臂")
    # addstats(conn)
        print(i + 1)
        time.sleep(1)
    except socket.timeout as e:
         print("超时待机")
         pass
# 采集阳旭电脑 不用就注释掉新网关节点1
# for j in range(0, 10000):
#     s.send(read_data1)
#     try:
#         m = s.recv(1024).hex()
#         save_computer_yangxu(conn, m)
#         print("采集到了阳旭电脑")
#         # addstats(conn)
#         print(j + 1)
#         time.sleep(1)
#     except socket.timeout as e:
#         print("超时待机")
#         pass
# 采集刘辉激光切割,不用就注释
# for j in range(0, 10000):
#     s.send(read_data1)
#     try:
#         print("发送报文")
#         m = s.recv(1024).hex()
#         liuhui_jiguang(conn, m)
#         print("采集到了激光参数")
#         # addstats(conn)
#     except socket.timeout as e:
#         print("超时怠机")
#         pass
#     print(j + 1)
#     time.sleep(1)
# 采集小铣床 不用就注释掉新网关3
# for k in range(0, 100000):
#     s.send(read_data4)
#     m = s.recv(58).hex()
#     save_xiaoxichuang(conn, m)
#     print("采集到了小铣床")
#     # addstats(conn)
#     print(k + 1)
#     time.sleep(1)

# 轮回查询,新网关123采集
# for i in range(0, 100000):
#     for j in range(0, 1):
#         s.send(read_data1)
#         m = s.recv(1024).hex()
#         save_computer_yangxu(conn, m)
#         print("采集到了阳旭电脑")
#         # addstats(conn)
#         print(j + 1)
#         time.sleep(0.1)
#     # 采集小铣床 不用就注释掉新网关3
#     for k in range(0, 1):
#         s.send(read_data4)
#         m = s.recv(58).hex()
#         save_xiaoxichuang(conn, m)
#         print("采集到了小铣床")
#         # addstats(conn)
#         print(k + 1)
#         time.sleep(0.1)
#     # 采集小型车床 新网关节点2
#     for i in range(0, 1):
#         s.send(read_data3)
#         m = s.recv(58).hex()
#         save_xiaochechuang(conn, m)
#         print("采集到了小车床")
#         # addstats(conn)
#         print(i + 1)
#         time.sleep(0.1)
