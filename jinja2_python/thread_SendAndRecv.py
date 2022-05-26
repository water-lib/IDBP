import _thread
from socket import *
import time
import threading

# 建立套接字连接


# 定义报文（进制透传，读取地址，读取数据）
read_data = 'FEA501121600124B001527A4780003030300001305A1A0'
read_data = bytes.fromhex(read_data)


def send(times, delay):
    s = socket(AF_INET, SOCK_STREAM)
    s.connect(("127.0.0.1", 10000))
    for i in range(0, times):
        s.send(read_data)
        time.sleep(delay)
        print("sended", i + 1)


def rec():
    i = 0
    while True:
        print("received", i + 1)
        time.sleep(10)


def fuwi():
    s = socket(AF_INET, SOCK_STREAM)
    s.bind(('127.0.0.1', 10000))
    s.listen(2)
    while True:
        clientsock, clientaddress = s.accept()
        recvdata = clientsock.recv(1024)
        print(recvdata)


t = threading.Thread(target=send, args=(10, 1000))
t.start()
t = threading.Thread(target=fuwi)
t.start()
