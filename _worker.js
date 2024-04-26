addEventListener('scheduled', event => {
    event.waitUntil(handleScheduled(event))
  })
  
  async function handleScheduled(event) {
    // 定义任务执行的间隔（以毫秒为单位）
    //const interval = 24 * 60 * 60 * 1000; // 每24小时执行一次
    const interval = 1000; // 每24小时执行一次
  
    // 执行你的任务逻辑
    console.log('定时任务开始执行...');
  
    // 这里可以执行你的逻辑，比如发送请求、处理数据等等
    // 例如：
    // await fetch('https://api.example.com/process', { method: 'POST', ... });
  
    console.log('定时任务执行完成.');
  
    // 设置下一次执行的时间
    const nextTime = new Date(event.scheduledTime + interval);
    return reschedule(event, nextTime);
  }
  
  async function reschedule(event, nextTime) {
    try {
      // 使用Cloudflare Workers的定时触发器 API 调度下一次任务
      await fetch(event.request.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Cloudflare-Scheduler': '1',
        },
        body: JSON.stringify({ scheduledTime: nextTime.toISOString() }),
      });
    } catch (error) {
      console.error('调度下一次任务时出错:', error);
    }
  }
  