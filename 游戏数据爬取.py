import random
import time
import requests as re
import parsel as pa
import csv

#创建文件
f = open("test01.csv", "w", encoding="utf-8", newline="")
#创建写入对象
csv_writer = csv.DictWriter(f, fieldnames=["游戏", 
"标签", "原价", "折后价", "折扣","链接"])
#写入表头
csv_writer.writeheader()

i = 0

for page in range(0,105,15):
    i+=1
    #随机休眠
    time.sleep(random.randint(1,4))
    url = f"https://store.steampowered.com/contenthub/querypaginated/specials/TopSellers/nepder/?query=&start={page}&count=15&cc=TW&l=schinese&v=4&taq="
    headers = {
        'User-Agent': "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36 Edg/126.0.0.0"
    }
    #创建session
    res = re.session()
    #添加代理
    re.adapters.DEFAULT_RETRIES = 20
    #禁用keep-alive
    re.keep_alive=False
    res.proxies = {"https": "47.100.104.247:8080","http": "36.248.10.47:8080"}
    res = re.get(url=url, headers=headers)
    html_data = res.json()["results_html"]
    selector = pa.Selector(html_data)
    lis = selector.css("a.tab_item")
    for li in lis:
        #获取游戏链接
        href = li.css("::attr(href)").get()   
        #获取游戏名称              
        title = li.css(".tab_item_name::text").get()
        #获取游戏标签
        tag_list = li.css(".tab_item_top_tags .top_tag::text").getall()
        #拼接标签
        tag = "".join(tag_list)
        #获取原价
        price = li.css(".discount_original_price::text").get()
        #获取折后价
        price_1  = li.css(".tab_item_discount .discount_final_price::text").get()
        #获取折扣
        discount = li.css(".tab_item_discount .discount_pct::text").get()
        #创建字典
        dit = {
            "游戏": title,
            "标签": tag,
            "原价": price,
            "折后价": price_1,
            "折扣": discount,
            "链接": href
        }
        #写入数据
        csv_writer.writerow(dit)
    print(i)
