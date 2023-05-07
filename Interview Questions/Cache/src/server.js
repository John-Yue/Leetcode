// 强制缓存与协商缓存

import http from "http";
import url from "url";
import path from "path";
import { stat, readFile } from "fs/promises";
import crypto from "crypto";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

http
  .createServer(async (req, res) => {
    // 解析当前url中的参数
    let { pathname } = url.parse(req.url);

    let fileName =
      pathname === "/"
        ? path.join(__dirname, "../", pathname, "static/index.html")
        : path.join(__dirname, "../static/", pathname);

    /**
     * 设置强制缓存
     * 强制缓存对根文件没有用，只能
     * 强制缓存只会缓存除html外的文件，比如js、css之类的
     * 通过响应头的header，Cache-Control，max-age=10，
     * 10s内不过期，可以存储在浏览器缓存中。
     * Cache-Control 常用的值：
     *  - max-age 缓存内容在max-age秒后失败
     *  - no-cache 不要本地强制缓存，正常向服务器端请求。
     *  - no-store 不要本地强制缓存，也不需要服务器做缓存。所有缓存都不出发。
     *  - public 所以内容都可以缓存
     *  - private 所有内容，可以护短都可以缓存
     *
     * Cache-Control 是HTTP1.1的产物!!!
     * Cache-Control 控制的是相对时间，ps：max-age=10 就是10s后失效
     * Cache-Control 优先级更高
     */
    res.setHeader("Cache-Control", "max-age=10");

    /**
     * Expires
     * Expires是HTTP1.0版本做强制缓存的响应头字段
     * - Expires 是服务器返回的具体时间，且存在兼容性问题
     */
    res.setHeader(
      "Expires",
      new Date(new Date().getTime() + 10 * 1000).toGMTString()
    );

    try {
      const statObj = await stat(fileName);

      /**
       * 协商缓存是在响应头中添加 Last-Modified 字段
       *
       * 主要是对index.html文件设置协商缓存，如果根文件没有发生变化
       * 就返回304，然后读取浏览器中的缓存
       *
       * 这里是根据文件修改时间来判断，时间单位精确到秒，
       * 如果在一秒内多次修改，则会有问题。所以有Etag根据文件内容来
       * 判断是否命中协商缓存
       *
       *
       */
      const ctime = statObj.ctime.toGMTString();
      res.setHeader("Last-Modified", ctime);

      if (req.headers["if-modified-since"] === ctime) {
        return (res.statusCode = 304) && res.end();
      }

      if (statObj.isFile()) {
        let result = await readFile(fileName);

        const hash = crypto.createHash("md5").update(result).digest("base64");
        res.setHeader("Etag", hash);

        if (req.headers["if-none-match"] === hash) {
          return (res.statusCode = 304) && res.end();
        }

        // 打印当前请求的文件：
        const tempfileNameList = fileName.split("/");
        console.log("fileName:", tempfileNameList[tempfileNameList.length - 1]);

        res.end(result);
      } else {
        res.statusCode = 404;
        res.end("Not Found");
      }
    } catch (err) {
      res.statusCode = 404;
      console.log("error:", err);
      res.end("Not Found 404");
    }
  })
  .listen(3000);
