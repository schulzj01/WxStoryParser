
/*
 * This is a parser that will load in XML data from
 *
 * @author Jeremy.Schulz@noaa.gov
 *
*/
"use strict"

import { XMLParser } from 'fast-xml-parser';
import merge from 'lodash.merge';
import { getOfficeMetadata } from './NwsOffices.js';

/*
	* Get a list of XML options for parsing and building the XML.
	*/
const xmlOptions = {
	cdataPropName: "_cData",
	format: true,
	attributeNamePrefix : "@_",
	ignoreAttributes : false
}


/**
 * A class that handles management of the different WxStory objects and can load / compare them.
 */
export default class WxStoryParser {

	/**
	 *
	 * @param {String[]} wfos - An array of 3 letter wfo site IDs
	 * @property {String} this.wfo - 3/4 letter wfo site ID
	 * @property {WxStory[]} this.wxstorys = the resultant data after loadAll is called
	 */
	constructor(wfos = ['pih']) {
		this.wfos = wfos.map(wfo => wfo.toLowerCase());
		this.wxStorys = {};
	}

	/**
	 * Map different possible URLs since each region has tweaked it, and then get the correct one. @@@ is a placeholder for the lowercase WFO
	 * @returns {String} - The CMS url for the wfo
	 */
	getPublishedUrl(wfo,region){
		let url = '';
		const publishedUrlBases = {
			cr : `/source/@@@/wxstory/wxstory.xml`,
			wr : `/source/@@@/WxStory/WeatherStory.xml`,
			er : `/images/@@@/weatherStory/weatherstory.png`, //This is a hackish fix for no ER XML file.  Since this function is only called internally, I just kept it here.
			sr : `/source/@@@/graphicast/graphicast.xml`,
		}
		url = publishedUrlBases[region].replace('@@@',wfo);
		return url;
	}
	/**
	 * Get the regional specific cms file url path for individual storys.
	 * @param {Integer/String} - The image number to use.
	 * @returns {String} - The image default URL on CMS.
	 */
	getDefaultCmsImageUrl(wfo,region,num){
		num = String(num);
		const cmsFileInfo = {
			cr : `/images/${wfo}/wxstory/Tab${num}FileL.png`,
			wr : `/images/${wfo}/WxStory/WeatherStory${num}.png`,
			er : `/images/${wfo}/weatherStory/weatherstory.png`,  /* WARNING.  ER is not consistent in naming weather storys The below will not work for all offices */
			sr : `/images/${wfo}/graphicast/${num}.png`,
		}
		let imageUrl = cmsFileInfo[region];
		return imageUrl;
	}

	/**
	 * Get the regional specific cms file information for weather storys.  This could probably just be configured with getPublishedUrl, but this is a quick workaround
	 * so we don't have to fully refactor.
	 * @returns {Object} - The filename and
	 */
	getCmsFileInfo(region){
		const cmsFileInfo = {
			cr : {
				xmlFileName : 'cms_publicdata+wxstory+wxstory.xml',
				imageFileName : 'cms_images+wxstory+Tab###FileL.png',
				//webDisplay : this.getWebDisplayUrl()
			},
			wr : {
				xmlFileName : 'cms_publicdata+WxStory+WeatherStory.xml',
				imageFileName : 'cms_images+WxStory+WeatherStory###.png',
				//webDisplay : this.getWebDisplayUrl()
			},
			er : { /* WARNING.  ER is not consistent in naming weather storys The below will not work for all offices */
				xmlFileName : null,
				imageFileName : 'cms_images+weatherStory+weatherstory.png',
				//webDisplay: this.getWebDisplayUrl()
			},
			sr : {
				xmlFileName : 'cms_publicdata+graphicast+graphicast.xml',
				imageFileName : 'cms_images+graphicast+###.png',
				//webDisplay: this.getWebDisplayUrl()
			},
		}
		return cmsFileInfo[region];
	}

	/**
	 * Load the published XML, parse it, and then load it into the published property.
	 * @returns {Object|Boolean} - Returns the published WxStory object or returns fasle if not available
	 */
	async load(wfo) {
		let region = getOfficeMetadata(wfo).region;
		let url = this.getPublishedUrl(wfo,region);
		/* Try to account for ER not having an XML file.
		 * This creates an empty fake weather story xml file for ER so it can be queried.  This will have to be revisited when
		 * they actually start using dissemination.
		*/
		if (this.region == 'er') {
			let wxstory = new WxStory();
			wxstory.addStory({
				FullImage : url,
				EndTime : parseInt(new Date().getTime() / 1000) + 500
			});
			return await new Promise((resolve,reject) => resolve({
				wfo : wfo,
				wxstory : wxstory
			}));
		}
		/* END ER Workaround */

		try {
			const response = await fetch(url);
			if (response.status !== 200) {
				console.error(`Query of Weather Story xml file failed at URL: ${url}`);
				return await new Promise((resolve,reject) => reject({
					wfo : wfo,
					wxstory : null
				}));
			}
			else {
				let text = await response.text();
				let wxstory = new WxStory(text)
				return await new Promise((resolve,reject) => resolve({
					wfo : wfo,
					wxstory : wxstory
				}));
			}
		} catch (error) {
			console.error(`Query of Weather Story xml file failed at URL: ${url}`);
			console.error(error);
			return await new Promise((resolve,reject) => reject({
				wfo : wfo,
				wxstory : null
			}));
		}
	}

	async loadAll() {
		let promises = this.wfos.map(wfo => this.load(wfo));
		await Promise.all(promises).then(promiseResults => {
			promiseResults.forEach(result => {
				this.wxStorys[result.wfo] = result.wxstory;
			})
		});
		return this.wxStorys;
	}

	getAllWxStorys() {
		return this.wxStorys;
	}
}

/**
 * A class to hold an an entire Weather Story XML file.  Properties on this object are matched to weather story xml files.
 */
class WxStory {
	constructor(xml = {}) {
		let defaults = {
			head : {
				product : {
					'creation-date' : new Date().toISOString(),
					'@_concise-name' : 'graphicast'
				},
				source : {
					credit : '',
					'production-center' : '',
				}
			},
			graphicasts : {
				graphicast : []
			}
		};
		merge(this,defaults)
		this.parseXMLFile(xml);

	}
	/**
	 * Parse an XML File string and convert it to a JS native data format, and apply/extend the properties to this object.
	 * @param {String} xml - A Weather Story XML string
	 */
	parseXMLFile(xml){
		let xmlData = new XMLParser(xmlOptions).parse(xml)
		merge(this,xmlData.xml)
		this.graphicasts.graphicast  = this.graphicasts.graphicast.map(graphicast => new Story(graphicast));
	}
	/**
	 * Gets a Story from the XML by an index number
	 * @param {Integer} i - The active Story to return
	 * @returns {Story}
	 */
	getStory(i) {
		if (this.hasStory(i)) { return this.graphicasts.graphicast[i]; }
		else { throw new Error(`No weather story in position ${i}`) }
	}
	/**
	 * A check to see if this Wx story actually has a Story in the requested position
	 * @param {Integer} i - The index of the desired Story
	 */
	hasStory(i) {
		if (this.getStoryCount() - 1 >= i ) { return true; }
		else { return false; }
	}
	/**
	 * Gets all Storys from the XML
	 * @returns {Story[]}
	 */
	getAllStorys() {
		return this.graphicasts.graphicast;
	}
	/**
	 * Get any active or scheduled weather storys
	 * @returns {Story[]}
	 */
	getActiveAndScheduledStorys(){
		return this.getAllStorys().filter(story => (story.isActive() || story.isScheduled()))
	}
	/**
	 * Get any active weather storys
	 * @returns {Story[]}
	 */
	getActiveStorys(){
		return this.getAllStorys().filter(story => (story.isActive()))
	}
	/**
	 * Get any scheduled weather storys
	 * @returns {Story[]}
	 */
	getActiveStorys(){
		return this.getAllStorys().filter(story => (story.isScheduled()))
	}
	/**
	 * Get the total number of storys
	 * @returns {Integer} - The total number of stories available
	 */
	getStoryCount() {
		return this.graphicasts.graphicast.length
	}
	/**
	 * Gets a date object of when the WxStory was last updated.  Useful for comparisons.
	 * @returns {Date} - Date of product creation time
	 */
	getUpdateDate() {
		return new Date(this.head.product['creation-date']);
	}
}

/**
 * This class holds a legacy "Graphicast" object which is still used by the Weather Story XML.
 * Each Story holds properties that relate to a single "Weather Story" image/object
 *
 * The properties of each story can be edited directly, but there are also helper getters and setters for certain cData and
 * other properties like dates to help in creation and parsing.
 */
class Story {
	constructor(data) {
		//Older weather story xml files may have inconsistently used CData.  While the main goal would be to eventually just use escaped content for things
		//like title and description, this is a workaround to make sure the transition of the weather story works fine.  If a title or description comes out
		//as a string, just map it back to an object.
		if (data.hasOwnProperty('title') && typeof(data.title) == 'string') {	data.title = { _cData : data.title }};
		if (data.hasOwnProperty('description') && typeof(data.description) == 'string') {	data.description = { _cData : data.description }};

		let defaults = {
			Office : '',
			cwa_center_lat : '',
      cwa_center_lon : '',
			StartTime : 0,
      EndTime : 0,
      graphicNumber : '',
      order : 0,
      radar : 0,
      FrontPage : false,
      title : { _cData : '' },
      description : { _cData : '' },
      WebURL : '',
      FullImage : '',
      SmallImage : '',
			Update : null,
		}
		merge(this,defaults,data)
		//$.extend(true,this,defaults,data)
		return new Proxy(this, {
      set(target,prop) {
				if (prop !== 'Update') { target.setUpdate(); }
				return true;
			}
    });
	}
	/**
	 * Returns the description text directly instead of having to navigate to the _cData sub property
	 * @returns {String} - The currently set description text.
	 */
	getDescription() { return this.description._cData; }
	/**
	 * Returns the title text directly instead of having to navigate to the _cData sub property
	 * @returns {String} - The currently set title text.
	 */
	getTitle() { return this.title._cData; }
	/**
	 * A helper function to allow grabbing of the start time of the Story as an actual javascript date.  This should hopefully help
	 * front end development and allow developers to not have to convert it over each time.
	 * @returns {Date} - The start time of the Story as a JS Date object
	 */
	getStartDate(){ return new Date(this.StartTime * 1000); }
	/**
	 * A helper function to allow grabbing of the end time of the Story as an actual javascript date.  This should hopefully help
	 * front end development and allow developers to not have to convert it over each time.
	 * @returns {Date} - The end time of the Story as a JS Date object
	 */
	getEndDate(){ return new Date(this.EndTime * 1000); }
	/**
	 * Allows for easy access to the radar property by using a boolean value instead of a 1/0
	 * @returns {Boolean} - Whether or not the radar property is active
	 */
	getRadar() {
		return Boolean(this.radar);
	}
	/**
	 * Returns whether or not a Story is currently in active status (current time between start/end time of story)
	 * @returns {Boolean} - Story active status
	 */
	isActive() {
		let now = new Date();
		if (now <= this.getEndDate() && now >= this.getStartDate()) { return true; }
		else { return false; }
	}
	/**
	 * Returns whether or not a Story is currently in scheduled status (current time before start time of story)
	 * @returns {Boolean} - Story scheduled status
	 */
	isScheduled() {
		let now = new Date();
		if (now < this.getStartDate()) { return true; }
		else { return false; }
	}
	/**
	 * Returns whether or not a Story is currently in expired status (current time after end time of story)
	 * @returns {Boolean} - Story expired status
	 */
	isExpired() {
		let now = new Date();
		if (now > this.getEndDate()) { return true; }
		else { return false; }
	}
	/**
	 * Returns the current status of the Story (expired, scheduled, or active)
	 * @returns {String} - The current status of the story
	 */
	getStatus() {
		if (this.isExpired()) { return 'Expired'; }
		else if (this.isActive()) { return 'Active'; }
		else if (this.isScheduled()) { return 'Scheduled'; }
		else { return ''; }
	}
	/**
	 * A weather story doesn't include the full URL in the images.  You can use this to get the full image url with domain when querying these properties
	 */
	getFullImageFullUrl() {
		return `${this.FullImage}`
	}
	/**
	 * Weather storys can return cached URLs.  If we're trying to force load up a url, we'll probably want to use this to avoid returning stale images
	 */
	getCacheBustedImageFullUrl() {
		let url = this.getFullImageFullUrl()
		let random = parseInt(Math.random() * 1e8)
		return `${url}?_=${random}`
	}

	/**
	 * Listens via a proxy on the setter and will update the object update time with any property changes.
	 */
	setUpdate() {
		this.Update = parseInt(+new Date() / 1000)
	}
}