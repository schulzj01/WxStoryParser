## About This Library

This library is adapted from DSS Builder to allow for easy reading of weather story xml files. The files are parsed into normal javascript classes, with an extra suite of methods to compliment easy access.


## Getting Started

This library is hosted on CMS.  Add it to your project by including the script tag below in your HTML:

```js
<script src="https://www.weather.gov/source/wrh/WxStoryParser/WxStoryParser.js"></script>
```

If you would like this library available as a React, CommonJS, or other module, contact the development team

## Usage

The easiest way to load up the weather story is to instantiate the parser for the WFO you're looking for, and call the `loadAll()` method.  The `loadAll()` method returns a promise with the associated data for all requested WFOs as properties as the result.

The appropriate WxStory and Story objects are then accessible by accessing the result\[wfo\] property.

```js
let wfos = ['pih','boi','tfx','slc'];

let wxStoryParser = new WxStoryParser(wfos)
	.loadAll()
	.then((wxStorys) => {
		wfos.forEach(wfo => {
			let activeAndScheduledStorys = wxStorys[wfo].getActiveAndScheduledStorys();
			activeAndScheduledStorys.forEach(story => {
				console.log(story.Office, story.getFullImageFullUrl())
			})
		})
	});
```

## WxStory and Story Available Methods


<dl>
<dt><a href="#WxStory">WxStory</a></dt>
<dd><p>A class to hold an an entire Weather Story XML file.  Properties on this object are matched to weather story xml files.</p>
</dd>
<dt><a href="#Story">Story</a></dt>
<dd><p>This class holds a legacy &quot;Graphicast&quot; object which is still used by the Weather Story XML.
Each Story holds properties that relate to a single &quot;Weather Story&quot; image/object</p>
<p>The properties of each story can be edited directly, but there are also helper getters and setters for certain cData and
other properties like dates to help in creation and parsing.</p>
</dd>
</dl>

<a name="WxStory"></a>

## WxStory
A class to hold an an entire Weather Story XML file.  Properties on this object are matched to weather story xml files.

**Kind**: global class

* [WxStory](#WxStory)
    * [.parseXMLFile(xml)](#WxStory+parseXMLFile)
    * [.getStory(i)](#WxStory+getStory) ⇒ [<code>Story</code>](#Story)
    * [.hasStory(i)](#WxStory+hasStory)
    * [.getAllStorys()](#WxStory+getAllStorys) ⇒ [<code>Array.&lt;Story&gt;</code>](#Story)
    * [.getActiveAndScheduledStorys()](#WxStory+getActiveAndScheduledStorys) ⇒ [<code>Array.&lt;Story&gt;</code>](#Story)
    * [.getActiveStorys()](#WxStory+getActiveStorys) ⇒ [<code>Array.&lt;Story&gt;</code>](#Story)
    * [.getActiveStorys()](#WxStory+getActiveStorys) ⇒ [<code>Array.&lt;Story&gt;</code>](#Story)
    * [.getStoryCount()](#WxStory+getStoryCount) ⇒ <code>Integer</code>
    * [.getUpdateDate()](#WxStory+getUpdateDate) ⇒ <code>Date</code>

<a name="WxStory+parseXMLFile"></a>

### wxStory.parseXMLFile(xml)
Parse an XML File string and convert it to a JS native data format, and apply/extend the properties to this object.

**Kind**: instance method of [<code>WxStory</code>](#WxStory)

| Param | Type | Description |
| --- | --- | --- |
| xml | <code>String</code> | A Weather Story XML string |

<a name="WxStory+getStory"></a>

### wxStory.getStory(i) ⇒ [<code>Story</code>](#Story)
Gets a Story from the XML by an index number

**Kind**: instance method of [<code>WxStory</code>](#WxStory)

| Param | Type | Description |
| --- | --- | --- |
| i | <code>Integer</code> | The active Story to return |

<a name="WxStory+hasStory"></a>

### wxStory.hasStory(i)
A check to see if this Wx story actually has a Story in the requested position

**Kind**: instance method of [<code>WxStory</code>](#WxStory)

| Param | Type | Description |
| --- | --- | --- |
| i | <code>Integer</code> | The index of the desired Story |

<a name="WxStory+getAllStorys"></a>

### wxStory.getAllStorys() ⇒ [<code>Array.&lt;Story&gt;</code>](#Story)
Gets all Storys from the XML

**Kind**: instance method of [<code>WxStory</code>](#WxStory)
<a name="WxStory+getActiveAndScheduledStorys"></a>

### wxStory.getActiveAndScheduledStorys() ⇒ [<code>Array.&lt;Story&gt;</code>](#Story)
Get any active or scheduled weather storys

**Kind**: instance method of [<code>WxStory</code>](#WxStory)
<a name="WxStory+getActiveStorys"></a>

### wxStory.getActiveStorys() ⇒ [<code>Array.&lt;Story&gt;</code>](#Story)
Get any active weather storys

**Kind**: instance method of [<code>WxStory</code>](#WxStory)
<a name="WxStory+getActiveStorys"></a>

### wxStory.getActiveStorys() ⇒ [<code>Array.&lt;Story&gt;</code>](#Story)
Get any scheduled weather storys

**Kind**: instance method of [<code>WxStory</code>](#WxStory)
<a name="WxStory+getStoryCount"></a>

### wxStory.getStoryCount() ⇒ <code>Integer</code>
Get the total number of storys

**Kind**: instance method of [<code>WxStory</code>](#WxStory)
**Returns**: <code>Integer</code> - - The total number of stories available
<a name="WxStory+getUpdateDate"></a>

### wxStory.getUpdateDate() ⇒ <code>Date</code>
Gets a date object of when the WxStory was last updated.  Useful for comparisons.

**Kind**: instance method of [<code>WxStory</code>](#WxStory)
**Returns**: <code>Date</code> - - Date of product creation time
<a name="Story"></a>

## Story
This class holds a legacy "Graphicast" object which is still used by the Weather Story XML.
Each Story holds properties that relate to a single "Weather Story" image/object

The properties of each story can be edited directly, but there are also helper getters and setters for certain cData and
other properties like dates to help in creation and parsing.

**Kind**: global class

* [Story](#Story)
    * [.getDescription()](#Story+getDescription) ⇒ <code>String</code>
    * [.getTitle()](#Story+getTitle) ⇒ <code>String</code>
    * [.getStartDate()](#Story+getStartDate) ⇒ <code>Date</code>
    * [.getEndDate()](#Story+getEndDate) ⇒ <code>Date</code>
    * [.getRadar()](#Story+getRadar) ⇒ <code>Boolean</code>
    * [.isActive()](#Story+isActive) ⇒ <code>Boolean</code>
    * [.isScheduled()](#Story+isScheduled) ⇒ <code>Boolean</code>
    * [.isExpired()](#Story+isExpired) ⇒ <code>Boolean</code>
    * [.getStatus()](#Story+getStatus) ⇒ <code>String</code>
    * [.getFullImageFullUrl()](#Story+getFullImageFullUrl)
    * [.getCacheBustedImageFullUrl()](#Story+getCacheBustedImageFullUrl)
    * [.setUpdate()](#Story+setUpdate)

<a name="Story+getDescription"></a>

### story.getDescription() ⇒ <code>String</code>
Returns the description text directly instead of having to navigate to the _cData sub property

**Kind**: instance method of [<code>Story</code>](#Story)
**Returns**: <code>String</code> - - The currently set description text.
<a name="Story+getTitle"></a>

### story.getTitle() ⇒ <code>String</code>
Returns the title text directly instead of having to navigate to the _cData sub property

**Kind**: instance method of [<code>Story</code>](#Story)
**Returns**: <code>String</code> - - The currently set title text.
<a name="Story+getStartDate"></a>

### story.getStartDate() ⇒ <code>Date</code>
A helper function to allow grabbing of the start time of the Story as an actual javascript date.  This should hopefully help
front end development and allow developers to not have to convert it over each time.

**Kind**: instance method of [<code>Story</code>](#Story)
**Returns**: <code>Date</code> - - The start time of the Story as a JS Date object
<a name="Story+getEndDate"></a>

### story.getEndDate() ⇒ <code>Date</code>
A helper function to allow grabbing of the end time of the Story as an actual javascript date.  This should hopefully help
front end development and allow developers to not have to convert it over each time.

**Kind**: instance method of [<code>Story</code>](#Story)
**Returns**: <code>Date</code> - - The end time of the Story as a JS Date object
<a name="Story+getRadar"></a>

### story.getRadar() ⇒ <code>Boolean</code>
Allows for easy access to the radar property by using a boolean value instead of a 1/0

**Kind**: instance method of [<code>Story</code>](#Story)
**Returns**: <code>Boolean</code> - - Whether or not the radar property is active
<a name="Story+isActive"></a>

### story.isActive() ⇒ <code>Boolean</code>
Returns whether or not a Story is currently in active status (current time between start/end time of story)

**Kind**: instance method of [<code>Story</code>](#Story)
**Returns**: <code>Boolean</code> - - Story active status
<a name="Story+isScheduled"></a>

### story.isScheduled() ⇒ <code>Boolean</code>
Returns whether or not a Story is currently in scheduled status (current time before start time of story)

**Kind**: instance method of [<code>Story</code>](#Story)
**Returns**: <code>Boolean</code> - - Story scheduled status
<a name="Story+isExpired"></a>

### story.isExpired() ⇒ <code>Boolean</code>
Returns whether or not a Story is currently in expired status (current time after end time of story)

**Kind**: instance method of [<code>Story</code>](#Story)
**Returns**: <code>Boolean</code> - - Story expired status
<a name="Story+getStatus"></a>

### story.getStatus() ⇒ <code>String</code>
Returns the current status of the Story (expired, scheduled, or active)

**Kind**: instance method of [<code>Story</code>](#Story)
**Returns**: <code>String</code> - - The current status of the story
<a name="Story+getFullImageFullUrl"></a>

### story.getFullImageFullUrl()
A weather story doesn't include the full URL in the images.  You can use this to get the full image url with domain when querying these properties

**Kind**: instance method of [<code>Story</code>](#Story)
<a name="Story+getCacheBustedImageFullUrl"></a>

### story.getCacheBustedImageFullUrl()
Weather storys can return cached URLs.  If we're trying to force load up a url, we'll probably want to use this to avoid returning stale images

**Kind**: instance method of [<code>Story</code>](#Story)
<a name="Story+setUpdate"></a>

### story.setUpdate()
Listens via a proxy on the setter and will update the object update time with any property changes.

**Kind**: instance method of [<code>Story</code>](#Story)
