# -*- coding: utf-8 -*-
import json
import ssl
import urllib.request

ssl._create_default_https_context = ssl._create_unverified_context
url     = 'https://spreadsheets.google.com/feeds/list/14H7VE3zfllDDTC73L0bL7nyjkdodPMXvqs1CH__xgFY/1/public/values?alt=json'
respons = urllib.request.urlopen(url)
data    = json.loads(respons.read())



new_json = []

try:
  for i in data.get('feed', dict()).get('entry'):
    new_json.append({
      'code'         : i.get('gsx$code', dict()).get('$t'),
      'jurisdiction' : i.get('gsx$jurisdiction', dict()).get('$t'),
      'localities'   : i.get('gsx$localities', dict()).get('$t')
    })

  with open('geo.json', 'w') as f:
    f.write(json.dumps(new_json))

except Exception as e:
  print('No se pudo generar el archivo JSON')
