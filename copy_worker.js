
export async function download_from_url(url) {
  const myfile = await fetch(url);
  const text = await myfile.text();
  let https_proxyIPs = [];
  const lines = text.split('\n');
  let size=19;
  for(let i=1;i<size;i++){
	https_proxyIPs.push(lines[Math.floor(lines.length*i/size)]);
  }
  return https_proxyIPs;
}

export default {
  async scheduled(event, env, ctx) {
    // Write code for updating your API
    switch (event.cron) {
      case "*/3 * * * *":
        // Every three minutes
        await updateAPI();
        break;
      case "*/10 * * * *":
        // Every ten minutes
        await updateAPI2();
        break;
      case "*/45 * * * *":
        // Every forty-five minutes
        await updateAPI3();
        break;
    }
    console.log("cron processed");
  },
};



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
  