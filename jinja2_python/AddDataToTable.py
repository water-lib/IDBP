import pymysql
import math
import random
import time


def connect(host="127.0.0.1", port=3306, user="root", password="123456", db="threephase"):
    conn = pymysql.connect(host=host, port=port, user=user, password=password, db=db)
    print("连接服务器成功!")
    return conn


def add(conn):
    timesamp = time.time()
    str_time = time.strftime("%Y-%m-%d %H:%M:%S.", time.localtime(timesamp)) + str(int(math.modf(timesamp)[0] * 1000))
    ua = 220 + 10 * random.random()
    ub = 220 + 10 * random.random()
    uc = 220 + 10 * random.random()
    ia = 1 + random.random()
    ib = 1 + random.random()
    ic = 1 + random.random()
    P = 500 + 50 * random.random()
    S = 0.5 + 0.5 * random.random()
    PF = 250 + 50 * random.random()
    F = 50
    Pa = 500 + 50 * random.random()
    Pb = 500 + 50 * random.random()
    Pc = 500 + 50 * random.random()
    Sa = 0.5 + 0.5 * random.random()
    Sb = 0.5 + 0.5 * random.random()
    Sc = 0.5 + 0.5 * random.random()
    PFa = 250 + 50 * random.random()
    PFb = 250 + 50 * random.random()
    PFc = 250 + 50 * random.random()
    cmd = "insert into test (time,ua,ub,uc,ia,ib,ic,P,S,PF,F,Pa,Pb,Pc,Sa,Sb,Sc,PFa,PFb,PFc) values ('%s',%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)" % (
    str_time, ua, ub, uc, ia, ib, ic, P, S, PF, F, Pa, Pb, Pc, Sa, Sb, Sc, PFa, PFb, PFc)
    cursor = conn.cursor()
    cursor.execute(cmd)
    conn.commit()


def addstats(conn):
    cmd = "insert into cac (max_ua,min_ua,avg_ua,max_ub,min_ub,avg_ub,max_uc,min_uc,avg_uc,max_ia,min_ia,avg_ia,max_ib,min_ib,avg_ib,max_ic,min_ic,avg_ic,max_P,min_P,avg_P,max_S,min_S,avg_S,max_PF,min_PF,avg_PF,max_F,min_F,avg_F,max_Pa,min_Pa,avg_Pa,max_Pb,min_Pb,avg_Pb,max_Pc,min_Pc,avg_Pc,max_Sa,min_Sa,avg_Sa,max_Sb,min_Sb,avg_Sb,max_Sc,min_Sc,avg_Sc,max_PFa,min_PFa,avg_PFa,max_PFb,min_PFb,avg_PFb,max_PFc,min_PFc,avg_PFc) select max(ua),min(ua),avg(ua),max(ub),min(ub),avg(ub),max(uc),min(uc),avg(uc),max(ia),min(ia),avg(ia),max(ib),min(ib),avg(ib),max(ic),min(ic),avg(ic),max(P),min(P),avg(P),max(S),min(S),avg(S),max(PF),min(PF),avg(PF),max(F),min(F),avg(F),max(Pa),min(Pa),avg(Pa),max(Pb),min(Pb),avg(Pb),max(Pc),min(Pc),avg(Pc),max(Sa),min(Sa),avg(Sa),max(Sb),min(Sb),avg(Sb),max(Sc),min(Sc),avg(Sc),max(PFa),min(PFa),avg(PFa),max(PFb),min(PFb),avg(PFb),max(PFc),min(PFc),avg(PFc) from test"
    cursor = conn.cursor()
    cursor.execute(cmd)
    conn.commit()


if __name__ == '__main__':
    conn = connect()
    while (True):
        add(conn)
        addstats(conn)
        time.sleep(1)
