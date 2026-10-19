import requests as rq
from anime_parsers_ru import KodikParser
import anime_dl_core as adc
import json  # for offline



pass_to_res = 'reserv.json'

url = "https://kinopoiskapiunofficial.tech"
headers = {
    'X-API-KEY': '5172a6c7-c290-464e-ade1-5b3319aede1b',
    'Content-Type': 'application/json',
}

url_k = "https://kodik-api.com/search"
parser = KodikParser()
kodik_token = parser.get_token()

def sosiska(id: int):
    params = {
        "token": kodik_token,
        "kinopoisk_id": id
    }
    kodik_answ = rq.get(url_k, params=params).json()
    
    if kodik_answ["total"]:
        video_url = kodik_answ["results"][0]["link"]
        # трэш преобразоваем из кодика в видос для плеера html
        v2 = adc.extract(video_url).best(kind="mp4").url  # -> mp4
        return v2
    return 0

def info(id: int) -> dict:
    keys = ["nameRu", "posterUrl", "logoUrl", "year", "description", "coverUrl"]
    api_answ = rq.get(url + f"/api/v2.2/films/{id}", headers=headers).json()
    take = {k: api_answ[k] for k in keys}
    take["id"] = id
    api_video = rq.get(url + f"/api/v2.2/films/{id}/videos", headers=headers).json()
    api_awards = rq.get(url + f"/api/v2.2/films/{id}/awards", headers=headers).json()
    if api_awards["total"]:
        take["awards"] = api_awards["items"]
    else:
        take["awards"] = []
    #if api_video["total"]:
    #    take["video_item"] = api_video["items"][0]["url"]
    #    take["video_name"] = api_video["items"][0]["name"]
    #else:
    #    take["video_item"] = 0
    #    take["video_name"] = 0
    if sosiska(id):
        take["video_item"] = sosiska(id)
    else:
        take["video_item"] = 0
    # Перезапись резерва    
    with open(pass_to_res, 'r', encoding='utf-8') as file:
        data = json.load(file)
    if data:
        if take["id"] not in [x["id"] for x in data]:
            data.append(take)
    else:
        data = [take]
    
    with open(pass_to_res, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

    return take

def info_offline(id: int) -> dict:
    with open(pass_to_res, 'r', encoding='utf-8') as file:
        take = json.load(file)

    return take
