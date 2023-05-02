#!/usr/bin/env python
import json

# load json objects to dictionaries
jsons = json.load(open('brands.json', 'r'))

result = list()
items_set = set()

for js in jsons:
    # only add unseen items (referring to 'title' as key)
    if not js['_id'] in items_set:
        # mark as seen
        items_set.add(js['_id'])
        # add to results
        if not js.get('logo'):
            result.append({ "name": js['name'] })
        else:
            result.append({"name": js['name'], "logo": js['logo']})

# write to new json file
with open('brands_clean.json' ,'w') as nf:
    json.dump(result, nf)

