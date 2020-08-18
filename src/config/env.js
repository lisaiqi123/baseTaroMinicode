/*打包及编译使用的环境信息文件*/
import local from "./env.local";
import dev from "./env.dev";
import prod from "./env.prod";

var env = {
    baseUrl: ""
};
var environment = null;
// 根据json中配置的信息,给environment变量赋值
console.log(process.env.NODE_ENV);

switch (process.env.NODE_ENV) {
    case "local": // 本地调试
        environment = local;
        break;
    case "development": // dev环境
        environment = dev;
        break;
    case "production": // production
        environment = prod;
        break;
    default:
        console.log("环境信息异常!");
}
// 将环境信息做整合
Object.assign(env, environment);
export default env;