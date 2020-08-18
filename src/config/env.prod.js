/*正式服环境配置信息*/
var local = {
    env: 'prod',
    baseUrl: 'https://api.cw100.com/api/',
    imgUrl: 'https://api.cw100.com/',
    appid:'wxcbe60162f9dc451c',
    Accept:'application/vnd.package.v2+cus_json',
    qqmapKey:'YHBBZ-XJ6W4-NE2UI-X5PMO-FPF6H-KWFFA',
    formId:JSON.stringify({
        'award': 'aFG9h8DI-bfDF-tFWd6YOT95F-4nRtpWE--L-3fTI7Q', //活动中奖通知
        'withdraw': 'm8kj4-jHnUfcDchrP5BHlLWcFCtDzFOmV-fL6qMuk2M', //提现申请提醒
        'cash': 'WZ7voXbFGHsjxjrZo4nB8N9BrmT0GnnLosgPbA95GYQ', //账户余额变更提醒
    })
};
export default local;