import json
import random

#Load JSON contents
places_file = open ('places.json')
character_file = open ('character.json')
action_file = open ('action.json')

#deserialize to Py Objects
places = json.load(places_file)
character = json.load(character_file)
action = json.load(action_file)

places_file.close()
character_file.close()
action_file.close()

#Types of chars, places, actions (taken from interface)

placement = ["in","at","over","under", "in front of", "at the back of"]

char_types = [character['generic'], character['fanart']['anime'] ,character['fanart']['game']]
place_types = places['generic']
action_type = action['generic']

c = []
for s in char_types:
    c += s

who = random.choice(c)
where = random.choice(place_types).lower()
act = random.choice(action_type).lower()
rand_placement = random.choice(placement)

print ("Randomized composition: \n ")
print ("Who? - " + who)
print ("What? - " + act)
print ("Where? - " + where)
print (who + " is " + act + " " + rand_placement + " " + where)