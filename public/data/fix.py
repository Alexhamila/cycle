
__author__ = 'mbrzustowicz'

# metadata.json has single quotes like this
# {'asin': 'B00M0AEPXG', 'imUrl': 'http://ecx.images-amazon.com/images/I/51hcXTUeHLL._BO2,204,203,200_ ..... }
# so the strategy is to read each line as a string, and dump into a REAL json file

import json
import ast

fr=open("brands.json")
fw=open("brands_fixed.json", "w")

for line in fr:
    json_dat = json.dumps(ast.literal_eval(line))
    dict_dat = json.loads(json_dat)
    json.dump(dict_dat, fw)
    fw.write("\n")

fw.close()
fr.close()