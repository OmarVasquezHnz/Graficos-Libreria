import requests
import json
from bs4 import BeautifulSoup
import re



titulos = ["airing","upcoming","tv","movie","ova","ona","special"]

def extract_number(line):
    pattern = r"(\d+),(\d+)\s+members"

    match = re.search(pattern, line)
    if match:
        number = match.group(1) + match.group(2)
        return number
    else:
        return None
    

def getTop(top_type:str):
    elementos = {top_type:{}}
    url = "https://myanimelist.net/topanime.php?type=" + top_type
    response = requests.get(url)


    # create a BeautifulSoup object from the webpage content
    soup = BeautifulSoup(response.content, 'html.parser')
    container_desc = soup.select('.container .description')

    top = 10
    for data in soup.select('div.detail'):
        numbers = data.select_one('div.information.di-ib.mt4')

        title = data.select_one("a").get_text()
        number = extract_number(numbers.get_text())

        
        elementos[top_type][title] = int(number)
        if top == 0:
            break

        top -= 1

    # # save the dictionary as a JSON file
    with open(f'{top_type}.json', 'w') as file:
        json.dump(elementos, file,indent=4)


for titulo in titulos:
    getTop(titulo)

# # save the dictionary as a JSON file
# with open('test.json', 'w') as file:
#     json.dump(data, file)

