from js import Response
import sched
import time

# 创建调度器对象
scheduler = sched.scheduler(time.time, time.sleep)

def scheduled_task():
    print("定时任务执行了！")

def schedule_task(delay):
    # 在指定延迟后执行任务
    scheduler.enter(delay, 1, scheduled_task)
    # 运行调度器
    scheduler.run()

# 设置延迟时间，这里设置为5秒
delay = 5
schedule_task(delay)

def on_fetch(request):
    return Response.new("Hello World!")
