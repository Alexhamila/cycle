#!/usr/bin/env python
import json
import requests
import shutil
import urllib
import time

# load json objects to dictionaries
jsons = json.load(open('brands.json', 'r'))


for js in jsons:
    # only add unseen items (referring to 'title' as key)
    if 'logo' in js and js['logo'] != "":
        img_url = 'https://f004.backblazeb2.com/file/brand-db/'+js['logo']
        response = requests.get(img_url)
        if response.status_code:
            fp = open('images/'+js['logo']+'.webp', 'wb')
            fp.write(response.content)
            fp.close()

