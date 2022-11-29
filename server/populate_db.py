# Python script to parse the GT schedule to populate the database for initial information
# ensure that everything is added as admin

from pymongo import MongoClient
import xml.etree.ElementTree as ET
import requests
from bs4 import BeautifulSoup

uri = "mongodb+srv://ajand2003:Cat123pie@cluster0.xrmrqqr.mongodb.net/?retryWrites=true&w=majority"

# test = "mongodb+srv://tristanpeat:2021Chloe2205!@cluster0.0nbvh.mongodb.net/?retryWrites=true&w=majority"

def connect_db(uri):
    try:
        client = MongoClient(uri)
        # print(client.connection.ready)
    except:
        print("Error connecting to cluster")
        return 
    return client

client = connect_db(uri)
print(client)

# most operations in mongodb act on a collection within a db
def get_databases(client):
    try:
        # get database and collection code
        dbs = client.list_database_names()
    except:
        print("Error getting databases")
        return
    return dbs

dbs = get_databases(client)
print(dbs)

# get colleciton names
def get_collection_names(database):
    try:
        colls = database.list_collection_names()
    except:
        print("Error getting collections")
        return
    return colls

db = client.test
colls = get_collection_names(db)
print(colls)

# get all contents of a collection
def list_contents(collection):
    try:
        out = collection.find()
    except:
        print("Error finding contents of collection")
        return
    return out

users = list_contents(db.users)
print(users)
for each in users:
    print(each)
events = list_contents(db.events)


# insert many event of the form [{event 1 data}, {event 2 data }.. ]
def insert_events(collection, events):
    result = collection.insert_many(events)
    # display results
    print(result.insert_ids)

# helper to parse the description string for the time of the event
def get_time(descr):
    start = '<time'
    end = '<'

# rss feeds return as an xml so we need to parse xml into dicts
# need title, time, description, location, date, host
def parse_xml(xml):
    root = ET.fromstring(xml)
    # print(root.tag)
    # print(root.attrib)
    events = []
    seen_titles = set()
    for item in root.iter('item'):
        event = {}
        title = item.find('title').text
        if title not in seen_titles:
            event['title'] = title
        seen_titles.add(title)
        event['description'] = item.find('link').text
        # print(item.find('description').text)
        events.append(event)
    return events

def get_events():
    # event RSS feeds 12, 13, 14, 18, 19, 20 are all valid
    base_feed = "https://calendar.gatech.edu/taxonomy/term/"
    valid_feeds = [12, 13, 14, 18, 19, 20]
    all_events = []
    for num in valid_feeds:
        url = base_feed + str(num) + "/feed"
        res = requests.get(url)
        all_events += parse_xml(res.text)
    return(all_events)

events_feed = get_events()
print(events)

# add events to the collection
def insert_events(collection, events):
    try:
        collection.insert_many(events)
    except:
        print("Failure adding events to collection")

# this function call adds all the new events to the databse
# insert_events(db.events, events_feed)

# double check the contents of the databse
events = list_contents(db.events)
for each in events:
    print(each)

# close connection
client.close()



