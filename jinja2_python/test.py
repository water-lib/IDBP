import _thread
import time
import socket
import threading


# 为线程定义一个函数
def print_time(threadName, delay):
    count = 0
    while count < 5:
        time.sleep(delay)
        count += 1
        print("%s: %s" % (threadName, time.ctime(time.time())))


t = threading.Thread(target=print_time, args=('1', 2))
t.start()
t = threading.Thread(target=print_time, args=('2', 4))
t.start()
