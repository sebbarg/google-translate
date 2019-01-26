from urllib.parse import quote_plus
import re
import requests
import json

def translate(from_, to, text):
  url = f"""
    https://translate.googleapis.com/translate_a/single
      ?client=gtx
      &ie=UTF-8
      &oe=UTF-8
      &dt=t
      &sl={quote_plus(from_)}
      &tl={quote_plus(to)}
      &q={quote_plus(text)}
  """
  url = re.sub(r"\s+", "", url)

  res = requests.get(url)
  json = res.json()
  if json[0] and json[0][0] and json[0][0][0]:
    return json[0][0][0]
  else:
    raise Exception(res)

def test(from_, to, text):
  try:
    result = translate(from_, to, text)
    print(result)
  except Exception as e:
    print(f"ERROR {e}")
  
test("en-US", "da-DK", "Hello, world!")
