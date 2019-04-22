# http-cache-knowledge
http缓存知识归纳
参考 http://web.jobbole.com/84888/  
# http-cache-knowledge
http缓存应用，我自己的理解是，对于单页面应用，最好的情况就是html入口文件完全不缓存，而js,css,img等静态资源通过配置强缓存、协商缓存等方式来提高性能，

html设置不缓存，网上能找到的html不缓存的前端能做的方法，是设置meta头，
```js
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />

但是经过实践检验(本地搭的express服务)发现，这种方式并不奏效，html仍然能够命中协议缓存(eTag)，返回304，实际奏效的方式是在express配置
```js
res.setHeader('Cache-Control', 'no-store')

nginx、apache等有语句稍有差异，但都是同一个意思,就是在响应头设置html页面完全跳过强缓存跟协商缓存，每次都重新发送一次请求，保证了html页面的新鲜度，
实际上，只要html入口不缓存，其它静态资源就可以肆意设置强缓存了，设置个十年都没有问题，因为只要入口一改(通常是入口指向的静态资源的hash值改变),用户马上就能重新请求与并缓存新的静态资源，再入口不变的情况下，用户下次进入页面都能马上从本地缓存取到所有静态资源。感觉完全没有协商缓存啥事了。虽然还是要两个一起用比较好，感觉协商缓存是针对那些资源名字不变的情况的，但是目前项目webpack打包一般都会用hash，contenthash,像引入的第三方库，修改频率很低，那文件的hash也没有必要改变，这样子即使没有命中强缓存，也能通过last-Modified/Etag等命中协商缓存。。

另外再测试期间发现一个问题，就是无论我怎么设置强缓存(cache-control/expires),都只会命中css,js等静态资源，而html文件都不能命中，都是返回304。。。。
这可能也是浏览器的一个设定吧~
